import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { competitionApi } from "../../../../api/competitionsApi";
import { headerStore } from "../../../../app/store";
import InputText from "../../../../components/Input/InputText";
import ErrorText from "../../../../components/Typography/ErrorText";
import FooterButtonWithCheckmark from "./FooterButtonWithCheckmark";
import ScoresheetForm from "./ScoresheetForm";

const INITIAL_COMPETITION_OBJ = {
  competition_number: "",
  competition_name: "",
  scoresheet: [{ headerTitle: "", subHeader: "", percentage: "", score: 0 }],
  is_finalist: false,
};

export default function AddCompetitionModalBody({ closeModal, extraObject }) {
 const { competition, refetchCompetitions } = extraObject;

  const showNotification = headerStore((state) => state.showNotification);
  const [errorMessage, setErrorMessage] = useState("");
  const [competitionObj, setCompetitionObj] = useState(
    competition ? competition : INITIAL_COMPETITION_OBJ
  );

  const queryClient = useQueryClient();
  const competitionMutation = useMutation(competitionApi, {
    onError: ({ response }) =>
      showNotification({ message: response.data, status: 0 }),
    onSuccess: () => {
      queryClient.invalidateQueries("competitions");
      showNotification({
        message: "Competition successfully submitted",
        status: 1,
      });
      refetchCompetitions();
      closeModal();
    },
  });

  const saveCompetition = () => {
    if (competitionObj.competition_name.trim() === "") {
      return setErrorMessage("Competition Name is required!");
    } else if (
      parseInt(competitionObj.competition_number) < 1 ||
      competitionObj.competition_number.trim() === ""
    ) {
      return setErrorMessage("Competition Number is required!");
    } else if (
      // Checking the scoresheet title and percentage if blanks
      competitionObj.scoresheet.some(
        (item) =>
          item.headerTitle.trim() === "" || item.percentage.trim() === ""
      )
    ) {
      return setErrorMessage("Title & Percentage fields are required!");
    } else {
      // Calculate total percentage of all criteria
      const totalPercentage = competitionObj.scoresheet.reduce(
        (total, item) => total + Number(item.percentage),
        0
      );

      if (totalPercentage !== 100) {
        return setErrorMessage("Criteria must have an exact total of 100%");
      }

      let typeOfCompetition;
      if (extraObject) {
        typeOfCompetition = "update";
        competitionMutation.mutate({ competitionObj, typeOfCompetition });
      } else {
        typeOfCompetition = "new";
        competitionMutation.mutate({ competitionObj, typeOfCompetition });
      }
    }
  };

  const updateFormValue = ({ updateType, value, index, isScoresheet }) => {
    setErrorMessage("");
    if (isScoresheet) {
      setCompetitionObj((prevState) => {
        const updatedScoresheet = [...prevState.scoresheet];
        updatedScoresheet[index] = {
          ...updatedScoresheet[index],
          [updateType]: value,
        };
        return { ...prevState, scoresheet: updatedScoresheet };
      });
    } else {
      setCompetitionObj({ ...competitionObj, [updateType]: value });
    }
  };

  const addCriteria = () => {
    setCompetitionObj((prevState) => {
      const updatedScoresheet = [
        ...prevState.scoresheet,
        { headerTitle: "", subHeader: "", percentage: "", score: 0 },
      ];
      return { ...prevState, scoresheet: updatedScoresheet };
    });
  };

  const removeCriteria = () => {
    setCompetitionObj((prevState) => {
      const updatedScoresheet = prevState.scoresheet.slice(0, -1);
      return { ...prevState, scoresheet: updatedScoresheet };
    });
  };

  return (
    <>
      <div className='mb-1 flex items-center justify-center gap-3'>
        <InputText
          type='number'
          defaultValue={competitionObj.competition_number}
          updateType='competition_number'
          containerStyle='!w-[6rem]'
          labelTitle='No.'
          updateFormValue={updateFormValue}
        />
        <InputText
          type='text'
          defaultValue={competitionObj.competition_name}
          updateType='competition_name'
          labelTitle='Name/Title'
          containerStyle='font-semibold'
          updateFormValue={updateFormValue}
        />
      </div>

      <article className='my-4 flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Scoresheet Criteria</h1>
        <button className='btn-primary btn text-white' onClick={addCriteria}>
          Add Criteria
        </button>
      </article>

      <ScoresheetForm
        competitionObj={competitionObj}
        removeCriteria={removeCriteria}
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass='mt-4'>{errorMessage}</ErrorText>

      <FooterButtonWithCheckmark
        isLoading={competitionMutation.isLoading}
        extraObject={extraObject}
        competitionObj={competitionObj}
        updateFormValue={updateFormValue}
        closeModal={closeModal}
        saveCompetition={saveCompetition}
      />
    </>
  );
}

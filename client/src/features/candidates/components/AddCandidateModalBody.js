import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { headerStore } from "../../../app/store";
import { addCandidate } from "../../../api/candidatesApi";
import AddCandidatePhoto from "./AddCandidatePhoto";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";

const INITIAL_CANDIDATE_OBJ = {
  fullName: "",
  course: "",
  candidateNumber: "",
  photo: null,
  isFinalist: false,
};

function AddCandidateModalBody({ closeModal }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [candidateObj, setCandidateObj] = useState(INITIAL_CANDIDATE_OBJ);
  const showNotification = headerStore((state) => state.showNotification);

  const queryClient = useQueryClient();
  const addCandidateMutation = useMutation(addCandidate, {
    onError: ({ response }) =>
      showNotification({ message: response.data, status: 0 }),
    onSuccess: () => {
      queryClient.invalidateQueries("candidates");
      showNotification({ message: "New Contestant Added!", status: 1 });
      closeModal();
    },
  });

  const saveNewCandidate = () => {
    const { fullName, course, candidateNumber, photo } = candidateObj;

    if (fullName.trim() === "")
      return setErrorMessage("Full Name is required!");
    else if (course.trim() === "")
      return setErrorMessage("Course is required!");
    else if (candidateNumber.trim() === "")
      return setErrorMessage("Contestant Number is required!");
    else if (photo === null)
      return setErrorMessage("Contestant Photo is required!");
    else {
      addCandidateMutation.mutate(candidateObj);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setCandidateObj({ ...candidateObj, [updateType]: value });
  };

  return (
    <section className='mx-auto w-full'>
      <figure>
        <AddCandidatePhoto
          candidate={candidateObj}
          updateFormValue={updateFormValue}
          updateType='photo'
        />
      </figure>
      <article>
        <InputText
          type='text'
          defaultValue={candidateObj.fullName}
          labelTitle='Full Name'
          updateType='fullName'
          containerStyle='mt-4'
          updateFormValue={updateFormValue}
        />
        <InputText
          type='text'
          defaultValue={candidateObj.course}
          updateType='course'
          containerStyle='mt-4'
          labelTitle='Course'
          updateFormValue={updateFormValue}
        />
        <InputText
          type='number'
          defaultValue={candidateObj.candidateNumber}
          updateType='candidateNumber'
          containerStyle='mt-4'
          labelTitle="Contestant's Number"
          updateFormValue={updateFormValue}
        />
        <ErrorText styleClass='mt-8 font-semibold text-lg'>
          {errorMessage}
        </ErrorText>
        <div className='modal-action'>
          <button className='btn-ghost btn' onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            className={`btn-primary btn px-6 ${
              addCandidateMutation.isLoading ? "loading" : ""
            }`}
            onClick={() => saveNewCandidate()}
          >
            {addCandidateMutation.isLoading ? "Saving.." : "Save"}
          </button>
        </div>
      </article>
    </section>
  );
}

export default AddCandidateModalBody;

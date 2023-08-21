import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addNewUser } from "../../../../api/usersApi";
import { headerStore } from "../../../../app/store";
import InputSection from "./InputSection";
import ErrorText from "../../../../components/Typography/ErrorText";

const INITIAL_JUDGE_OBJ = {
  username: "",
  password: "",
  fullName: "",
  judgeNumber: 0,
  userRole: "judge",
};

export default function AddUserModalBody({ closeModal }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [userObj, setJudgeObj] = useState(INITIAL_JUDGE_OBJ);
  const showNotification = headerStore((state) => state.showNotification);

  const queryClient = useQueryClient();
  const addNewUserMutation = useMutation(addNewUser, {
    onError: ({ response }) =>
      showNotification({ message: response.data, status: 0 }),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      showNotification({ message: "New user successfull added", status: 1 });
      closeModal();
    },
  });

  const saveNewUser = (e) => {
    e.preventDefault();
    const { username, password, fullName, judgeNumber, userRole } = userObj;
    if (fullName.trim() === "") {
      return setErrorMessage("Full Name is required!");
    } else if (password.trim() === "") {
      return setErrorMessage("Password is required!");
    } else if (username.trim() === "") {
      return setErrorMessage("Username is required!");
    } else {
      let newUserObj = { username, password, fullName, judgeNumber, userRole };
      addNewUserMutation.mutate(newUserObj);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setJudgeObj({ ...userObj, [updateType]: value });
  };

  return (
    <form onSubmit={saveNewUser}>
      <InputSection userObj={userObj} updateFormValue={updateFormValue} />
      <ErrorText styleClass='mt-16'>{errorMessage}</ErrorText>
      <div className='modal-action'>
        <button className='btn-ghost btn' onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          type='submit'
          className={`btn-primary btn px-6 ${
            addNewUserMutation.isLoading ? "loading" : ""
          }`}
        >
          {addNewUserMutation.isLoading ? "Saving" : "Save"}
        </button>
      </div>
    </form>
  );
}

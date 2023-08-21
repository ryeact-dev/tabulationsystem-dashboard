import { CONFIRMATION_MODAL_CLOSE_TYPES } from "../../utils/globalConstantUtil";

export default function ConfirmationModalBody({
  extraObject,
  closeModal,
  deleteCandidateMutation,
  deleteScoreMutation,
  deleteUserMutation,
  deleteCompetitionMutation,
  isLoading,
}) {
  const { message, type, userId, candidateInfo } = extraObject;

  const proceedWithYes = () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.USERS_DELETE) {
      // positive response, call api or call the mutate function
      deleteUserMutation.mutate(userId);
    }
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CANDIDATES_DELETE) {
      // positive response, call api or call the mutate function
      const candidateId = candidateInfo.candidateId;
      const candidateNumber = candidateInfo.candidateNumber;

      deleteCandidateMutation.mutate({ candidateId });
      deleteScoreMutation.mutate({ candidateNumber });
    }
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.COMPETITION_DELETE) {
      // positive response, call api or call the mutate function
      deleteCompetitionMutation.mutate({ competitionId: userId });
    }
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LOGOUT_USER) {
      // positive response, call api or call the mutate function
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <>
      <p className=' mt-8 text-center text-xl'>{message}</p>
      <div className='modal-action mt-12'>
        <button className='btn-outline btn ' onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className={`btn-primary btn w-36 text-white ${
            isLoading ? "loading" : ""
          }`}
          onClick={() => proceedWithYes()}
          // disabled={isLoading}
        >
          {isLoading ? "Updating.." : "Yes"}
        </button>
      </div>
    </>
  );
}

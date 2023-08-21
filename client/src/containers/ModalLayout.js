import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import AddUserModalBody from "../features/settings/users/components/AddUserModalBody";
import ConfirmationModal from "../features/common/ConfirmationModal";
import AddCandidateModalBody from "../features/candidates/components/AddCandidateModalBody";
import AddScoreModalBody from "../features/scoresheets/components/AddScoreModalBody";
import AddCompetitionModalBody from "../features/settings/competitions/components/AddCompetitionModalBody";
import AddFinalistModal from "../features/results/finalists/components/AddFinalistModal";
import { modalStore } from "../app/store";

function ModalLayout() {
  const [isOpen, bodyType, size, extraObject, title, closeModal] = modalStore(
    (state) => [
      state.isOpen,
      state.bodyType,
      state.size,
      state.extraObject,
      state.title,
      state.closeModal,
    ]
  );

  const close = () => {
    closeModal();
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className='btn-sm btn-circle btn absolute right-2 top-2'
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className='pb-6 text-center text-2xl font-semibold'>{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.COMPETITION_ADD_NEW]: (
                <AddCompetitionModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CANDIDATE_SCORE]: (
                <AddScoreModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CANDIDATES_ADD_NEW]: (
                <AddCandidateModalBody closeModal={close} />
              ),
              [MODAL_BODY_TYPES.FINALIST_ADD]: (
                <AddFinalistModal
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.USERS_ADD_NEW]: (
                <AddUserModalBody closeModal={close} />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModal
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;

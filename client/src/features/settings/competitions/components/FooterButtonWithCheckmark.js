export default function FooterButtonWithCheckmark({
  competitionObj,
  updateFormValue,
  closeModal,
  saveCompetition,
  isLoading,
  competitionId,
}) {
  const btnNameUpdate = isLoading ? "Updating" : "Update";
  const btnNameNew = isLoading ? "Saving" : "Save";

  const content = (
    <footer className="flex justify-between items-center">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          defaultChecked={competitionObj.is_finalist}
          onChange={() =>
            updateFormValue({
              updateType: "is_finalist",
              value: !competitionObj.is_finalist,
            })
          }
        />
        <span className="label-text ml-2">Finalist's Competition</span>
      </label>
      <div className="modal-action mt-0">
        <button className="btn-ghost btn" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn-primary btn px-6 text-white"
          onClick={() => saveCompetition()}
          disabled={isLoading}
        >
          {competitionId ? btnNameUpdate : btnNameNew}
        </button>
      </div>
    </footer>
  );

  return content;
}

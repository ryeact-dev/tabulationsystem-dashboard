export default function FooterButtonWithCheckmark({
  extraObject,
  competitionObj,
  updateFormValue,
  closeModal,
  saveCompetition,
  isLoading,
}) {
  const btnNameUpdate = isLoading ? "Updating" : "Update";
  const btnNameNew = isLoading ? "Saving" : "Save";

  const content = (
    <footer className='flex justify-between items-center'>
      <label className='label cursor-pointer'>
       <input
          type="checkbox"
          className="checkbox checkbox-primary"
          defaultChecked={competitionObj.is_finalist}
          onChange={() =>
            updateFormValue({
              updateType: "isFinalist",
              value: !competitionObj.is_finalist,
            })
          }
        />
        <span className='label-text ml-2'>Finalist's Competition</span>
      </label>
      <div className='modal-action mt-0'>
        <button className='btn-ghost btn' onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className='btn-primary btn px-6 text-white'
          onClick={() => saveCompetition()}
          disabled={isLoading}
        >
          {extraObject ? btnNameUpdate : btnNameNew}
        </button>
      </div>
    </footer>
  );

  return content;
}

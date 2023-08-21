import InputText from "../../../../components/Input/InputText";
export default function ScoresheetForm({
  competitionObj,
  removeCriteria,
  updateFormValue,
}) {
  const scoresheetForm = competitionObj.scoresheet?.map((item, index) => (
    <article key={index} className='my-4 rounded-lg border-[1px] px-2 py-3'>
      {competitionObj.scoresheet.length > 1 && index !== 0 && (
        <button className='btn btn-ghost' onClick={removeCriteria}>
          Remove criteria
        </button>
      )}
      <div className='mb-1 flex items-center justify-center gap-3'>
        <InputText
          type='text'
          defaultValue={item.headerTitle}
          updateType='headerTitle'
          labelTitle='Criteria Title'
          updateFormValue={updateFormValue}
          index={index}
          isScoresheet={true}
        />
        <InputText
          type='number'
          defaultValue={item.percentage}
          updateType='percentage'
          containerStyle='!w-[6rem]'
          labelTitle='Pct(%)'
          updateFormValue={updateFormValue}
          index={index}
          isScoresheet={true}
        />
      </div>
      <InputText
        type='text'
        defaultValue={item.subHeader}
        updateType='subHeader'
        containerStyle='h-[4.5rem]'
        labelTitle='Criteria Description (optional)'
        updateFormValue={updateFormValue}
        index={index}
        isScoresheet={true}
      />
    </article>
  ));

  return scoresheetForm;
}

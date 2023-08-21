import Subtitle from "../../../../components/Typography/Subtitle";

export default function CandJTableData({
  title,
  competitionResult,
  filteredResults,
  componentToPrintRef,
  judgeNumber,
  allUsers,
}) {
  const centerLabelClass = "text-center";

  const tableData = competitionResult.map(
    (result, index) =>
      result.rank && (
        <tr key={index} className='hover'>
          <th className={centerLabelClass}>{result.rank}</th>
          <td className={centerLabelClass}>{result.candidate_number}</td>
          <td>{result.full_name}</td>
          {result.scoresheet?.map(({ score }, i) => (
            <td className={centerLabelClass} key={i}>
              {`${score} pts`}
            </td>
          ))}
          <td
            className={`${centerLabelClass} font-semibold`}
          >{`${result.total_score} pts`}</td>
        </tr>
      )
  );

  const currentJudge = allUsers.filter(
    (user) => parseInt(user.judge_number) === judgeNumber
  );

  return (
    <div ref={componentToPrintRef} className='w-full overflow-x-auto p-4'>
      <Subtitle styleClass='text-primary !text-3xl text-center pb-4'>
        {title}
      </Subtitle>
      {filteredResults ? (
        <>
          <table className='table table-compact w-full'>
            <thead>
              <tr>
                <th className={centerLabelClass}>Rank</th>
                <th className={centerLabelClass}>C - No.</th>
                <th>Name</th>
                {filteredResults[0]?.scoresheet.map((title, index) => (
                  <th className={centerLabelClass} key={index}>
                    {title.headerTitle} - {title.percentage}%
                  </th>
                ))}
                <th className={centerLabelClass}>Total Score</th>
              </tr>
            </thead>
            <tbody>{tableData}</tbody>
          </table>
          <section className='flex justify-end items-center mt-10 mr-10'>
            <article className='text-center'>
              <h1>{currentJudge[0]?.full_name}</h1>
              <p className='divider m-0'></p>
              <h2>{`Judge No. ${judgeNumber}`}</h2>
            </article>
          </section>
        </>
      ) : (
        <h1>No Data to be dispalyed</h1>
      )}
    </div>
  );
}

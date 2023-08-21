export default function ByCompetitionTableData({ competitionResult }) {
  const centerLabelClass = "text-center";

  const tableData = competitionResult.map((result, index) => (
    <tr key={index} className='hover'>
      <th className={centerLabelClass}>{result.rank}</th>
      <td className={centerLabelClass}>{result.candidate_number}</td>
      <td>{result.full_name}</td>
      <td className='text-sm'>{result.course}</td>
      {result.scores_by_judge?.map((score, i) => (
        <td className={centerLabelClass} key={i}>
          {`${score ?? 0} pts`}
        </td>
      ))}
      <td className={`${centerLabelClass} font-semibold`}>
        {`${result.total_score ?? 0} pts`}
      </td>
    </tr>
  ));

  return (
    <div className='w-full rounded-2xl overflow-x-auto'>
      {competitionResult.length > 0 ? (
        <table className='table table-compact w-full'>
          <thead>
            <tr>
              <th className={centerLabelClass}>Rank</th>
              <th className={centerLabelClass}>C - No.</th>
              <th>Name</th>
              <th>Program</th>

              {competitionResult[0]?.scores_by_judge?.map((_, index) => (
                <th className={centerLabelClass} key={index}>{`Judge No. ${
                  index + 1
                }`}</th>
              ))}
              <th className={centerLabelClass}>Total Score</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      ) : (
        <h1>No Data to be dispalyed</h1>
      )}
    </div>
  );
}

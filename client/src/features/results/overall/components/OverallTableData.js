import Subtitle from "../../../../components/Typography/Subtitle";

export default function OverallTableData({
  competitionResult,
  title,
  componentToPrintRef,
}) {
  const centerLabelClass = "text-center";

  const tableData = competitionResult.map((result, index) => (
    <tr key={index} className="hover">
      <th className={centerLabelClass}>{result.rank}</th>
      <td className={centerLabelClass}>{result.candidate_number}</td>
      <td>{result.full_name}</td>
      <td className="text-sm">{result.course}</td>
      <td
        className={`${centerLabelClass} font-semibold`}
      >{`${result.total_score} pts`}</td>
    </tr>
  ));

  return (
    <>
      {/* Top 10 */}
      <div
        ref={componentToPrintRef}
        className="w-full rounded-2xl overflow-x-auto p-4"
      >
        <Subtitle styleClass="text-primary !text-2xl text-center pb-4">
          Top 10 Finalists
        </Subtitle>
        {competitionResult[0]?.rank ? (
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th className={centerLabelClass}>Rank</th>
                <th className={centerLabelClass}>C - No.</th>
                <th>Name</th>
                <th>Program</th>
                <th className={centerLabelClass}>Total Score</th>
              </tr>
            </thead>
            <tbody>
              {competitionResult.slice(0, 10).map((result, index) => (
                <tr key={index} className="hover">
                  <th className={centerLabelClass}>{result.rank}</th>
                  <td className={centerLabelClass}>
                    {result.candidate_number}
                  </td>
                  <td>{result.full_name}</td>
                  <td className="text-sm">{result.course}</td>
                  <td
                    className={`${centerLabelClass} font-semibold`}
                  >{`${result.total_score} pts`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No Data to be dispalyed</h1>
        )}
      </div>
      {/* Overall Scores */}
      <div className="w-full rounded-2xl overflow-x-auto p-4">
        <Subtitle styleClass="text-primary !text-2xl text-center py-4">
          {title}
        </Subtitle>
        {competitionResult[0]?.rank ? (
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th className={centerLabelClass}>Rank</th>
                <th className={centerLabelClass}>C - No.</th>
                <th>Name</th>
                <th>Program</th>
                <th className={centerLabelClass}>Total Score</th>
              </tr>
            </thead>
            <tbody>{tableData}</tbody>
          </table>
        ) : (
          <h1>No Data to be dispalyed</h1>
        )}
      </div>
    </>
  );
}

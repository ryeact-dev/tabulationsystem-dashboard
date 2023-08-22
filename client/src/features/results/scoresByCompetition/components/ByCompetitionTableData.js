import Subtitle from "../../../../components/Typography/Subtitle";

export default function ByCompetitionTableData({
  competitionResult,
  title,
  componentToPrintRef,
}) {
  const centerLabelClass = "text-center";

  const tableData = competitionResult.map((result, index) => (
    <tr key={index} className="bg-primary hover">
      <th className={centerLabelClass}>{result.rank}</th>
      <td className={centerLabelClass}>{result.candidate_number}</td>
      <td>{result.full_name}</td>
      <td className="text-sm">{result.course}</td>
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
    <section className="w-full rounded-2xl overflow-x-auto">
      <div ref={componentToPrintRef}>
        <Subtitle styleClass="text-primary !text-3xl text-center mt-2 ">
          {title}
        </Subtitle>
        <Subtitle styleClass="!text-3xl text-center pb-4">
          <p className="font-bold text-2xl">
            Candidate No. {competitionResult[0]?.candidate_number}{" "}
            {competitionResult[0]?.full_name}
          </p>
          <h1 className="text-xl -mt-1">Competition Winner</h1>
        </Subtitle>
      </div>
      {competitionResult.length > 0 ? (
        <table className="table table-compact w-full">
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
    </section>
  );
}

import Subtitle from "../../../../components/Typography/Subtitle";

export default function FinalistTableData({
  competitionResult,
  title,
  componentToPrintRef,
}) {
  const centerLabelClass = "text-center";
  const winnersClass = "font-bold !text-4xl text-center pb-2";

  const tableData = competitionResult.slice(0, 8).map((result, index) => (
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
      <div
        ref={componentToPrintRef}
        className="w-full rounded-2xl overflow-x-auto"
      >
        <Subtitle styleClass="text-primary font-bold !text-6xl text-center py-4">
          Event Winners
        </Subtitle>

        {/* Top 1 */}
        <Subtitle styleClass={winnersClass}>
          TOP 1 : Candidate No. {competitionResult[0]?.candidate_number || ""} -{" "}
          {competitionResult[0]?.full_name.toUpperCase() || ""}
        </Subtitle>

        {/* Top 2 */}
        <Subtitle styleClass={winnersClass}>
          TOP 2 : Candidate No. {competitionResult[1]?.candidate_number || ""} -{" "}
          {competitionResult[1]?.full_name.toUpperCase() || ""}
        </Subtitle>

        {/* Top 3 */}
        <Subtitle styleClass={winnersClass}>
          TOP 3 : Candidate No. {competitionResult[2]?.candidate_number || ""} -{" "}
          {competitionResult[2]?.full_name.toUpperCase() || ""}
        </Subtitle>

        {/* Top 4 */}
        <Subtitle styleClass={winnersClass}>
          TOP 4 : Candidate No. {competitionResult[3]?.candidate_number || ""} -{" "}
          {competitionResult[3]?.full_name.toUpperCase() || ""}
        </Subtitle>

        {/* Top 5 */}
        <Subtitle styleClass={winnersClass}>
          TOP 5 : Candidate No. {competitionResult[4]?.candidate_number || ""} -{" "}
          {competitionResult[4]?.full_name.toUpperCase() || ""}
        </Subtitle>
      </div>

      {/* Top 10 Finalist */}
      <div className="w-full rounded-2xl overflow-x-auto">
        <Subtitle styleClass="text-primary !text-3xl text-center py-4">
          {title}
        </Subtitle>
        {competitionResult[0]?.rank ? (
          <>
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
            {/* TODO List of all judges here */}
          </>
        ) : (
          <h1>No Finalist to be dispalyed, Did the finalist already added? </h1>
        )}
      </div>
    </>
  );
}

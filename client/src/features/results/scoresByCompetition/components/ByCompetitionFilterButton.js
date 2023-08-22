import { memo } from "react";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import { SUBMENU } from "../../../../routes/sidebar";

const ByCompetitionFilterButton = ({ setCompetition, competitionNumber }) => {
  function onSetCompetition(compNumber, compTitle, isFinalist) {
    setCompetition({
      number: parseInt(compNumber),
      title: compTitle,
      isFinalist,
    });
  }

  const competitionList = (
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-full"
    >
      {SUBMENU.map(
        ({ competition_name, competition_number, is_finalist }, index) => {
          return (
            <li key={index}>
              <a
                className="py-2"
                onClick={() =>
                  onSetCompetition(
                    competition_number,
                    competition_name,
                    is_finalist
                  )
                }
              >
                {competition_number} - {competition_name}
              </a>
            </li>
          );
        }
      )}
    </ul>
  );

  return (
    <section className="inline-block float-right">
      <div className="dropdown dropdown-bottom dropdown-end mr-4">
        <label tabIndex={0} className="btn normal-case btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Competition No. {competitionNumber}
        </label>
        {competitionList}
      </div>
    </section>
  );
};

export default memo(ByCompetitionFilterButton);

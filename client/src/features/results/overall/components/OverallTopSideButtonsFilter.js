import { memo, useState } from "react";
import { usersStore } from "../../../../app/store";
// import { useQuery } from "react-query";
// import { getCompetitions } from "../../../../api/competitionsApi";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import { SUBMENU } from "../../../../routes/sidebar";

const OverallTopSideButtonsFilter = ({
  setFilterCompetitionNumber,
  setFilterJudgeNumber,
  judgeNumber,
  competitionNumber,
}) => {
  const allUsers = usersStore((state) => state.allUsers);
  const allJudges = allUsers.filter((user) => user.role === "judge" && user);
  // const [competitions, setCompetitions] = useState([]);

  // useQuery("competitions", () => getCompetitions(), {
  //   onSuccess: ({ data }) => {
  //     setCompetitions(data.competitionsData || []);
  //   },
  // });

  const showFiltersAndApply = (judgeNumber, compNumber) => {
    setFilterJudgeNumber(judgeNumber);
    setFilterCompetitionNumber(compNumber);
  };

  const competitionList = (
    <ul
      tabIndex={0}
      className='dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-full'
    >
      {SUBMENU.map(({ competition_name, competition_number }, index) => {
        return (
          <li key={index}>
            <a
              className='py-2'
              onClick={() =>
                showFiltersAndApply(judgeNumber, parseInt(competition_number))
              }
            >
              {competition_number} - {competition_name}
            </a>
          </li>
        );
      })}
    </ul>
  );

  const judgeList = (
    <ul
      tabIndex={0}
      className='dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-full'
    >
      {allJudges.map(({ judge_number, full_name }, index) => {
        return (
          <li key={index}>
            <a
              onClick={() =>
                showFiltersAndApply(parseInt(judge_number), competitionNumber)
              }
            >
              {judge_number} - {full_name}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className='inline-block float-right'>
      <div className='dropdown dropdown-bottom dropdown-end mr-4'>
        <label tabIndex={0} className='btn normal-case btn-sm btn-outline'>
          <FunnelIcon className='w-5 mr-2' />
          Competition No. {competitionNumber}
        </label>
        {competitionList}
      </div>
      <div className='dropdown dropdown-bottom dropdown-end'>
        <label tabIndex={0} className='btn normal-case btn-sm btn-outline'>
          <FunnelIcon className='w-5 mr-2' />
          Scored by Judge No. {judgeNumber}
        </label>
        {judgeList}
      </div>
    </section>
  );
};

export default memo(OverallTopSideButtonsFilter);

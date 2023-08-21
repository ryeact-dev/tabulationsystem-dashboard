import { usersStore } from "../../../app/store";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";

export default function TopSideButtons({ applyFilter, judgeNumber }) {
  const allUsers = usersStore((state) => state.allUsers);
  const allJudges = allUsers.filter((user) => user.user_role === "judge");

  const showFiltersAndApply = (params) => {
    applyFilter(params);
  };

  return (
    <section className='inline-block float-right'>
      <div className='dropdown dropdown-bottom dropdown-end'>
        <label tabIndex={0} className='btn normal-case btn-sm btn-outline'>
          <FunnelIcon className='w-5 mr-2' />
          Scored by Judge No. {judgeNumber || 0}
        </label>
        <ul
          tabIndex={0}
          className='dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-58'
        >
          {allJudges.map(({ judge_number, full_name }, index) => {
            return (
              <li key={index}>
                <a onClick={() => showFiltersAndApply(judge_number)}>
                  {judge_number} - {full_name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

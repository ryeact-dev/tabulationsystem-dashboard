import TitleCard from "../../components/Cards/TitleCard";
import { usersStore } from "../../app/store";

function Judges() {
  const allUsers = usersStore((state) => state.allUsers);
  const allJudges = allUsers.filter(
    (user) => user.user_role === "judge" && user
  );

  const headerClass = "font-semibold text-base";
  const tdClass = "text-lg font-semibold";

  return (
    <TitleCard topMargin='mt-2'>
      <div className='w-full overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th className={headerClass}>Number</th>
              <th className={headerClass}>Full Name</th>
            </tr>
          </thead>
          <tbody>
            {allJudges.map(({ id, judge_number, full_name }) => {
              return (
                <tr key={id}>
                  <td className={tdClass}>{judge_number}</td>
                  <td className={tdClass}>{full_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default Judges;

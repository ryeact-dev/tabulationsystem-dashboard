import { modalStore, usersStore } from "../../../app/store";
import TitleCard from "../../../components/Cards/TitleCard";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TopSideButtons from "../../../components/TopSideButtons";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function Users() {
  const openModal = modalStore((state) => state.openModal);
  const allUsers = usersStore((state) => state.allUsers);

  const deleteJudge = (userId) => {
    openModal({
      title: "Confirmation",
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        message: `Are you sure you want to delete this user?`,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.USERS_DELETE,
        userId,
      },
    });
  };

  const tableHeaderClass = "font-semibold text-center text-base";
  const tdClass = "text-base text-center";

  return (
    <>
       <TitleCard
        title="List of Users"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            btnName="Add New User"
            title="Add New User"
            bodyType={MODAL_BODY_TYPES.USERS_ADD_NEW}
          />
        }
      >
        {/* List of all users */}
        {!allUsers ? (
          <LoadingSpinner />
        ) : (
          <div className='overflow-x-auto'>
            <table className='table table-compact w-full'>
              <thead>
                <tr>
                  <th className={tableHeaderClass}>Username</th>
                  <th className={tableHeaderClass}>Name</th>
                  <th className={tableHeaderClass}>Role</th>
                  <th className={tableHeaderClass}>Judge No.</th>
                  <th className={tableHeaderClass}>Created at</th>
                  <th className={tableHeaderClass}>Delete User</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(
                  ({
                    id,
                    user_name,
                    full_name,
                    user_role,
                    judge_number,
                    date_added,
                  }) => {
                    return (
                      <tr key={id}>
                        <td className={tdClass}>{user_name}</td>
                        <td className={tdClass}>{full_name}</td>
                        <td className={tdClass}>{user_role}</td>
                        <td className={tdClass}>
                          {judge_number ? judge_number : "0"}
                        </td>
                        <td className={tdClass}>{date_added}</td>
                        <td className='flex items-center justify-center'>
                          <button
                            className='btn-ghost btn-square btn'
                            onClick={() => deleteJudge(id)}
                          >
                            <TrashIcon className='w-5' />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </TitleCard>
    </>
  );
}

import { usersStore, modalStore } from "../../app/store";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TopSideButtons from "../../components/TopSideButtons";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TitleCard from "../../components/Cards/TitleCard";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Candidates() {
  const openModal = modalStore((state) => state.openModal);
  const [candidates, currentUser] = usersStore((state) => [
    state.candidates,
    state.currentUser,
  ]);

  const deleteCandidate = (candidateId, candidateNumber) => {
    openModal({
      title: "Confirmation",
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        message: `Are you sure you want to delete this contestant?`,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.CANDIDATES_DELETE,
        candidateInfo: { candidateId, candidateNumber },
      },
    });
  };

  return (
    <TitleCard
      topMargin='mt-2'
      TopSideButtons={
        currentUser.role === "admin" && (
          <TopSideButtons
            btnName='Add New Contestant'
            title='Add New Contestant'
            bodyType={MODAL_BODY_TYPES.CANDIDATES_ADD_NEW}
          />
        )
      }
    >
      {!candidates ? (
        <LoadingSpinner />
      ) : (
        <div className='w-full overflow-x-auto'>
          <table className='table table-compact w-full'>
            <thead>
              <tr>
                <th className='text-base text-center'>No.</th>
                <th className='text-base'>Name</th>
                <th className='text-base'>Course</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(
                ({ id, photo, full_name, course, candidate_number }) => {
                  return (
                    <tr key={id}>
                      <td className='text-lg text-center'>
                        {candidate_number}
                      </td>
                      <td>
                        <div className='flex items-center space-x-3'>
                          <div className='avatar'>
                            <figure className='mask mask-squircle h-12 w-12'>
                              <img
                                className='rounded-2xl object-cover'
                                src={photo}
                                alt='Avatar'
                                loading='lazy'
                              />
                            </figure>
                          </div>
                          <figcaption className='text-lg font-bold'>
                            {full_name}
                          </figcaption>
                        </div>
                      </td>
                      <td className='text-lg'>{course}</td>
                      <td>
                        {currentUser.role === "admin" && (
                          <button
                            className='btn-ghost btn-square btn'
                            onClick={() =>
                              deleteCandidate(id, candidate_number)
                            }
                          >
                            <TrashIcon className='w-5' />
                          </button>
                        )}
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
  );
}

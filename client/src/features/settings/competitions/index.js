import { useQuery } from "react-query";
import { getCompetitions } from "../../../api/competitionsApi";
import { modalStore } from "../../../app/store";
import TitleCard from "../../../components/Cards/TitleCard";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function Competitions() {
  const openModal = modalStore((state) => state.openModal);

  const { isLoading, data: competitions = [] } = useQuery("competitions", () =>
    getCompetitions()
  );

  const openAddNewCompetitionModal = (competitionId) => {
    const title = competitionId ? "Update Competition" : "Add New Competition";

    openModal({
      title,
      bodyType: MODAL_BODY_TYPES.COMPETITION_ADD_NEW,
      extraObject: competitionId,
    });
  };

  const TopSideButtons = () => {
    return (
      <div className="float-right inline-block">
        <button
          className="btn-primary btn-sm btn px-6 normal-case text-white"
          onClick={() => openAddNewCompetitionModal()}
        >
          Add New Competition
        </button>
      </div>
    );
  };

  const deleteCompetition = (userId) => {
    openModal({
      title: "Confirmation",
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        message: `Are you sure you want to delete this competition?`,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.COMPETITION_DELETE,
        userId,
      },
    });
  };

  const tableHeaderClass = "font-semibold text-base";
  const tdClass = "text-lg font-semibold";

  return (
    <TitleCard
      title="List of Competitions"
      topMargin="mt-2"
      TopSideButtons={<TopSideButtons />}
    >
      {/* Leads List in table format loaded from slice after api call */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th className={tableHeaderClass}>Competition Number</th>
                <th className={tableHeaderClass}>Competition Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {competitions.data.map((competition) => {
                return (
                  <tr key={competition.competition_id}>
                    <td className={tdClass}>
                      {competition.competition_number}
                    </td>
                    <td className={tdClass}>{competition.competition_name}</td>

                    <td>
                      <button
                        className="btn-ghost btn-square btn"
                        onClick={() =>
                          openAddNewCompetitionModal(competition.competition_id)
                        }
                      >
                        <Cog6ToothIcon className="w-5 h-5" />
                      </button>
                      <button
                        className="btn-ghost btn-square btn"
                        onClick={() =>
                          deleteCompetition(competition.competition_id)
                        }
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </TitleCard>
  );
}

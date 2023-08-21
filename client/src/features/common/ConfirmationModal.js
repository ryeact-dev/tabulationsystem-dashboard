import { useState } from "react";
import { headerStore } from "../../app/store";
import { useMutation, useQueryClient } from "react-query";
import { deleteUser } from "../../api/usersApi";
import { deleteCompetition } from "../../api/competitionsApi";
import { deleteCandidate } from "../../api/candidatesApi";
import { deleteCandidateScore } from "../../api/scoresheetsApi";
import ConfirmationModalBody from "./ConfirmationModalBody";

export default function ConfirmationModal({ extraObject, closeModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const showNotification = headerStore((state) => state.showNotification);
  const queryClient = useQueryClient();

  // ====  DELETE MUTATIONS ====
  const deleteUserMutation = useMutation(deleteUser, {
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      showNotification({ message: "User successfully removed", status: 1 });
      setIsLoading(false);
      closeModal();
    },
  });

  const deleteCompetitionMutation = useMutation(deleteCompetition, {
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries("competitions");
      showNotification({
        message: "Competition successfully removed",
        status: 1,
      });
      setIsLoading(false);
      closeModal();
    },
  });

  const deleteCandidateMutation = useMutation(deleteCandidate, {
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries("candidates");
      showNotification({
        message: "Constestant successfully removed",
        status: 1,
      });
      setIsLoading(false);
      closeModal();
    },
  });

  const deleteScoreMutation = useMutation(deleteCandidateScore, {
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries("scoresheets");
      showNotification({
        message: `Contestant's scoresheet successfully removed`,
        status: 1,
      });
      setIsLoading(false);
      closeModal();
    },
  });

  return (
    <ConfirmationModalBody
      extraObject={extraObject}
      closeModal={closeModal}
      deleteCandidateMutation={deleteCandidateMutation}
      deleteScoreMutation={deleteScoreMutation}
      deleteUserMutation={deleteUserMutation}
      deleteCompetitionMutation={deleteCompetitionMutation}
      isLoading={isLoading}
    />
  );
}

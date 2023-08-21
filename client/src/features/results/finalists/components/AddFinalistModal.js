import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  finalistCandidate,
  getCandidates,
} from "../../../../api/candidatesApi";
import { headerStore } from "../../../../app/store";

export default function AddFinalistModal() {
  const showNotification = headerStore((state) => state.showNotification);

  const queryClient = useQueryClient();
  const { data: candidates = [] } = useQuery("candidates", getCandidates());

  const finalistCandidateMutation = useMutation(finalistCandidate, {
    onMutate: () =>
      showNotification({ message: `Updating Finalists `, status: 3 }),
    onError: ({ response }) =>
      showNotification({ message: response.data, status: 0 }),
    onSuccess: (_, finalistData) => {
      queryClient.invalidateQueries("candidates");
      if (finalistData.isFinalist) {
        showNotification({
          message: `Candidate No. ${finalistData.candidateNumber} added as finalist `,
          status: 1,
        });
      } else {
        showNotification({
          message: `Candidate No. ${finalistData.candidateNumber} remove as finalist `,
          status: 1,
        });
      }
    },
  });

  function onSetFinalist(candidate, isFinalist) {
    const finalistData = {
      candidateNumber: candidate.candidate_number,
      candidateId: candidate.id,
      isFinalist,
    };
    finalistCandidateMutation.mutate(finalistData);
  }

  const centerLabelClass = "text-center";

  const tableData = candidates?.candidatesData?.map((candidate, index) => (
    <tr key={index}>
      <td className={centerLabelClass}>{candidate.candidate_number}</td>
      <td>{candidate.full_name}</td>
      <td>
        <input
          type='checkbox'
          defaultChecked={candidate.is_finalist}
          disabled={finalistCandidateMutation.isLoading}
          onChange={() => onSetFinalist(candidate, !candidate.is_finalist)}
          className='checkbox'
        />
      </td>
    </tr>
  ));

  return (
    <div className='w-full rounded-2xl overflow-x-auto'>
      {candidates?.candidatesData?.length > 0 ? (
        <table className='table table-zebra w-full'>
          <thead>
            <tr>
              <th className={centerLabelClass}>Candidate No.</th>
              <th>Name</th>
              <th>Finalist</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      ) : (
        <h1>No Data to be dispalyed</h1>
      )}
    </div>
  );
}

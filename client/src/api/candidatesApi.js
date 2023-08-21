import axios from "axios";

// ==== GET CANDIDATES ====
export async function getCandidates() {
  const response = await axios.get("/api/candidates");
  return response.data;
}

// ==== ADD CANDIDATES ====
export async function addCandidate(candidateObj) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Delay of 500 milliseconds
  return await axios.post("/api/register-candidate", candidateObj);
}

// ==== UPDATE A CANDIDATE FOR FINAL ====
export async function finalistCandidate(finalistData) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Delay of 500 milliseconds
  return await axios.patch("/api/candidates", finalistData);
}

// ==== DELETE CANDIDATE ====
export async function deleteCandidate({ candidateId }) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Delay of 500 milliseconds
  return await axios.delete(`/api/candidates/${candidateId}`);
}

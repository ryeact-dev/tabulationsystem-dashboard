import axios from "axios";

// ==== GET SCORESHEETS ====
export async function getScoresheets() {
  return await axios.get("/api/scoresheets");
}

// ==== GET SCORESHEETS WITH PARAMS ====
export async function getScoresheetsWithParams({
  competitionNumber,
  candidateNumber,
  judgeNumber,
  isFinalist,
}) {
  return await axios.get(
    `/api/scoresheets?comp_number=${competitionNumber}&cand_number=${candidateNumber}&judge_number=${judgeNumber}&finalist=${isFinalist}`
  );
}

// ==== ADD CANDIDATE TO SCORESHEET =====
export async function candidateScore({ scoreData, typeOfScore }) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Delay of 500 milliseconds
  if (typeOfScore === "new") {
    return await axios.post("/api/scoresheets", scoreData);
  }
  if (typeOfScore === "update") {
    const scoresheetId = scoreData.scoresheet_id;
    return await axios.put(`/api/scoresheets/${scoresheetId}`, scoreData);
  }
}

// ==== DELETE SCORES =====
export async function deleteCandidateScore({ candidateNumber }) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Delay of 500 milliseconds
  return await axios.delete(`/api/scoresheets/${candidateNumber}`);
}

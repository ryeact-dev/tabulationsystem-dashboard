import axios from "axios";

// ==== GET COMPETITIONS ====
export async function getCompetitions() {
  return await axios.get("/api/competitions");
}

// ==== GET A COMPETITION ====
export async function getSpecificCompetition({ competitionId }) {
  return await axios.get(`/api/specific-competition/${competitionId}`);
}

// ==== ADD A COMPETITION ====
export async function competitionApi({ competitionObj, typeOfCompetition }) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Delay of 500 milliseconds
  if (typeOfCompetition === "new") {
    return await axios.post("/api/competitions", competitionObj);
  }
  if (typeOfCompetition === "update") {
    return await axios.put("/api/competitions", competitionObj);
  }
}

// ==== DELETE A COMPETITION ====
export async function deleteCompetition({ competitionId }) {
  return await axios.delete(`/api/competitions/${competitionId}`);
}

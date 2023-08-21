import axios from "axios";

async function fetchCompetitions() {
  const response = await axios.get("/api/competitions");
  return response.data;
}

export async function generateSubmenu() {
  const response = await fetchCompetitions();
  return response.map((item) => ({
    ...item,
    path: `/app/competitions/${item.competition_id}`,
    name: item.competition_name,
  }));
}

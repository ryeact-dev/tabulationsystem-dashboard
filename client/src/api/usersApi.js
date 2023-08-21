import axios from "axios";

const authToken = localStorage.getItem("token");

// ==== GET ALL USERS ====
export async function getUsers() {
  return await axios.get("/api/users");
}

// ==== GET CURRENT USER ====
export async function getCurrentUser() {
  if (authToken) {
    const response = await axios.get("/api/users/current");
    return response.data;
  }
  return;
}

// ==== LOGIN USER ====
export async function loginUser(loginObj) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Delay of 500 milliseconds
  return await axios.post("/api/users/login", loginObj);
}

// ==== ADD NEW USER ====
export async function addNewUser(userData) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Delay of 500 milliseconds
  return await axios.post("/api/register-user", userData);
}

// === DELETE A USER ====
export async function deleteUser(userId) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Delay of 500 milliseconds
  return await axios.delete(`/api/users/${userId}`);
}

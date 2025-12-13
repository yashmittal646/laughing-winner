import API from "./api";

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
  mode: string;
}) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

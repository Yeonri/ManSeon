import axios from "axios";

export const fetchUserById = async (id: number) => {
  const response = await axios.get("/users/other", {
    params: { userId: id },
  });
  return response.data;
};

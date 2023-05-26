import axios from "axios";
import headerGen from "../utils/headerGen";

const url = `${process.env.REACT_APP_API_URL}/user`;

function followUser(token, username) {
  return axios.post(`${url}/follow/${username}`, {}, headerGen(token));
}

const apiUsers = { followUser };
export default apiUsers;

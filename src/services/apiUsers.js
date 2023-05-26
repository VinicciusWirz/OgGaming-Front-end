import axios from "axios";
import headerGen from "../utils/headerGen";

const url = `${process.env.REACT_APP_API_URL}/user`;

function followUser(token, username) {
  return axios.post(`${url}/follow/${username}`, {}, headerGen(token));
}

function findFollowers(token) {
  return axios.get(`${url}/followers`, headerGen(token));
}

function findFollowing(token) {
  return axios.get(`${url}/following`, headerGen(token));
}

const apiUsers = { followUser, findFollowers, findFollowing };
export default apiUsers;

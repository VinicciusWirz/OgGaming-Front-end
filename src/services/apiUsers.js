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

function findQuery(token, name) {
  return axios.get(`${url}/search/${name}`, headerGen(token));
}

function editUserPfp(token, body) {
  return axios.put(`${url}/me/pfp`, body, headerGen(token));
}

function editUserInfo(token, body) {
  return axios.put(`${url}/me`, body, headerGen(token));
}


const apiUsers = {
  followUser,
  findFollowers,
  findFollowing,
  findQuery,
  editUserPfp,
  editUserInfo,
};
export default apiUsers;

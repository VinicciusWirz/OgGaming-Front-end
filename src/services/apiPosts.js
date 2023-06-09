import axios from "axios";
import headerGen from "../utils/headerGen";

const url = `${process.env.REACT_APP_API_URL}/posts`;

function getSelfPosts(token) {
  return axios.get(`${url}/me`, headerGen(token));
}

function createPost(body, token) {
  return axios.post(`${url}/new`, body, headerGen(token));
}

function likePost(token, id) {
  return axios.post(`${url}/like/${id}`, {}, headerGen(token));
}

function getUserPosts(username, token) {
  return axios.get(`${url}/user/${username}`, headerGen(token));
}

function deletePost(token, id) {
  return axios.delete(`${url}/delete/${id}`, headerGen(token));
}

const apiPosts = {
  getSelfPosts,
  createPost,
  likePost,
  getUserPosts,
  deletePost,
};
export default apiPosts;

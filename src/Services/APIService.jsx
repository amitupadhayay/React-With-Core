import axios from "axios";

class APIConfiguration {

  headers = {
    "Content-type": "application/json",
    'Accept': 'application/json',
    //'charset': 'utf-8',
  }

  mainURL = "https://localhost:44312/api/"
  // mainURL = "https://localhost:44319/api/"
  //djangoURL = 'http://127.0.0.1:8000/'

  // get = async (ctrl, methodName) => {
  //   return await axios.get(this.mainURL + ctrl + methodName, this.headers);
  // }

  // post = async (ctrl, methodName, params) => {
  //   return await axios.post(this.mainURL + ctrl + methodName, params, this.headers);
  // }

  // get = async (methodName, ctrl = null) => {
  //   return await axios.get(this.mainURL + methodName, this.headers);
  // }

  // post = async (ctrl, methodName, params) => {
  //   return await axios.post(this.mainURL + methodName, params, this.headers);
  // }

  // getData(ctrl, methodName) {
  //   return axios.get(this.mainURL + ctrl + methodName, this.headers);
  // }



  // delete(ctrl, methodName) {
  //   return axios.delete(this.mainURL + ctrl + methodName);
  // }

  // djangoGet = async (methodName) => {
  //   return await axios.get(this.djangoURL + methodName, this.headers);
  // }

  // djangoPost = async (methodName, params) => {
  //   return await axios.post(this.djangoURL + methodName, params, this.headers);
  // }

  // getAll() {
  //   return http.get("/tutorials");
  // }

  // get(id) {
  //   return http.get(`/tutorials/${id}`);
  // }

  // create(data) {
  //   return http.post("/tutorials", data);
  // }

  // update(id, data) {
  //   return http.put(`/tutorials/${id}`, data);
  // }

  // delete(id) {
  //   return http.delete(`/tutorials/${id}`);
  // }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }

  //====================== UseQuery Methods==================

  get = async (methodName) => {
    const response = await axios.get(this.mainURL + methodName, this.headers);
    return response?.data;
  };

  get = async (methodName) => {
    const response = await axios.get(this.mainURL + methodName, this.headers);
    return response?.data;
  };

  // export const getPostFn = async (id) => {
  //   const response = await authApi.get < IPostResponse > (`posts/${id}`);
  //   return response.data;
  // };

  post = async (methodName, params) => {
    const response = await axios.post(this.mainURL + methodName, params, this.headers);
    return response?.data;
  }

  delete(ctrl, methodName) {
    const response = axios.delete(this.mainURL + ctrl + methodName);
    return response?.data;
  };


}

export default new APIConfiguration();


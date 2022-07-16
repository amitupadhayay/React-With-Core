import axios from "axios";

class APIConfiguration {

  headers = {
    "Content-type": "application/json",
    'Accept': 'application/json',
  }

  mainURL = `https://localhost:44319/api/`;
  //djangoURL = 'http://127.0.0.1:8000/'

  get = async (ctrl, methodName) => {
    return await axios.get(this.mainURL + ctrl + methodName, this.headers);
  }

  getData(ctrl, methodName) {
    return axios.get(this.mainURL + ctrl + methodName, this.headers);
  }

  post = async (ctrl, methodName, params) => {
    return await axios.post(this.mainURL + ctrl + methodName, params, this.headers);
  }

  delete(ctrl, methodName) {
    return axios.delete(this.mainURL + ctrl + methodName);
  }

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


}

export default new APIConfiguration();


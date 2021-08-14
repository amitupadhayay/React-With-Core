import axios from "axios";
//import http from "../http-common";

// function APIService() {

//   const headers = {
//     "Content-type": "application/json",
//     'Accept': 'application/json',
//   }
//   const URL = `https://localhost:44319/api/`;

//   export const getList = (methodName, payload) => {
//     return axios(URL + "Employee/" + methodName, {
//       method: 'POST/GET',
//       headers: headers,
//       data: payload,
//     })
//       .then(response => response.data)
//       .catch(error => {
//         throw error;
//       });
//   };

// }
// export default APIService;


class APIConfiguration {

  headers = {
    "Content-type": "application/json",
    'Accept': 'application/json',
  }
  mainURL = `https://localhost:44319/api/`;



  constructor() { }


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

  get(methodName, ctrl) {
    //return this.http.get<any>(mainURL + methodName, headers);
    return axios.get(this.mainURL + ctrl + methodName, this.headers);
  }

  post(methodName, ctrl, params) {
    return axios.post(this.mainURL + ctrl + methodName, params, this.headers);
  }

  delete(methodName, ctrl) {
    return axios.delete(this.mainURL + ctrl + methodName);
  }


}

export default new APIConfiguration();


import axios from "axios";

export default axios.create({
  baseURL: `https://localhost:44319/api/`,
  //baseURL: 'https://fakestoreapi.com/',

  // headers: {
  //   "Content-type": "application/json",
  //   'Accept': 'application/json',
  // }

  //   timeout: 1000,
  //   headers: {
  //     'Accept': 'application/vnd.GitHub.v3+json',
  //     'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  //   }
});

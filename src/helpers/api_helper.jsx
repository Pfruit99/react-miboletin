  import axios from "axios"
  import accessToken from "./jwt-token-access/accessToken"

  //pass new generated access token here
  const token = accessToken

  //apply base url for axios
  const API_URL = ""

  // axiosApi.defaults.headers.common["Authorization"] = token

  // axiosApi.interceptors.response.use(
  //   response => response,
  //   error => Promise.reject(error)
  // )

  export async function get(url, config = {}) {
    return await axios.get(url, { ...config }).then(response => response.data)
  }

  export async function post(url, data, config = {}, files) {
    return axios
      .post(url, { ...data }, { ...config })
      .then(response => response.data)
  }

  export async function postFormData(url, data){
    const config = {
      method:'post',
      url: url,
      data
    }
    return axios(config);
  }

  export async function put(url, data, config = {}) {
    return axios
      .put(url, { ...data }, { ...config })
      .then(response => response.data)
  }

  export async function del(url, config = {}) {
    return await axios
      .delete(url, { ...config })
      .then(response => response.data)
  }

export default function setupAxios(axios, store) {
    const onRequest = (config) => {
      const conf = config;
      const {
        Login: { user },
      } = store.getState();
      conf.headers.Authorization = `Bearer ${user.token}`;
      return conf;
    };

    const onResponse = async (response) => {
      return response;
    };
    const onErrorRequest = (error) => Promise.reject(error);

    const onErrorResponse = async (error) => {
      return Promise.reject(error);
    };
    /* eslint-disable no-param-reassign */
    axios.defaults.headers.Accept = 'application/json';
    axios.interceptors.request.use(onRequest, onErrorRequest);
    axios.interceptors.response.use(onResponse, onErrorResponse);
}

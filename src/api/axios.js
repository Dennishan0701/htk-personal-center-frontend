import store from '../store';

// console.log(store);
const axios = require('axios');

axios.defaults.headers = {
  Accept: 'application/json',
};

axios.interceptors.request.use((config) => {
  const { accessToken } = store.state;
  if (accessToken) {
  // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const func = value => axios(value);
func.get = (url, object = {}, config = {}) => axios.get(url, object, config);
func.post = (url, object = {}, config = {}) => axios.post(url, object, config);

export default func;

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apis = axios.create({
  baseURL: BASE_URL,
});

// apis.defaults.headers.common['Authorization'] = AUTH_TOKEN;

class api {
  DefaultType = {
    headers: { 'Content-Type': 'application/json' },
  };

  FormType = {
    headers: { 'Content-type': 'multipart/form-data' },
  };

  AuthType(token) {
    return {
      headers: {
        ...this.DefaultType.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  /**
   * @param url : 서버 api url
   * @param {params, headers}: 전달할 데이터, 헤더 정보
   **/
  async get(url, { params = {}, headers = this.DefaultType }) {
    return await apis.get(`${url}`, { params, headers });
  }
  /**
   * @param url : 서버 api url
   * @param {params, headers}: 전달할 데이터, 헤더 정보
   **/
  async post(url, { params = {}, headers = this.DefaultType }) {
    return await apis.post(`${url}`, { params, headers });
  }
  /**
   * @param url : 서버 api url
   *  @param {params, headers}: 전달할 데이터, 헤더 정보
   **/
  async put(url, { params = {}, headers = this.DefaultType }) {
    return await apis.put(`${url}`, { params, headers });
  }
  /**
   * @param url : 서버 api url
   *  @param {params, headers}: 전달할 데이터, 헤더 정보
   **/
  async delete(url, { params = {}, headers = this.DefaultType }) {
    return await apis.delete(`${url}`, { params, headers });
  }
}
const client = new api();

export default client;

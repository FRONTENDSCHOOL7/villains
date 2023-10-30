import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apis = axios.create({
  baseURL: BASE_URL,
});

class api {
  params(data, headers = this.DefaultType) {
    return {
      headers: headers,
      ...data,
    };
  }

  DefaultType = {
    'Content-Type': 'application/json',
  };

  FormType = {
    'Content-type': 'multipart/form-data',
  };

  AuthType(token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  BothType(token) {
    return {
      ...this.DefaultType,
      ...this.AuthType(token),
    };
  }

  /**
   * @param url : 서버 api url
   * @param {data, headers}: 전달할 데이터, 헤더 정보
   **/
  async get(url, data, headers) {
    return await apis.get(`${url}`, this.params(data, headers));
  }

  async post(url, data, headers) {
    return await apis.post(`${url}`, data, { headers: headers });
  }

  async put(url, data, headers) {
    return await apis.put(`${url}`, data, { headers: headers });
  }

  async delete(url, data, headers) {
    return await apis.delete(`${url}`, this.params(data, headers));
  }
}
const client = new api();

export default client;

import axios from 'axios';
import config from '../config';
const getApi = (api, contentType = 'application/json') => {
  return axios({
    method: 'get',
    url: `${config.BASE_API_URL}/${api}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    validateStatus: () => {
      return true;
    }
  })
    .then(response => {
      return response;
    })
    .catch(function catchError(error) {
      return error;
    });
};

const postApi = (api, postData, contentType = 'application/json') => {
  return axios({
    method: 'post',
    url: `${config.BASE_API_URL}/${api}`,
    data: postData,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    validateStatus: () => {
      return true;
    }
  })
    .then(response => {
      return response;
    })
    .catch(function catchError(error) {
      return error;
    });
};

const putApi = (api, postData, getData = {}, contentType = 'application/json') => {
  return axios({
    method: 'put',
    url: `${config.BASE_API_URL}/${api}`,
    data: postData,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    validateStatus: () => {
      return true;
    }
  })
    .then(response => {
      return response;
    })
    .catch(function catchError(error) {
      return error;
    });
};

const deleteApi = (api, contentType = 'application/json') => {
  return axios({
    method: 'delete',
    url: `${config.BASE_API_URL}/${api}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    validateStatus: () => {
      return true;
    }
  })
    .then(response => {
      return response;
    })
    .catch(function catchError(error) {
      return error;
    });
};

export default {
  getApi,
  postApi,
  putApi,
  deleteApi
};

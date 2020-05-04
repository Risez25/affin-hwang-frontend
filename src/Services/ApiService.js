import axios from 'axios';

const getApi = (url, api, token, getData = {}, contentType = 'application/json') => {
  let urlParams = '';
  Object.entries(getData).forEach(entry => {
    const key = entry[0];
    const value = entry[1];
    if (Array.isArray(value)) {
      value.forEach(a => {
        if (urlParams.length === 0) {
          urlParams = '?';
        } else {
          urlParams += '&';
        }
        urlParams = `${urlParams + key}[]=${a}`;
      });
    } else {
      if (urlParams.length === 0) {
        urlParams = '?';
      } else {
        urlParams += '&';
      }
      urlParams = `${urlParams + key}=${value}`;
    }
  });

  let status = 0;
  let newToken = null;
  let isSuccess = false;
  let isTokenExpired = false;
  let isPasswordExpired = false;
  let respData = null;

  if (token === null || token === '') {
    return {
      status,
      newToken,
      isSuccess,
      isTokenExpired: true,
      isPasswordExpired,
      data: respData,
      message: 'Session expired'
    };
  }

  return axios({
    method: 'get',
    url: `${url}/${api}${urlParams}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Sec-Fetch-Site': 'cross-site',
      Authorization: `Bearer ${token}`
    },
    validateStatus: () => {
      return true;
    }
  })
    .then(response => {
      status = response.status;

      // parsing the luuwu api response
      // read the new generated token from header
      if (typeof response.headers.authorization !== 'undefined') {
        newToken = response.headers.authorization;
      }

      if (response.data.isSuccess === true) {
        isSuccess = true;
      }
      const { message } = response.data;

      // if token already expired
      if (typeof response.data.data !== 'undefined') {
        if (response.data.data.token === false) {
          isTokenExpired = true;
        } else if (response.data.data.token === -35) {
          isPasswordExpired = true;
        }
        respData = response.data.data;
      }

      return {
        status,
        newToken,
        isSuccess,
        isTokenExpired,
        isPasswordExpired,
        data: respData,
        message
      };
    })
    .catch(function catchError(error) {
      let message = '';
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        respData = error.response.data;
        // console.log(error.response.status);
        status = error.response.status;
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
      }
      message = error.message;
      return {
        status,
        newToken: null,
        isSuccess: false,
        isTokenExpired: false,
        isPasswordExpired: false,
        data: respData,
        message
      };
    });
};

const postApi = (url, api, token, postData, contentType = 'application/json') => {
  return axios({
    method: 'post',
    url: `${url}/${api}`,
    data: postData,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
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

const putApi = (url, api, token, postData, getData = {}, contentType = 'application/json') => {
  let urlParams = '';
  Object.entries(getData).forEach(entry => {
    const key = entry[0];
    const value = entry[1];
    if (Array.isArray(value)) {
      value.forEach(a => {
        if (urlParams.length === 0) {
          urlParams = '?';
        } else {
          urlParams += '&';
        }
        urlParams = `${urlParams + key}[]=${a}`;
      });
    } else {
      if (urlParams.length === 0) {
        urlParams = '?';
      } else {
        urlParams += '&';
      }
      urlParams = `${urlParams + key}=${value}`;
    }
  });

  let status = 0;
  let newToken = null;
  let isSuccess = false;
  let isTokenExpired = false;
  let isPasswordExpired = false;
  let respData = null;

  if (token === null || token === '') {
    return {
      status,
      newToken,
      isSuccess,
      isTokenExpired: true,
      isPasswordExpired,
      data: respData,
      message: 'Session expired'
    };
  }

  return axios({
    method: 'put',
    url: `${url}/${api}${urlParams}`,
    data: postData,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    },
    validateStatus: () => {
      return true;
    }
  })
    .then(response => {
      status = response.status;

      // parsing the luuwu api response
      // read the new generated token from header
      if (typeof response.headers.authorization !== 'undefined') {
        newToken = response.headers.authorization;
      }

      if (response.data.success === true) {
        isSuccess = true;
      }
      const { message } = response.data;

      // if token already expired
      if (typeof response.data.data !== 'undefined') {
        if (response.data.data.token === false) {
          isTokenExpired = true;
        } else if (response.data.data.token === -35) {
          isPasswordExpired = true;
        }
        respData = response.data.data;
      }

      return {
        status,
        newToken,
        isSuccess,
        isTokenExpired,
        isPasswordExpired,
        data: respData,
        message
      };
    })
    .catch(function catchError(error) {
      let message = '';
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        respData = error.response.data;
        // console.log(error.response.status);
        status = error.response.status;
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
      }
      message = error.message;
      return {
        status,
        newToken: null,
        isSuccess: false,
        isTokenExpired: false,
        isPasswordExpired: false,
        data: respData,
        message
      };
    });
};

const deleteApi = (url, api, token, postData, getData = {}, contentType = 'application/json') => {
  let urlParams = '';
  Object.entries(getData).forEach(entry => {
    const key = entry[0];
    const value = entry[1];
    if (Array.isArray(value)) {
      value.forEach(a => {
        if (urlParams.length === 0) {
          urlParams = '?';
        } else {
          urlParams += '&';
        }
        urlParams = `${urlParams + key}[]=${a}`;
      });
    } else {
      if (urlParams.length === 0) {
        urlParams = '?';
      } else {
        urlParams += '&';
      }
      urlParams = `${urlParams + key}=${value}`;
    }
  });

  let status = 0;
  let newToken = null;
  let isSuccess = false;
  let isTokenExpired = false;
  let isPasswordExpired = false;
  let respData = null;

  if (token === null || token === '') {
    return {
      status,
      newToken,
      isSuccess,
      isTokenExpired: true,
      isPasswordExpired,
      data: respData,
      message: 'Session expired'
    };
  }

  return axios({
    method: 'delete',
    url: `${url}/${api}${urlParams}`,
    data: postData,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    },
    validateStatus: () => {
      return true;
    }
  })
    .then(response => {
      status = response.status;

      // parsing the luuwu api response
      // read the new generated token from header
      if (typeof response.headers.authorization !== 'undefined') {
        newToken = response.headers.authorization;
      }

      if (response.data.success === true) {
        isSuccess = true;
      }
      const { message } = response.data;

      // if token already expired
      if (typeof response.data.data !== 'undefined') {
        if (response.data.data.token === false) {
          isTokenExpired = true;
        } else if (response.data.data.token === -35) {
          isPasswordExpired = true;
        }
        respData = response.data.data;
      }

      return {
        status,
        newToken,
        isSuccess,
        isTokenExpired,
        isPasswordExpired,
        data: respData,
        message
      };
    })
    .catch(function catchError(error) {
      let message = '';
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        respData = error.response.data;
        // console.log(error.response.status);
        status = error.response.status;
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
      }
      message = error.message;
      return {
        status,
        newToken: null,
        isSuccess: false,
        isTokenExpired: false,
        isPasswordExpired: false,
        data: respData,
        message
      };
    });
};

const downloadGetApi = (
  url,
  api,
  token,
  getData = {},
  contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
) => {
  let urlParams = '';
  Object.entries(getData).forEach(entry => {
    const key = entry[0];
    const value = entry[1];
    if (Array.isArray(value)) {
      value.forEach(a => {
        if (urlParams.length === 0) {
          urlParams = '?';
        } else {
          urlParams += '&';
        }
        urlParams = `${urlParams + key}[]=${a}`;
      });
    } else {
      if (urlParams.length === 0) {
        urlParams = '?';
      } else {
        urlParams += '&';
      }
      urlParams = `${urlParams + key}=${value}`;
    }
  });

  let status = 0;
  let newToken = null;
  let isSuccess = false;
  const isTokenExpired = false;
  const isPasswordExpired = false;
  let respData = null;

  if (token === null || token === '') {
    return {
      status,
      newToken,
      isSuccess,
      isTokenExpired: true,
      isPasswordExpired,
      data: respData,
      message: 'Session expired'
    };
  }

  return axios({
    method: 'get',
    url: `${url}/${api}${urlParams}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    },
    responseType: 'blob',
    validateStatus: () => {
      return true;
    }
  })
    .then(response => {
      status = response.status;

      // parsing the luuwu api response
      // read the new generated token from header
      if (typeof response.headers.authorization !== 'undefined') {
        newToken = response.headers.authorization;
      }

      if (status === 200) {
        isSuccess = true;
      }

      return {
        status,
        newToken,
        isSuccess,
        isTokenExpired,
        isPasswordExpired,
        data: response.data,
        message: ''
      };
    })
    .catch(function catchError(error) {
      let message = '';
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        respData = error.response.data;
        // console.log(error.response.status);
        status = error.response.status;
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
      }
      message = error.message;
      return {
        status,
        newToken: null,
        isSuccess: false,
        isTokenExpired: false,
        isPasswordExpired: false,
        data: respData,
        message
      };
    });
};

const downloadPostApi = (
  url,
  api,
  token,
  postData,
  getData = {},
  contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
) => {
  let urlParams = '';
  Object.entries(getData).forEach(entry => {
    const key = entry[0];
    const value = entry[1];
    if (Array.isArray(value)) {
      value.forEach(a => {
        if (urlParams.length === 0) {
          urlParams = '?';
        } else {
          urlParams += '&';
        }
        urlParams = `${urlParams + key}[]=${a}`;
      });
    } else {
      if (urlParams.length === 0) {
        urlParams = '?';
      } else {
        urlParams += '&';
      }
      urlParams = `${urlParams + key}=${value}`;
    }
  });

  let status = 0;
  let newToken = null;
  let isSuccess = false;
  const isTokenExpired = false;
  const isPasswordExpired = false;
  let respData = null;

  if (token === null || token === '') {
    return {
      status,
      newToken,
      isSuccess,
      isTokenExpired: true,
      isPasswordExpired,
      data: respData,
      message: 'Session expired'
    };
  }

  return axios({
    method: 'post',
    url: `${url}/${api}${urlParams}`,
    data: postData,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    },
    responseType: 'blob',
    validateStatus: () => {
      return true;
    }
  })
    .then(response => {
      status = response.status;

      // parsing the luuwu api response
      // read the new generated token from header
      if (typeof response.headers.authorization !== 'undefined') {
        newToken = response.headers.authorization;
      }

      if (status === 200) {
        isSuccess = true;
      }

      return {
        status,
        newToken,
        isSuccess,
        isTokenExpired,
        isPasswordExpired,
        data: response.data,
        message: ''
      };
    })
    .catch(function catchError(error) {
      let message = '';
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        respData = error.response.data;
        // console.log(error.response.status);
        status = error.response.status;
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
      }
      message = error.message;
      return {
        status,
        newToken: null,
        isSuccess: false,
        isTokenExpired: false,
        isPasswordExpired: false,
        data: respData,
        message
      };
    });
};

export default {
  getApi,
  postApi,
  putApi,
  deleteApi,
  downloadGetApi,
  downloadPostApi
};

import axios, { AxiosRequestConfig } from 'axios';
interface Ajax {
  [x: string]: any;
}
const http = axios.create({
  baseURL: process.env.AXIOS_BASE_API || '/',
});
http.interceptors.request.use(
  (request) => {
    request.params = { ...request.params, _: new Date().getTime() };
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => {
    const { data } = response;
    //鉴权失败
    if (data.code === 1) {
      window.location.href = '/login';
    }
    return data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const ajax: Ajax = (config: AxiosRequestConfig) => http(config);

ajax.get = (...args: any[]) => {
  const [url, data, options] = args;
  return http({
    url,
    params: data,
    method: 'get',
    ...options,
  });
};

ajax.post = (...args: any[]) => {
  const [url, data, options] = args;
  return http({
    url,
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'post',
    ...options,
  });
};

ajax.put = (...args: any[]) => {
  const [url, data, options] = args;
  return http({
    url,
    data,
    method: 'put',
    ...options,
  });
};

ajax.delete = (...args: any[]) => {
  const [url, data, options] = args;
  return http({
    url,
    data,
    method: 'delete',
    ...options,
  });
};

ajax.upload = (...args: any[]) => {
  const [url, data, options] = args;
  let formData;
  if (!(data instanceof FormData)) {
    formData = new FormData();
    for (const attr in data) {
      formData.append(attr, data[attr]);
    }
  } else {
    formData = data;
  }
  return http({
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    ...options,
  });
};

export default ajax;

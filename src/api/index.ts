import { ajax } from '@/services';
interface Api {
  method: string;
  url: string;
  [x: string]: any;
}
interface Apis {
  [x: string]: Api;
}
interface InitObj {
  [x: string]: any;
}
interface Params {
  [x: string]: any;
}
const getApisMap = () => {
  const requireFiles = require.context('./resources', false, /\.ts$/);
  return requireFiles
    .keys()
    .reduce((res, item) => ({ ...res, ...requireFiles(item) }), {});
};
const apiMaps: Apis = getApisMap();
const methodsGenerator = (apis: Apis) => {
  const initRes: InitObj = {};
  return Object.keys(apis).reduce((res, item: string) => {
    const { method, url, ...rest } = apis[item];
    if (!method || !url) {
      console.error(`${item}缺少必填参数method或者url`);
    } else {
      res[item] = (params: Params) => ajax[method](url, { ...params, ...rest });
    }
    return res;
  }, initRes);
};

const resources = methodsGenerator(apiMaps);
export default resources;

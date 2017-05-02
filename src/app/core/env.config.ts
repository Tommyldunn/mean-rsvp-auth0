const isDev = () => window.location.hostname.indexOf('localhost') > -1;
const getHost = () => {
  let protocol = window.location.protocol;
  let host = window.location.host;
  return `${protocol}//${host}`;
};
const getApiURI = () => isDev() ? 'http://localhost:3003/api/' : `${getHost()}/api/`;

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: getApiURI()
};

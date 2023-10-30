import axios from 'axios';

const getSubOneInfo = async () => {
  const response = await axios.get(
    `https://openapi.kric.go.kr/openapi/trainUseInfo/subwayRouteInfo?serviceKey=${
      import.meta.env.VITE_TRAIN_KEY
    }&format=json&mreaWideCd=01&lnCd=1`,
  );
  return response;
};

export default getSubOneInfo;

import axios from 'axios';

const getSubOneInfo = async () => {
  const response = await axios.get(
    `http://openAPI.seoul.go.kr:8088/${
      import.meta.env.VITE_SEOUL_KEY
    }/json/SearchInfoBySubwayNameService/1/777/`,
  );
  return response;
};

export default getSubOneInfo;

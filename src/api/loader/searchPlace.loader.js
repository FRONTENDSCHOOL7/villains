// window.kakao 객체를 가져옴
const { kakao } = window;

const place = new kakao.maps.services.Places();

const searchPlace = async (stationname) => {
  const stationPlace = [];
  place.keywordSearch(
    `${stationname}역 1호선`,
    async (result, status) => {
      if (status === 'OK') {
        stationPlace.push(...result);
        return;
      }
    },
    {
      category_group_code: 'SW8',
    },
  );
  return stationPlace;
};

export default searchPlace;

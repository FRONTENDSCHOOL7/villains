// window.kakao 객체를 가져옴
const { kakao } = window;

const place = new kakao.maps.services.Places();

const searchPlace = async (stationname) => {
  const stationPlace = [];
  place.keywordSearch(
    `${stationname}역 1호선`,
    (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        stationPlace.push({
          y: result[0].y,
          x: result[0].x,
        });
        bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));
      }
    },
    {
      category_group_code: 'SW8',
    },
  );
  return stationPlace;
};

export default searchPlace;

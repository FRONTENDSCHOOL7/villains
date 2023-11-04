import axios from 'axios';

/**
 * @param START_INDEX: 페이지네이션 시작 인덱스
 * @param END_INDEX: 페이지네이션 끝 인덱스
 * @param STATION_CD: 지하철역 코드
 * @param WEEK_TAG: 평일: 1, 토요일: 2, 휴일/일요일: 3
 * @param INPUT_TAG: 상행/내선: 1, 하행/외선: 2
 *
 */
const getSubTime = async (START_INDEX, END_INDEX, STATION_CD, WEEK_TAG, INPUT_TAG) => {
  return await axios.get(
    `http://openAPI.seoul.go.kr:8088/${
      import.meta.env.VITE_SEOUL_KEY
    }/json/SearchSTNTimeTableByIDService/${START_INDEX}/${END_INDEX}/${STATION_CD}/${WEEK_TAG}/${INPUT_TAG}/`,
  );
};

export default getSubTime;

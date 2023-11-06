import { useEffect, useState } from 'react';

/**
 *
 * @param {*} query 검색어
 * @param {*} dataList 검색 대상이 되는 데이터
 * @returns 검색 결과
 */
const useSearchData = (query, dataList) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (query === '') setList([]);
    else {
      dataList.map((data, index) => {
        if (data.Query.includes(query) && !list.find((elem) => elem[0].includes(data.Query))) {
          setList([...list, [data.Query, data.Id]]);
        }
      });
    }
  }, [query]);

  return list;
};

export default useSearchData;

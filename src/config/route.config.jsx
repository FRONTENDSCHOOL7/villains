import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../views/Home.view';
/** 라우트 등록하기
 * 1. routeConfig에 객체를 이용해서 path와 element 입력하기
 * 2. pageUrlConfig에 해당 path로 변수만들어서 link 이동 시 사용하기
 *  **/
const routeConfig = [
 { path: ``, element: <HomePage /> },
];
const routers = createBrowserRouter(routeConfig);
export default routers;

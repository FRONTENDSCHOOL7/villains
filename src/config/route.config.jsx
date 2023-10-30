import FeedPage from '../views/feed/Feed.view';
import FeedDetailPage from '../views/feed/FeedDetail.view';
import FeedWritePage from '../views/feed/FeedWrite.view';
import HomePage from '../views/Home.view';
import ResultPage from '../views/Result.view';
import SplashPage from '../views/sign/Splash.view';
import SignInPage from '../views/sign/SignIn.view';
import SignUpPage from '../views/sign/SignUp.view';

/** 라우트 등록하기
 * 1. routeConfig의 children에 객체를 이용해서 path와 element 입력하기
 * 2. pageUrlConfig에 해당 path로 변수만들어서 link 이동 시 사용하기
 *  **/
const routeConfig = [
  { path: `/main`, element: <HomePage /> },
  { path: `/`, element: <SplashPage /> },
  { path: `/signIn`, element: <SignInPage />},
  { path: `/signUp`, element: <SignUpPage />},
  { path: `/feed`, element: <FeedPage /> },
  { path: `/feed/write`, element: <FeedWritePage /> },
  { path: `/feed/detail`, element: <FeedDetailPage /> },
  { path: `/search`, element: <ResultPage /> },
];

export default routeConfig;

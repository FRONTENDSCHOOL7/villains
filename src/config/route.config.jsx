import FeedPage from '../views/Feed.view';
import FeedDetailPage from '../views/FeedDetail.view';
import FeedWritePage from '../views/FeedWrite.view';
import HomePage from '../views/Home.view';
import ResultPage from '../views/Result.view';
import SplashPage from '../views/Splash.view';
import SignInPage from '../views/SignIn.view';
import SignUpPage from '../views/SignUp.view';
import ProfilPage from '../views/Profile.view';
import ProfileEditPage from '../views/ProfileEdit.view';
import GoodsPage from '../views/Goods.view';
import GoodsWritePage from '../views/GoodsWrite.view';
import ChatPage from '../views/Chat.view';

/** 라우트 등록하기
 * 1. routeConfig의 children에 객체를 이용해서 path와 element 입력하기
 * 2. pageUrlConfig에 해당 path로 변수만들어서 link 이동 시 사용하기
 *  **/
const routeConfig = [
  { path: `/`, element: <SplashPage /> },
  { path: `/main`, element: <HomePage /> },
  { path: `/main/:stationId`, element: <ResultPage /> },
  { path: `/signIn`, element: <SignInPage /> },
  { path: `/signUp`, element: <SignUpPage /> },
  { path: `/feed`, element: <FeedPage /> },
  { path: `/feed/write`, element: <FeedWritePage /> },
  { path: `/feed/:id`, element: <FeedDetailPage /> },
  { path: `/goods/write`, element: <GoodsWritePage /> },
  { path: `/user`, element: <ProfilPage /> },
  { path: `/user/edit`, element: <ProfileEditPage /> },
  { path: `/goods`, element: <GoodsPage /> },
  { path: `/chat`, element: <ChatPage /> },
];

export default routeConfig;

import FeedPage from '../views/Feed.view';
import FeedDetailPage from '../views/FeedDetail.view';
import FeedWritePage from '../views/FeedWrite.view';
import HomePage from '../views/Home.view';
import ResultPage from '../views/Result.view';
import SplashPage from '../views/Splash.view';
import SignInPage from '../views/SignIn.view';
import SignUpPage from '../views/SignUp.view';
import ProfilePage from '../views/Profile.view';
import ProfileEditPage from '../views/ProfileEdit.view';
import GoodsPage from '../views/Goods.view';
import GoodsWritePage from '../views/GoodsWrite.view';
import GoodsDetailPage from '../views/GoodsDetail.view';
import ChatPage from '../views/Chat.view';
import DefaultLayout from '../components/layout/DefautlLayout';
import PrivateLayout from '../components/layout/PrivateLayout';
import ErrorPage from '../views/Error.view';
import SearchLayout from '../components/layout/SearchLayout';
import pageUrlConfig from './pageUrlConfig';

/** 라우트 등록하기
 * 1. routeConfig의 children에 객체를 이용해서 path와 element 입력하기
 * 2. pageUrlConfig에 해당 path로 변수만들어서 link 이동 시 사용하기
 *  **/

const baseUrl = import.meta.env.BASE_URL;
console.log(baseUrl);
const routeConfig = [
  { path: `${baseUrl}${pageUrlConfig.splashPage}`, element: <DefaultLayout />, children:[
    { index: true, element: <SplashPage /> },
    { path: `${baseUrl}`+pageUrlConfig.signInPage, element: <SignInPage /> },
    { path: `${baseUrl}`+pageUrlConfig.signUpPage, element: <SignUpPage /> },
  ]},
  { path: `${baseUrl}`, 
    element: <PrivateLayout/>,
    errorElement: <ErrorPage />, 
    children:[
      { path: `${baseUrl}`,    element: <SearchLayout />, children:[
        {path: `${baseUrl}`+ ageUrlConfig.feedPage, element: <FeedPage />},
        { path: `${baseUrl}`+pageUrlConfig.homePage, element: <HomePage />},
        { path: `${baseUrl}`+pageUrlConfig.resultPage, element: <ResultPage /> },
      ] },
      { path: `${baseUrl}`+ pageUrlConfig.feedWritePage, element: <FeedWritePage /> },
      { path: `${baseUrl}`+ pageUrlConfig.feedDetailPage, element: <FeedDetailPage /> },
      { path: `${baseUrl}`+ pageUrlConfig.profilePage, element: <ProfilePage />},
      { path: `${baseUrl}`+ pageUrlConfig.profileEdit, element: <ProfileEditPage /> },
      { path: `${baseUrl}`+ pageUrlConfig.goodsPage, element: <GoodsPage /> },
      { path: `${baseUrl}`+ pageUrlConfig.goodsWritePage, element: <GoodsWritePage /> },
      { path: `${baseUrl}`+ pageUrlConfig.goodsDetailPage, element: <GoodsDetailPage /> },
      { path: `${baseUrl}`+ pageUrlConfig.chatPage, element: <ChatPage /> },
  ]},
];

export default routeConfig;

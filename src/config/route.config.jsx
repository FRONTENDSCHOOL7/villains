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


const routeConfig = [
  { path: `/`,  element: <DefaultLayout />, children:[
    { path: pageUrlConfig.splashPage, element: <SplashPage /> },
    { path: pageUrlConfig.signInPage, element: <SignInPage /> },
    { path: pageUrlConfig.signUpPage, element: <SignUpPage /> },
    {  path: `/`, 
      element: <PrivateLayout/>,
      errorElement: <ErrorPage />, 
      children:[
        { path: `/`,  element: <SearchLayout />, children:[
          { path: pageUrlConfig.feedPage, element: <FeedPage />},
          { path: pageUrlConfig.homePage, element: <HomePage />},
          { path: pageUrlConfig.resultPage, element: <ResultPage /> },
        ] },
        { path: pageUrlConfig.feedWritePage, element: <FeedWritePage /> },
        { path: pageUrlConfig.feedDetailPage, element: <FeedDetailPage /> },
        { path: pageUrlConfig.profilePage, element: <ProfilePage />},
        { path: pageUrlConfig.profileEdit, element: <ProfileEditPage /> },
        { path: pageUrlConfig.goodsPage, element: <GoodsPage /> },
        { path: pageUrlConfig.goodsWritePage, element: <GoodsWritePage /> },
        { path: pageUrlConfig.goodsDetailPage, element: <GoodsDetailPage /> },
        { path: pageUrlConfig.chatPage, element: <ChatPage /> },
    ]},
  ]},
];

export default routeConfig;

import DefaultLayout from '../components/layout/DefautlLayout';
import PrivateLayout from '../components/layout/PrivateLayout';
import pageUrlConfig from './pageUrlConfig';
import sendUserInfo from '../api/loader/sendUserInfo.loader';

import FeedIndexPage from '../views/feed/index.view';
import ProfileIndexPage from '../views/user/index.view';
import GoodsIndexPage from '../views/goods/index.view';
import ChatIndexPage from '../views/chat/index.view';
import AuthIndexPage from '../views/auth/index.view';

import HomeIndexPage from '../views/home/index.view';
import HomePage from '../views/home/Home.view';
import ResultPage from '../views/home/Result.view';
import HomeTrainPage from '../views/home/Train.view';

import ProfilePage from '../views/user/Profile.view';
import ProfileEditPage from '../views/user/ProfileEdit.view';
import ProfileFollowPage from '../views/user/ProfileFollow.view';

import FeedWritePage from '../views/feed/FeedWrite.view';
import FeedDetailPage from '../views/feed/FeedDetail.view';

import GoodsPage from '../views/goods/Goods.view';
import GoodsWritePage from '../views/goods/GoodsWrite.view';
import GoodsDetailPage from '../views/goods/GoodsDetail.view';
import ChatPage from '../views/chat/Chat.view';
import ChatDetailPage from '../views/chat/ChatDetail.view';
import SplashPage from '../views/auth/Splash.view';
import SignInPage from '../views/auth/SignIn.view';
import SignUpPage from '../views/auth/SignUp.view';

/** 라우트 등록하기
 * 1. routeConfig의 children에 객체를 이용해서 path와 element 입력하기
 * 2. pageUrlConfig에 해당 path로 변수만들어서 link 이동 시 사용하기
 *  **/


const baseUrl = import.meta.env.BASE_URL;
const routeConfig = [
  {
    path: baseUrl,
    element: <DefaultLayout />,
    children: [
      {
        path: pageUrlConfig.splashPage,
        element: <AuthIndexPage/>,
        children: [
          { index: true, element: <SplashPage /> },
          { path: pageUrlConfig.signInPage, element: <SignInPage /> },
          { path: pageUrlConfig.signUpPage, element: <SignUpPage />},
        ],
      },
      {
        path: baseUrl,
        loader: async()=>sendUserInfo(),
        id: 'user',
        element: <PrivateLayout />,
        children: [
          {
            path: pageUrlConfig.homePage,
            element: <HomeIndexPage/>,
            children: [
              { index: true, element:<HomePage/>},
              { path: `${pageUrlConfig.homePage}/:id`, element:<ResultPage/> },
              {
                path: `${pageUrlConfig.homePage}/map/:stationname`,
                element: <HomeTrainPage/>
              },
            ],
          },
          {
            path: pageUrlConfig.feedPage,
            element: <FeedIndexPage/>,
            children: [
              { index: true, lazy: () => import(  '../views/feed/Feed.view') },
              { path: pageUrlConfig.feedWritePage, element: <FeedWritePage /> },
              { path: pageUrlConfig.feedEditPage, element: <FeedWritePage /> },
              { path: pageUrlConfig.feedDetailPage, element: <FeedDetailPage /> },
            ],
          },
          {
            path: `${pageUrlConfig.profilePage}`,
            element: <ProfileIndexPage/>,
            children: [
              { path: `${pageUrlConfig.profilePage}/:accountname`, element: <ProfilePage /> },
              { path: `${pageUrlConfig.profilePage}/:accountname/edit`, element: <ProfileEditPage /> },
              { path: `${pageUrlConfig.profilePage}/:accountname/follower`, element: <ProfileFollowPage /> },
              { path: `${pageUrlConfig.profilePage}/:accountname/following`, element: <ProfileFollowPage /> },
            ],
          },

          {
            path: pageUrlConfig.goodsPage,
            element: <GoodsIndexPage/>,
            children: [
              { index: true, element: <GoodsPage /> },
              { path: pageUrlConfig.goodsWritePage, element: <GoodsWritePage /> },
              { path: pageUrlConfig.goodsEditPage, element: <GoodsWritePage /> },
              { path: pageUrlConfig.goodsDetailPage, element: <GoodsDetailPage /> },
            ],
          },
          {
            path: pageUrlConfig.chatPage,
            element: <ChatIndexPage/>,
            children: [
              { index: true, element : <ChatPage /> },
              { path: pageUrlConfig.chatDetailPage, element: <ChatDetailPage /> },
            ],
          },
        ],
      },
    ],
  },
];

export default routeConfig;

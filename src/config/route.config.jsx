import DefaultLayout from '../components/layout/DefautlLayout';
import PrivateLayout from '../components/layout/PrivateLayout';
import pageUrlConfig from './pageUrlConfig';

import AuthIndexPage from '../views/auth/index.view';
import SplashPage from '../views/auth/Splash.view';
import SignInPage from '../views/auth/SignIn.view';
import SignUpPage from '../views/auth/SignUp.view';

import FeedIndexPage from '../views/feed/index.view';
import FeedPage from '../views/feed/Feed.view';
import FeedDetailPage from '../views/feed/FeedDetail.view';
import FeedWritePage from '../views/feed/FeedWrite.view';

import HomeIndexPage from '../views/home/index.view';
import HomePage from '../views/home/Home.view';
import ResultPage from '../views/home/Result.view';
import HomeTrainPage from '../views/home/Train.view';

import ProfileIndexPage from '../views/user/index.view';
import ProfilePage from '../views/user/Profile.view';
import ProfileEditPage from '../views/user/ProfileEdit.view';
import ProfileFollowPage from '../views/user/ProfileFollow.view';

import GoodsIndexPage from '../views/goods/index.view';
import GoodsPage from '../views/goods/Goods.view';
import GoodsWritePage from '../views/goods/GoodsWrite.view';
import GoodsDetailPage from '../views/goods/GoodsDetail.view';

import ChatIndexPage from '../views/chat/index.view';
import ChatPage from '../views/chat/Chat.view';

import searchPlace from '../api/loader/searchPlace.loader';
import sendUserInfo from '../api/loader/sendUserInfo.loader';

/** 라우트 등록하기
 * 1. routeConfig의 children에 객체를 이용해서 path와 element 입력하기
 * 2. pageUrlConfig에 해당 path로 변수만들어서 link 이동 시 사용하기
 *  **/

const routeConfig = [
  {
    path: pageUrlConfig.splashPage,
    element: <DefaultLayout />,
    children: [
      { path: pageUrlConfig.splashPage, element: <AuthIndexPage />, children:[
        { index: true, element: <SplashPage /> },
        { path: pageUrlConfig.signInPage, element: <SignInPage /> },
        { path: pageUrlConfig.signUpPage, element: <SignUpPage /> },
      ]},
      {
        path: `/`,
        id: 'user',
        loader: async()=>await sendUserInfo(),
        element: <PrivateLayout />,
        children: [
          
            { path: pageUrlConfig.homePage, element: <HomeIndexPage />, children:[
              { index: true, element: <HomePage />},
              { path: `${pageUrlConfig.homePage}/:id`, element: <ResultPage /> },
              { 
                path: `${pageUrlConfig.homePage}/map/:stationname`, 
                loader: async ({params}) =>{
                  return await searchPlace( params.stationname )
                },
                element: <HomeTrainPage />, 
              },
            ]},
            { path: pageUrlConfig.feedPage, element: <FeedIndexPage />, children:[
              { index: true, element: <FeedPage />},
              { path: pageUrlConfig.feedWritePage, element: <FeedWritePage /> },
              { path: pageUrlConfig.feedEditPage, element: <FeedWritePage /> },
              { path: pageUrlConfig.feedDetailPage, element: <FeedDetailPage /> },
            ]},
            { path: pageUrlConfig.profilePage, element: <ProfileIndexPage />, children:[
              { index: true, element: <ProfilePage />},
              { path: `${pageUrlConfig.profilePage}/:accountname`, element: <ProfileEditPage /> },
              { path: `${pageUrlConfig.profilePage}/:accountname/follower`, element: <ProfileFollowPage /> },
              { path: `${pageUrlConfig.profilePage}/:accountname/following`, element: <ProfileFollowPage /> },
            ]},
            
          { path: pageUrlConfig.goodsPage, element: <GoodsIndexPage />, children:[
            {  index: true, element: <GoodsPage /> },
            { path: pageUrlConfig.goodsWritePage, element: <GoodsWritePage /> },
            { path: pageUrlConfig.goodsEditPage, element: <GoodsWritePage /> },
            { path: pageUrlConfig.goodsDetailPage, element: <GoodsDetailPage /> },
          ]},
          { path: pageUrlConfig.chatPage, element: <ChatIndexPage />, children:[
            { index: true, element: <ChatPage /> },
          ] },
        ],
      },
    ],
  },
];

export default routeConfig;

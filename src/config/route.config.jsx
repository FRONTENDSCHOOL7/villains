import DefaultLayout from '../components/layout/DefautlLayout';
import PrivateLayout from '../components/layout/PrivateLayout';
import pageUrlConfig from './pageUrlConfig';

// lazy를 이용한 코드 스플리팅 설정

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
      {
        path: pageUrlConfig.splashPage,
        lazy: () => import('../views/auth/index.view'),
        children: [
          { index: true, lazy: () => import( '../views/auth/Splash.view') },
          { path: pageUrlConfig.signInPage, lazy: () => import( '../views/auth/SignIn.view') },
          { path: pageUrlConfig.signUpPage, lazy: () => import( '../views/auth/SignUp.view')},
        ],
      },
      {
        path: `/`,
        loader: async()=>sendUserInfo(),
        id: 'user',
        element: <PrivateLayout />,
        children: [
          {
            path: pageUrlConfig.homePage,
            lazy: () => import(   '../views/home/index.view'),
            children: [
              { index: true, lazy: () => import('../views/home/Home.view' )},
              { path: `${pageUrlConfig.homePage}/:id`, lazy: () => import( '../views/home/Result.view') },
              {
                path: `${pageUrlConfig.homePage}/map/:stationname`,
                loader: async ({ params }) => {
                  return await searchPlace(params.stationname);
                },
                lazy: () => import( '../views/home/Train.view' )
              },
            ],
          },
          {
            path: pageUrlConfig.feedPage,
            lazy: () => import(  '../views/home/index.view'),
            children: [
              { index: true, lazy: () => import(  '../views/feed/Feed.view') },
              { path: pageUrlConfig.feedWritePage,lazy: () => import( '../views/feed/FeedWrite.view') },
              { path: pageUrlConfig.feedEditPage,lazy: () => import( '../views/feed/FeedWrite.view') },
              { path: pageUrlConfig.feedDetailPage,lazy: () => import( '../views/feed/FeedDetail.view') },
            ],
          },
          {
            path: `${pageUrlConfig.profilePage}`,
            lazy: () => import( '../views/user/index.view'),
            children: [
              { path: `${pageUrlConfig.profilePage}/:accountname`, lazy: () => import( '../views/user/Profile.view') },
              { path: `${pageUrlConfig.profilePage}/:accountname/edit`, lazy: () => import( '../views/user/ProfileEdit.view') },
              { path: `${pageUrlConfig.profilePage}/:accountname/follower`, lazy: () => import( '../views/user/ProfileFollow.view') },
              { path: `${pageUrlConfig.profilePage}/:accountname/following`, lazy: () => import( '../views/user/ProfileFollow.view') },
            ],
          },

          {
            path: pageUrlConfig.goodsPage,
            lazy: () => import( '../views/goods/index.view'),
            children: [
              { index: true, lazy: () => import( '../views/goods/index.view') },
              { path: pageUrlConfig.goodsWritePage, lazy: () => import( '../views/goods/GoodsWrite.view') },
              { path: pageUrlConfig.goodsEditPage, lazy: () => import( '../views/goods/GoodsDetail.view') },
              { path: pageUrlConfig.goodsDetailPage, lazy: () => import( '../views/goods/GoodsDetail.view') },
            ],
          },
          {
            path: pageUrlConfig.chatPage,
            lazy: () => import( '../views/chat/index.view'),
            children: [
              { index: true, lazy: () => import( '../views/chat/Chat.view') },
              { path: pageUrlConfig.chatDetailPage, lazy: () => import( '../views/chat/ChatDetail.view') },
            ],
          },
        ],
      },
    ],
  },
];

export default routeConfig;

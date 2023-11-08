import {lazy} from 'react-router';
import DefaultLayout from '../components/layout/DefautlLayout';
import PrivateLayout from '../components/layout/PrivateLayout';
import pageUrlConfig from './pageUrlConfig';

// lazy를 이용한 코드 스플리팅 설정
const AuthIndexPage = lazy(() => import('../views/auth/index.view'));
const SplashPage = lazy(() => import( '../views/auth/Splash.view'));
const SignInPage = lazy(() => import( '../views/auth/SignIn.view'));
const SignUpPage = lazy(() => import( '../views/auth/SignUp.view'));

const FeedIndexPage = lazy(() => import( '../views/feed/index.view'));
const FeedPage = lazy(() => import( '../views/feed/Feed.view'));
const FeedDetailPage = lazy(() => import( '../views/feed/FeedDetail.view'));
const FeedWritePage = lazy(() => import( '../views/feed/FeedWrite.view'));

const HomeIndexPage = lazy(() => import( '../views/home/index.view'));
const HomePage = lazy(() => import( '../views/home/Home.view'));
const ResultPage = lazy(() => import( '../views/home/Result.view'));
const HomeTrainPage = lazy(() => import( '../views/home/Train.view'));

const ProfileIndexPage = lazy(() => import( '../views/user/index.view'));
const ProfilePage = lazy(() => import( '../views/user/Profile.view'));
const ProfileEditPage = lazy(() => import( '../views/user/ProfileEdit.view'));
const ProfileFollowPage = lazy(() => import( '../views/user/ProfileFollow.view'));

const GoodsIndexPage = lazy(() => import( '../views/goods/index.view'));
const GoodsPage = lazy(() => import( '../views/goods/Goods.view'));
const GoodsWritePage = lazy(() => import( '../views/goods/GoodsWrite.view'));
const GoodsDetailPage = lazy(() => import( '../views/goods/GoodsDetail.view'));

const ChatIndexPage = lazy(() => import( '../views/chat/index.view'));
const ChatPage = lazy(() => import( '../views/chat/Chat.view'));
const ChatDetailPage = lazy(() => import( '../views/chat/ChatDetail.view'));

const searchPlace = lazy(() => import( '../api/loader/searchPlace.loader'));
const sendUserInfo = lazy(() => import( '../api/loader/sendUserInfo.loader'));

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
        element: <AuthIndexPage />,
        children: [
          { index: true, element: <SplashPage /> },
          { path: pageUrlConfig.signInPage, element: <SignInPage /> },
          { path: pageUrlConfig.signUpPage, element: <SignUpPage /> },
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
            element: <HomeIndexPage />,
            children: [
              { index: true, element: <HomePage /> },
              { path: `${pageUrlConfig.homePage}/:id`, element: <ResultPage /> },
              {
                path: `${pageUrlConfig.homePage}/map/:stationname`,
                loader: async ({ params }) => {
                  return await searchPlace(params.stationname);
                },
                element: <HomeTrainPage />,
              },
            ],
          },
          {
            path: pageUrlConfig.feedPage,
            element: <FeedIndexPage />,
            children: [
              { index: true, element: <FeedPage /> },
              { path: pageUrlConfig.feedWritePage, element: <FeedWritePage /> },
              { path: pageUrlConfig.feedEditPage, element: <FeedWritePage /> },
              { path: pageUrlConfig.feedDetailPage, element: <FeedDetailPage /> },
            ],
          },
          {
            path: `${pageUrlConfig.profilePage}`,
            element: <ProfileIndexPage />,
            children: [
              { path: `${pageUrlConfig.profilePage}/:accountname`, element: <ProfilePage /> },
              { path: `${pageUrlConfig.profilePage}/:accountname/edit`, element: <ProfileEditPage /> },
              { path: `${pageUrlConfig.profilePage}/:accountname/follower`, element: <ProfileFollowPage /> },
              { path: `${pageUrlConfig.profilePage}/:accountname/following`, element: <ProfileFollowPage /> },
            ],
          },

          {
            path: pageUrlConfig.goodsPage,
            element: <GoodsIndexPage />,
            children: [
              { index: true, element: <GoodsPage /> },
              { path: pageUrlConfig.goodsWritePage, element: <GoodsWritePage /> },
              { path: pageUrlConfig.goodsEditPage, element: <GoodsWritePage /> },
              { path: pageUrlConfig.goodsDetailPage, element: <GoodsDetailPage /> },
            ],
          },
          {
            path: pageUrlConfig.chatPage,
            element: <ChatIndexPage />,
            children: [
              { index: true, element: <ChatPage /> },
              { path: pageUrlConfig.chatDetailPage, element: <ChatDetailPage /> },
            ],
          },
        ],
      },
    ],
  },
];

export default routeConfig;

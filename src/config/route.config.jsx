import HomePage from '../views/Home.view';
/** 라우트 등록하기
 * 1. routeConfig의 children에 객체를 이용해서 path와 element 입력하기
 * 2. pageUrlConfig에 해당 path로 변수만들어서 link 이동 시 사용하기
 *  **/
const routeConfig = (queryClient) =>{ 
    return [{   
        //이상한 경로를 입력했을 때 보여줄 기본 페이지
        path: '',
        //스플래시 페이지로 교체하기
        element: <HomePage/>,
        children:[
            { path: `/main`, element: <HomePage />}
        ]
    }];
}

export default routeConfig;

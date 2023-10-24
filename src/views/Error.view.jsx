import { useRouteError } from "react-router";
import PageTemplate from "../components/PageTemplate"

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <PageTemplate>
            error: 페이지를 찾을 수 없습니다.
            <div>
                {error.statusText || error.message}
            </div>
        </PageTemplate>
    )
}

export default ErrorPage;
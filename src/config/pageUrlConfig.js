const baseUrl = import.meta.env.BASE_URL;
class pageUlrConfig {
  splashPage = `${baseUrl}`;
  signInPage = `${baseUrl}signIn`;
  signUpPage = `${baseUrl}signUp`;
  homePage = `${baseUrl}main`;
  profilePage = `${baseUrl}user`;
  feedPage = `${baseUrl}feed`;
  feedWritePage = `${baseUrl}feed/write`;
  feedEditPage = `${baseUrl}feed/edit/:id`;
  feedDetailPage = `${baseUrl}feed/:id`;
  chatPage = `${baseUrl}chat`;
  chatDetailPage = `${baseUrl}chat/:id`;
  goodsPage = `${baseUrl}goods`;
  goodsWritePage = `${baseUrl}goods/write`;
  goodsDetailPage = `${baseUrl}goods/:id`;
  goodsEditPage = `${baseUrl}goods/edit/:id`;

  addParams(url, params) {
    let querystring = [];
    let pageUrl = url;
    if (url.includes(`?`)) {
      const split = url.split(`?`);
      pageUrl = split[0];
      const urlParam = split[1];
      if (urlParam.includes(`&`)) {
        urlParam.split(`&`).forEach((v, k) => {
          querystring.push(`${v}${params[k]}`);
        });
      } else {
        querystring.push(`${urlParam}${params[0]}`);
      }
      return `${pageUrl}?${querystring.json(`&`)}`;
    }
    return pageUrl;
  }
}

export default new pageUlrConfig();

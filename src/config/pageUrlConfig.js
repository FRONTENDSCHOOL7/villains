class pageUlrConfig {
  baseUrl = import.meta.env.BASE_URL;
  homePage = `${this.baseUrl}main`;
  splashPage = `${this.baseUrl}welcome`;
  signInPage = `${this.baseUrl}welcome/signIn`;
  signUpPage = `${this.baseUrl}welcome/signUp`;
  resultPage = `${this.baseUrl}main/:id`;
  feedPage = `${this.baseUrl}feed`;
  feedWritePage = `${this.baseUrl}feed/write`;
  feedDetailPage = `${this.baseUrl}feed/:id`;
  profilePage = `${this.baseUrl}user`;
  profileEdit = `${this.baseUrl}user/edit`;
  goodsPage = `${this.baseUrl}goods`;
  chatPage = `${this.baseUrl}chat`;
  goodsWritePage = `${this.baseUrl}goods/write`;
  goodsDetailPage = `${this.baseUrl}goods/:id`;

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

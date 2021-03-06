export const bannerApi = "/Content/Public/getAds";
export const newsApi = "/Content/Public/getArticalList";
export const fruitListApi = "/Content/Public/getFruitList"; //大观园
export const nationListApi = "/Content/Public/getNationList";
export const articleApi = "/Content/Public/getNewsInfo"; //文章详情

//获取省市
export const provinceApi = '/Member/Public/getProvince';
//图形验证码
export const verifyInfoApi = '/Member/Public/verify_info';
//发送短信
export const verifyCodeApi = '/Member/Public/verify_code';

//登陆
export const loginApi = '/Member/Public/login';

export const refreshTokenApi = '/Member/Public/refresh_token';

//=============================需要登录=================
//需要登录
export const newAfficheApi = "/Shop/Shop/getFruitAffiche";//最新公告列表
//商品列表
export const goodsListApi = '/Shop/Shop/getGoodsList';
//获取栏目
export const categoryListApi = '/Shop/Shop/getCategory';
//批量添加购物车
export const bacthAddShoppingCartApi = '/Shopping/Public/arrBasket'; 
//获取购物车列表
export const shoppingCartListApi = '/Shopping/Public/checkBasket';
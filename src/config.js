export default {
    projectNs: 'systemManager',//项目命名空间，唯一
    loginPath: '/login',//登录路径
    remainRedirect: true,//登录成功后是否自动跳回登录前页面
    loginRedirect: '',//登录成功后固定跳转到的路径，只有remainRedirect为false时才生效
    tokenExpireCode: 405,//token过期统一返回状态码
    needNavTab: false,//是否需要展示tab形式的页面路由
}
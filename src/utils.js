import config from './config';

const tokenKey = config.projectNs + '_token_';
const userInfoKey = config.projectNs + '_user_info_';
const authorityKey = config.projectNs + '_user_authority_';
export default {
    setToken(token) {
        if (window.localStorage) {
            try {
                window.localStorage.setItem(tokenKey, token);
            } catch (e) {
                console.log(e)
            }
        }
    },
    getToken() {
        let token = '';
        if (window.localStorage) {
            try {
                const localToken = window.localStorage.getItem(tokenKey);
                if (localToken) {
                    token = localToken;
                }
            } catch (e) {
                console.log(e)
            }
        }
        return token;
    },
    setUserInfo(user) {
        if (window.localStorage) {
            try {
                window.localStorage.setItem(userInfoKey, JSON.stringify(user));
            } catch (e) {
                console.log(e)
            }
        }
    },
    getUserInfo() {
        let userInfo = null;
        if (window.localStorage) {
            try {
                const localInfo = window.localStorage.getItem(userInfoKey);
                if (localInfo) {
                    userInfo = JSON.parse(localInfo);
                }
            } catch (e) {
                console.log(e)
            }
        }
        return userInfo;
    },
    setUserAuthority(auth) {
        if (window.localStorage) {
            try {
                window.localStorage.setItem(authorityKey, JSON.stringify(auth));
            } catch (e) {
                console.log(e)
            }
        }
    },
    getUserAuthority() {
        let authInfo = null;
        if (window.localStorage) {
            try {
                const localInfo = window.localStorage.getItem(authorityKey);
                if (localInfo) {
                    authInfo = JSON.parse(localInfo);
                }
            } catch (e) {
                console.log(e)
            }
        }
        return authInfo;
    },
}
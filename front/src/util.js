export const getAuth = () => {
    if(Object.keys(localStorage).indexOf("auth_token") >= 0){
        return localStorage.auth_token;
    }
    if(Object.keys(sessionStorage).indexOf("auth_token") >= 0){
        return sessionStorage.auth_token;
    }
    return null;
}

export const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';
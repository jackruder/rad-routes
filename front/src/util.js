export const getAuth = () => {
    if(Object.keys(localStorage).indexOf("auth_token") >= 0){
        return localStorage.auth_token;
    }
    if(Object.keys(sessionStorage).indexOf("auth_token") >= 0){
        return sessionStorage.auth_token;
    }
    return null;
}

export const apiUrlBase = process.env.NODE_ENV === 'production' ? window.location.host : 'http://localhost:8000/api';

export const formFieldErrorRed = "#f99";

export const fetchFromApi = (path, setter) => {
    const _path = path[0] === "/" ? path.substring(1) : path; 

    const token = getAuth();
    const headers = token ? {
        "Authorization": `Token ${token}`
    } : {};
    
    fetch(`${apiUrlBase}/${_path}`, {
        method: 'GET',
        headers: headers
    })
    .then(res => res.json())
    .then(data => {
        setter(data)
        console.log("received data:", data);
    })
    .catch(e => console.log(e));
}
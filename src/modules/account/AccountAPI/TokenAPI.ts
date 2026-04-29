const tokenKey:string = ""
export function setToken(token:string){
    if(!token) return
    localStorage.setItem(tokenKey,token)
}
export function getToken(){
    return localStorage.getItem(tokenKey)
}
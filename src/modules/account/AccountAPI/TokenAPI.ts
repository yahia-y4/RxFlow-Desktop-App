const tokenKey:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiVXNlck5hbWUiOiJ5YWhpYSIsIkVtYWlsIjoieWFoaWFAZW1haWwuY29tIiwiUm9sZSI6ImFkbWluIiwiaWF0IjoxNzU3NDE1NjM3fQ.N4hLnno5u9-Kybw36f-kExbUSTpPwToyNY5JNoXUYBo"
export function setToken(token:string){
    if(!token) return
    localStorage.setItem(tokenKey,token)
}
export function getToken(){
    // return localStorage.getItem(tokenKey)
    return tokenKey
}
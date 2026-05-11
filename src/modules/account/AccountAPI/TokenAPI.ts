const tokenKey:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiVXNlck5hbWUiOiJ5YWhpYSIsIkVtYWlsIjoieWFoaWFAZW1haWwuY29tIiwiUm9sZSI6bnVsbCwiaWF0IjoxNzc4NDMyNTQzfQ.RUs7canvxT2bbYusMQf0OIH8EEqiI8ja-RzHHWk78Is"
export function setToken(token:string){
    if(!token) return
    localStorage.setItem(tokenKey,token)
}
export function getToken(){
    // return localStorage.getItem(tokenKey)
    return tokenKey
}
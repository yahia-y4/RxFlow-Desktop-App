
const port:string = '4000'
const host:string = 'http://localhost:'
export function getURL(){
    if(port){
        console.log("URL: ", host + port +'/')
       return host + port +'/'
    }
}
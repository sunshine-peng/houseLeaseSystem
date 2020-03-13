var clientData={
    id:1,
    fullName:"not set",
    setUserName:function(fristName,lastName){
        this.fullName=fristName+'-'+lastName
        console.log(this)
    }
}

function getUserName(fristName,lastName,callback){
    callback(fristName,lastName)
}
getUserName("jack","mary",clientData.setUserName)
console.log('clientData.fullName')
console.log(clientData.fullName)
console.log('window.fullName')
console.log(window.fullName)
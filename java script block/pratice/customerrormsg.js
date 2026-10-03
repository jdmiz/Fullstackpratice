function check(username){
    if (username ){
        console.log(`User is ${username}`)
    }
    else {
          throw Error("Username is empty")
    }
    
}
check("Devil")
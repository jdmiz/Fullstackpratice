function check(username){
    if (username ){
        console.log(`User is ${username}`)
    }
    else {
          console.log(new Error("Username is empty"))
    }
    
}
check("Devil")
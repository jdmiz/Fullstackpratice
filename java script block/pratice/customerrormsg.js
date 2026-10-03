function check(username){
    if (username ){
        console.log(`User is ${username}`)
    }
    else {
        console.log("This will be printed")
          throw new Error("Username is empty")
          // throw ends the thing after it
          console.log("This will not be printed")
    }
    
}
check("Devil")
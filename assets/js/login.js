
const login = document.querySelector(".login")
const loginScreen = document.querySelector(".login-screen")
const screenBlur = document.querySelector(".screen-blur")
const loginContent = document.querySelector(".login-content")


login.addEventListener("click", () =>{
    console.log("dsads")
    loginScreen.classList.toggle("hide")
    // document.body.classList.add("screen-blur")
    if (!loginScreen.classList.contains("hide")) {
        screenBlur.style.display = "block";
        loginContent.style.display = "flex"
        document.body.style.overflow = "hidden"
         registerContent.style.display = "none"
        
    }
    else{
        screenBlur.style.display = "none";
        document.body.style.overflow = "auto"
        
    }
})



const rememberCheck = document.querySelector(".remem-check");
const rememCheck = document.querySelector(".rem-check");

    rememberCheck.addEventListener("click", function(){
    console.log("dasdadasdads")
    if (rememCheck.classList.contains("yes")) {
       rememCheck.style.left = 50 + "%";
        rememCheck.style.backgroundColor = "#69A5FF";
        rememberCheck.style.backgroundColor = "#ACCDFF"
        rememCheck.classList.remove("yes")
        
    }
    else{

        console.log("hui")
        rememCheck.style.left = 5 + "%";
       rememCheck.style.backgroundColor = "#3B4866";
       rememberCheck.style.backgroundColor = "#FFFF";
        rememCheck.classList.add("yes");
    }
    
})
screenBlur.addEventListener("click", function(){
    console.log("YEs")
    loginScreen.classList.add("hide")
    screenBlur.style.display = "none";
    document.body.style.overflow = "auto"
    registerContent.style.display = "none"
})


const registerBtn = document.querySelector(".reg-acc")
const registerContent = document.querySelector(".register-content")


registerBtn.addEventListener("click", () =>{
    loginContent.style.display = "none"
    registerContent.style.display = "flex"
})


const logBtn = document.querySelector(".log-acc")

logBtn.addEventListener("click", ()=>{
    loginContent.style.display = "flex"
    registerContent.style.display = "none"
} )
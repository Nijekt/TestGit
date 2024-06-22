const login = document.querySelector(".login")
const loginScreen = document.querySelector(".login-screen")

login.addEventListener("click", () =>{
    console.log("dsads")
    loginScreen.classList.toggle("hide")
})

const rememberCheck = document.querySelector(".remem-check");
const rememCheck = document.querySelector(".rem-check");

rememberCheck.addEventListener("click", function(){
    console.log("dasdadasdads")
    if (!rememCheck.classList.contains("yes")) {
        rememCheck.style.left = 5 + "%";
       rememCheck.style.backgroundColor = "#3B4866";
       rememberCheck.style.backgroundColor = "#FFFF";
        rememCheck.classList.add("yes");
    }
    else{
       rememCheck.style.left = 50 + "%";
        rememCheck.style.backgroundColor = "#69A5FF";
        rememberCheck.style.backgroundColor = "#ACCDFF"
        rememCheck.classList.remove("yes")
       
    }
    
})

let labels = document.querySelectorAll(".clickable");
labels.forEach((label) => {
    label.addEventListener("click", () => {
        label.style.top = "3%";
        label.style.left = "0%";
        label.style.color = "#ED5B25";
        label.style.fontSize = "16px";
    });
})


// registerBox
let register = document.querySelector(".register");
register.addEventListener("click", () => {
    registerContainer.style.display = "flex";
    registerContainer.style.display.justifyContent = "center";
    registerContainer.style.display.alignItems = 'center';
})

let register1 = document.querySelector("#register-alt");
register1.addEventListener("click", () => {
    registerContainer.style.display = "flex";
    registerContainer.style.display.justifyContent = "center";
    registerContainer.style.display.alignItems = 'center';
})

const registerContainer = document.getElementById("registerContainer");
const registerAlt = document.getElementById("register-alt");

// to disapper register-box
const close_reg=document.getElementById("close-reg");
close_reg.addEventListener("click",()=>{
    registerContainer.style.display = "none";
})

//to pop-up login box
let login = document.querySelector(".login");
login.addEventListener("click", () => {
    loginContainer.style.display = "flex";
    loginContainer.style.display.justifyContent = "center";
    loginContainer.style.display.alignItems = 'center';
})

//to diappear login-box
const close_login=document.getElementById("close-login");
close_login.addEventListener("click",()=>{
    loginContainer.style.display = "none";
    console.log("closed");
})

registerAlt.addEventListener("click",()=>{
    loginContainer.style.display = "none";
})
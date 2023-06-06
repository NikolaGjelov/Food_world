const homeBtn = document.querySelector(".home-btn")
let mainPage = document.querySelector(".main-container")
homeBtn.addEventListener("click", backToHomePage)
neznam()
backToHomePage()
function backToHomePage(){
  mainPage.innerHTML= `
  <div class="main-container-homepage">
  <h1>Welcome!</h1>
  <p>Share your recipes with all world</p> 
  </main>
  <div>
  `
}

const logInBtn = document.querySelector(".log-in")
logInBtn.addEventListener("click", displayLogIn)

function displayLogIn(){
  mainPage.innerHTML=`
<div class="in-main-container-log-in">
  <form onsubmit="logIn(event)" class="html-form">
    <h1>LOG IN</h1>
    <input type="text" placeholder="Username" class="username-inp" required>
    <input type="password" placeholder="Password" class="password-inp" required>
    <p class="incorrect-user"></p>
    <button class="log-btn" type="submit">LOG IN</button>
    <p>You don't have account yet? </p> <a class="sign-up" onclick="signUpDisplay()" >Sign Up!</a>
  </form>
</div>
  `
}


function logIn(event){
  let usernameInput = document.querySelector(".username-inp")
  let passwordInput = document.querySelector(".password-inp")
  let incorrectInput = document.querySelector(".incorrect-user")
  // const submitBtn = document.querySelector(".log-btn")
  event.preventDefault()
  let username = usernameInput.value
  let password = passwordInput.value
  let user = find(username)
  if (user){
    if (user.password === password){
      logInBtn.style.display="none"
      backToHomePage()
      changeLogin_logout()
      localStorage.setItem("activeUser", user.name)
      return
    }
  }
  
    incorrectInput.innerHTML= "Incorrect username or password"
    setTimeout(()=> {
    incorrectInput.innerHTML= ""
    },3000)
}

function find(name){
  const users = JSON.parse(localStorage.getItem("users"))
  if (users){
    return users.find(user => user.name === name)
  }

}

function signUpDisplay(){
  mainPage.innerHTML=
`<div class="in-main-container-log-in">
<form onsubmit="signUp(event)" class="html-form">
<h1>SIGN UP</h1>
<input type="text" placeholder="Username" class="nameInput" required>
<input type="text" placeholder="Password" class="passwordInput" required>
<p class="user-busy"></p>
<button class="create-account" type="submit">CREATE ACCOUNT</button>
</div>
`
}

function signUp(event) {
event.preventDefault()
 const username = document.querySelector(".nameInput").value
 const password = document.querySelector(".passwordInput").value
 let userBusy = document.querySelector(".user-busy")
 
 if (find(username)){
 userBusy.innerHTML = "This Username is already in use!"
 setTimeout(()=>userBusy.innerHTML = "", 3000 )
 }
 else {
  const users = JSON.parse(localStorage.getItem("users")) || []
  users.push({
    name:username,
    password:password
  })
  localStorage.setItem("users", JSON.stringify(users))
  location.reload()
 }
}

const createRecipeBtn = document.querySelector(".create-recipe")
createRecipeBtn.addEventListener("click", displayCreateRecipe)
 
function displayCreateRecipe() {
  if (localStorage.getItem("activeUser")){
  mainPage.innerHTML= `
  <section class="create-new-recipe">
    <div class="create-new-recipe-container">
      <label for="categories">Categories:</label>
      <select name="categories" class="categories-dropdown" class="prepTxt">
        <option value="vegetarian" class="prepTxt">Vegetarian</option>
        <option value="salad" class="prepTxt">Salad</option>
        <option value="meat" class="prepTxt">Meat</option>
        <option value="pasta" class="prepTxt">Pasta</option>
        <option value="dessert" class="prepTxt">Dessert</option>
        <option value="gluten-free" class="prepTxt">Gluten Free</option>
      </select>
      <input type="text" class="inputName" placeholder="Name of your recipe">
      <input type="text" class="inputDescription" placeholder="Tell us something about this dish">
    <div class="inputContainer">
      <input type="text" class="inputIngredients" placeholder="Ingredients">
      <button class= "addBtn" onclick= "addIngredients()">+</button>
    </div>
      <ul class="IngredientsUl"></ul>
      <textarea name="" class="recipe" cols="30" rows="10" placeholder="How to cook this meal"></textarea>
    <div class="prep-time-container">
      <p>Cooking time:</p>
        <div class="preptime">
          <div>
            <input type="number" step="1" min="0" max="10" class="hour">
            <span>Hours</span>
          </div>
          <div>
            <input type="number" step="1" min="0" max="59" class="minute">
            <span>Minutes</span>
          </div>
        </div>
    </div>
      <button class="submitBtn" onclick= "submitNewRecipe()">Submit</button>
    </section>`
  }
  else {
    mainPage.innerHTML=`
    <div class="main-container-homepage">
      <h1>You don't have account yet?</h1>
      <p>Log in or Create one<br>and share your recipe!</p>
    </div>`
  }
 }

 function addIngredients(){
  const ingredientsUl = document.querySelector(".IngredientsUl")
  const addBtn = document.querySelector(".addBtn")
  let ingredientsInp = document.querySelector(".inputIngredients")
 
  const ing = ingredientsInp.value
  if(!ing)return
  const li = document.createElement("li")
  li.classList.add(ing.addSpaces)
  li.innerHTML=ing
  ingredientsUl.appendChild(li)
  ingredientsInp.value=""
}



function submitNewRecipe() {
  let title = document.querySelector(".inputName").value
  let dsc = document.querySelector(".inputDescription").value
  const ing = []
  for (const child of document.querySelector(".IngredientsUl").children) {
    ing.push(child.innerHTML)
  }
  let recipe = document.querySelector(".recipe").value
  let obj = {
    title,
    dsc,
    ingredients:ing,
    recipe
  }
  let rec = localStorage.getItem("recipes")
  if (rec) 
    localStorage.setItem("recipes", JSON.stringify([...JSON.parse(rec),obj])) 
  else 
    localStorage.setItem("recipes", JSON.stringify ([obj]))

successSubmitRecipe()

}

function successSubmitRecipe(){
  mainPage.innerHTML=`
  <div class="main-container-homepage">
    <h1>Success!</h1>
    <p>Thank you for your contribution!</p>
  </div>`
}
let logBtnContainer = document.querySelector(".btn-container-log")
function changeLogin_logout(){
  logBtnContainer.innerHTML = `
  <button class="log-out" onclick= "logOut()">Log Out</button>`
}
function changeToLogin(){
  logBtnContainer.innerHTML = `
  <button class="log-in">Log in/Sign Up</button>`
}
const logOut = () =>{
  backToHomePage()
  const logout = document.querySelector(".log-out")
  logout.style.display="none"
  changeToLogin()
  const logInBtn = document.querySelector(".log-in")
logInBtn.addEventListener("click", displayLogIn)
localStorage.setItem("activeUser", "" )
}
function preventChangeOnLogOut (){
  if (localStorage.getItem("activeUser")){
    changeLogin_logout
    console.log("if")
  }
  else{
    changeToLogin
    console.log("else")
  }
}
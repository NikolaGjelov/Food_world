const homeBtn = document.querySelector(".home-btn")
let mainPage = document.querySelector(".main-container")
let logBtnContainer = document.querySelector(".btn-container-log")
let arr = []
function changeLogin_logout(){
  logBtnContainer.innerHTML = `
  <button class="log-out" onclick= "logOut()">Log Out</button>`
}

homeBtn.addEventListener("click", backToHomePage)
preventChangeOnLogOut()
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
logInBtn && logInBtn.addEventListener("click", displayLogIn)

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
 
const displayCreateNewRec = () => {
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

function displayCreateRecipe() {
  if (localStorage.getItem("activeUser")){
    displayCreateNewRec()
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
  let category = document.querySelector(".categories-dropdown").value
  let title = document.querySelector(".inputName").value
  let dsc = document.querySelector(".inputDescription").value
  let hour = document.querySelector(".hour").value
  let minute = document.querySelector(".minute").value
  const ing = []
  for (const child of document.querySelector(".IngredientsUl").children) {
    ing.push(child.innerHTML)
  }
  let recipe = document.querySelector(".recipe").value
  let obj = {
    category,
    title,
    dsc,
    ingredients:ing,
    recipe,
    hour,
    minute
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
    changeLogin_logout()
  }
  else{
    changeToLogin()
  }
}


const displayRecFromLocalStorage = () => {
let recipes = JSON.parse(localStorage.getItem("recipes"))
let recipesContainer = `<div class="recipesContainer">`

for (let i=0; i < recipes.length; i++){
  recipesContainer+=`
  <div >
    <h2>${recipes[i].title}</h2>
    <h3>${recipes[i].dsc}</h3>
    <p>Category: ${recipes[i].category}</p>
    <p>Preparation time: ${recipes[i].hour} hours and ${recipes[i].minute} minutes</p>
    <button class="goToRecipeBtn"id=${i} onclick="displaySelectedRecipe(event)">Go to Recipe</button>
  </div>`
} 
recipesContainer+=`</div>`
mainPage.innerHTML = `${recipesContainer}`
}
 const displaySelectedRecipe = (e) => {
  let recipe = JSON.parse(localStorage.getItem("recipes"))[e.target.id]
  let modalWrapper = document.createElement("div")
  modalWrapper.classList.add("modalWrapper")
  let modal = document.createElement('div');
  modal.classList.add("modal")
  let ingredients = ""
  for(let i=0; i<recipe.ingredients.length; i++){
    ingredients += `<li>${recipe.ingredients[i]}</li>`
  }
  modal.innerHTML = `
  <button class="modal-btn" onclick="exitFromRecipe()">X</button>
  <h1>${recipe.title}</h1>
  <p>Ingredients needed:</p>
  <ul>${ingredients}</ul>
  <p>Preparation steps:</p>
  <p>${recipe.recipe}</p>
  <p>Preparation time: ${recipe.hour} hours and ${recipe.minute} minutes</p>
  `
  modalWrapper.appendChild(modal)
  document.querySelector("body").appendChild(modalWrapper)
 
}

 const exitFromRecipe = () => {
  let  modalWrapper = document.querySelector(".modalWrapper")
  modalWrapper.remove()
 }

 const displayCategories = () => {
  mainPage.innerHTML = `
  <h1 class="category-title">Categories</h1>
  <div class="categories-container">
    <button class="vegetarian" value="vegetarian">Vegetarian</button>
    <button class="salad" value="salad">salad</button>
    <button class="meat" value="meat">meat</button>
    <button class="dessert" value="dessert">Dessert</button>
    <button class="pasta" value="pasta">Pasta</button>
    <button class="gluten-free" value="gluten-free"></button>
  </div>
  `
  let categoriesContainer = document.querySelector(".categories-container")
  let btns = categoriesContainer.querySelectorAll("button")
   btns.forEach(button => {
    button.addEventListener('click', () => {
       
    let filterResult = JSON.parse(localStorage.getItem("recipes")).filter((recipe) => 
      recipe.category == button.value)
     arr.push(filterResult)
 //test
     console.log(filterResult)
     console.log(typeof button.value)
     console.log(button.value)
     console.log(typeof arr)
 let recipes = filterResult
let recipesContainer = `<div class="recipesContainer">`

for (let i=0; i < recipes.length; i++){
  recipesContainer+=`
  <div >
    <h2>${recipes[i].title}</h2>
    <h3>${recipes[i].dsc}</h3>
    <p>Category: ${recipes[i].category}</p>
    <p>Preparation time: ${recipes[i].hour} hours and ${recipes[i].minute} minutes</p>
    <button class="goToRecipeBtn"id=${i} onclick="displaySelectedRecipe(event)">Go to Recipe</button>
  </div>`
} 
recipesContainer+=`</div>`
mainPage.innerHTML = `${recipesContainer}`
     //test
    
    });
})

 }

 const categoriesBtn = document.querySelector(".recipes-categories")
 categoriesBtn.addEventListener("click", displayCategories)

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const your_url = "https://my-react-project-9ba22-default-rtdb.firebaseio.com/"

const appSettings = { databaseURL: your_url }

const app = initializeApp(appSettings)
const db = getDatabase(app)
const dbRef = ref(db, "products")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

function addItemToShoppingList(input) {
    shoppingListEl.innerHTML += `<li>${input}</li>`
    // OR
    // let newLi = document.createElement("li")
    // newLi.textContent = input
    // shoppingListEl.append(newLi)
    // OR
    // shoppingListEl.append(document.createElement("li").textContent = input) // DOES NOT WORK
}

// SET THE INPUT FIELD TO BE EMPTY AFTER ADDING AN ITEM
function clearInputField() {
    inputFieldEl.value = ""
}

addButtonEl.addEventListener("click", function () {
    const inputValue = inputFieldEl.value

    // ADD THE INPUT VALUE TO THE DATABASE
    push(dbRef, inputValue);
    // console.log(`${inputValue} was added to the database!`) // DEBUG
    addItemToShoppingList(inputValue)
    clearInputField()
})
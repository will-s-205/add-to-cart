import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://my-react-project-9ba22-default-rtdb.firebaseio.com",
};

// INITIALIZE THE DATABASE
const app = initializeApp(appSettings)
// const db = getDatabase(app)
// const foodRef = ref(db, "products")
// const booksRef = ref(db, "books")
// OR
// READ SNAPSHOT FROM THE DATABASE
firebase.initializeApp(appSettings);
const database = firebase.database();
const foodRef = database.ref('products');
const booksRef = database.ref('books');

// READ SNAPSHOT FROM THE DATABASE
booksRef.once('value')
    .then(function (snapshot) {
        const data = snapshot.val();
        console.log(data); // Log the retrieved data to the console
    })
    .catch(function (error) {
        console.error(error);
    });

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

// // SET THE INPUT FIELD TO BE EMPTY AFTER ADDING AN ITEM
function clearInputField() {
    inputFieldEl.value = ""
}

addButtonEl.addEventListener("click", function () {
    const inputValue = inputFieldEl.value

    // ADD THE INPUT VALUE TO THE DATABASE
    push(foodRef, inputValue);
    // console.log(`${inputValue} was added to the database!`) // DEBUG
    addItemToShoppingList(inputValue)
    clearInputField()
})

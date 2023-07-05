import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

const appSettings = {
    databaseURL: "https://my-react-project-9ba22-default-rtdb.firebaseio.com",
};

// INITIALIZE THE DATABASE
firebase.initializeApp(appSettings);
const database = firebase.database();
const foodRef = database.ref('products');
const booksRef = database.ref('books');

// READ SNAPSHOT FROM THE DATABASE
foodRef.once('value')
    .then(function (snapshot) {
        // GET THE DATA FROM THE SNAPSHOT
        const data = snapshot.val();
        // VARIABLE TO STORE THE DATA
        const foodArray = Object.entries(data)

        // KEEPING LIST OF ITEMS UPDATED ACCORDING TO THE DATABASE
        for (let i = 0; i < foodArray.length; i++) {
            const currentFoodItem = foodArray[i];
            const foodItemId = currentFoodItem[0];
            const foodItemValue = currentFoodItem[1];

            addItemToShoppingList(currentFoodItem)
        }
    })
    .catch(function (error) {
        console.error(error);
    });

// ADD THE INPUT VALUE TO THE SHOPPING LIST
function addItemToShoppingList(item) {
    // const arr = Object.fromEntries(item)
    const itemId = item[0]
    const itemValue = item[1]

    // SINCE BACK-END AND FRONT-END USING THE SAME METHOD 
    // BUT DIFFERENT TYPE DEPENDING ON THE INPUT
    // console.log(typeof item)
    // console.log(typeof itemValue)
    const newEl = document.createElement("li")
    newEl.textContent = typeof item === "string" ? item : itemValue;
    shoppingListEl.append(newEl)

    // REMOVE BUTTON FUNCTIONALITY
    newEl.addEventListener("click", function () {
        let itemInDB = ref(database, `products/${itemId}`)

        remove(itemInDB)
        shoppingListEl.removeChild(newEl)
    })
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
    // DUPLICATE TO KEEP THE SHOPPING LIST UPDATED ACCORDING TO THE DATABASE
    addItemToShoppingList(inputValue)
    clearInputField()
})

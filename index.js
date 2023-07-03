import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const your_url = "https://my-react-project-9ba22-default-rtdb.firebaseio.com/"

const appSettings = { databaseURL: your_url }

const app = initializeApp(appSettings)
const db = getDatabase(app)
const dbRef = ref(db, "products")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(dbRef, inputValue)

    console.log(`${inputValue} was added to the database!`)
})
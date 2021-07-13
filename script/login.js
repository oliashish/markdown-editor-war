import { config } from "./firebase.js";

firebase.initializeApp(config);
const auth = firebase.auth();

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

const login = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            location = "userNotes.html";
        })
        .catch((err) => {
            console.log(err);
            loginError.innerText = err.message;
        });
};

export default login;

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm["email"].value;
    const password = loginForm["password"].value;
    login(email, password);
});

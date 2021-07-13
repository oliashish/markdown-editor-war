import { config } from "./firebase.js";

firebase.initializeApp(config);
const auth = firebase.auth();
const firestore = firebase.firestore();

const signupForm = document.getElementById("signupForm");
const signupError = document.getElementById("signupError");
const signupError2 = document.getElementById("signupError");

const signup = (username, email, password) => {
    signupForm.reset();
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return firestore
                .collection("users")
                .doc(userCredential.user.uid)
                .set({
                    displayName: username,
                    email: email,
                    password: password,
                })
                .then(() => {
                    location = "userNotes.html";
                })
                .catch((err) => {
                    signupError.innerText = err.message;
                });
        })
        .catch((err) => {
            signupError2.innerText = err.message;
        });
};

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = signupForm["username"].value;
    const email = signupForm["email"].value;
    const password = signupForm["password"].value;
    signup(username, email, password);
});

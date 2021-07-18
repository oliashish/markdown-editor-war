import { config } from "./firebase.js";

// getting all the required dom ele
const toggler = document.getElementById("toggler");
const sidebr = document.getElementById("sidebr");
const mainEditorArea = document.getElementById("mainEditorArea");
const mainNotes = document.getElementById("mainNotes");
const addNoteBtn = document.getElementById("addNote");
const notesList = document.getElementById("notesList");
const noteInput = document.getElementById("noteInput");
const saveNotesBtn = document.getElementById("saveNotesBtn");

// firebase initialization

firebase.initializeApp(config);
const auth = firebase.auth();
const firestore = firebase.firestore();

// markdown parser

const markdown = markdownit({
    linkify: false,
    typographer: false,
    quotes: "“”‘’",
});

// markdown parsing eventlistner

mainEditorArea.addEventListener("keypress", (e) => {
    let result = markdown.render(e.target.value);
    mainNotes.innerHTML = result;
});

// default screen eventlistners for toggling sidebar
toggler.addEventListener("click", () => {
    sidebr.style.display == "none"
        ? (sidebr.style.display = "block")
        : (sidebr.style.display = "none");
});

// function for appending new note to notes list
const appendNewNote = (listChild) => {
    const newNote = document.createElement("li");
    newNote.setAttribute("class", "my-note");
    newNote.textContent = listChild;

    try {
        notesList.appendChild(newNote);
    } catch (err) {
        throw new Error(err.message);
    }
};
function addNote(value) {
    appendNewNote(noteInput.value);
    noteInput.value = "";
}

noteInput.addEventListener("keypress", (e) => {
    let inputValue = e.target.value;

    if (inputValue !== "" && e.key == "Enter") {
        addNote(inputValue);
    }
});

addNoteBtn.addEventListener("click", () => {
    const note = noteInput.value;
    if (note !== "") addNote(note);
});

// save notes

const allNotes = [];
saveNotesBtn.addEventListener("click", () => {
    const id = Math.floor(Math.random() * 1000);

    let notesObj = {
        note: notesList.textContent,
        markdown: mainEditorArea.value,
        parsedmarkdown: mainNotes.textContent,
    };
    allNotes.push(notesObj);
    auth.onAuthStateChanged((user) => {
        if (user) {
            firestore
                .collection(user.uid)
                .doc("usernote")
                .set({
                    id: id,
                    allNotes,
                })
                .then(() => {
                    console.log("notes added");
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            console.log("somthing wrong happened");
        }
    });
});

// rendering notes in

function renderData(data) {
    console.log(data);
}

// get notes

function getNotes(uid) {
    firestore
        .collection(uid)
        .doc("usernote")
        .get()
        .then((snapshot) => {
            renderData(snapshot.data());
        });
}

// check if user is exists or not, and if exists get user id for fetching notes.

auth.onAuthStateChanged((user) => {
    if (user) {
        firestore
            .collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
                let username = snapshot.data().displayName;

                let uid = user.uid;
                getNotes(uid);
            });
    } else {
        alert(
            "your login session has expired or you have logged out, login again to continue"
        );
        location = "login.html";
    }
});

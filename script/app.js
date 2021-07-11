import { config } from "./firebase.js";
import login from "./login.js";
import signup from "./signup.js";
import notes from "./notes.js";




firebase.initializeApp(config);
const auth = firebase.auth();
const firestore = firebase.firestore();

// markdown parser
const markdown = markdownit({
    html: true,
    typographer: true,
});

// getting all the required dom ele
const toggler = document.getElementById("toggler");
const sidebr = document.getElementById("sidebr");
const mainEditorArea = document.getElementById("mainEditorArea");
const mainNotes = document.getElementById("mainNotes");
const addNote = document.getElementById("addNote");
const notesList = document.getElementById("notesList");
const noteInput = document.getElementById("noteInput");

// default screen eventlistners for toggling
toggler.addEventListener("click", () => {
    sidebr.style.display == "none"
        ? (sidebr.style.display = "block")
        : (sidebr.style.display = "none");
});

// function for appending new note to notes list
function appendNewNote(listChild) {
    let newNote = document.createElement("li");
    newNote.setAttribute("class", "my-note");
    newNote.setAttribute("id", listChild.textContent);
    newNote.textContent = listChild;
    try {
        notesList.appendChild(newNote);
    } catch (err) {
        throw new Error(err.message);
    }
}

noteInput.addEventListener("keypress", (e) => {
    let inputValue = e.target.value;

    if (e.key == "Enter") {
        appendNewNote(inputValue);
        noteInput.value = "";
    }
});
addNote.addEventListener("click", () => {
    noteInput.value !== "" ? appendNewNote(noteInput.value) : addNote.disable;
    noteInput.value = "";
});

// markdown parsing eventlistner

mainEditorArea.addEventListener("keypress", (e) => {
    let result = markdown.render(e.target.value);

    mainNotes.innerHTML = result;
});

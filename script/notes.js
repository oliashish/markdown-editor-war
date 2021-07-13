import { config } from "./firebase.js";

firebase.initializeApp(config);
const auth = firebase.auth();
const firestore = firebase.firestore();

auth.onAuthStateChanged((user) => {
    if (user) {
        firestore
            .collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
                let username = snapshot.data().displayName;
            });
    } else {
        alert(
            "your login session has expired or you have logged out, login again to continue"
        );
        location = "login.html";
    }
});

// markdown parser
const markdown = markdownit({
    linkify: false,
    typographer: false,
    quotes: "“”‘’",
});

// getting all the required dom ele
const toggler = document.getElementById("toggler");
const sidebr = document.getElementById("sidebr");
const mainEditorArea = document.getElementById("mainEditorArea");
const mainNotes = document.getElementById("mainNotes");
const addNoteBtn = document.getElementById("addNote");
const notesList = document.getElementById("notesList");
const noteInput = document.getElementById("noteInput");
const saveNotesBtn = document.getElementById("saveNotesBtn");

// default screen eventlistners for toggling sidebar
toggler.addEventListener("click", () => {
    sidebr.style.display == "none"
        ? (sidebr.style.display = "block")
        : (sidebr.style.display = "none");
});

// function for appending new note to notes list
const appendNewNote = (listChild) => {
    let newNote = document.createElement("li");
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

// markdown parsing eventlistner

mainEditorArea.addEventListener("keypress", (e) => {
    let result = markdown.render(e.target.value);
    mainNotes.innerHTML = result;
});

saveNotesBtn.addEventListener("click", () => {
    let allNotesList = [];
    notesList.childNodes.forEach((note) => {
        allNotesList.push(note.textContent);
    });

    const id = Math.floor(Math.random() * 1000);

    // auth.onAuthStateChanged((user) => {
    //     if (user) {
    //         firestore
    //             .collection(user.uid)
    //             .doc("_" + id)
    //             .set({
    //                 id: "_" + id,
    //                 notesList,
    //                 markdown,
    //                 parsedNotes,
    //             })
    //             .then(() => {
    //                 console.log("todo added");
    //             })
    //             .catch((err) => {
    //                 console.log(err.message);
    //             });
    //     } else {
    //         alert("Can not save your notes, please login first");
    //         location = "/login.html";
    //     }
    // });
});

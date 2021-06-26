// getting all the required dom ele
const toggler = document.getElementById("toggler");
const sidebr = document.getElementById("sidebr");
const addNote = document.getElementById("addNote");
const defaultScreen = document.getElementById("defaultScreen");
const mainNotes = document.getElementById("mainNotes");
const editorDisplay = document.getElementById("editorDisplay");
const editorToggler = document.getElementById("editorToggler");
const notesContainer = document.getElementById("notesContainer");

// default tasks for toggling conditionally
// editorToggler.style.display = "none";

// default screen eventlistners mostly for toggling
toggler.addEventListener("click", () => {
    sidebr.style.display == "none"
        ? (sidebr.style.display = "block")
        : (sidebr.style.display = "none");
});

addNote.addEventListener("click", () => {
    defaultScreen.style.display = "none";
    mainNotes.style.display = "none";
    notesContainer.style.display = "none";
    editorDisplay.style.display = "flex";
    editorToggler.style.display = "flex";
});

editorToggler.addEventListener("click", () => {
    if (mainNotes.style.display == "block") {
        mainNotes.style.display = "none";
        notesContainer.style.display = "none";
        editorDisplay.style.display = "block";
    } else {
        mainNotes.style.display = "block";
        notesContainer.style.display = "block";
        editorDisplay.style.display = "none";
    }
});

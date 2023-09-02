//varaible
const listNote = document.querySelector(".list-note");

//eventlistener
eventListeners();
//form submision
function eventListeners() {
  document.querySelector("#form").addEventListener("submit", newNotePad);

  // remove note
  document.querySelector(".list-note").addEventListener("click", removeNote);

  //get data from local storage on loaded
  document.addEventListener("DOMContentLoaded", getDataOnLoaded);
}

//function

//add to new notepad to list

function newNotePad(event) {
  event.preventDefault();

  //access value
  const inputNote = document.querySelector("#input-note").value;

  //add new <li> tags
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(inputNote));

  //set attribut
  li.setAttribute("class", "type-li");

  //add li to listNode
  listNote.appendChild(li);

  // create removebtn
  const removeBtn = document.createElement("a");
  removeBtn.textContent = "X";
  removeBtn.setAttribute("class", "delete-btn");

  //add removebtn to li
  li.appendChild(removeBtn);

  this.reset();

  addNoteToLocalStorage(inputNote);

  alert("The note was saved successfully");
}

//function's remove Note from list
function removeNote(event) {
  if (event.target.classList.contains("delete-btn")) {
    event.target.parentElement.remove();
  }

  //also remove note from local storage
  removeNoteFromLocalStorage(event.target.parentElement.textContent);
}

//add notes to local storage
function addNoteToLocalStorage(inputNote) {
  const note = localStorageFullOrNull(inputNote);
  note.push(inputNote);
  localStorage.setItem("notes", JSON.stringify(note));
}

//local storage full or null
function localStorageFullOrNull() {
  let notes;

  let getNoteLS = localStorage.getItem("notes");
  if (getNoteLS === null) {
    notes = [];
  } else {
    notes = JSON.parse(getNoteLS);
  }
  return notes;
}

//get data from local storage on loaded
function getDataOnLoaded() {
  const note = localStorageFullOrNull();

  note.forEach((inputNote) => {
    // create removebtn
    const removeBtn = document.createElement("a");
    removeBtn.textContent = "X";
    removeBtn.setAttribute("class", "delete-btn");

    //add new <li> tags
    const li = document.createElement("li");
    li.setAttribute("class", "type-li");
    li.appendChild(removeBtn);
    //add li to listNode
    listNote.appendChild(li);

    //access value
    // const inputNote = document.querySelector("#input-note").value;

    li.appendChild(document.createTextNode(inputNote));
  });
}

//fuction's remove note in local storage
function removeNoteFromLocalStorage(noteContent) {
  const noteDelete = noteContent.slice(0, noteContent.length - 1);
  // console.log(notes);

  //delete data in local storage
  const note = localStorageFullOrNull();
  note.forEach((element, index) => {
    if (element === noteDelete) {
      note.splice(index, 1);
    }

    localStorage.setItem("notes", JSON.stringify(note));

    // console.log(element);
    // console.log(index);
    // console.log(noteDelete);
  });
}

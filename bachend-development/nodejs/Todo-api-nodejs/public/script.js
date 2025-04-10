document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const noteForm = document.getElementById("noteForm");
  const notesList = document.getElementById("notesList");

  // Function to fetch all notes
  const fetchNotes = async () => {
    let notes = await fetch("http://localhost:3000/api/notes");
    notes = await notes.json();
    renderNotes(notes);
  };

  // Function to render notes to the DOM
  const renderNotes = (notes) => {
    notesList.innerHTML = "";
    const table = document.createElement("table");
    const tableHeader = document.createElement("tr");
    const headerId = document.createElement("th");
    const headerTitle = document.createElement("th");
    const headerActions = document.createElement("th");
    headerId.innerText = "ID";
    headerTitle.innerText = "Title";
    headerActions.innerText = "Actions";

    tableHeader.appendChild(headerId);
    tableHeader.appendChild(headerTitle);
    tableHeader.appendChild(headerActions);
    table.appendChild(tableHeader);

    notes.forEach((note) => {
      const tableRow = document.createElement("tr");
      const tableId = document.createElement("td");
      const tableTitle = document.createElement("td");
      const tableActions = document.createElement("td");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");
      editButton.innerText = "Edit";
      deleteButton.innerText = "Delete";
      tableId.innerText = note.id;
      tableTitle.innerText = note.title;
      tableRow.appendChild(tableId);
      tableRow.appendChild(tableTitle);
      tableActions.appendChild(editButton);
      tableActions.appendChild(deleteButton);
      tableRow.appendChild(tableActions);
      table.appendChild(tableRow);

      editButton.addEventListener("click", editNote);
      deleteButton.addEventListener("click", deleteNote);
    });

    notesList.appendChild(table);
  };

  function editNote(event) {
    const noteId =
      event.target.parentElement.parentElement.firstChild.innerText;
    const noteTitle = event.target.parentElement.previousSibling.innerText;
    const titleInput = document.getElementById("noteTitle");
    titleInput.value = noteTitle;
    noteForm.onsubmit = async (e) => {
      e.preventDefault();
      await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titleInput.value }),
      });
      titleInput.value = "";
      fetchNotes();
    };
  }
  function deleteNote(event) {
    const noteId =
      event.target.parentElement.parentElement.firstChild.innerText;
    fetch(`http://localhost:3000/api/notes/${noteId}`, {
      method: "DELETE",
    }).then(() => fetchNotes());
  }

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const titleInput = document.getElementById("noteTitle");
    const title = titleInput.value.trim();

    if (title) {
      await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      titleInput.value = "";
      fetchNotes();
    }
  };

  // Add event listeners
  noteForm.addEventListener("submit", handleSubmit);

  // Initial fetch
  fetchNotes();
});

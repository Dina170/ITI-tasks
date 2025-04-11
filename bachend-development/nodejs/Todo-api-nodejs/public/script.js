const apiRequest = async (url, method = "GET", body = null) => {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(responseText);
  }

  return responseText;
};

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const titleInput = document.getElementById("noteTitle");
    const title = titleInput.value.trim();
    const contentInput = document.getElementById("noteContent");
    const content = contentInput.value.trim();

    if (title && content) {
      try {
        await apiRequest("http://localhost:3000/api/notes", "POST", {
          title,
          content,
        });
        titleInput.value = "";
        contentInput.value = "";
        fetchNotes();
      } catch (error) {
        alert(`Failed to create note: ${error.message}`);
      }
    }
  };

  function editNote(event) {
    const noteId =
      event.target.parentElement.parentElement.firstChild.innerText;

    apiRequest(`http://localhost:3000/api/notes/${noteId}`)
      .then((response) => {
        const note = JSON.parse(response);
        const titleInput = document.getElementById("noteTitle");
        const contentInput = document.getElementById("noteContent");
        titleInput.value = note.title;
        contentInput.value = note.content;

        noteForm.onsubmit = async (e) => {
          e.preventDefault();
          try {
            await apiRequest(
              `http://localhost:3000/api/notes/${noteId}`,
              "PUT",
              {
                title: titleInput.value,
                content: contentInput.value,
              }
            );
            titleInput.value = "";
            contentInput.value = "";
            fetchNotes();
          } catch (error) {
            alert(`Failed to update note: ${error.message}`);
          }
        };
      })
      .catch((error) => alert(`Failed to fetch note: ${error.message}`));
  }

  function deleteNote(event) {
    const noteId =
      event.target.parentElement.parentElement.firstChild.innerText;
    apiRequest(`http://localhost:3000/api/notes/${noteId}`, "DELETE")
      .then(() => fetchNotes())
      .catch((error) => alert(`Failed to delete note: ${error.message}`));
  }

  // Add event listeners
  noteForm.addEventListener("submit", handleSubmit);

  // Initial fetch
  fetchNotes();
});

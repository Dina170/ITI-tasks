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
    headerId.innerText = "ID";
    headerTitle.innerText = "Title";

    tableHeader.appendChild(headerId);
    tableHeader.appendChild(headerTitle);
    table.appendChild(tableHeader);

    notes.forEach((note) => {
      const tableRow = document.createElement("tr");
      const tableId = document.createElement("td");
      const tableTitle = document.createElement("td");
      tableId.innerText = note.id;
      tableTitle.innerText = note.title;
      tableRow.appendChild(tableId);
      tableRow.appendChild(tableTitle);
      table.appendChild(tableRow);
    });

    notesList.appendChild(table);
  };

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

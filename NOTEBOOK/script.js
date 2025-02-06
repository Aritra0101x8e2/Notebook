let diaryEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    // Function to add a new entry
    function addEntry() {
      const entryText = document.getElementById("entry-text").value.trim();

      if (entryText !== "") {
        const entry = {
          text: entryText,
          id: new Date().getTime(),
        };

        diaryEntries.push(entry);
        document.getElementById("entry-text").value = "";  // Clear the text area
        saveEntries();
        renderEntries();
      }
    }
    // Function to delete an entry
    function deleteEntry(entryId) {
      diaryEntries = diaryEntries.filter(entry => entry.id !== entryId);
      saveEntries();
      renderEntries();
    }

    // Function to view an entry's content
    function viewEntry(entryId) {
      const entryContent = document.getElementById(`entry-content-${entryId}`);
      entryContent.style.display = entryContent.style.display === "block" ? "none" : "block";
    }

    // Function to save entries to localStorage
    function saveEntries() {
      localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
    }

    // Function to render diary entries on the page
    function renderEntries() {
      const entryListContainer = document.getElementById("entry-list");
      entryListContainer.innerHTML = ""; // Clear current list

      if (diaryEntries.length === 0) {
        entryListContainer.classList.add("no-entries");
        entryListContainer.textContent = "No notes written yet 😞 Write your first note 👆!";
      } else {
        entryListContainer.classList.remove("no-entries");

        diaryEntries.forEach((entry, index) => {
          const entryDiv = document.createElement("div");
          entryDiv.classList.add("entry");

          const entryHeader = document.createElement("div");
          entryHeader.classList.add("entry-header");
          entryHeader.textContent = `Note ${index + 1}`; // Show Entry number

          const entryContent = document.createElement("div");
          entryContent.classList.add("entry-content");
          entryContent.id = `entry-content-${entry.id}`;
          entryContent.textContent = entry.text; // Show content of entry

          const buttonsBox = document.createElement("div");
          buttonsBox.classList.add("buttons-box");

          const viewButton = document.createElement("button");
          viewButton.classList.add("view-btn");
          viewButton.textContent = "View Entry";
          viewButton.onclick = function () { viewEntry(entry.id); };

          const deleteButton = document.createElement("button");
          deleteButton.classList.add("delete-btn");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = function () { deleteEntry(entry.id); };

          buttonsBox.appendChild(viewButton);
          buttonsBox.appendChild(deleteButton);

          entryDiv.appendChild(entryHeader);
          entryDiv.appendChild(entryContent);
          entryDiv.appendChild(buttonsBox);

          entryListContainer.appendChild(entryDiv);
        });
    }
}
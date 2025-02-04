function convertOwnerToMultiSelect(executionContext) {
  // Get the form context
  var formContext = executionContext.getFormContext();

  // Get the Owner lookup field and hide it
  var ownerField = formContext.getControl("ownerid");
  //ownerField.setVisible(false);

  // Add a container for the custom multi-select field
  var container = document.createElement("div");
  container.id = "customOwnerField";
  container.className = "custom-multi-select";
  container.innerHTML = `
    <div id="selected-owners" class="selected-owners"></div>
    <input id="multi-owner-input" type="text" placeholder="Start typing to search..." />
    <div id="multi-owner-dropdown" class="dropdown hidden"></div>
  `;
  ownerField.getParent().getElement().appendChild(container);

  // Fetch users for the dropdown
  fetchUsersForMultiSelect(formContext);
}

function fetchUsersForMultiSelect(formContext) {
  // Sample fetch logic for system users
  Xrm.WebApi.retrieveMultipleRecords("systemuser", "?$select=fullname,systemuserid").then(
    function (result) {
      var users = result.entities.map(function (user) {
        return { id: user.systemuserid, name: user.fullname };
      });
      setupMultiSelect(users);
    },
    function (error) {
      console.error("Error fetching users:", error.message);
    }
  );
}

function setupMultiSelect(users) {
  const input = document.getElementById("multi-owner-input");
  const dropdown = document.getElementById("multi-owner-dropdown");
  const selectedOwnersContainer = document.getElementById("selected-owners");

  const selectedUsers = new Set();

  // Handle input changes
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    dropdown.innerHTML = ""; // Clear dropdown

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(query));
    if (filteredUsers.length === 0) {
      dropdown.classList.add("hidden");
      return;
    }

    dropdown.classList.remove("hidden");
    filteredUsers.forEach(user => {
      const div = document.createElement("div");
      div.className = "dropdown-item";
      div.textContent = user.name;
      div.addEventListener("click", () => selectUser(user, selectedUsers, selectedOwnersContainer, dropdown, input));
      dropdown.appendChild(div);
    });
  });

  // Hide dropdown on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-multi-select")) {
      dropdown.classList.add("hidden");
    }
  });
}

function selectUser(user, selectedUsers, container, dropdown, input) {
  if (selectedUsers.has(user.id)) return;

  selectedUsers.add(user.id);
  const div = document.createElement("div");
  div.className = "selected-person";
  div.innerHTML = `
    <span>${user.name}</span>
    <button class="remove-btn">&times;</button>
  `;
  div.querySelector(".remove-btn").addEventListener("click", () => {
    selectedUsers.delete(user.id);
    container.removeChild(div);
  });
  container.appendChild(div);

  // Clear input and hide dropdown
  input.value = "";
  dropdown.classList.add("hidden");
}

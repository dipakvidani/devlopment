document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (user) {
    // Fill all fields
    document.getElementById("first_name").value = user.firstName || "";
    document.getElementById("last_name").value = user.lastName || "";
    document.getElementById("user_email").value = user.email || "";
    document.getElementById("user_address").value = user.address || "";
    document.getElementById("editEmail").value = user.email || "";
    document.getElementById("editUsername").value = user.username || "";
    document.getElementById("editFirstName").value = user.firstName || "";
    document.getElementById("editLastName").value = user.lastName || "";
    document.getElementById("editGender").value = user.gender || "";
    document.getElementById("editImage").value = user.image || "";
    document.getElementById("user-details").innerHTML = `
      <strong>Logged in as:</strong> ${user.email}<br>
      <img src="${user.image}" alt="Profile" style="width:64px;height:64px;border-radius:50%;">
    `;
  } else {
    // If no user is logged in, show a message
    document.getElementById("user-details").innerHTML = `<span class="text-danger">No user logged in.</span>`;
  }

  document.getElementById("edit-profile-form").addEventListener("submit", function (e) {
    e.preventDefault();
    // Update user object from all fields
    user.firstName = document.getElementById("first_name").value;
    user.lastName = document.getElementById("last_name").value;
    user.email = document.getElementById("user_email").value;
    user.address = document.getElementById("user_address").value;
    user.username = document.getElementById("editUsername").value;
    user.gender = document.getElementById("editGender").value;
    user.image = document.getElementById("editImage").value;
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Profile updated!");
    document.getElementById("user-details").innerHTML = `
      <strong>Logged in as:</strong> ${user.email}<br>
      <img src="${user.image}" alt="Profile" style="width:64px;height:64px;border-radius:50%;">
    `;
  });
});

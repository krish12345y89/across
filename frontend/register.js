document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!userName || !email || !password) {
      alert("All fields are required!");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const submitButton = document.querySelector("#registerForm button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Registering...";

    try {
      const response = await fetch("http://3.219.117.230:5000/api/v1/user/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      alert(data.message || data.error);

      if (data.message === "user signup successfully") {
        window.location.href = "http://3.219.117.230/login.html";
      }
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
      console.error("Error during registration:", error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Register";
    }
  });

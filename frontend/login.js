document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    try {
      const response = await fetch("http://3.219.117.230:5000/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      alert(data.message || data.error);
  
      if (data.message === "login successfully") {
        window.location.href = "http://3.219.117.230/welcome.html";
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
      console.error("Error during login:", error);
    }
  });
  
document
  .getElementById("forgetPasswordForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("forgetEmail").value;

    const response = await fetch(
      "http://3.219.117.230:5000/api/v1/user/forget-password-token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    alert(data.message || data.error);
    const res = String(data.message);
    if (res.includes("successfully")) {
      window.location.href = "http://3.219.117.230/reset.html";
    }
  });

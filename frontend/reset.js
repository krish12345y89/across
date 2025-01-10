document
  .getElementById("resetPasswordForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("resetEmail").value;
    const token = document.getElementById("resetToken").value;
    const newPassword = document.getElementById("newPassword").value;

    const response = await fetch(
      "http://3.219.117.230:5000/api/v1/user/forget-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      }
    );

    const data = await response.json();
    alert(data.message || data.error);
    if (data.message == "Password has been reset successfully") {
      window.location.href = "http://3.219.117.230/login.html";
    }
  });

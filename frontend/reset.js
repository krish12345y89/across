document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;
    const token = document.getElementById('resetToken').value;
    const newPassword = document.getElementById('newPassword').value;

    const response = await fetch('http://localhost:5000/api/v1/user/forget-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword }),
    });

    const data = await response.json();
    alert(data.message || data.error);
    window.location.href = "http://127.0.0.1:5500/frontend/login.html";
});

document.getElementById('forgetPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgetEmail').value;

    const response = await fetch('http://localhost:5000/api/v1/user/forget-password-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();
    alert(data.message || data.error);
    window.location.href = "http://127.0.0.1:5500/frontend/reset.html";
});

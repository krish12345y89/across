document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/api/v1/user/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, email, password }),
    });

    const data = await response.json();
    alert(data.message || data.error);
    window.location.href = "http://127.0.0.1:5500/frontend/login.html";
});

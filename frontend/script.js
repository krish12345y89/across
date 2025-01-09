document.getElementById('newUser Form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/api/v1/user/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email, password }),
    });

    const data = await response.json();
    alert(data.data.message);
});

document.getElementById('loginForm').addEventListener ('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('forgetPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgetEmail').value;

    const response = await fetch('/api/v1/user/forget-password-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;
    const token = document.getElementById('resetToken').value;
    const newPassword = document.getElementById('newPassword').value;

    const response = await fetch('/api/v1/user/forget-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token, newPassword }),
    });

    const data = await response.json();
    alert(data.message);
});
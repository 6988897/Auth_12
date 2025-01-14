const API_URL = 'http://localhost:3000';


if (document.getElementById('registration-form')) {
  document.getElementById('registration-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      confirmPassword: document.getElementById('confirm-password').value,
      name: document.getElementById('name').value,
      nickname: document.getElementById('nickname').value,
      phone: document.getElementById('phone').value,
      gender: document.getElementById('gender').value,
      avatar: document.getElementById('avatar').files[0] 
    };

    if (!validateForm(userData)) {
      return;
    }

    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      alert('Регистрация успешна!');
      window.location.href = 'login.html';
    } else {
      alert('Ошибка регистрации');
    }
  });
  document.getElementById('generate-password').addEventListener('click', () => {
    const password = generatePassword();
    document.getElementById('password').value = password;
    document.getElementById('confirm-password').value = password;
  });

}

function generatePassword(length = 16) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

function validateForm(data) {
  const { email, password, confirmPassword, name, nickname, phone } = data;

  
  const hasSpaces = (str) => /\s/.test(str);
  if (hasSpaces(email) || hasSpaces(password) || hasSpaces(name) || hasSpaces(nickname) || hasSpaces(phone)) {
    alert("Ни одно из полей не должно содержать пробелы!");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Пароли не совпадают!");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Введите корректный email!");
    return false;
  }

  

  const phoneRegex = /^\+375\d{9}$/;
  if (!phoneRegex.test(phone)) {
    alert("Введите корректный номер телефона в формате +375XXXXXXXXX!");
    return false;
  }

  return true;
}



if (document.getElementById('login-form')) {
  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { accessToken, user } = await response.json();
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = 'profile.html';
    } else {
      alert('Неверный email или пароль');
    }
  });
}


if (document.getElementById('user-email')) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('registration-date').textContent = new Date().toLocaleString();
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-nickname').textContent = user.nickname;
    document.getElementById('user-phone').textContent = user.phone;
    document.getElementById('user-gender').textContent = user.gender;
  } else {
    window.location.href = 'login.html';
  }

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  });
}


if (document.getElementById('go-to-login')) {
  document.getElementById('go-to-login').addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}

if (document.getElementById('go-to-signup')) {
  document.getElementById('go-to-signup').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

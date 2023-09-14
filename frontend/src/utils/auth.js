import Cookies from 'js-cookie';

export async function loginUser(data) {
  // Fetch CSRF token from cookies
  const csrfToken = Cookies.get('csrftoken');

  // First check if user exists
  const findUserResponse = await fetch('/users/find/', {
    method: 'POST',
    headers: {
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
    },
    body: JSON.stringify({ email: data.email }),
  });

  const userExists = await findUserResponse.json();
  console.log('userExists: ', userExists);

  if (!userExists) {
    alert('Incorrect email or password');
  }

  // If user found, log them in
  const loginResponse = await fetch('/users/login/', {
    method: 'POST',
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
    },
    body: JSON.stringify(data),
  });
  const loginData = await loginResponse.json();

  console.log('loginData: ', loginData);
  if (loginData.message === 'Login successful!') {
    localStorage.setItem('token', loginData.token);
    return loginData; // Return the parsed response data
  } else {
    throw new Error('Login failed');
  }
}

export async function registerUser(data) {
  // Fetch CSRF token from cookies
  const csrfToken = Cookies.get('csrftoken');

  const response = await fetch('/users/register/', {
    method: 'POST',
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

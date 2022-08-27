 async function loginFormHandler(event) {
  event.preventDefault();
  
 // Collect values from the login form
  const emaillogin = document.querySelector('#email-login').value.trim();
  const passwordlogin = document.querySelector('#password-login').value.trim();

 if (emaillogin && passwordlogin) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ emaillogin, passwordlogin }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      alert("logging in")
      document.location.replace('/api/dashboard/profile');
    } else {
      alert(response.statusText);
    }
  }
 }
 
 
 async function userSubmit(event) {
  event.preventDefault();
  const name = document.querySelector('#name-signup').value;
  const email = document.querySelector('#email-signup').value;
  const password = document.querySelector('#password-signup').value;
 //const submit = document.querySelector('#submit').value;
 // Send fetch request to add a new User
  const response = await fetch(`/api/users/`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (response.ok) {
    alert('name added');
     document.location.replace(`/api/users/signup/${email}`);
    //document.location.replace('/');
  } else {
    alert('Failed to add name');
  }
 };
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', userSubmit);

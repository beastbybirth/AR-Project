document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const isTeacher = document.getElementById('isTeacher').checked;
  
      const userData = {
        email: email,
        password: password,
        isTeacher: isTeacher,
      };
  
      // Send the form data to the API endpoint using fetch()
    fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          console.log('login successful!');
          window.location.href = '/welcome';
        } else {
          console.log('Error during login:', response.statusText);
        }
      })
      .catch(error => {
        console.log('Error during registration:', error);
      });
    });
  });
  
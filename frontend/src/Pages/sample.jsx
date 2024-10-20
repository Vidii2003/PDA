
// import React, { useEffect } from 'react';

// const Login = () => {
//   useEffect(() => {
//     const signUpButton = document.getElementById('signUp');
//     const signInButton = document.getElementById('signIn');
//     const container = document.getElementById('container');

//     signUpButton.addEventListener('click', () => {
//       container.classList.add('right-panel-active');
//     });

//     signInButton.addEventListener('click', () => {
//       container.classList.remove('right-panel-active');
//     });

//     // Cleanup event listeners on component unmount
//     return () => {
//       signUpButton.removeEventListener('click', () => {
//         container.classList.add('right-panel-active');
//       });

//       signInButton.removeEventListener('click', () => {
//         container.classList.remove('right-panel-active');
//       });
//     };
//   }, []);

//   return (
//     <div>
//       <style>
        
//       </style>

//       <div className="container w-[800px]" id="container">
//         <div className="form-container sign-up-container ">
//           <form className="flex flex-col items-center p-8" action="#">
//             <h1 className="font-bold text-2xl mb-4  text-black">Create Account</h1>
//             <span className="text-sm mb-4">or use your email for registration</span>
//             <input type="text" placeholder="Name" className="input" />
//             <input type="email" placeholder="Email" className="input" />
//             <input type="password" placeholder="Password" className="input" />
//             <button className="btn-primary mt-5" onclick="/">Sign Up</button>
//           </form>
//         </div>
//         <div className="form-container sign-in-container">
//           <form className="flex flex-col items-center p-8" action="#">
//             <h1 className="font-bold text-2xl mb-4 text-black">Sign in</h1>
//             <span className="text-sm mb-4">or use your account</span>
//             <input type="email" placeholder="Email" className="input" />
//             <input type="password" placeholder="Password" className="input" />
//             <a href="#" className="text-blue-500 mb-4">Forgot your password?</a>
//             <button className="btn-primary mt-5" onclick="/">Sign In</button>
//           </form>
//         </div>
//         <div className="overlay-container">
//           <div className="overlay">
//             <div className="overlay-panel overlay-left">
//               <h1 className="font-bold text-2xl">Welcome Back!</h1>
//               <p className="text-md py-10">To keep connected with us, please login with your personal info</p>
//               <button className="ghost" id="signIn">Sign In</button>
//             </div>
//             <div className="overlay-panel overlay-right">
//               <h1 className="font-bold text-2xl">Hello, Friend!</h1>
//               <p className="text-sm">Enter your personal details and start the journey with us</p>
//               <button className="ghost" id="signUp">Sign Up</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    regno: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    const handleSignUp = () => {
      container.classList.add('right-panel-active');
      setIsRegistering(true);
    };

    const handleSignIn = () => {
      container.classList.remove('right-panel-active');
      setIsRegistering(false);
    };

    signUpButton.addEventListener('click', handleSignUp);
    signInButton.addEventListener('click', handleSignIn);

    return () => {
      signUpButton.removeEventListener('click', handleSignUp);
      signInButton.removeEventListener('click', handleSignIn);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Determine the URL based on whether the user is registering or logging in
    const url = isRegistering
      ? 'http://localhost:5000/auth/register'  // URL for registration
      : 'http://localhost:5000/auth/login';    // URL for login
  
    // Prepare the payload based on the form data
    const payload = isRegistering
      ? { name: formData.name, email: formData.email, password: formData.password, regno: formData.regno }
      : { email: formData.email, password: formData.password };
  
    try {
      // Send the request to the server
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data =response.json();
  
      // Check if the response is ok; if not, throw an error
      if (!response.ok) {
        throw new Error(data.msg || 'An error occurred');
      }
  
      // Handle successful response (e.g., store the token or redirect the user)
      console.log('Success:', data.token);  // Example of handling success
      // You can redirect or set user context here if needed
  
    } catch (err) {
      // Update the error state to display any errors to the user
      setError(err.message);
    }
  };
  

  return (
    <div>
      <style>
      {`
  body {
    background: url("https://i.pinimg.com/originals/be/14/1b/be141b5f8bfd10a522176b7c612b9fd0.gif");
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    height: 100vh;
    margin: -20px 0 50px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  h2 {
    text-align: center;
  }

  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  button {
    border-radius: 20px;
    border: 1px solid #FF4B2B;
    background-color: #FF4B2B;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background-color: transparent;
    border-color: #FFFFFF;
  }

  form {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25),
      0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%, 100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container{
    transform: translateX(-100%);
  }

  .overlay {
    background: #FF416C;
    background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
    background: linear-gradient(to right, #FF4B2B, #FF416C);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }


  
`}
      </style>
      <div className="container w-[800px]" id="container">
        <div className="form-container sign-up-container">
          <form className="flex flex-col items-center p-8" onSubmit={handleSubmit}>
            <h1 className="font-bold text-2xl mb-4 text-black">Create Account</h1>
            <span className="text-sm mb-4">or use your email for registration</span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required={isRegistering}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {isRegistering && (
              <input
                type="text"
                name="regno"
                placeholder="Registration Number"
                value={formData.regno}
                onChange={handleChange}
                required
              />
            )}
            <button className="btn-primary mt-5" type="submit">
              {isRegistering ? 'Sign Up' : 'Sign In'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="flex flex-col items-center p-8" onSubmit={handleSubmit}>
            <h1 className="font-bold text-2xl mb-4">Sign In</h1>
            <span className="text-sm mb-4">or use your account</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="btn-primary mt-5" type="submit">
              Sign In
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="font-bold text-3xl mb-4">Welcome Back!</h1>
              <button className="btn-transparent font-bold" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="font-bold text-3xl mb-4">Hello, Friend!</h1>
              <button className="btn-transparent font-bold" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

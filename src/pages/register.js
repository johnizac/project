import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../../lib/authenticate';

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    userName: '',
    password: '',
    password2: '',
    fullName: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(userData.userName, userData.password, userData.password2);
      setMessage('Registration successful!');
      router.push("/login");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Username:
            </label>
            <input
              id="userName"
              className="form-control"
              type="text"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password2" className="form-label">
              Re-enter Password:
            </label>
            <input
              id="password2"
              className="form-control"
              type="password"
              name="password2"
              value={userData.password2}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name:
            </label>
            <input
              id="fullName"
              className="form-control"
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          {message && <div className="text-center mt-3">{message}</div>}
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
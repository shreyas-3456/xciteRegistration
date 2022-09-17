import React from 'react';
import { useState } from 'react';
import { useFetch } from '../context/Context';

const Registration = () => {
	const { sendEmail, formError, text } = useFetch();
	const intialCrendentials = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	};
	const [credentials, setCredentials] = useState({ ...intialCrendentials });
	const [error, setError] = useState({ status: false, message: '' });

	const handleChange = (e) => {
		const name = e.target.name;
		setCredentials((oldState) => {
			return { ...oldState, [name]: e.target.value };
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setError(false);
		const { name, password, confirmPassword, email } = credentials;
		if (!name || !password || !confirmPassword || !email) {
			setError((oldState) => {
				return {
					...oldState,
					status: true,
					message: 'please provide all values',
				};
			});
			return;
		}
		if (credentials.password !== credentials.confirmPassword) {
			setError((oldState) => {
				return { ...oldState, status: true, message: 'passwords dont match' };
			});
			return;
		} else {
			sendEmail(credentials.email);
		}
	};
	return (
		<div className="container">
			<div className="sign-in-container">
				<div className="info-container">
					<h2>Register</h2>
					<p>Register to start with us</p>
				</div>
				<div className="form-container">
					<form action="">
						<input
							type="name"
							placeholder=" Name"
							name="name"
							value={credentials.name}
							onChange={handleChange}
						/>
						<input
							type="email"
							placeholder=" Email"
							name="email"
							value={credentials.email}
							onChange={handleChange}
						/>
						<input
							type="password"
							placeholder=" Password"
							name="password"
							value={credentials.password}
							onChange={handleChange}
						/>
						<input
							type="password"
							placeholder="Confirm password"
							name="confirmPassword"
							value={credentials.confirmPassword}
							onChange={handleChange}
						/>
						{formError && <p style={{ color: 'red' }}>{text}</p>}
						{setError && <p style={{ color: 'red' }}>{error.message}</p>}
						<button className="form-button" onClick={handleSubmit}>
							Sign in
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Registration;

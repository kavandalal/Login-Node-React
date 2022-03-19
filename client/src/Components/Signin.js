import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { API_URL } from '../Common/API_URL';
import { useAlert } from 'react-alert';

const Signin = () => {
	const alert = useAlert();
	const [inputData, setInputData] = useState({
		email: '',
		password: '',
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputData((prev) => ({
			...inputData,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputData);
		axios
			.post(`/signin`, inputData, { 'Content-Type': 'application/json' })
			.then((res) => {
				if (res.data.status == 'success') {
					console.log(res);
					alert.success(res.data.msg);
				} else {
					console.log(res);
					alert.error(res.data.msg);
				}
				handleClear();
			})
			.catch((err) => {
				console.log(err);
				alert.error(err.data.msg);
			});
	};
	const handleClear = () => {
		setInputData({
			email: '',
			password: '',
		});
	};
	return (
		<div class='m-3'>
			<form onSubmit={handleSubmit} style={{ display: 'table-caption' }}>
				<div>
					<label htmlFor='' className=''>
						Email
					</label>
					<input type='email' name='email' value={inputData.email} onChange={handleChange} />
				</div>
				<br />
				<div>
					<label htmlFor=''>Password</label>
					<input type='password' name='password' value={inputData.password} onChange={handleChange} />
				</div>
				<br />
				<span class='mx-2'>
					<Button type='submit'>Submit </Button>
				</span>
				<span class='mx-2'>
					<Button type='button' onClick={handleClear}>
						Clear
					</Button>
				</span>
			</form>
		</div>
	);
};

export default Signin;

import React from 'react';
import Links from './Links';
import Signin from './Signin.js';
import Signup from './Signup.js';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<Router>
				<Links />
				<Routes>
					<Route path='/signin' element={<Signin />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='*' element={<Navigate to='/signup' replace />} />
					{/* <Route path='/' element={<Home />} /> */}
				</Routes>
			</Router>
		</>
	);
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => {
	return (
		<div class='d-flex flex-row w-full justify-content-center align-items-center' style={{ backgroundColor: '#3e384e', height: '35px' }}>
			{/* <div class='text-center' style={{ flexGrow: 1 }}>
				<Link style={{ display: 'inline-block', width: '100%', color: 'white', textDecoration: 'none' }} to='/'>
					Home
				</Link>
			</div> */}
			<div class='text-center' style={{ flexGrow: 1 }}>
				<Link style={{ display: 'inline-block', width: '100%', color: 'white', textDecoration: 'none' }} to='/signup'>
					Sign-Up
				</Link>
			</div>
			<div class='text-center' style={{ flexGrow: 1 }}>
				<Link style={{ display: 'inline-block', width: '100%', color: 'white', textDecoration: 'none' }} to='/signin'>
					Sign-In
				</Link>
			</div>
		</div>
	);
};

export default Links;

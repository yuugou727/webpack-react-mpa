import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const css = require('./app.scss');

ReactDOM.render(
	<div>
		<Navbar />
		<p>Contact me!</p>
		<Footer />
	</div>,
	document.getElementById('root')
	);
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

const css = require('./app.scss');

ReactDOM.render(
	<div>
		<Navbar />
		<Container text><p>Contact me!</p></Container>
		<Footer />
	</div>,
	document.getElementById('root')
	);
import React from 'react';
import { render } from 'react-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react'


const css = require('./app.scss');

render(
	<div>
		<Navbar />
		<Container text>
			<p>This is Main Page</p>
		</Container>
		<Footer />
	</div>,
	document.getElementById('root')
);

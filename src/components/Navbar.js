import React, {Component} from 'react';

class Navbar extends React.Component {
	render() {
		const links =[
			{text:'Main', href:'index.html'},
			{text:'Contact', href: 'contact.html'}
		]
		return (
			<div>
				<ul>
					{links.map((v,i)=>(<li key={i}><a href={v.href}>{v.text}</a></li>))}
				</ul>
			</div>
		);
	}
}
export default Navbar;
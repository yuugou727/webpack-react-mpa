import React from 'react';
import { Button } from 'semantic-ui-react';


class Navbar extends React.Component {
	render() {
		const links =[
			{text:'Main', href:'index.html'},
			{text:'Contact', href: 'contact.html'}
		]
		return (
			<div>
				{links.map((v,i)=>(
					<Button key={i} content={v.text} onClick={(e)=>{location.href=v.href}}/>
				))}
			</div>
		);
	}
}
export default Navbar;
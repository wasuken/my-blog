import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom"
import styled from "styled-components"
import {Card_a,Card_content,Card_link,
		Card_section,Card_text,Card_title} from './styled/CardStyle'


const WIDTH = 200;

export const Card_img = styled.img`
	border-radius: 5px 5px 0 0;
	width: ${WIDTH}px;
	height: ${WIDTH}px;
`;

class ProfileBox extends React.Component{
	constructor(){
		super();
	}
	render(){
		return (
			<Card_section>
			  <Card_img src={this.props.profileImg} alt="" />
			  <Card_content>
				<Card_title>{this.props.myname}</Card_title>
				<Card_text>
				  {(this.props.desc || "")}
				</Card_text>
			  </Card_content>
			</Card_section>
		)
	}
}

export default ProfileBox;

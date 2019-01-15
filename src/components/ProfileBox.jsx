import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom"
import styled from "styled-components"
import {Card_a,Card_content,Card_img,Card_link,
		Card_section,Card_text,Card_title} from './styled/CardStyle'


class ProfileBox extends React.Component{
	constructor(){
		super();
	}
	render(){
		return (
			<Card_section>
			  <Card_img src="/img/ninja.jpg" alt="" />
			  <Card_content>
				<Card_title>{this.props.myname}</Card_title>
				<Card_text>
				  {(this.props.desc || "") + "..."}
				</Card_text>
			  </Card_content>
			</Card_section>
		)
	}
}

export default ProfileBox;

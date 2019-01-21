import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom"
import styled from "styled-components"
import {Card_a,Card_content,Card_link,
		Card_text,Card_title} from './styled/CardStyle'
import WordCloudBox from "./WordCloudBox"

const WIDTH = 200;

const Card_section = styled.section`
	float:left;
	width: ${WIDTH * 1.5}px;
	height: ${WIDTH * 2 + 100}px;
	border: medium solid #ff00ff;
	border-radius: 5px;
	box-shadow: 0 2px 5px #ccc;
	text-align: center !important;
	background-color: #ccc;
`;
const Card_img = styled.img`
	border-radius: 5px 5px 0 0;
	width: ${WIDTH}px;
	height: ${WIDTH}px;
`;

class ProfileBox extends React.Component{
	constructor(){
		super();
		this.state = {
			desc: ""
		}
		let that = this;
		fetch("/api/v1/profile?r=random")
			.then((resp) => {
				return resp.json();
			})
			.then((json) => {
				that.setState({
					desc: json[0]
				});
			});
	}
	render(){
		return (
			<Card_section>
				<Card_img src={this.props.profileImg} alt="" />
				<Card_content>
					<Card_title>{this.props.myname}</Card_title>
					<Card_text>
						{(this.state.desc || "")}
						<div>
							<WordCloudBox />
						</div>
					</Card_text>
				</Card_content>
			</Card_section>
		)
	}
}

export default ProfileBox;

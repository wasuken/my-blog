import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Card from "./Card"
import WordCloudBox from "./WordCloudBox"

const Li = styled.li`

`;

class Home extends React.Component{
	constructor(){
		super();
		this.state = {
			reports: []
		}
		let that = this;
		fetch("http://localhost:4567/api/v1").then((resp)=>{
			return resp.json();
		}).then((json)=>{
			that.setState({
				reports: json
			});
		});
	}
	render(){
		let cards = this.state.reports.map((report,i)=>{
			return <Card key={i} {...report}></Card>;
		});
		//cards.unshift(<WordCloudBox />);
		return (
			<div>
			  <ul>
				<div>
				  {cards}
				</div>
			  </ul>
			</div>
		)
	}
}
export default Home;

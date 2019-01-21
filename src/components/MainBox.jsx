import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom"
import styled from "styled-components"

const LeftColumn = styled.div`
	float: left;
	width: 70%;
`;
const RightColumn = styled.div`
	float: right;
	width: 30%;
`;
const RightBox = styled.div`

`;
const LeftBox = styled.div`

`;

class MainBox extends React.Component{
	constructor(){
		super();
	}
	render(){
		let leftBoxes = this.props.lefts.map((v,i) => {
			return <LeftBox key={i}>{v}</LeftBox>
		});
		let rightBoxes = this.props.rights.map((v,i) => {
			return <RightBox key={i}>{v}</RightBox>
		});
		return (
			<div>
				<LeftColumn>
					{leftBoxes}
				</LeftColumn>
				<RightColumn>
					{rightBoxes}
				</RightColumn>
			</div>
		);
	}
}
export default MainBox;

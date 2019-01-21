import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"
import { Link, Redirect } from "react-router-dom"
import hljs from 'highlight.js/lib/highlight';
import Card from "./Card"

const Li = styled.li`
  color: #2d8fdd;
  border-left: solid 6px #2d8fdd;
  display: table-cell;
  background: #f1f8ff;
  margin-bottom: 3px;
  line-height: 1.5;
  padding: 0.5em;
  list-style-type: none!important;
  &:hover {
    background: #668ad8;
    color: #FFF;
  }
`;

class Tag extends React.Component {
	constructor(){
		super();
		let tag =  location.pathname.substring(1)
		let that = this;
		this.state = {
			tags: []
		};
		fetch("/api/v1/" + tag).then((resp)=>{
			return resp.json();
		}).then((json)=>{
			that.setState({
				tags: json
			});
		});
	}
	render(){
		let cards = this.state.tags.map((blog,i)=>{
			return <Card key={i} {...blog}></Card>;
		});
		return (
			<div>
			  {cards}
			</div>
		)
	}
}
export default Tag;

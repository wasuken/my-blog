import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"
import { Link, Redirect } from "react-router-dom"

class Report extends React.Component {
	constructor(){
		super();
		const id = location.pathname.substring(1)
		let that = this;
		this.state = {
			title: "",
			body: "",
			tags_string: ""
		};
		fetch("http://localhost:4567/api/v1/" + id)
			.then((resp) => {
				return resp.json();
			})
			.then((json) => {
				console.log(json);
				that.setState({
					title: json.title,
					body: json.body,
					tags_string: json.tags_string
				});
			});
	}
	render(){
		return (
			<div>
			  <p>{this.state.title}</p>
			  <p>{this.state.tags_string}</p>
			  <p>{this.state.body}</p>
			  <Link to="/">Home</Link>
			</div>
		)
	}

}

export default Report;

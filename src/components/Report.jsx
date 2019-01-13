import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"
import { Link, Redirect } from "react-router-dom"
import hljs from 'highlight.js/lib/highlight';

const COLOR = "#364e96";
const H2 = styled.h2`
  color: ${COLOR};
  padding: 0.5em 0;
  border-top: solid 3px ${COLOR};
  border-bottom: solid 3px ${COLOR};
`;

const Body = styled.div`
  color: ${COLOR};
  border: solid 3px ${COLOR};
  padding: 0.5em;
  border-radius: 0.5em;
`;

const Tags = styled.h3`
  background: #dfefff;
  box-shadow: 0px 0px 0px 5px #dfefff;
  border: dashed 2px white;
  padding: 0.2em 0.5em;
`;
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
		console.log(this.state.body)
		return (
			<div>
			  <H2>{this.state.title}</H2>
			  <Tags>{this.state.tags_string}</Tags>
			  <Body>
				<div className="text" dangerouslySetInnerHTML={{__html: this.state.body}}>
				</div>
			  </Body>
			  <Link to="/">Home</Link>
			</div>
		)
	}

}

export default Report;

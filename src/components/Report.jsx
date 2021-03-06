import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"
import { Link, Redirect } from "react-router-dom"
import hljs from 'highlight.js/lib/highlight';
import Highlight from 'react-highlight'

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
const TagLink = styled.a`
  margin 10px;
`;
class Report extends React.Component {
	constructor(){
		super();
		const id = location.pathname.substring(1).split('/').slice(-1)[0]
		let that = this;
		this.state = {
			title: "",
			body: "",
			tags_string: ""
		};
		fetch("/api/v1/report/" + id)
			.then((resp) => {
				return resp.json();
			})
			.then((json) => {
				that.setState({
					title: json.title,
					body: json.body,
					tags_string: json.tags_string
				});
			});
	}
	render(){
		let tag_links = this.state.tags_string.split(' ')
			.map((tag,i) => <TagLink><Link key={i} to={"/tag/" + tag}>{tag}</Link></TagLink>);
		return (
			<div>
			  <H2>{this.state.title}</H2>
			  <Tags>{tag_links}</Tags>
			  <Body>
				<Highlight innerHTML={true}>
				  {this.state.body}
				</Highlight>
			  </Body>
			  <Link to="/">Home</Link>
			</div>
		)
	}

}

export default Report;

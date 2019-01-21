import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"
import { Link, Redirect } from "react-router-dom"
import hljs from 'highlight.js/lib/highlight';

const TagLink = styled.a`
  margin 10px;
`;

class TagList extends React.Component {
	constructor(){
		super();
		this.state = {
			tags: []
		}
		let that = this;
		fetch("/api/v1/tags").then((resp)=>{
			return resp.json();
		}).then((json)=>{
			that.setState({
				tags: json
			});
		});
	}
	render(){
		let tags = this.state.tags.map((v,k) =>{
			return <TagLink><Link key={k} to={'/tag/' + v['value']}>{v['value'] + ": " + v['count']}</Link></TagLink>;
		})
		return (
			<div>
				{tags}
				<p>
					<Link to="/">Home</Link>
				</p>
			</div>
		)
	}
}
export default TagList;

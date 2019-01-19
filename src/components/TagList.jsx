import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"
import { Link, Redirect } from "react-router-dom"
import hljs from 'highlight.js/lib/highlight';

class TagList extends React.Component {
	constructor(){
		super();
		this.state = {
			tags: []
		}
		let that = this;
		fetch("http://os3-369-17744.vs.sakura.ne.jp/api/v1/tags").then((resp)=>{
			return resp.json();
		}).then((json)=>{
			that.setState({
				tags: json
			});
		});
	}
	render(){
		let tags = this.state.tags.map((v,k) =>{
			return <p><Link key={k} to={'/tag/' + v}>{v}</Link></p>;
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

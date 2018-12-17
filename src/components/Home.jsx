import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"
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
		console.log(this.state.reports);
		let li = this.state.reports.map((report,i)=>{
			return <li key={i}><Link to={"/" + report.blog_id}>{report.title}</Link></li>;
		});
		console.log(li);
		return (
			<div>
			  <ul>
				{li}
			  </ul>
			</div>
		)
	}
}
export default Home;

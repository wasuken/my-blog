import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom"
import styled from "styled-components"
import { Chart } from "react-google-charts";

class AccessGraph extends React.Component{
	constructor(){
		super();
		this.state = {
			chart_json: [[]]
		}
		let that = this;
		fetch("/api/v1/graph/access").then(resp => resp.json()).then((json) => {
			that.setState({
				chart_json: json
			});
		})
	}
	render(){
		let charts = this.state.chart_json.map((v) => [v["month"], v["value"]])
		return(
			<div className={"my-pretty-chart-container"}>
				<Chart
				chartType="LineChart"
				data={[["Count", "Month"], ...charts]}
				width="100%"
				height="400px"
				legendToggle
				/>
			</div>
		);
	}
}
export default AccessGraph;

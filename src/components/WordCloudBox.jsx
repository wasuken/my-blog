import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"
import { Link ,Redirect, withRouter } from "react-router-dom"
import Highlight from 'react-highlight'
import WordCloud from 'react-d3-cloud';

const fontSizeMapper = word => Math.log2(word.value) * 5;
const rotate = word => word.value % 360;

class WordCloudBox extends React.Component{
	constructor(){
		super();
		let that = this;
		this.state = {
			data: [{text:"",value:2}],
			word: "",
			event: false
		};
		fetch("/api/v1/tags")
			.then((resp) => {
				return resp.json();
			})
			.then((json) => {
				that.setState({
					data: json.map((v) => ({text: v.value,value: v.count})).slice(0,20),
					word: "",
					event: false
				});
			});
	}
	handleClick(word){
		this.setState({
			data: this.state.data,
			word: word.text,
			event: true
		})
	}
	render(){
		if (this.state.event === true) {
			let w = this.state.word;
			let d = this.state.data;
			this.setState({
				data: d,
				word: "",
				event: false
			})
			return <Redirect to={'/tag/' + this.state.word} />
		}
		return(
			<WordCloud
			  data={this.state.data}
			  fontSizeMapper={fontSizeMapper}
			  rotate={rotate}
			  width={200}
			  height={200}
			  onWordClick={this.handleClick.bind(this)}
			  />
		)
	}
}
export default withRouter(WordCloudBox);

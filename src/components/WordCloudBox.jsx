import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Highlight from 'react-highlight'
import WordCloud from 'react-d3-cloud';

const fontSizeMapper = word => Math.log2(word.value) * 5;
const rotate = word => word.value % 360;

class WordCloudBox extends React.Component{
	constructor(){
		super();
		let that = this;
		this.state = {
			data: [{text:"aa",value:2}]
		};
		fetch("http://localhost:4567/api/v1/wordcloud/30")
			.then((resp) => {
				return resp.json();
			})
			.then((json) => {
				console.log(json);
				that.setState({
					data: json
				});
			});
	}
	render(){
		return(
			<WordCloud
			  data={this.state.data}
			  fontSizeMapper={fontSizeMapper}
			  rotate={rotate}
			  />
		)
	}
}
export default WordCloudBox;

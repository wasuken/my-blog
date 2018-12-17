import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"

const WIDTH = 500;
const HEIGHT = 1000;

const Input = styled.input`
  font-size: 1.5em;
  color: palevioletred;
  width: ${WIDTH}px;
`;
const Textarea = styled.textarea`
  width: ${WIDTH * 1.5}px;
  height: ${HEIGHT}px;
  outline: none;
  border: 1px solid #aaa;
  color: palevioletred;
  -webkit-transition: all .3s;
  transition: all .3s;
`;

const Container = styled.div`
  padding-left: 10px;
  padding-bottom: 10px;
`;
const H3 = styled.h3`
  padding: 0.5em;/*文字周りの余白*/
  color: #010101;/*文字色*/
  background: #eaf3ff;/*背景色*/
  border-bottom: solid 3px #516ab6;/*下線*/
`;
const Button = styled.button`
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding: 0.5em 1em;
  text-decoration: none;
  border-left: solid 4px #668ad8;
  border-right: solid 4px #668ad8;
  color: #668ad8;
  background: #e1f3ff;
  transition: .4s;
  &:hover {
    background: #668ad8;
    color: #FFF;
  }
`
class New extends React.Component {
	constructor(){
		super();
		this.state = {
			title: "",
			tags_string: "",
			body: ""
		};
		this.postReport = this.postReport.bind(this);
	}
	postReport(){
		let title = document.getElementById("title").value;
		let tags_string = document.getElementById("tags_string").value;
		let body = document.getElementById("body").value;
		console.log(`title=${title}&tags_string=${tags_string}&body=${body}`);
		fetch("http://localhost:4567/api/v1",{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `title=${title}&tags_string=${tags_string}&body=${body}`
		}).then((resp)=>{
			console.log(resp);
		});
	}
	render(){
		return (
				<Container>
				<H3>title</H3>
				<Input type="text" id="title" value={this.props.title} />
				<H3>tags_string</H3>
				<Input type="text" id="tags_string" value={this.props.tags_string} />
				<H3>body</H3>
				<Textarea id="body">{this.props.contents}</Textarea>
				<p><Button onClick={() => this.postReport()}>送信</Button></p>
				</Container>
		);
	}
}
export default New;

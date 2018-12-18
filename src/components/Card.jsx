import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"

const WIDTH = 200;

const Card_section = styled.section`
  float:left;
  width: ${WIDTH * 1.5}px;
  border: medium solid #ff00ff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
  text-align: center !important;
`;
const Card_img = styled.img`
  border-radius: 5px 5px 0 0;
  width: ${WIDTH * 1.5}px;
  height: ${WIDTH / 2}px;
`;
const Card_content = styled.div`
  width: ${WIDTH}px;
  display: block !important;
  margin: auto;
`;
const Card_title = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  width: ${WIDTH}px;
  text-align: center;
  color: #333;
`;
const Card_text = styled.div`
  color: #777;
  width: ${WIDTH}px;
  font-size: 14px;
  line-height: 1.5;
`;
const Card_link = styled.div`
  text-align: center;
  border-top: 1px solid #eee;
  margin: auto;
  width: ${WIDTH}px;
`;
const Card_a = styled.a`
  text-decoration: none;
  color: #0bd;
  margin: 0 10px;
  width: ${WIDTH}px;
  &:hover{
    color: #0090aa;
  }
`;

class Card extends React.Component{
	constructor(){
		super();
	}
	render(){
		return(
			<Card_section>
			  <Card_img src="/img/blog.jpg" alt="" />
			  <Card_content>
				<Card_title>{this.props.title}</Card_title>
				<Card_text>{this.props.body.substring(0,20) + "..."}</Card_text>
			  </Card_content>
			  <Card_link>
				<Link to={"/" + this.props.blog_id}>この記事を見る</Link>
			  </Card_link>
			</Card_section>
		)
	}
}
export default Card;

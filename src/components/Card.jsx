import React from "react"
import ReacDom from "react-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Highlight from 'react-highlight'
import {Card_a,Card_content,Card_img,Card_link,
		Card_section,Card_text,Card_title} from './styled/CardStyle'

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
				<Card_text>
				  {(this.props.body || "").substring(0,20).replace(/<.*?>/g,"") + "..."}
				</Card_text>
			  </Card_content>
			  <Card_link>
				<Link to={"/report/" + this.props.blog_id}>この記事を見る</Link>
			  </Card_link>
			</Card_section>
		)
	}
}
export default Card;

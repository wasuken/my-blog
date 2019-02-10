import React from "react";
import ReactDOM from "react-dom";
import New  from "./components/New"
import Home from "./components/Home"
import Report from "./components/Report"
import TagList from "./components/TagList"
import Tag from "./components/Tag"
import WordCloudBox from "./components/WordCloudBox"
import ProfileBox from "./components/ProfileBox"
import MainBox from "./components/MainBox"
import { BrowserRouter, Route, Link } from "react-router-dom"
import styled from "styled-components"

const Ul = styled.ul`
	padding: 0;
	position: relative;
	background-color: #2d8fdd;
`;
const Li = styled.li`
	n  color: #2d8fdd;
	border-left: solid 6px #2d8fdd;
	display: table-cell;
	background: #f1f8ff;
	margin-bottom: 3px;
	line-height: 1.5;
	padding: 0.5em;
	list-style-type: none!important;
	&:hover {
    background: #668ad8;
    color: #FFF;
	}
`;

const homeMainBox = () => (
	<MainBox lefts={[<Home />]}
			 rights={[<ProfileBox myname="wasu" profileImg="/img/ninja.jpeg"/>]} />
);
const reportMainBox = () => (
	<MainBox lefts={[<Report />]}
			 rights={[<ProfileBox myname="wasu" profileImg="/img/ninja.jpeg"/>]} />
);
const tagMainBox = () => (
	<MainBox lefts={[<Tag />]}
			 rights={[<ProfileBox myname="wasu" profileImg="/img/ninja.jpeg"/>]} />
);
const tagListMainBox = () => (
	<MainBox lefts={[<TagList />]}
			 rights={[<ProfileBox myname="wasu" profileImg="/img/ninja.jpeg"/>]} />
);

ReactDOM.render(
	<div>
		<BrowserRouter>
			<div>
				<Ul>
					<Li><Link to="/">Home</Link></Li>
					<Li><Link to="/tags">Tags</Link></Li>
					<Li><a href="https://github.com/wasuken">Github</a></Li>
				</Ul>
				<Route exact path="/" component={homeMainBox} />
				<Route exact path="/tag/:tag" component={tagMainBox} />
				<Route exact path="/tags" component={tagListMainBox} />
				<Route exact path="/report/:id" component={reportMainBox} />
			</div>
		</BrowserRouter>
	</div>,
	document.getElementById("app"));

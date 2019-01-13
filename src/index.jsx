import React from "react";
import ReactDOM from "react-dom";
import New  from "./components/New"
import Home from "./components/Home"
import Report from "./components/Report"
import { BrowserRouter, Route, Link } from "react-router-dom"
import styled from "styled-components"


const Ul = styled.ul`
  padding: 0;
  position: relative;
  background-color: #2d8fdd;
`;
const Li = styled.li`
  color: #2d8fdd;
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
ReactDOM.render(<BrowserRouter>
				<div>
				<Ul>
				<Li><Link to="/">Home</Link></Li>
				<Li><a href="https://twitter.com/black_box_rx?lang=ja">Twitter</a></Li>
				<Li><a href="https://github.com/wasuken">Github</a></Li>
				</Ul>
				<Route exact path="/" component={Home} />
				<Route path="/:id" component={Report} />
				<Route path="/edit/:id" component={New} />
				</div>
				</BrowserRouter>,
				document.getElementById("app"));

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
`;
const Li = styled.li`
  color: #2d8fdd;
  border-left: solid 6px #2d8fdd;
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
				<Li><Link to="/new">New</Link></Li>
				</Ul>
				<Route exact path="/" component={Home} />
				<Route path="/:id" component={Report} />
				<Route path="/edit/:id" component={New} />
				<Route path="/new" component={New} />
				</div>
				</BrowserRouter>,
				document.getElementById("app"));

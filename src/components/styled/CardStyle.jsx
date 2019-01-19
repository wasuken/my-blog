import styled from "styled-components"
const WIDTH = 200;

export const Card_section = styled.section`
  float:left;
  width: ${WIDTH * 1.5}px;
  height: 250px;
  border: medium solid #ff00ff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
  text-align: center !important;
  background-color: #ccc;
`;
export const Card_img = styled.img`
  border-radius: 5px 5px 0 0;
  width: ${WIDTH * 1.5}px;
  height: ${WIDTH / 2}px;
`;
export const Card_content = styled.div`
  width: ${WIDTH}px;
  height: 100px
  display: block !important;
  margin: auto;
`;
export const Card_title = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  width: ${WIDTH}px;
  text-align: center;
  color: #333;
`;
export const Card_text = styled.div`
  color: #777;
  width: ${WIDTH}px;
  font-size: 14px;
  line-height: 1.5;
`;
export const Card_link = styled.div`
  text-align: center;
  border-top: 1px solid #eee;
  margin: auto;
  width: ${WIDTH}px;
`;
export const Card_a = styled.a`
  text-decoration: none;
  color: #0bd;
  margin: 0 10px;
  width: ${WIDTH}px;
  &:hover{
    color: #0090aa;
  }
`;

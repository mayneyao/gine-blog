import React from 'react';
// import Link from 'next/link';
import styled from 'styled-components';


(String as any).prototype.hashCode = function () {
  let hash = 0, i, chr;
  if (this.length === 0) return hash
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

const hashColorMap = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#009688',
  '#ff5722',
]

export const getHashColor = tag => {
  return hashColorMap[Math.abs(Math.ceil(tag.hashCode())) % 7]
}


const Tag = styled.div`
  background: ${props => props.color};
  color: #fff;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 24px;
  border-radius: 3px;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 14px;
  line-height: 120%;
  font-weight: 400;
  width: max-content;
  margin: 0px 6px 6px 0px;
  cursor: pointer;
`;

interface IColorfulTag {
  tag: string;
  href?: string;
  color?: string;
}
export const ColorfulTag = ({ tag, href, color }: IColorfulTag) => {
  const _color = color || getHashColor(tag);
  return (
    <Tag color={_color}>
      {tag}
    </Tag>
  );
  // return <Link href={href || `tags/${tag}`}>
  //   <Tag color={_color}>
  //     {tag}
  //   </Tag>
  // </Link>
};


import React from 'react';
import { Bottom } from './bottom';

function isChineseChar(str) {
  var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  return reg.test(str);
}

const WIKI = (props) => <a href={`https://${props.lang}.wikipedia.org/wiki/${props.title}`} target='__blank'>{props.title}</a>

interface IAphorismsProps {
  person: string;
  content: string;
  source: string;
}

const Aphorisms = ({ person, content, source }: IAphorismsProps) => {
  let personLang = isChineseChar(person) ? 'zh' : 'en';
  let sourceLang = isChineseChar(source) ? 'zh' : 'en';
  return (
    <div>
      {content} —— {!!person && <WIKI lang={personLang} title={person} />} 《<WIKI lang={sourceLang} title={source} />》
    </div>
  )
}

export const Layout = ({ children }) => {
  return (
    <div>
      {children}
      <Bottom />
    </div>
  )
}

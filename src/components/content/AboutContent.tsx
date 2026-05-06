import { useMemo } from 'react';
import CodeFile from '../CodeFile';
import * as T from '../CodeTokens';

const AboutContent = () => {
  const lines = useMemo(() => [
    <T.Comment>// about.ts</T.Comment>,
    <T.Comment>// who I am · what I do · where I build</T.Comment>,
    '',
    <><T.Keyword>export</T.Keyword> <T.Keyword>const</T.Keyword> <T.Variable>ayoub</T.Variable> = {'{'}</>,
    <>  <T.Property>name</T.Property>: <T.Str>"Ayoub Bahrouni"</T.Str>,</>,
    <>  <T.Property>role</T.Property>: <T.Str>"AI Engineer & Full Stack Developer"</T.Str>,</>,
    '',
    <>  <T.Comment>// currently building AI systems</T.Comment></>,
    <>  <T.Property>focus</T.Property>: <T.Str>"LLMs, RAG, scalable apps, and intelligent products"</T.Str>,</>,
    '',
    <>  <T.Comment>// where the work happens</T.Comment></>,
    <>  <T.Property>location</T.Property>: <T.Str>"Tunisia"</T.Str>,</>,
    <>  <T.Property>education</T.Property>: {'{'}</>,
    <>    <T.Property>degree</T.Property>: <T.Str>"Computer Engineering · IoT & Embedded Systems"</T.Str>,</>,
    <>    <T.Property>school</T.Property>: <T.Str>"Faculty of Sciences of Tunis"</T.Str>,</>,
    <>    <T.Property>minor</T.Property>: <T.Str>"Full-Stack Development"</T.Str>,</>,
    <>  {'}'},</>,
    '',
    <>  <T.Comment>// currently learning</T.Comment></>,
    <>  <T.Property>learning</T.Property>: [<T.Str>"RAG"</T.Str>, <T.Str>"MLOps"</T.Str>, <T.Str>"Vector Databases"</T.Str>],</>,
    '',
    <>  <T.Comment>// open to work</T.Comment></>,
    <>  <T.Property>status</T.Property>: <T.Str>"open to AI, full-stack, and data opportunities"</T.Str>,</>,
    '',
    <>  <T.Property>principles</T.Property>: [</>,
    <>    <T.Str>"ship useful systems"</T.Str>,</>,
    <>    <T.Str>"make data stories understandable"</T.Str>,</>,
    <>    <T.Str>"build with care and curiosity"</T.Str></>,
    <>  ],</>,
    <> {'}'};</>,
  ], []);

  return <CodeFile lines={lines} />;
};

export default AboutContent;

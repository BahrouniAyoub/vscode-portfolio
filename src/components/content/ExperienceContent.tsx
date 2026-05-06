import { useMemo } from 'react';
import CodeFile from '../CodeFile';
import * as T from '../CodeTokens';

const ExperienceContent = () => {
  const lines = useMemo(() => [
    <T.Comment>// experience.ts</T.Comment>,
    <T.Comment>// practical work · internships · production-minded systems</T.Comment>,
    '',
    <><T.Keyword>export</T.Keyword> <T.Keyword>type</T.Keyword> <T.TypeToken>Experience</T.TypeToken> = {'{'}</>,
    <>  <T.Property>role</T.Property>: <T.TypeToken>string</T.TypeToken>;</>,
    <>  <T.Property>company</T.Property>: <T.TypeToken>string</T.TypeToken>;</>,
    <>  <T.Property>period</T.Property>: <T.TypeToken>string</T.TypeToken>;</>,
    <>  <T.Property>focus</T.Property>: <T.TypeToken>string</T.TypeToken>;</>,
    <>  <T.Property>stack</T.Property>: <T.TypeToken>string</T.TypeToken>[];</>,
    <> {'}'};</>,
    '',
    <><T.Keyword>export</T.Keyword> <T.Keyword>const</T.Keyword> <T.Variable>experience</T.Variable>: <T.TypeToken>Experience</T.TypeToken>[] = [</>,
    <>  {'{'}</>,
    <>    <T.Property>role</T.Property>: <T.Str>"IoT & Software Development Intern"</T.Str>,</>,
    <>    <T.Property>company</T.Property>: <T.Str>"Tunisie Telecom"</T.Str>,</>,
    <>    <T.Property>period</T.Property>: <T.Str>"Mar 2025 - Jun 2025"</T.Str>,</>,
    '',
    <>    <T.Comment>// smart irrigation platform with predictive water management</T.Comment></>,
    <>    <T.Property>focus</T.Property>: <T.Str>"IoT sensors, AI models, real-time monitoring"</T.Str>,</>,
    <>    <T.Property>stack</T.Property>: [<T.Str>"ESP32"</T.Str>, <T.Str>"MQTT"</T.Str>, <T.Str>"Flutter"</T.Str>, <T.Str>"Node.js"</T.Str>, <T.Str>"MongoDB"</T.Str>, <T.Str>"AI"</T.Str>],</>,
    <>  {'}'},</>,
    '',
    <>  {'{'}</>,
    <>    <T.Property>role</T.Property>: <T.Str>"IoT Virtual Assistant Intern"</T.Str>,</>,
    <>    <T.Property>company</T.Property>: <T.Str>"Tak-Tik"</T.Str>,</>,
    <>    <T.Property>period</T.Property>: <T.Str>"May 2023 - Aug 2023"</T.Str>,</>,
    '',
    <>    <T.Comment>// worked on Tunisian Sign Language accessibility assistant</T.Comment></>,
    <>    <T.Property>focus</T.Property>: <T.Str>"Computer Vision + NLP + accessible interaction"</T.Str>,</>,
    <>    <T.Property>stack</T.Property>: [<T.Str>"IoT"</T.Str>, <T.Str>"AI"</T.Str>, <T.Str>"Accessibility"</T.Str>, <T.Str>"Computer Vision"</T.Str>, <T.Str>"NLP"</T.Str>],</>,
    <>  {'}'},</>,
    <>];</>,
  ], []);

  return <CodeFile lines={lines} />;
};

export default ExperienceContent;

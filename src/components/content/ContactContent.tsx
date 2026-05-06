import { useMemo } from 'react';
import CodeFile from '../CodeFile';
import * as T from '../CodeTokens';

const LinkString = ({ href, children }: { href: string; children: string }) => (
  <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" className="text-[#ce9178] underline decoration-transparent underline-offset-2 hover:decoration-[#ce9178]">
    "{children}"
  </a>
);

const ContactContent = () => {
  const lines = useMemo(() => [
    <T.Comment>// contact.ts</T.Comment>,
    <T.Comment>// open to work, collabs, and good conversations</T.Comment>,
    '',
    <><T.Keyword>export</T.Keyword> <T.Keyword>const</T.Keyword> <T.Variable>contact</T.Variable> = {'{'}</>,
    <>  <T.Property>email</T.Property>: <LinkString href="mailto:bahrouni.ayoub2003@gmail.com">bahrouni.ayoub2003@gmail.com</LinkString>,</>,
    <>  <T.Property>linkedin</T.Property>: <LinkString href="https://www.linkedin.com/in/ayoub-bahrouni">linkedin.com/in/ayoub-bahrouni</LinkString>,</>,
    <>  <T.Property>github</T.Property>: <LinkString href="https://github.com/BahrouniAyoub">github.com/BahrouniAyoub</LinkString>,</>,
    '',
    <>  <T.Comment>// also around the web</T.Comment></>,
    <>  <T.Property>links</T.Property>: {'{'}</>,
    <>    <T.Property>medium</T.Property>: <LinkString href="https://medium.com/@BahrouniAyoub">medium.com/@BahrouniAyoub</LinkString>,</>,
    <>    <T.Property>tableau</T.Property>: <LinkString href="https://public.tableau.com/app/profile/ayoub.bahrouni/vizzes">Tableau Public</LinkString>,</>,
    <>    <T.Property>leetcode</T.Property>: <LinkString href="https://leetcode.com/u/BahrouniAyoub/">leetcode.com/u/BahrouniAyoub</LinkString>,</>,
    <>    <T.Property>youtube</T.Property>: <LinkString href="https://www.youtube.com/@BahrouniAyoub">youtube.com/@BahrouniAyoub</LinkString>,</>,
    <>  {'}'},</>,
    '',
    <>  <T.Comment>// preferred messages</T.Comment></>,
    <>  <T.Property>interests</T.Property>: [<T.Str>"AI engineering"</T.Str>, <T.Str>"full-stack products"</T.Str>, <T.Str>"data science"</T.Str>, <T.Str>"internships"</T.Str>],</>,
    <>  <T.Property>responseTime</T.Property>: <T.Str>"usually quick when the message is specific"</T.Str>,</>,
    <> {'}'};</>,
    '',
    <><T.Keyword>export</T.Keyword> <T.Keyword>function</T.Keyword> <T.Fn>sendMessage</T.Fn>(<T.Variable>topic</T.Variable>: <T.TypeToken>string</T.TypeToken>) {'{'}</>,
    <>  <T.Comment>// built with ❤️ — real form wiring can be added later</T.Comment></>,
    <>  <T.Keyword>return</T.Keyword> <T.Str>"mailto:"</T.Str> + <T.Variable>contact</T.Variable>.<T.Property>email</T.Property> + <T.Str>"?subject="</T.Str> + <T.Fn>encodeURIComponent</T.Fn>(<T.Variable>topic</T.Variable>);</>,
    <> {'}'}</>,
  ], []);

  return <CodeFile lines={lines} />;
};

export default ContactContent;

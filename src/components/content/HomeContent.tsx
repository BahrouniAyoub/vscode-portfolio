import { useMemo } from 'react';
import { FileId } from '@/data/portfolio';
import CodeFile from '../CodeFile';
import * as T from '../CodeTokens';

interface HomeContentProps {
  onFileSelect: (id: FileId) => void;
}

const OpenCall = ({ file, onClick }: { file: string; onClick: () => void }) => (
  <button onClick={onClick} className="text-[#dcdcaa] underline decoration-transparent underline-offset-2 hover:decoration-[#dcdcaa]">
    openFile(<span className="text-[#ce9178]">"{file}"</span>)
  </button>
);

const HomeContent = ({ onFileSelect }: HomeContentProps) => {
  const lines = useMemo(() => [
    <T.Comment>// index.ts</T.Comment>,
    <T.Comment>// hello world — welcome to my portfolio workspace</T.Comment>,
    '',
    <><T.Keyword>import</T.Keyword> {'{'} <T.Variable>about</T.Variable> {'}'} <T.Keyword>from</T.Keyword> <T.Str>"./about"</T.Str>;</>,
    <><T.Keyword>import</T.Keyword> <T.Variable>projects</T.Variable> <T.Keyword>from</T.Keyword> <T.Str>"./projects.json"</T.Str>;</>,
    '',
    <><T.Keyword>export</T.Keyword> <T.Keyword>const</T.Keyword> <T.Variable>developer</T.Variable> = {'{'}</>,
    <>  <T.Property>name</T.Property>: <T.Str>"Ayoub Bahrouni"</T.Str>,</>,
    <>  <T.Property>role</T.Property>: <T.Str>"AI / ML Developer + Full Stack Builder"</T.Str>,</>,
    <>  <T.Property>school</T.Property>: <T.Str>"ESPRIT"</T.Str>,</>,
    <>  <T.Property>status</T.Property>: <T.Str>"open to work"</T.Str>,</>,
    <>  <T.Property>yearsBuilding</T.Property>: <T.NumberToken>3</T.NumberToken>,</>,
    <>  <T.Property>curiosity</T.Property>: <T.Str>"infinite"</T.Str>,</>,
    <> {'}'};</>,
    '',
    <><T.Keyword>export</T.Keyword> <T.Keyword>const</T.Keyword> <T.Variable>workspace</T.Variable> = [</>,
    <>  <OpenCall file="projects.json" onClick={() => onFileSelect('projects')} />,</>,
    <>  <OpenCall file="about.ts" onClick={() => onFileSelect('about')} />,</>,
    <>  <OpenCall file="contact.ts" onClick={() => onFileSelect('contact')} /></>,
    <>];</>,
    '',
    <>developer.<T.Fn>build</T.Fn>({'{'} <T.Property>with</T.Property>: <T.Str>"AI systems, APIs, data stories, and useful products"</T.Str> {'}'});</>,
  ], [onFileSelect]);

  return <CodeFile lines={lines} />;
};

export default HomeContent;

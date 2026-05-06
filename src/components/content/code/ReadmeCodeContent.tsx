import { useMemo } from 'react';
import CodeFile from '../../CodeFile';
import * as T from '../../CodeTokens';

const ReadmeCodeContent = () => {
  const lines = useMemo(() => [
    <T.Comment>{'<!-- README.md -->'}</T.Comment>,
    '',
    <><T.Str># Ayoub Bahrouni</T.Str></>,
    '',
    <T.Comment>{'<!-- built with ❤️ inside a VSCode-style portfolio -->'}</T.Comment>,
    '',
    <><T.Str>AI Engineer @ Esprit</T.Str></>,
    <><T.Str>Full Stack Developer · AI/ML Developer · Open to work</T.Str></>,
    '',
    <><T.Str>## Stack</T.Str></>,
    <><T.Str>- Python, TypeScript, JavaScript, SQL</T.Str></>,
    <><T.Str>- React, Next.js, FastAPI, Flask, Django</T.Str></>,
    <><T.Str>- PyTorch, TensorFlow, LangChain, RAG pipelines</T.Str></>,
    <><T.Str>- Docker, Linux, AWS, GitHub Actions</T.Str></>,
    '',
    <><T.Str>## Connect</T.Str></>,
    <><T.Str>- Email: bahrouni.ayoub2003@gmail.com</T.Str></>,
    <><T.Str>- GitHub: BahrouniAyoub</T.Str></>,
    <><T.Str>- LinkedIn: bahrouni-ayoub</T.Str></>,
  ], []);

  return <CodeFile lines={lines} />;
};

export default ReadmeCodeContent;

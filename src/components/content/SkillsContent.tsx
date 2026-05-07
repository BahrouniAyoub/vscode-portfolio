import { useMemo } from 'react';
import CodeFile from '../CodeFile';
import * as T from '../CodeTokens';

const SkillsContent = ({ aiMode = false }: { aiMode?: boolean }) => {
  const lines = useMemo(() => [
    <T.Comment>// skills.ts</T.Comment>,
    <T.Comment>// tech stack & tools I actually use</T.Comment>,
    aiMode ? <T.Comment>// AI Mode enabled: highlighting machine learning and LLM work</T.Comment> : <T.Comment>// status: always learning</T.Comment>,
    '',
    <><T.Keyword>export</T.Keyword> <T.Keyword>const</T.Keyword> <T.Variable>skills</T.Variable> = {'{'}</>,
    <>  <T.Property>languages</T.Property>: [</>,
    <>    {'{'} <T.Property>name</T.Property>: <T.Str>"Python"</T.Str>, <T.Property>level</T.Property>: <T.NumberToken>92</T.NumberToken> {'}'},</>,
    <>    {'{'} <T.Property>name</T.Property>: <T.Str>"JavaScript"</T.Str>, <T.Property>level</T.Property>: <T.NumberToken>78</T.NumberToken> {'}'},</>,
    <>    {'{'} <T.Property>name</T.Property>: <T.Str>"TypeScript"</T.Str>, <T.Property>level</T.Property>: <T.NumberToken>74</T.NumberToken> {'}'},</>,
    <>    {'{'} <T.Property>name</T.Property>: <T.Str>"SQL"</T.Str>, <T.Property>level</T.Property>: <T.NumberToken>88</T.NumberToken> {'}'}</>,
    <>  ],</>,
    '',
    <>  <T.Comment>// currently learning and building with these</T.Comment></>,
    <>  <T.Property>ai</T.Property>: [</>,
    <>    <T.Str>"LangChain"</T.Str>,</>,
    <>    <T.Str>"LangGraph"</T.Str>,</>,
    <>    <T.Str>"RAG Pipelines"</T.Str>,</>,
    <>    <T.Str>"Prompt Engineering"</T.Str>,</>,
    <>    <T.Str>"Agentic Workflows"</T.Str>,</>,
    <>    <T.Str>"Hugging Face Transformers"</T.Str></>,
    <>  ],</>,
    '',
    <>
      <T.Property>machineLearning</T.Property>:[
      <T.Str>"PyTorch"</T.Str>,
      <T.Str>"TensorFlow"</T.Str>,
      <T.Str>"scikit-learn"</T.Str>,
      <T.Str>"Pandas"</T.Str>,
      <T.Str>"NumPy"</T.Str>],
    </>,
    <>
      <T.Property>backend</T.Property>: [
      <T.Str>"FastAPI"</T.Str>,
      <T.Str>"Flask"</T.Str>,
      <T.Str>"Django"</T.Str>,
      <T.Str>"Node.js"</T.Str>,
      <T.Str>"Express.js"</T.Str>,
      ],
    </>,
    <>  <T.Property>frontend</T.Property>: [<T.Str>"React"</T.Str>, <T.Str>"Next.js"</T.Str>, <T.Str>"Tailwind CSS"</T.Str>, <T.Str>"Responsive Design"</T.Str>],</>,
    <>  <T.Property>databases</T.Property>: [<T.Str>"PostgreSQL"</T.Str>, <T.Str>"MongoDB"</T.Str>, <T.Str>"Redis"</T.Str>, <T.Str>"Neo4j"</T.Str>],</>,
    <>  <T.Property>vectorStores</T.Property>: [<T.Str>"FAISS"</T.Str>, <T.Str>"Pinecone"</T.Str>],</>,
    '',
    <>  <T.Comment>// built with care, tested with real users when possible</T.Comment></>,
    <>  <T.Property>tools</T.Property>: [<T.Str>"Docker"</T.Str>, <T.Str>"Git"</T.Str>, <T.Str>"Linux"</T.Str>, <T.Str>"AWS"</T.Str>, <T.Str>"GitHub Actions"</T.Str>, <T.Str>"Jupyter"</T.Str>],</>,
    <>  <T.Property>analytics</T.Property>: [<T.Str>"Tableau"</T.Str>, <T.Str>"Power BI"</T.Str>],</>,
    <>  <T.Property>design</T.Property>: [<T.Str>"Figma"</T.Str>, <T.Str>"UX Prototyping"</T.Str>],</>,
    <> {'}'} <T.Keyword>as</T.Keyword> <T.Keyword>const</T.Keyword>;</>,
  ], [aiMode]);

  return <CodeFile lines={lines} />;
};

export default SkillsContent;

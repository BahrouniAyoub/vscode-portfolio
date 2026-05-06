import { useMemo } from 'react';
import CodeFile from '../CodeFile';
import * as T from '../CodeTokens';

const ProjectsContent = ({ aiMode = false }: { aiMode?: boolean }) => {
  const lines = useMemo(() => [
    <T.Comment>// projects.json</T.Comment>,
    aiMode ? <T.Comment>// AI Mode enabled: AI-related projects are grouped near the top</T.Comment> : <T.Comment>// shipped, prototyped, and actively evolving work</T.Comment>,
    '[',
    <>  {'{'}</>,
    <>    <T.Str>"name"</T.Str>: <T.Str>"PagePal"</T.Str>,</>,
    <>    <T.Str>"type"</T.Str>: <T.Str>"AI SaaS"</T.Str>,</>,
    <>    <T.Str>"stack"</T.Str>: [<T.Str>"Next.js"</T.Str>, <T.Str>"TypeScript"</T.Str>, <T.Str>"MongoDB"</T.Str>, <T.Str>"Clerk"</T.Str>, <T.Str>"Vapi AI"</T.Str>, <T.Str>"Vercel Blob"</T.Str>],</>,
    <>    <T.Str>"status"</T.Str>: <T.Str>"production"</T.Str>,</>,
    <>    <T.Str>"repo"</T.Str>: <T.Str>"github.com/BahrouniAyoub/pagepal"</T.Str>,</>,
    <>    <T.Str>"live"</T.Str>: <T.Str>"pagepal-nine.vercel.app"</T.Str></>,
    <>  {'}'},</>,
    <>  {'{'}</>,
    <>    <T.Str>"name"</T.Str>: <T.Str>"CodeSage"</T.Str>,</>,
    <>    <T.Str>"type"</T.Str>: <T.Str>"AI Developer Tool"</T.Str>,</>,
    <>    <T.Str>"stack"</T.Str>: [<T.Str>"JavaScript"</T.Str>, <T.Str>"HTML"</T.Str>, <T.Str>"CSS"</T.Str>, <T.Str>"AI"</T.Str>, <T.Str>"Syntax Highlighting"</T.Str>],</>,
    <>    <T.Str>"status"</T.Str>: <T.Str>"prototype"</T.Str>,</>,
    <>    <T.Str>"repo"</T.Str>: <T.Str>"github.com/BahrouniAyoub/AI-Code-Explainer"</T.Str></>,
    <>  {'}'},</>,
    <>  {'{'}</>,
    <>    <T.Str>"name"</T.Str>: <T.Str>"CodeQuest - Byte Blades Academy"</T.Str>,</>,
    <>    <T.Str>"type"</T.Str>: <T.Str>"Gamified Learning Platform"</T.Str>,</>,
    <>    <T.Str>"stack"</T.Str>: [<T.Str>"React"</T.Str>, <T.Str>"TypeScript"</T.Str>, <T.Str>"Node.js"</T.Str>, <T.Str>"PostgreSQL"</T.Str>, <T.Str>"Prisma"</T.Str>, <T.Str>"Phaser.js"</T.Str>],</>,
    <>    <T.Str>"status"</T.Str>: <T.Str>"active build"</T.Str>,</>,
    <>    <T.Str>"repo"</T.Str>: <T.Str>"github.com/BahrouniAyoub/byte-blades-academy"</T.Str></>,
    <>  {'}'},</>,
    <>  {'{'}</>,
    <>    <T.Str>"name"</T.Str>: <T.Str>"Customer Churn Prediction"</T.Str>,</>,
    <>    <T.Str>"type"</T.Str>: <T.Str>"Machine Learning Pipeline"</T.Str>,</>,
    <>    <T.Str>"stack"</T.Str>: [<T.Str>"Python"</T.Str>, <T.Str>"scikit-learn"</T.Str>, <T.Str>"CatBoost"</T.Str>, <T.Str>"XGBoost"</T.Str>, <T.Str>"Feature Engineering"</T.Str>],</>,
    <>    <T.Str>"metric"</T.Str>: <T.Str>"84.2% AUC with CatBoost"</T.Str>,</>,
    <>    <T.Str>"status"</T.Str>: <T.Str>"completed"</T.Str>,</>,
    <>    <T.Str>"repo"</T.Str>: <T.Str>"github.com/BahrouniAyoub/customer-churn-prediction"</T.Str></>,
    <>  {'}'},</>,
    <>  {'{'}</>,
    <>    <T.Str>"name"</T.Str>: <T.Str>"Resume Builder"</T.Str>,</>,
    <>    <T.Str>"type"</T.Str>: <T.Str>"Full Stack App"</T.Str>,</>,
    <>    <T.Str>"stack"</T.Str>: [<T.Str>"React"</T.Str>, <T.Str>"Vite"</T.Str>, <T.Str>"Tailwind CSS"</T.Str>, <T.Str>"Redux"</T.Str>, <T.Str>"Node.js"</T.Str>, <T.Str>"MongoDB"</T.Str>],</>,
    <>    <T.Str>"status"</T.Str>: <T.Str>"in progress"</T.Str>,</>,
    <>    <T.Str>"repo"</T.Str>: <T.Str>"github.com/BahrouniAyoub/resume-builder"</T.Str></>,
    <>  {'}'}</>,
    ']'
  ], [aiMode]);

  return <CodeFile lines={lines} />;
};

export default ProjectsContent;

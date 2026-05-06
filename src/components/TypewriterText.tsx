import React, { useState, useEffect } from 'react';

const phrases = [
  "Exploring LLMs & RAG pipelines",
  "Building AI-powered systems",
  "Shipping scalable developer tools",
  "Turning data into useful products",
  "Learning, building, iterating"
];

const TypewriterText = () => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        timeout = setTimeout(() => {}, 300); // Pause before next phrase
      } else {
        timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
        }, Math.random() * 15 + 35); // Erasing speed ~35-50ms
      }
    } else {
      if (text === currentPhrase) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1200); // Pause after full phrase
      } else {
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, Math.random() * 20 + 60); // Typing speed ~60-80ms
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <p className="text-sm text-forground mb-5 min-h-[25px] flex items-center">
      {text}
      <span className="animate-blink text-vscode-blue ml-[1px]">|</span>
    </p>
  );
};

export default TypewriterText;

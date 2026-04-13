import React from 'react';
import { VerseLink } from './BiblePopup';

const bibleRegex = /((?:Gn|Êx|Lv|Nm|Dt|Js|Jz|Rt|1Sm|2Sm|1Rs|2Rs|1Cr|2Cr|Ed|Ne|Et|Jó|Sl|Pv|Ec|Ct|Is|Jr|Lm|Ez|Dn|Os|Jl|Am|Ob|Jn|Mq|Na|Hc|Sf|Ag|Zc|Ml|Mt|Mc|Lc|Jo|At|Rm|1Co|2Co|Gl|Ef|Fp|Cl|1Ts|2Ts|1Tm|2Tm|Tt|Fm|Hb|Tg|1Pe|2Pe|1Jo|2Jo|3Jo|Jd|Ap)\s\d+(?:\.\d+(?:[–-]\d+)?)?(?:,\d+(?:[–-]\d+)?)?)/;

export function RichText({ text }: { text: string }) {
  const parts = text.split(bibleRegex);

  return (
    <>
      {parts.map((part, idx) => {
        if (bibleRegex.test(part)) {
          return <VerseLink key={idx} reference={part} />;
        }
        
        const formatted = part
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-main font-semibold">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="text-text-main italic">$1</em>');
          
        return <span key={idx} dangerouslySetInnerHTML={{ __html: formatted }} />;
      })}
    </>
  );
}

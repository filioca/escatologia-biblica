import React from 'react';
import { VerseLink } from './BiblePopup';

const BOOKS = 'Gn|Êx|Lv|Nm|Dt|Js|Jz|Rt|1Sm|2Sm|1Rs|2Rs|1Cr|2Cr|Ed|Ne|Et|Jó|Sl|Pv|Ec|Ct|Is|Jr|Lm|Ez|Dn|Os|Jl|Am|Ob|Jn|Mq|Na|Hc|Sf|Ag|Zc|Ml|Mt|Mc|Lc|Jo|At|Rm|1Co|2Co|Gl|Ef|Fp|Cl|1Ts|2Ts|1Tm|2Tm|Tt|Fm|Hb|Tg|1Pe|2Pe|1Jo|2Jo|3Jo|Jd|Ap';

// Matches a single chapter/verse spec (no book prefix): "7.4–8", "14.1–5", "12", "50–51"
const REF_BODY = '\\d+(?:[–-]\\d+)?(?:\\.\\d+(?:[–-]\\d+)?)?(?:,\\d+(?:[–-]\\d+)?)?';

// Full reference: book + ref body + optional same-book continuations via ";"
const bibleRegex = new RegExp(
  `((?:${BOOKS})\\s${REF_BODY}(?:\\s*;\\s*${REF_BODY})*)`,
);

/**
 * "Ap 7.4–8; 14.1–5" → ["Ap 7.4–8", "Ap 14.1–5"]
 * "Ap 20.14" → ["Ap 20.14"]
 */
function expandRef(token: string): string[] {
  if (!token.includes(';')) return [token];
  const spaceIdx = token.indexOf(' ');
  const book  = token.slice(0, spaceIdx);
  return token
    .slice(spaceIdx + 1)
    .split(';')
    .map(part => `${book} ${part.trim()}`);
}

export function RichText({ text }: { text: string }) {
  const parts = text.split(bibleRegex);

  return (
    <>
      {parts.map((part, idx) => {
        if (bibleRegex.test(part)) {
          return (
            <React.Fragment key={idx}>
              {expandRef(part).map((ref, i) => (
                <VerseLink key={i} reference={ref} />
              ))}
            </React.Fragment>
          );
        }

        const formatted = part
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gold font-semibold">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="text-text-main/90 italic">$1</em>');

        return <span key={idx} dangerouslySetInnerHTML={{ __html: formatted }} />;
      })}
    </>
  );
}

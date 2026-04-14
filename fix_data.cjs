const fs = require('fs');

let content = fs.readFileSync('src/data/bibliography.ts', 'utf8');

// 1. Remove beale-nt-biblical-theology-2011 block
content = content.replace(/\{\s*id:\s*['"]beale-nt-biblical-theology-2011['"][\s\S]*?\},\s*/, '');

// 2. Remove venema-promise-of-the-future-2000 block
content = content.replace(/\{\s*id:\s*['"]venema-promise-of-the-future-2000['"][\s\S]*?\},\s*/, '');

// 3. Add crossReferences to the remaining ones
content = content.replace(/(id:\s*["']venema-promise-future["'],)/, "$1\n        crossReferences: ['fundamentos'],");
content = content.replace(/(id:\s*["']beale-nt-biblical-theology["'],)/, "$1\n        crossReferences: ['fundamentos'],");

// 4. Fix typos
content = content.replace(/antecristosequences/g, 'anticristo');
content = content.replace(/Discurso do Monte Oliveiras/g, 'Discurso do Monte das Oliveiras');
content = content.replace(/reconstitucionalismo/g, 'reconstrucionismo');
content = content.replace(/reconstructivista/g, 'reconstrucionista');
content = content.replace(/gloria de Deus/g, 'glória de Deus');
content = content.replace(/Trinidad/g, 'Trindade');
content = content.replace(/parallelos greco-romanos/g, 'paralelos greco-romanos');
content = content.replace(/cada pericope/g, 'cada perícope');
content = content.replace(/como 'confirmaçã' profética/g, "como 'confirmação' profética");
content = content.replace(/\(jo 4:23; 5:25; 11:25\)/g, "(Jo 4:23; 5:25; 11:25)");

// 5. Fix normalizeAuthorName
const newNormalize = `function normalizeAuthorName(author: string): string {
  // Remove suffixes like (ed.) or (eds.)
  let normalized = author.replace(/\\(eds?\\.?\\)/gi, '').trim();

  // Handle standard 'Lastname, Firstname'
  if (normalized.includes(",")) return normalized;

  // Fallback for names without comma (rare or malformed)
  const parts = normalized.split(" ");
  if (parts.length > 1) {
    const lastName = parts.pop();
    return \`\${lastName}, \${parts.join(" ")}\`;
  }
  return normalized;
}`;

content = content.replace(/function normalizeAuthorName\([\s\S]*?\}\n/, newNormalize + '\n');

fs.writeFileSync('src/data/bibliography.ts', content);
console.log('Done modifying metadata');

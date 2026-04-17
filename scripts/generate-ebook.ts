import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { eschatologyData } from '../src/data/content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const navGroups = [
  {
    title: "Parte I — Fundamentos Metodológicos",
    items: [
      { id: "visaoGeral", label: "Visão Geral e Terminologia" },
      { id: "jaEAindaNao", label: "O Já e o Ainda Não" },
      { id: "diaDoSenhor", label: "O Dia do Senhor" },
      { id: "raizesJudaicas", label: "Raízes Judaicas" },
    ]
  },
  {
    title: "Parte II — Chaves Hermenêuticas",
    items: [
      { id: "pactoVsDispensacional", label: "Teologia do Pacto vs. Dispensacionalismo" },
      { id: "hermeneuticaApocalipse", label: "Hermenêutica do Apocalipse" },
      { id: "israelRomanos", label: "Israel em Romanos 9-11" },
    ]
  },
  {
    title: "Parte III — Escatologia Individual",
    items: [
      { id: "estadoIntermediario", label: "O Estado Intermediário e a Morte" },
    ]
  },
  {
    title: "Parte IV — Sistemas Escatológicos e Tradições",
    items: [
      { id: "sistemas", label: "Os Grandes Sistemas Escatológicos" },
      { id: "sistemasHeterodoxos", label: "Sistemas Escatológicos Heterodoxos" },
      { id: "escatologiaOrtodoxa", label: "Escatologia Ortodoxa Oriental" },
      { id: "historiaDoutrina", label: "História da Escatologia (Séc. I – XX)" },
      { id: "escatologiaContemporanea", label: "Escatologia Contemporânea" }
    ]
  },
  {
    title: "Parte V — Eventos Finais (A Consumação)",
    items: [
      { id: "arrebatamento", label: "O Arrebatamento" },
      { id: "tribulacao", label: "A Grande Tribulação" },
      { id: "anticristo", label: "O Anticristo e a Marca da Besta" },
      { id: "segundaVinda", label: "A Segunda Vinda e Armagedom" },
      { id: "milenio", label: "O Milênio" },
      { id: "julgamentos", label: "Julgamentos e Ressurreições" },
      { id: "eternidade", label: "O Estado Eterno" },
    ]
  },
  {
    title: "Parte VI — Síntese, Cronologia e Ética",
    items: [
      { id: "cronologias", label: "Quadros e Cronologias" },
      { id: "eticaEsperanca", label: "Ética da Esperança" },
    ]
  }
];

let mdContent = `# Escatologia Bíblica — O Fim e a Consumação\n\n`;
mdContent += `*Uma exploração exegética, histórica e sistemática das profecias finais.*\n\n---\n\n`;

let capCounter = 1;

for (const group of navGroups) {
  mdContent += `# ${group.title}\n\n`;
  
  for (const item of group.items) {
    const dataInfo = eschatologyData[item.id];
    if (!dataInfo) {
      console.log(`Faltou o ID: ${item.id}`);
      continue;
    }
    
    mdContent += `## Capítulo ${capCounter}. ${dataInfo.title}\n\n`;
    
    if (dataInfo.intro) {
      mdContent += `${dataInfo.intro}\n\n`;
    }
    
    if (dataInfo.body && dataInfo.body.length > 0) {
      dataInfo.body.forEach(p => {
         mdContent += `${p}\n\n`;
      });
    }
    
    if (dataInfo.quote) {
      mdContent += `> "${dataInfo.quote.text}"\n> — *${dataInfo.quote.cite}*\n\n`;
    }
    
    if (dataInfo.events && dataInfo.events.length > 0) {
      for (const event of dataInfo.events) {
        mdContent += `### ${event.title}\n\n`;
        if (event.body) {
          event.body.forEach(p => {
             mdContent += `${p}\n\n`;
          });
        }
        if (event.refs) {
          mdContent += `*Textos Base:* ${event.refs}\n\n`;
        }
      }
    }
    
    if (dataInfo.table) {
      mdContent += `### Tabela Comparativa\n\n`;
      
      const cols = dataInfo.table.headers || [];
      const rows = dataInfo.table.rows || [];
      
      if (cols.length > 0) {
        mdContent += `| ` + cols.join(' | ') + ` |\n`;
        mdContent += `| ` + cols.map(() => '---').join(' | ') + ` |\n`;
      }
      
      for (const row of rows) {
        if (Array.isArray(row)) {
          mdContent += `| ` + row.map(val => String(val).replace(/\n/g, ' ')).join(' | ') + ` |\n`;
        }
      }
      mdContent += `\n`;
    }
    
    if (dataInfo.systems && Array.isArray(dataInfo.systems)) {
      mdContent += `### Quadros e Escalas Escatológicas\n\n`;
      for (const sys of dataInfo.systems) {
        mdContent += `#### ${sys.name}\n\n`;
        if (sys.steps && Array.isArray(sys.steps)) {
          sys.steps.forEach(step => {
            mdContent += `${step}\n\n`;
          });
        }
      }
    }

    mdContent += `---\n\n`;
    capCounter++;
  }
}

const outputPath = path.join(
  process.env.USERPROFILE || process.env.HOME || '',
  '.gemini/antigravity/brain/0adb41f1-d699-4cee-83e4-2541d290bef7/artifacts/escatologia_biblica_ebook.md'
);

try {
  fs.writeFileSync(outputPath, mdContent, 'utf-8');
  console.log(`[OK] E-book gerado em: ${outputPath}`);
} catch (e) {
  console.log('Caminho não encontrado, tente salvar em outro lugar.');
  console.error(e);
}

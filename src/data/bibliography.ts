import { BibCategory, BibliographyData, BibAuthorIndexItem } from "../types/bibliography";

export const categories: BibCategory[] = [
  {
    id: 'fundamentos',
    title: 'Fundamentos Hermenêuticos e Teologia Bíblica da Escatologia',
    intro:
      'Obras que estabelecem a chave interpretativa "já e ainda não" e tratam a escatologia como estrutura articuladora de toda a teologia neotestamentária. São o substrato hermenêutico pressuposto pelas demais categorias: sem a síntese vossiana-ladd-ridderbosiana do Reino inaugurado, nenhum debate milenarista, tribulacionista ou sistêmico consegue ser enquadrado com rigor.',
    entries: [
      {
        id: 'vos-pauline-eschatology-1930',
        author: 'Vos, Geerhardus',
        title: 'The Pauline Eschatology',
        publisher: 'P&R Publishing',
        year: '1930 (reimpr. 1979, 1994)',
        isbn: '978-0875525051',
        originalLanguage: 'en',
        level: 'avançado',
        review:
          'Obra seminal da teologia bíblica reformada do séc. XX. Vos demonstra que a escatologia não é apêndice da teologia paulina, mas sua estrutura interna: a ressurreição de Cristo inaugura o século vindouro no meio do presente. Texto denso, fundante para toda a discussão "já e ainda não" posterior e para a obra de Ladd, Ridderbos, Gaffin e Beale.',
        onlineLinks: [
          { label: 'Archive.org', url: 'https://archive.org/details/paulineeschatolo0000vosg' },
          { label: 'Monergism (PDF completo)', url: 'https://www.monergism.com/thethreshold/sdg/vos/The%20Pauline%20Eschatology%20-%20Geerhardus%20Vos.pdf' },
        ],
        citedInEventIds: ['ev-doisEons', 'ev-jaEAindaNao'],
        recommendedFor: ['jaEAindaNao', 'visaoGeral'],
      },
      {
        id: 'ladd-presence-of-the-future-1974',
        author: 'Ladd, George Eldon',
        title: 'The Presence of the Future',
        subtitle: 'The Eschatology of Biblical Realism',
        publisher: 'Eerdmans',
        year: '1974 (ed. rev. 1996)',
        isbn: '978-0802815316',
        originalLanguage: 'en',
        level: 'intermediário',
        review:
          'Formulação clássica anglófona do Reino inaugurado. Ladd dialoga com Schweitzer, Dodd e Bultmann e consolida a síntese "realismo escatológico": o Reino já chegou em Cristo, mas aguarda consumação futura. Reelaboração ampliada do anterior "Jesus and the Kingdom" (1964). Leitura obrigatória para compreender o pré-milenarismo histórico fora das amarras dispensacionais.',
        onlineLinks: [
          { label: 'Archive.org', url: 'https://archive.org/details/presenceoffuture0000ladd' },
        ],
        citedInEventIds: ['ev-jaEAindaNao'],
        recommendedFor: ['jaEAindaNao', 'sistemas'],
      },
      {
        id: 'cullmann-christ-and-time-1946',
        author: 'Cullmann, Oscar',
        title: 'Christ and Time',
        subtitle: 'The Primitive Christian Conception of Time and History',
        publisher: 'Westminster Press',
        year: '1946 (orig. alemão) / 1950 (inglês)',
        originalLanguage: 'de',
        translationPT: {
          title: 'Cristo e o Tempo: Tempo e História no Cristianismo Primitivo',
          publisher: 'Fonte Editorial',
          year: 2020,
          isbn: '978-65-87388-03-8',
        },
        level: 'avançado',
        review:
          'Cunhou a metáfora do "Dia D e Dia da Vitória" para expressar a tensão entre a vitória decisiva de Cristo na cruz/ressurreição e a consumação futura. Obra fundacional para todos os tratamentos posteriores da escatologia inaugurada, incluindo Ladd e Ridderbos. A tradução brasileira mais recente é de Daniel Costa (2ª ed. 2020); há edição anterior pela Editora Custom (2003).',
        citedInEventIds: ['ev-jaEAindaNao', 'ev-doisEons'],
        recommendedFor: ['jaEAindaNao'],
      },
      {
        id: 'ridderbos-coming-of-the-kingdom-1962',
        author: 'Ridderbos, Herman N.',
        title: 'The Coming of the Kingdom',
        publisher: 'P&R Publishing',
        year: '1962 (orig. holandês 1950)',
        isbn: '978-0875524085',
        originalLanguage: 'nl',
        level: 'avançado',
        review:
          'Tratamento exaustivo da pregação do Reino nos Evangelhos Sinóticos a partir da tradição reformada holandesa. Complementa Vos e Ladd com rigor exegético acentuado e análise minuciosa das parábolas e do Sermão do Monte. Obra de referência para a categoria "Reino de Deus" em chave neocalvinista; sem tradução brasileira conhecida.',
        onlineLinks: [
          { label: 'Archive.org', url: 'https://archive.org/details/comingofkingdom0000herm' },
          { label: 'Paideia Press (PDF)', url: 'https://www.feedingonchrist.com/blog/post/free-pdfs-paideia-press-2' },
        ],
        recommendedFor: ['jaEAindaNao', 'visaoGeral'],
      },
      {
        id: 'hoekema-bible-and-the-future-1979',
        author: 'Hoekema, Anthony A.',
        title: 'The Bible and the Future',
        publisher: 'Eerdmans',
        year: 1979,
        isbn: '978-0802808516',
        originalLanguage: 'en',
        translationPT: {
          title: 'A Bíblia e o Futuro',
          publisher: 'Cultura Cristã',
          year: 2012,
          isbn: '978-85-7622-457-0',
        },
        level: 'intermediário',
        review:
          'Obra magna da escatologia amilenarista reformada do séc. XX. Hoekema estrutura toda a discussão na dicotomia escatologia inaugurada / escatologia futura, dedicando a primeira parte à presença do Reino e do Espírito e a segunda à morte, ressurreição, juízo e nova terra. Primeira tradução brasileira pela Casa Editora Presbiteriana (1989, tradutor Karl H. Kepler); 3ª edição pela Cultura Cristã (2012).',
        recommendedFor: ['visaoGeral', 'jaEAindaNao', 'sistemas', 'estadoIntermediario'],
      },
      {
        id: 'gaffin-resurrection-and-redemption-1978',
        author: 'Gaffin, Richard B.',
        title: 'Resurrection and Redemption',
        subtitle: "A Study in Paul's Soteriology",
        publisher: 'P&R Publishing',
        year: '1978 (2ª ed. 1987)',
        isbn: '978-0875522609',
        originalLanguage: 'en',
        level: 'avançado',
        review:
          'Desenvolvimento da tese vossiana aplicada à soteriologia paulina: a ressurreição de Cristo é o evento escatológico central, e a salvação do crente se estrutura em união com esse evento. Ponte essencial entre a teologia bíblica do "já e ainda não" e a ordem da salvação (ordo salutis) da tradição reformada. Sem tradução brasileira confirmada.',
        recommendedFor: ['jaEAindaNao'],
      },
    ],
  },
  {
    id: 'sistemasMilenaristas',
    title: 'Sistemas Milenaristas Maiores',
    intro:
      'Dedicado inteiramente às três (ou quatro) tradições macroescatológicas estabelecidas: amilenarismo, pós-milenarismo e pré-milenarismo (clássico e dispensacional).',
    entries: [
      {
        id: "riddlebarger-case-amillennialism",
        author: "Riddlebarger, Kim",
        title: "A Case for Amillennialism",
        subtitle: "Understanding the End Times",
        publisher: "Baker Books",
        year: 2013,
        isbn: "978-0-8010-1550-2",
        originalLanguage: "en",
        level: "intermediário",
        review:
          "Riddlebarger (PhD, Fuller Theological Seminary) oferece a defesa mais acessível e direta do amilenarismo reformado. A edição expandida de 2013 incorpora um capítulo sobre o pacto e revisões à discussão de Ap 20. Examina Daniel 9, Mt 24, Rm 11 e Ap 20 com exegese rigorosa, avalia os pontos fracos do pré- e pós-milenarismo, e situa o amilenarismo como posição histórico-protestante. Leitura complementar natural ao *The Bible and the Future* de Hoekema (Categoria 1) e ao *The Promise of the Future* de Venema (nesta categoria).",
      },
      {
        id: "storms-kingdom-come",
        author: "Storms, Sam",
        title: "Kingdom Come",
        subtitle: "The Amillennial Alternative",
        publisher: "Christian Focus / Mentor",
        year: 2013,
        isbn: "978-1-78191-132-7",
        originalLanguage: "en",
        level: "avançado",
        review:
          "Com 592 páginas, é a exposição amilenarista mais abrangente escrita no séc. XXI. Storms (ThM, Dallas Theological Seminary; PhD, University of Texas at Dallas) percorre hermenêutica, Daniel, o Discurso do Monte das Oliveiras, Israel e Igreja, Rm 11, Ap 20 e o anticristo, dialogando extensivamente com o dispensacionalismo clássico. G.K. Beale elogiou a obra como 'substancial e confiável'; Kevin DeYoung a apontou como o novo padrão amilenarista. A crítica ao pré-tribucionismo é particularmente desenvolvida, tornando o livro um par necessário ao Riddlebarger para quem deseja aprofundamento.",
      },
      {
        id: "venema-promise-future",
        crossReferences: ['fundamentos'],
        author: "Venema, Cornelis P.",
        title: "The Promise of the Future",
        publisher: "Banner of Truth Trust",
        year: 2000,
        isbn: "978-0-8515-1793-3",
        originalLanguage: "en",
        translationPT: {
          title: "A Promessa do Futuro",
          publisher: "Cultura Cristã",
          year: 2017,
          isbn: "978-85-7622-644-4",
        },
        level: "avançado",
        review:
          "A obra mais completa de escatologia sistemática reformada amilenarista disponível em pt-BR. Venema (PhD, Princeton Theological Seminary) cobre estado intermediário, milênio (Ap 20), segunda vinda, ressurreição, julgamento, estado eterno e destino dos ímpios, sempre em diálogo com as confissões reformadas. Ao contrário de Riddlebarger e Storms, Venema adota tom mais enciclopédico que polêmico, o que o torna ideal como texto-base para seminários. Sinclair Ferguson o apresentou como a introdução mais completa à escatologia bíblica disponível.",
      },
      {
        id: "mathison-postmillennialism",
        author: "Mathison, Keith A.",
        title: "Postmillennialism",
        subtitle: "An Eschatology of Hope",
        publisher: "P&R Publishing",
        year: 1999,
        isbn: "978-0-8755-2389-7",
        originalLanguage: "en",
        level: "intermediário",
        review:
          "Mathison (PhD, Whitefield Theological Seminary), da Ligonier Ministries, apresenta o caso mais sucinto e rigoroso para o pós-milenarismo contemporâneo, distinguindo-o do reconstrucionismo extremo (Bahnsen) e do preterismo pleno. A obra percorre considerações hermenêuticas, históricas e exegéticas (AT e NT), e critica o pré- e amilenarismo antes de defender o otimismo escatológico com base no triunfo progressivo do Evangelho. Indicada por R.C. Sproul como leitura essencial para compreender o pós-milenarismo saudável.",
      },
      {
        id: "walvoord-millennial-kingdom",
        author: "Walvoord, John F.",
        title: "The Millennial Kingdom",
        subtitle: "A Basic Text in Premillennial Theology",
        publisher: "Zondervan Academic",
        year: 1983,
        isbn: "978-0-310-34091-1",
        originalLanguage: "en",
        level: "acadêmico",
        review:
          "Texto canônico do dispensacionalismo clássico, escrito por John Walvoord durante sua presidência do Dallas Theological Seminary. Examina as três posições em seus contextos histórico-teológicos, mas dedica o corpo principal à defesa do pré-milenarismo dispensacional a partir das profecias. A ênfase no literalismo hermenêutico — Israel e Igreja como entidades distintas com promessas distintas — é o ponto de maior contraste com Riddlebarger, Storms e Venema.",
      },
      {
        id: "blaising-bock-progressive-dispensationalism",
        author: "Blaising, Craig A.",
        coAuthors: ["Bock, Darrell L."],
        title: "Progressive Dispensationalism",
        publisher: "Baker Academic",
        year: 2000,
        isbn: "978-0-8010-2243-2",
        originalLanguage: "en",
        level: "avançado",
        review:
          "Marco no desenvolvimento interno do dispensacionalismo. Rejeita o dualismo absoluto Israel/Igreja do dispensacionalismo clássico em favor de uma unidade progressiva do plano redentor. A obra é dividida em história, hermenêutica, exposição e implicações eclesiológicas. Gerry Breshears descreveu-a como 'marco para discussões futuras'. Lida em conjunto com Walvoord, permite ao leitor rastrear a evolução interna do dispensacionalismo do séc. XX ao XXI.",
      },
      {
        id: "bock-ed-three-views-millennium",
        author: "Bock, Darrell L. (ed.)",
        title: "Three Views on the Millennium and Beyond",
        subtitle: "Counterpoints: Bible and Theology",
        publisher: "Zondervan",
        year: 1999,
        isbn: "978-0-310-20143-4",
        originalLanguage: "en",
        level: "introdutório",
        review:
          "Volume da série Counterpoints que apresenta, critica e responde às três posições milenaristas centrais: pré-milenarismo dispensacional progressivo (Craig Blaising), pós-milenarismo reconstrucionista (Kenneth Gentry Jr.) e amilenarismo (Robert Strimple). Darrell Bock fornece o panorama introdutório e o ensaio de síntese. É a obra mais indicada como primeiro passo para leitores que desejam entender por que essas posições divergem antes de aprofundar-se.",
      },
    ],
  },
  {
    id: 'tribulacionismo',
    title: 'Tribulacionismo, Arrebatamento e Anticristo',
    intro:
      'Foco exclusivo nos debates logísticos e temporais sobre o papel da Igreja na Tribulação, a identificação do "Filho da Perdição" e a ordem do arrebatamento (pré, meso, pré-ira ou pós-tribulacional).',
    entries: [
      {
        id: "ladd-blessed-hope",
        author: "Ladd, George Eldon",
        title: "The Blessed Hope",
        subtitle: "A Biblical Study of the Second Advent and the Rapture",
        publisher: "Wm. B. Eerdmans",
        year: 1956,
        isbn: "978-0-8028-1111-0",
        originalLanguage: "en",
        translationPT: {
          title: "Esperança Abençoada: Um Estudo Bíblico da Segunda Vinda de Jesus e do Arrebatamento",
          publisher: "Editora Shedd",
          year: 2016,
          isbn: "978-85-8038-052-1"
        },
        level: "acadêmico",
        review: "Obra seminal de Ladd (PhD, Harvard; professor de NT no Fuller Theological Seminary) que lançou o debate moderno sobre o arrebatamento. A tese central é que a 'esperança abençoada' do NT é a Parusia de Cristo, não um arrebatamento pré-tribulacionista. Em 167 páginas densas, Ladd rastreia a história do pré-tribucionismo (originado nos Plymouth Brethren do séc. XIX, não na patrística), examina as passagens de 1Ts 4, Mt 24 e Ap, e argumenta que o pós-tribucionismo é a posição natural da exegese. O livro desafiou o consenso dispensacional de sua geração e foi o ponto de partida necessário para Walvoord (*The Rapture Question*), para Gundry (*The Church and the Tribulation*) e para o debate contemporâneo reunido no volume *Three Views on the Rapture* (Hultberg)."
      },
      {
        id: "walvoord-rapture-question",
        author: "Walvoord, John F.",
        title: "The Rapture Question",
        publisher: "Zondervan Academic",
        year: 1979,
        isbn: "978-0-310-34151-2",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Resposta direta de Walvoord (ThD, Dallas Theological Seminary) ao pós-tribucionismo de Ladd e Alexander Reese. A edição revista de 1979 examina as quatro posições sobre o arrebatamento da Igreja (arrebatamento parcial, pré-, meso- e pós-tribucionismo) e adiciona tratamentos exegéticos de 1Ts 4–5, 2Ts, 1Co 15 e Ap. A estratégia central de Walvoord é mostrar que a imobilidade do arrebatamento pré-tribulacionista decorre da distinção dispensacional entre Israel e Igreja — quem dissolve essa distinção não tem razão exegética para separar os dois eventos. Lido em par com Ladd, constitui o eixo do debate pré- vs. pós-tribucionismo do séc. XX e é a referência canônica da posição pré-trib."
      },
      {
        id: "gundry-church-tribulation",
        author: "Gundry, Robert H.",
        title: "The Church and the Tribulation",
        subtitle: "A Biblical Examination of Posttribulationism",
        publisher: "Zondervan Academic",
        year: 1973,
        isbn: "978-0-310-25401-0",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Gundry (PhD, Manchester; professor emérito do Westmont College) oferece o tratamento acadêmico mais rigoroso do pós-tribucionismo da segunda metade do séc. XX. Ao contrário de Ladd, que escreveu para o público amplo, Gundry apresenta uma análise exegética densa — imobilidade/iminência, a ira divina e a proteção da Igreja, o Discurso do Monte das Oliveiras, e os pontos críticos do Apocalipse (Ap 4–19, a colheita de Ap 14, a ceia das bodas em Ap 19). Sua crítica à distinção Israel/Igreja e ao argumento da imobilidade do arrebatamento pré-trib é considerada a mais substancial da literatura pós-trib."
      },
      {
        id: "rosenthal-prewrath-rapture",
        author: "Rosenthal, Marvin J.",
        title: "The Pre-Wrath Rapture of the Church",
        publisher: "Thomas Nelson",
        year: 1990,
        isbn: "978-0-8407-3160-9",
        originalLanguage: "en",
        level: "intermediário",
        review: "Rosenthal, ex-diretor da Friends of Israel Gospel Ministry e pré-tribucionista por 30 anos, apresentou nesta obra a posição pré-ira (pre-wrath) — distinção entre a 'Grande Tribulação' (Mt 24.21, perseguição satânica) e a 'ira de Deus' (o Dia do Senhor), com o arrebatamento ocorrendo entre os dois eventos, após a abertura do 6.º selo mas antes das 7 trombetas. A obra inclui 25 gráficos e recebeu acolhida mista: foi amplamente criticada por pré-tribucionistas (resposta de Thomas Ice) mas gerou uma corrente própria com representantes acadêmicos como Alan Hultberg. É a referência primária para compreender a posição pré-ira."
      },
      {
        id: "hultberg-ed-three-views-rapture",
        author: "Hultberg, Alan (ed.)",
        coAuthors: ["Blaising, Craig A.", "Moo, Douglas J."],
        title: "Three Views on the Rapture",
        subtitle: "Pretribulation, Prewrath, or Posttribulation (Counterpoints: Bible and Theology 2.ª ed.)",
        publisher: "Zondervan",
        year: 2010,
        isbn: "978-0-310-27720-0",
        originalLanguage: "en",
        level: "intermediário",
        review: "Segunda edição do volume Counterpoints dedicado ao arrebatamento, com uma novidade fundamental em relação à 1.ª edição: a substituição do pré-trib clássico por Craig Blaising (dispensacionalismo progressivo) e a inclusão de Alan Hultberg (pré-ira) no lugar do meso-tribucionismo. Douglas Moo mantém o pós-tribucionismo. O volume é organizado em ponto e contraponto. Lido na sequência de Ladd, Walvoord, Gundry e Rosenthal, permite ao leitor situar os argumentos que se desenvolveram ao longo de 70 anos em um único volume contemporâneo."
      }
    ]
  },
  {
    id: 'apocalipse',
    title: 'Hermenêutica do Apocalipse',
    intro: 'As quatro escolas interpretativas: Preterismo · Historicismo · Futurismo · Idealismo.',
    entries: [
      {
        id: "pate-ed-four-views-revelation",
        author: "Pate, C. Marvin (ed.)",
        coAuthors: ["Gentry Jr., Kenneth L.", "Hamstra Jr., Sam", "Thomas, Robert L."],
        title: "Four Views on the Book of Revelation",
        subtitle: "Counterpoints: Bible and Theology",
        publisher: "Zondervan",
        year: 1998,
        isbn: "978-0-310-21080-1",
        originalLanguage: "en",
        level: "introdutório",
        review: "Volume da série Counterpoints que apresenta as quatro posições hermenêuticas canônicas para o Apocalipse. Kenneth Gentry Jr. defende o preterismo (cumprimento em 70 d.C.); Sam Hamstra Jr. o idealismo (simbolismo trans-histórico); C. Marvin Pate o dispensacionalismo progressivo (futurismo moderado); Robert L. Thomas o dispensacionalismo clássico (futurismo literal). O volume é organizado em ensaio + resposta por pares. Nota crítica relevante: a ausência do historicismo como posição autônoma é falha reconhecida por resenhistas — o volume pressupõe que o futurismo dispensacional absorveu o debate do historicismo reformado. Lido em conjunto com Beale (idealismo/amil) e Sproul (preterismo moderado), dá ao leitor o quadro completo das decisões hermenêuticas prévias que geram os sistemas escatológicos."
      },
      {
        id: "beale-revelation-nigtc",
        author: "Beale, G. K.",
        title: "The Book of Revelation: A Commentary on the Greek Text",
        subtitle: "New International Greek Testament Commentary (NIGTC)",
        publisher: "Wm. B. Eerdmans / Paternoster",
        year: 1999,
        isbn: "978-0-8028-2174-4",
        originalLanguage: "en",
        level: "acadêmico",
        review: "O comentário técnico mais abrangente e influente sobre o Apocalipse na erudição evangélica contemporânea. Beale (PhD, Cambridge; Westminster Theological Seminary) dedica sua introdução de 178 páginas a gênero, estrutura, datação, uso do AT e posição hermenêutica — idealismo com elementos futuristas ('já e ainda não'). O coração metodológico de Beale é intertextual: cada imagem joanina é rastreada a seus antecedentes veterotestamentários (Daniel, Ezequiel, Isaías, Êxodo, Salmos) através da tradição exegética judaica, mostrando que o chave para o Apocalipse é o AT, não eventos históricos do séc. XX. Richard Bauckham (nesta categoria) o descreveu como 'uma conquista magnífica'; D.A. Carson recomendou-o como o comentário que 'melhor combina abrangência, fidelidade bíblica e reflexão teológica'. Obra de referência insubstituível."
      },
      {
        id: "bauckham-theology-revelation",
        author: "Bauckham, Richard",
        title: "The Theology of the Book of Revelation",
        subtitle: "New Testament Theology",
        publisher: "Cambridge University Press",
        year: 1993,
        isbn: "978-0-521-35691-6",
        originalLanguage: "en",
        level: "intermediário",
        review: "Em apenas 169 páginas, Bauckham (PhD, Cambridge; Ridley Hall, Cambridge) oferece a melhor introdução teológica ao Apocalipse independente de posição sistemática. O argumento central: Apocalipse não é cifra de eventos futuros mas visão teocêntrica — Deus e o Cordeiro no trono — contextualizada na Roma imperial e seus cultos. Bauckham analisa a estrutura literária (cartas + selos + trombetas + taças), o simbolismo numérico, a teologia da testemunha (*martyria*) como método de conquista, e o universalismo missionário (as nações convocadas para o reino). Embora Bauckham não seja primariamente um debatedor de sistemas escatológicos, sua leitura contextual é a mais citada em obras de hermenêutica apocalíptica. Livro de entrada ideal antes de Beale ou Osborne."
      },
      {
        id: "osborne-revelation-becnt",
        author: "Osborne, Grant R.",
        title: "Revelation",
        subtitle: "Baker Exegetical Commentary on the New Testament (BECNT)",
        publisher: "Baker Academic",
        year: 2002,
        isbn: "978-0-8010-2299-9",
        originalLanguage: "en",
        level: "avançado",
        review: "Osborne (PhD, University of Aberdeen; Trinity Evangelical Divinity School) adota uma posição intencionalmente eclética — 'o presente endereçado por meio de paralelos com o futuro'. Seu comentário combina exegese do texto grego com análise por seções maiores (não versículo a versículo), incluindo um painel de 'Contextualização' ao final de cada perícope que extrai implicações pastorais. Ao contrário de Beale (que privilegia intertextualidade AT) e Aune (que privilegia paralelos greco-romanos), Osborne dialoga com toda a gama — preterismo, historicismo, idealismo, futurismo — antes de emitir seu juízo. Os parágrafos de 'Notas Adicionais' oferecem visão panorâmica dos intérpretes. Para quem deseja um comentário mais prático que o NIGTC de Beale mas igualmente rigoroso, o BECNT de Osborne é o par natural."
      },
      {
        id: "sproul-last-days-according-to-jesus",
        author: "Sproul, R. C.",
        title: "The Last Days According to Jesus",
        publisher: "Baker Books",
        year: 1998,
        isbn: "978-0-8010-1171-9",
        originalLanguage: "en",
        translationPT: {
          title: "Os Últimos Dias Segundo Jesus",
          publisher: "Cultura Cristã",
          year: 2016,
          isbn: "978-85-7622-530-0"
        },
        level: "intermediário",
        review: "Sproul (PhD, Vrije Universiteit Amsterdam; fundador da Ligonier Ministries) apresenta o preterismo parcial de forma acessível — distinção fundamental para quem aborda o Apocalipse e Mt 24: a iminência dos eventos (Mc 13.30: 'esta geração') é cumprida em 70 d.C. (destruição de Jerusalém por Tito), mas o retorno final de Cristo permanece futuro. Sproul refuta a tese de que Jesus teria sido um 'profeta falso' (David Strauss, Bertrand Russell) ao mostrar que seus oráculos de julgamento foram literalmente cumpridos no prazo anunciado. O livro cobre o Discurso do Monte das Oliveiras em Mateus, Marcos e Lucas, as epístolas paulinas ('últimos dias' como referência ao séc. I), e o papel de João e Ap. Indicado por Kenneth Gentry Jr. como 'exegese cuidadosa e direta'. Disponível em pt-BR pela Cultura Cristã."
      }
    ]
  },
  {
    id: 'pactoVsDispensacional',
    title: 'Pacto, Israel e Igreja',
    intro: 'Teologia do Pacto · Dispensacionalismo Clássico · Dispensacionalismo Progressivo · Pactualismo Progressivo · Supersessionismo / Não-supersessionismo.',
    entries: [
      {
        id: "robertson-christ-covenants",
        author: "Robertson, O. Palmer",
        title: "The Christ of the Covenants",
        publisher: "P&R Publishing",
        year: 1980,
        isbn: "978-0-8755-2418-4",
        originalLanguage: "en",
        level: "avançado",
        review: "Obra canônica da teologia do pacto reformada contemporânea. Robertson (ThD, Union Theological Seminary) define o pacto bíblico como 'um vínculo de sangue soberanamente administrado' e percorre todos os pactos principais — criação, Noé, Abraão, Moisés, Davi e a Nova Aliança — mostrando sua progressão unitária em direção a Cristo. O excursus comparativo entre a teologia do pacto e o dispensacionalismo (cap. 4) é o trecho mais citado no debate. Derek Kidner elogiou sua clareza e equilíbrio; R. O. Zorn (Vox Reformata) indicou-o como referência para compreender o pacto como eixo da mensagem bíblica. Lido antes de Robertson, o leitor terá o andaime conceitual para avaliar qualquer debate subsequente sobre continuidade/descontinuidade AT–NT."
      },
      {
        id: "ryrie-dispensationalism",
        author: "Ryrie, Charles C.",
        title: "Dispensationalism",
        publisher: "Moody Publishers",
        year: 1995,
        isbn: "978-0-8024-2187-6",
        originalLanguage: "en",
        level: "intermediário",
        review: "Ryrie (ThD, Dallas Theological Seminary; PhD, University of Edinburgh) escreveu o único apologético de fôlego para o dispensacionalismo clássico produzido por um erudito de primeiro nível. A obra define os 'três elementos essenciais' do dispensacionalismo (distinção Israel/Igreja, hermenêutica consistentemente literal, glória de Deus como telos único da história), contesta a teologia do pacto e o pré-milenarismo histórico, e na edição de 1995 acrescenta capítulo respondendo ao dispensacionalismo progressivo de Blaising e Bock (Cat. 2). Ryrie admite honestamente que 'nenhuma passagem ensina explicitamente o arrebatamento pré-tribulacionista' — afirmação que tornou o livro referência tanto para defensores como para críticos do sistema."
      },
      {
        id: "gentry-wellum-kingdom-through-covenant",
        author: "Gentry, Peter J.",
        coAuthors: ["Wellum, Stephen J."],
        title: "Kingdom through Covenant",
        subtitle: "A Biblical-Theological Understanding of the Covenants",
        publisher: "Crossway",
        year: 2018,
        isbn: "978-1-4335-5307-3",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Marco da teologia bíblica evangélica do séc. XXI. Gentry (PhD, University of Toronto; professor de AT no SBTS) e Wellum (PhD, Trinity Evangelical Divinity School; professor de teologia sistemática no SBTS) propõem o 'pactualismo progressivo' como via media entre a teologia do pacto (Robertson, Horton) e o dispensacionalismo (Ryrie, Walvoord). O argumento central: os pactos não são apenas moldura organizacional mas o *backbone* do enredo redentor — e cada pacto progride e é cumprido tipologicamente em Cristo, sem que Israel e Igreja sejam fusionados indistintamente (contra a teologia do pacto clássica) nem separados eternamente (contra o dispensacionalismo clássico). Thomas Schreiner chamou-o de 'must-read'; Jonathan Leeman comparou-o a Bach no debate pactual."
      },
      {
        id: "parker-lucas-eds-covenantal-dispensational",
        author: "Parker, Brent E. (ed.)",
        coAuthors: ["Lucas, Richard J. (ed.)", "Horton, Michael S.", "Wellum, Stephen J.", "Bock, Darrell L.", "Snoeberger, Mark A."],
        title: "Covenantal and Dispensational Theologies",
        subtitle: "Four Views on the Continuity of Scripture (Spectrum Multiview Book Series)",
        publisher: "IVP Academic",
        year: 2022,
        isbn: "978-1-5140-0112-7",
        originalLanguage: "en",
        level: "intermediário",
        review: "A mais atual e equilibrada exposição lado a lado dos sistemas hermenêuticos que geram os debates escatológicos. Michael Horton (Westminster Seminary California) defende a teologia do pacto reformada; Stephen Wellum (SBTS) o pactualismo progressivo; Darrell Bock (Dallas) o dispensacionalismo progressivo; Mark Snoeberger (DBTS) o dispensacionalismo clássico. Cada posição recebe capítulo próprio e réplicas dos outros três. As três tabelas comparativas no epílogo de Parker e Lucas sintetizam as diferenças em formato visual de fácil referência. Andy Naselli (Bethlehem College & Seminary) o recomendou como texto obrigatório para cursos de escatologia eclesiológica. Para quem deseja entender *por que* diferentes cristãos leem as mesmas profecias de modos tão distintos, este é o livro de entrada mais eficiente."
      },
      {
        id: "vlach-church-replaced-israel",
        author: "Vlach, Michael J.",
        title: "Has the Church Replaced Israel?",
        subtitle: "A Theological Evaluation",
        publisher: "B&H Academic",
        year: 2010,
        isbn: "978-0-8054-4972-3",
        originalLanguage: "en",
        level: "avançado",
        review: "Vlach (PhD, Southeastern Baptist Theological Seminary; professor no The Master's Seminary) oferece a análise histórico-teológica mais completa do supersessionismo (teologia da substituição) disponível em um único volume. A obra percorre as três formas de supersessionismo (punitivo, econômico, estrutural), rastreia seu desenvolvimento da patrística à contemporaneidade, avalia os argumentos hermenêuticos — prioridade do NT sobre o AT, cumprimento não-literal, tipologia Israel→Igreja — e defende o não-supersessionismo com base em Rm 9–11, nos pactos abraâmico e davídico, e na coerência da revelação progressiva. Complementar a Robertson (teologia do pacto) e Ryrie (dispensacionalismo) para entender *o que está em jogo* quando escatologistas debatem o futuro de Israel como nação."
      }
    ]
  },
  {
    id: 'estadoIntermediario',
    title: 'Estado Intermediário e Escatologia Individual',
    intro: 'Morte, Estado intermediário, Ressurreição corporal, Imortalidade condicional, Aniquilacionismo e Inferno.',
    entries: [
      {
        id: "cullmann-immortality-resurrection",
        author: "Cullmann, Oscar",
        title: "Immortality of the Soul or Resurrection of the Dead?",
        subtitle: "The Witness of the New Testament",
        publisher: "Epworth Press / Wipf & Stock",
        year: 1958,
        isbn: "978-1-608994-72-4",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Conferência Ingersoll de Cullmann em Harvard (1954–55), publicada em 1958 e traduzida para dezenas de línguas. Em apenas 60 páginas, o NT de Basel e da Sorbonne argumenta que a esperança cristã é a *ressurreição dos mortos* — e não a *imortalidade da alma* de origem platônica. Cullmann contrasta a morte serena de Sócrates (que libera a alma do corpo-prisão) com a angústia de Jesus diante da morte (Jo 11; Getsêmani), mostrando que para o NT a morte é inimiga — não liberação. A resenha de Karl Barth e a resposta de Cullmann constituem um dos debates mais reveladores da escatologia do séc. XX. Obra de entrada para qualquer discussão sobre o estado intermediário, alma, psicopaniquismo e imortalidade condicional.",
        onlineLinks: [{ label: "Ler Online", url: "https://religion-online.org/book/immortality-of-the-soul-or-resurrection-of-the-dead/" }]
      },
      {
        id: "cooper-body-soul-life-everlasting",
        author: "Cooper, John W.",
        title: "Body, Soul, and Life Everlasting",
        subtitle: "Biblical Anthropology and the Monism-Dualism Debate",
        publisher: "Wm. B. Eerdmans",
        year: 2000,
        isbn: "978-0-8028-4600-6",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Cooper (PhD, Calvin Theological Seminary; professor de teologia filosófica no Calvin) oferece a defesa acadêmica mais rigorosa do 'dualismo holístico' — posição que afirma a distinção ontológica alma/corpo sem cair no dualismo cartesiano platônico. O argumento central: a doutrina bíblica do estado intermediário (a existência consciente 'com Cristo' entre a morte individual e a ressurreição geral) *pressupõe* algum tipo de dualismo; qualquer monismo consistente é forçado a adotar ressurreição imediata, sono da alma ou extinção/recriação. Cooper examina AT, literatura intertestamentária, Evangelhos, Paulinas e Não-Paulinas, respondendo a seis objeções filosóficas e teológicas. Leitura técnica indispensável antes de Fudge e Morgan/Peterson (nesta categoria)."
      },
      {
        id: "wright-surprised-by-hope",
        author: "Wright, N. T.",
        title: "Surprised by Hope",
        subtitle: "Rethinking Heaven, the Resurrection, and the Mission of the Church",
        publisher: "HarperOne",
        year: 2008,
        isbn: "978-0-061-55182-6",
        originalLanguage: "en",
        translationPT: {
          title: "Surpreendido pela Esperança: Repensando o Céu, a Ressurreição e a Missão da Igreja",
          publisher: "Editora Ultimato",
          year: 2009,
          isbn: "978-85-7779-034-0"
        },
        level: "intermediário",
        review: "Wright (PhD, Oxford; Bispo de Durham) desafia a confusão popular sobre a esperança cristã: a meta não é 'ir para o céu' mas a ressurreição corporal e a nova criação. Em duas partes, Wright apresenta a evidência histórica para a ressurreição de Jesus e extrai dela as implicações escatológicas — estado intermediário como 'estar com Cristo' (Fp 1.23), segunda vinda como Parusia que transformará a criação, ressurreição final como consumação. A crítica ao dispensacionalismo (1Ts 4 como acolhida imperial, não fuga) e à espiritualidade escapista é frontal. Premiado pela Christianity Today (Prêmio de Mérito em Teologia e Ética, 2009). Disponível em pt-BR pela Editora Ultimato."
      },
      {
        id: "fudge-fire-that-consumes",
        author: "Fudge, Edward William",
        title: "The Fire That Consumes",
        subtitle: "A Biblical and Historical Study of the Doctrine of Final Punishment",
        publisher: "Cascade Books",
        year: 2011,
        isbn: "978-1-608999-30-9",
        originalLanguage: "en",
        level: "avançado",
        review: "A obra canônica do aniquilacionismo evangélico. Fudge (mestre em línguas bíblicas, Abilene Christian University; advogado) percorre toda a Escritura — AT, literatura intertestamentária, Evangelhos, Paulinas, Hebreus, Apocalipse — e conclui que o castigo final dos ímpios é extinção definitiva (annihilation), não tormento eterno consciente. A 3.ª edição (2011) responde a 17 autores tradicionalistas e incorpora três décadas de debate. Richard Bauckham o recomendou como 'referência padrão'; a Christianity Today o elegeu um dos quatro livros mais importantes do debate. Lido em confronto com Morgan & Peterson (nesta categoria), permite ao leitor avaliar as duas posições com textos primários de cada lado."
      },
      {
        id: "morgan-peterson-eds-hell-under-fire",
        author: "Morgan, Christopher W. (ed.)",
        coAuthors: ["Peterson, Robert A. (ed.)", "Beale, Gregory K.", "Block, Daniel I.", "Ferguson, Sinclair B.", "Mohler Jr., R. Albert", "Moo, Douglas J.", "Packer, J. I."],
        title: "Hell Under Fire",
        subtitle: "Modern Scholarship Reinvents Eternal Punishment",
        publisher: "Zondervan",
        year: 2004,
        isbn: "978-0-310-24041-9",
        originalLanguage: "en",
        level: "intermediário",
        review: "Resposta coletiva de nove teólogos de peso ao universalismo (Rob Bell) e ao aniquilacionismo (Fudge, Stott). Cada autor aborda o tema de um ângulo específico: Mohler (desaparecimento do inferno na cultura moderna), Block (AT), Yarbrough (Jesus), Moo (Paulo), Beale (Apocalipse), Morgan (três imagens bíblicas do inferno: punição, destruição, banimento), Peterson (perspectivas sistemáticas), Packer (universalismo), Morgan novamente (aniquilacionismo) e Ferguson (pregação pastoral sobre o inferno). O livro não oculta os textos difíceis mas os exegeta. Lido em conjunto com Fudge (*The Fire That Consumes*), constitui o ponto de entrada mais equilibrado para o debate sobre a natureza do castigo eterno."
      }
    ]
  },
  {
    id: 'antigoTestamento',
    title: 'Escatologia Judaica do Segundo Templo',
    intro: 'Raízes judaicas da escatologia cristã, Apocalíptica, Pseudepigrafia, Qumran, "Dois Eons" e Ressurreição no judaísmo pré-cristão.',
    entries: [
      {
        id: "collins-apocalyptic-imagination",
        author: "Collins, John J.",
        title: "The Apocalyptic Imagination",
        subtitle: "An Introduction to Jewish Apocalyptic Literature",
        publisher: "Wm. B. Eerdmans",
        year: 2016,
        isbn: "978-0-8028-7279-1",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Collins (Yale Divinity School; ex-presidente da Society of Biblical Literature) publicou a primeira edição desta obra em 1984, e ela rapidamente se tornou o texto padrão do campo. A 3.ª edição (2016) atualiza bibliografias (+21 páginas), revisita Qumran à luz de novas publicações dos Manuscritos do Mar Morto e incorpora os debates do Enoch Seminar. Collins percorre a literatura proto-apocalíptica do AT, os livros de 1 Enoque, Daniel, os Oráculos Sibilinos, os Testamentos, as Similitudes, 4 Esdras, 2 Baruque e o Apocalipse de Abraão, e conclui com o apocaliptismo no início do Cristianismo. A definição de Collins de 'apocalipse' como gênero literário (*Semeia* 14, 1979) estruturou três décadas de pesquisa. John S. Kloppenborg (Toronto) descreveu-a como 'o mapa mais confiável do terreno complexo e variado da literatura do Judaísmo do Segundo Templo'."
      },
      {
        id: "nickelsburg-jewish-literature",
        author: "Nickelsburg, George W. E.",
        title: "Jewish Literature Between the Bible and the Mishnah",
        subtitle: "A Historical and Literary Introduction",
        publisher: "Fortress Press",
        year: 2005,
        isbn: "978-0-8006-9915-4",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Nickelsburg (emérito, University of Iowa) publica desde 1981 o texto-base para o estudo da literatura judaica intertestamentária. A 2.ª edição (2005) expande substancialmente o tratamento dos Manuscritos do Mar Morto e atualiza bibliografias. A organização é histórica: a cada período (diáspora, Alexandre, crise macabeiana, Hasmoneus, Qumran, Egito, período romano, destruição e reconstrução) correspondem os textos literários que podem ser datados nele. O livro cobre Apócrifos (1 Macabeus, Sabedoria de Ben Sira), Pseudepigrafia (1 Enoque, Jubileus, Testamentos dos Doze Patriarcas, 4 Esdras, 2 Baruque), Manuscritos do Mar Morto, Filo e Josefo. John J. Collins o descreveu como o guia mais criterioso e equilibrado do campo."
      },
      {
        id: "wright-nt-people-of-god",
        author: "Wright, N. T.",
        title: "The New Testament and the People of God",
        subtitle: "Christian Origins and the Question of God, Vol. 1",
        publisher: "Fortress Press",
        year: 1992,
        isbn: "978-0-8006-2681-5",
        originalLanguage: "en",
        level: "intermediário",
        review: "Primeiro volume da série monumental de Wright sobre origens cristãs. A parte central do livro (caps. 7–10) é o mapa mais acessível e influente da 'visão de mundo' do judaísmo do Segundo Templo para leitores do NT: a narrativa de Israel (criação → queda → Torá → exílio → retorno esperado), os símbolos (Templo, Torá, terra, identidade racial), as práticas e as esperanças escatológicas (Dia do Senhor, Messias, ressurreição, restauração de Israel). Wright argumenta que Jesus e Paulo operaram *dentro* dessa estrutura e a ressignificaram em torno da Parusia e da ressurreição. A abordagem de 'realismo crítico' torna o livro leitura obrigatória antes de qualquer estudo de teologia paulina ou cristologia. John S. Kloppenborg chamou-o de 'extraordinariamente acessível para estudantes, e provocativo para acadêmicos'."
      },
      {
        id: "sanders-judaism-practice-belief",
        author: "Sanders, E. P.",
        title: "Judaism",
        subtitle: "Practice and Belief, 63 BCE–66 CE",
        publisher: "SCM Press / Trinity Press International",
        year: 1992,
        isbn: "978-0-334-02470-5",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Obra-irmã do seminal *Paul and Palestinian Judaism* (1977), considerada o estudo mais abrangente do judaísmo do Segundo Templo na era do NT. Sanders (Duke University) desafia a imagem de um judaísmo dominado pelos fariseus e pelo legalismo, mostrando que o que unia a maioria dos judeus era o 'judaísmo comum' — adesão ao Templo, Torá, práticas de pureza, sábado, festas e as esperanças escatológicas que sustentavam a identidade coletiva. O livro cobre: funcionamento diário do Templo, sacerdotes e levitas, purity system, sacrifícios, dízimos, sábado, festas anuais, além de um capítulo dedicado a 'esperanças para o futuro' (ressurreição, julgamento, restauração nacional). É o contexto histórico-social imprescindível para compreender como Jesus e Paulo comunicaram sua mensagem escatológica."
      },
      {
        id: "wright-resurrection-son-of-god",
        author: "Wright, N. T.",
        title: "The Resurrection of the Son of God",
        subtitle: "Christian Origins and the Question of God, Vol. 3",
        publisher: "Fortress Press",
        year: 2003,
        isbn: "978-0-8006-2679-2",
        originalLanguage: "en",
        level: "acadêmico",
        review: "O estudo mais exaustivo já produzido sobre a esperança na ressurreição — parte III do projeto de Wright sobre origens cristãs. As partes I–III (700 páginas) percorrem a ideia de vida após a morte no mundo greco-romano, no AT, na literatura intertestamentária (1 Enoque, 2 Macabeus, 4 Esdras, 2 Baruque, Qumran, Josefo, Filo) e nos primeiros cristãos. A tese central é que 'ressurreição' no judaísmo do Segundo Templo tinha sempre sentido corporal e físico — o que torna a proclamação cristã historicamente inteligível e teologicamente específica. A parte final examina as narrativas pascais dos Evangelhos, 1Co 15 e Rm 1. Marcus Borg e Dale Allison o classificaram como a obra mais importante sobre a ressurreição de Jesus desde Schweitzer. Complemento indispensável ao *Surprised by Hope* (Categoria 6)."
      }
    ]
  },
  {
    id: 'historiaDoutrina',
    title: 'História da Doutrina Escatológica',
    intro: 'Patrística (séc. 2–7) · Apocalíptica medieval (séc. 5–15) · Reforma e pós-Reforma · Pré-milenarismo americano moderno.',
    entries: [
      {
        id: "daley-hope-early-church",
        author: "Daley, Brian E.",
        title: "The Hope of the Early Church",
        subtitle: "A Handbook of Patristic Eschatology",
        publisher: "Baker Academic",
        year: 2002,
        isbn: "978-0-8010-4597-4",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Daley SJ (Catherine F. Huisking Professor of Theology, University of Notre Dame) produziu a primeira síntese abrangente — em qualquer idioma — da escatologia dos Padres da Igreja, cobrindo as tradições gregas (Ireneu, Orígenes, Gregório de Nissa, João Damasceno), latinas (Tertuliano, Agostinho, Gregório Magno), siríacas, coptas e armênias do séc. 2 ao 7. A tese central é que havia unidade fundamental nas expectativas escatológicas patrísticas a despeito das peculiaridades de cada autor. O livro é organizado por autores e correntes (pré-nicenos, nicenos, pós-nicenos) e inclui discussão das controvérsias sobre o estado intermediário, o milenarismo de Ireneu e Papias, a apokatastasis de Orígenes e a codificação agostiniana que moldaria toda a tradição ocidental. Church History o chamou de 'bem-pesquisado e indispensável para qualquer estudante do desenvolvimento da doutrina cristã'."
      },
      {
        id: "hill-regnum-caelorum",
        author: "Hill, Charles E.",
        title: "Regnum Caelorum",
        subtitle: "Patterns of Millennial Thought in Early Christianity",
        publisher: "Wm. B. Eerdmans",
        year: 2001,
        isbn: "978-0-8028-4634-1",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Hill (PhD, Cambridge; professor de NT no Reformed Theological Seminary) explora uma ligação pouco estudada: a conexão entre as posições milenaristas e não-milenaristas dos Pais e suas convicções sobre o destino da alma no estado intermediário. A tese: os Padres que afirmavam o milenarismo corporal terrestre (Ireneu, Justino, Papias, Lactâncio) tendiam a negar a ascensão imediata da alma ao céu após a morte; os não-milenaristas (Clemente de Alexandria, Orígenes, Hipólito, Cipriano) geralmente afirmavam o *regnum caelorum* imediatamente após a morte, tornando o milênio terreno supérfluo. A 2.ª edição expande substancialmente a análise. Brian Daley o descreveu como 'estimulante trabalho de detetive histórico'; Richard Muller, no Westminster Theological Journal, classificou-o como 'contribuição importante'."
      },
      {
        id: "mcginn-visions-of-the-end",
        author: "McGinn, Bernard",
        title: "Visions of the End",
        subtitle: "Apocalyptic Traditions in the Middle Ages (Records of Civilization: Sources and Studies, vol. XCVI)",
        publisher: "Columbia University Press",
        year: 1998,
        isbn: "978-0-231-11257-4",
        originalLanguage: "en",
        level: "acadêmico",
        review: "McGinn (Naomi Shenstone Donnelley Professor, University of Chicago) organizou a antologia mais completa de fontes primárias da tradição apocalíptica cristã medieval, com introduções históricas e textos comentados em tradução. A cobertura vai de Pseudo-Efraim e Pseudo-Metódio (séc. 6–7) passando por Adso de Montier-en-Der, Joaquim de Fiore, Boaventura e os Espirituais Franciscanos até os Hussitas, Savonarola e Cristóvão Colombo. A introdução de McGinn distingue escatologia, apocaliptismo e milenarismo como categorias analíticas — distinção que se tornou padrão no campo. O *Library Journal* a descreveu como 'a história textual mais provável a se tornar a introdução padrão ao apocaliptismo cristão'. Edição com novo prefácio (1998) e bibliografia ampliada."
      },
      {
        id: "weber-living-shadow-second-coming",
        author: "Weber, Timothy P.",
        title: "Living in the Shadow of the Second Coming",
        subtitle: "American Premillennialism, 1875–1982",
        publisher: "University of Chicago Press",
        year: 1987,
        isbn: "978-0-226-87732-7",
        originalLanguage: "en",
        level: "intermediário",
        review: "Weber (PhD, University of Chicago; ex-professor de história da Igreja no Denver Seminary e Southern Baptist Theological Seminary) traça o desenvolvimento do pré-milenarismo americano desde a disseminação do sistema de Darby nos EUA (anos 1870s, convenções Niagara) até o evangelicalismo da era Reagan. A edição revisada de 1987 expande a análise até 1982 e adiciona novo prefácio. Weber examina a relação do pré-milenarismo com o fundamentalismo, os movimentos de santidade, a Conferência de Edimburgo, as duas Guerras Mundiais e o surgimento do Estado de Israel como 'confirmação' profética. Fundamenta historicamente debates que permanecem ativos hoje — do arrebatamento à teologia política dos evangelicais americanos. Complementar a Boyer (moderna) e Daley (patrística) para a visão de longa duração."
      },
      {
        id: "boyer-when-time-shall-be-no-more",
        author: "Boyer, Paul S.",
        title: "When Time Shall Be No More",
        subtitle: "Prophecy Belief in Modern American Culture",
        publisher: "Belknap Press / Harvard University Press",
        year: 1992,
        isbn: "978-0-674-95095-6",
        originalLanguage: "en",
        level: "intermediário",
        review: "Boyer (professor emérito de história americana na University of Wisconsin-Madison) produziu o estudo historiográfico mais abrangente sobre o impacto da crença na profecia bíblica na cultura americana do séc. 20. Com base em análise de fontes populares — livros de profecia (Hal Lindsey, Tim LaHaye), sermões, programas de rádio, filmes, e pesquisas de opinião — Boyer demonstra que a crença no fim dos tempos moldou atitudes americanas em relação à política externa, à guerra nuclear, ao ambientalismo e ao Estado de Israel. O livro mapeou a penetração cultural do dispensacionalismo e antecipou muitos dos debates que explodiram após o 11 de setembro e durante a saga do *Left Behind*. Grant Wacker (Duke) o descreveu como 'o trabalho mais rigoroso e abrangente sobre profecias na vida pública americana'."
      }
    ]
  },
  {
    id: 'contemporanea',
    title: 'Escatologia Contemporânea',
    intro: 'Teologia protestante, católica e evangélica do séc. 20–21 (Moltmann, Ratzinger, Balthasar, Beale).',
    entries: [
      {
        id: "moltmann-theology-of-hope",
        author: "Moltmann, Jürgen",
        title: "Theology of Hope",
        subtitle: "On the Ground and the Implications of a Christian Eschatology",
        publisher: "Fortress Press",
        year: 1993,
        isbn: "978-0-8006-2824-6",
        originalLanguage: "de",
        translationPT: {
          title: "Teologia da Esperança: Estudos sobre os Fundamentos e as Consequências de uma Escatologia Cristã",
          publisher: "Edições Loyola",
          year: 2023,
          isbn: "978-6-5550-4317-4"
        },
        level: "acadêmico",
        review: "Moltmann (professor emérito de teologia sistemática, Universidade de Tübingen) lançou este livro em 1964 e em poucos anos transformou a teologia ocidental ao propor que a escatologia não é apêndice da dogmática mas seu *fundamento*. Em resposta a Bloch (*Princípio Esperança*) e ao existencialismo de Bultmann, Moltmann recentrou a teologia cristã na *promessa*: o Deus bíblico é o Deus que vem, e a ressurreição de Jesus inaugura uma história de cumprimento ainda incompleta que impele a ação transformadora no presente. O efeito sobre a teologia da libertação, o ecumenismo e a teologia política foi imenso. Richard Bauckham escreveu a introdução à edição Fortress. A Loyola publicou a tradução em pt-BR, tornando-o acessível para leitores brasileiros."
      },
      {
        id: "moltmann-coming-of-god",
        author: "Moltmann, Jürgen",
        title: "The Coming of God",
        subtitle: "Christian Eschatology",
        publisher: "Fortress Press",
        year: 2004,
        isbn: "978-0-8006-3666-1",
        originalLanguage: "de",
        level: "acadêmico",
        review: "Volume final da sistemática de Moltmann e vencedor do Grawemeyer Award (2000). O livro estrutura a escatologia em três níveis progressivos: escatologia *pessoal* (vida eterna, ressurreição, estado intermediário), escatologia *histórica* (reino de Deus, milenarismo, pós-historia) e escatologia *cósmica* (nova criação, sabbath cósmico, panenteísmo). Moltmann rejeita tanto o apocaliptismo catastrófico ('solução final') quanto a dissolução da escatologia no presente, propondo a 'esperança missionária' da nova criação como postura básica do cristão. A análise do milenarismo medieval e do milenarismo americano é historicamente acurada. Lido em sequência com *Theology of Hope*, representa a síntese de três décadas de reflexão."
      },
      {
        id: "ratzinger-eschatology",
        author: "Ratzinger, Joseph",
        title: "Eschatology: Death and Eternal Life",
        subtitle: "Dogmatic Theology, vol. 9",
        publisher: "The Catholic University of America Press",
        year: 1988,
        isbn: "978-0-8132-1516-7",
        originalLanguage: "de",
        level: "acadêmico",
        review: "Ratzinger (então professor em Regensburg, mais tarde Prefeito da CDF e Papa Bento XVI) escreveu este volume como parte de uma série dogmática alemã em 1977. É reconhecido internacionalmente como a declaração sistemática mais rigorosa e equilibrada da escatologia católica do séc. 20. O livro examina os dados exegéticos (proclamação do Reino de Jesus, aguardo imediato), o desenvolvimento histórico da doutrina (Sheol, apocaliptismo judaico, patrística, escolástica), e articula posições sistemáticas sobre imortalidade da alma e ressurreição corporal, estado intermediário, purgatório, juízo particular e universal, inferno e céu. Ratzinger interage criticamente com a Teologia da Esperança (Moltmann) e com as propostas de ressurreição imediata (Greshake). A 2.ª edição inglesa inclui prefácio do autor como Bento XVI."
      },
      {
        id: "balthasar-dare-we-hope",
        author: "Balthasar, Hans Urs von",
        title: "Dare We Hope \"That All Men Be Saved\"?",
        subtitle: "With a Short Discourse on Hell",
        publisher: "Ignatius Press",
        year: 1988,
        isbn: "978-0-8987-0207-1",
        originalLanguage: "de",
        level: "acadêmico",
        review: "Von Balthasar (1905–1988), o teólogo católico mais influente do séc. 20 ao lado de Rahner, provocou amplo debate ao questionar se podemos afirmar com certeza que algum ser humano está no inferno. A obra reúne dois textos: *Was dürfen wir hoffen?* e *Kleiner Diskurs über die Hölle* (Breve Discurso sobre o Inferno). Balthasar não afirma universalismo — a condenação é real e a Igreja nunca declara um indivíduo condenado — mas argumenta que a misericórdia de Deus e a liberdade humana *permitem esperançar* pela salvação de todos, o que é diferente de *afirmar* que todos serão salvos. O prefácio de Robert Barron (2.ª ed.) e as respostas de Avery Dulles e outros tornam o debate acessível. Lido em conjunto com Ratzinger (Cat. 9) e Morgan/Peterson (Cat. 6), monta o triângulo do debate contemporâneo sobre o inferno."
      },
      {
        id: "beale-nt-biblical-theology",
        crossReferences: ['fundamentos'],
        author: "Beale, G. K.",
        title: "A New Testament Biblical Theology",
        subtitle: "The Unfolding of the Old Testament in the New",
        publisher: "Baker Academic",
        year: 2011,
        isbn: "978-0-8010-2697-3",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Beale (PhD, Cambridge; professor de NT e teologia bíblica no Reformed Theological Seminary) construiu o mais abrangente tratado de teologia bíblica do NT da tradição evangélica-reformada. A tese central: todo conceito teológico do NT — justificação, espírito, templo, reino, missão, ética — é uma *faceta* da inauguração da nova criação escatológica 'já e ainda não'. A estrutura percorre o AT (nova criação, reino, templo, lei, missão), a cristologia (Jesus como Israel final, novo Adão, novo templo), pneumatologia (Espírito como primícias escatológicas), eclesiologia e ética. A metodologia de 'eco' e tipologia ressoa com o projeto de Collins (Cat. 7) mas a partir de uma hermenêutica evangélica. Vencedor do Christianity Today Book Award de 2013. Richard Gaffin (Westminster) chamou-o de 'único e sem paralelo na disciplina'."
      }
    ]
  },
  {
    id: 'catolicaOrtodoxa',
    title: 'Escatologia Ortodoxa Oriental',
    intro: 'Theosis, Estado intermediário, Ressurreição, Liturgia como antecipação do Reino e Teologia apofática.',
    entries: [
      {
        id: "lossky-mystical-theology-eastern-church",
        author: "Lossky, Vladimir",
        title: "The Mystical Theology of the Eastern Church",
        publisher: "St. Vladimir's Seminary Press",
        year: 1976,
        isbn: "978-0-913-836-31-6",
        originalLanguage: "fr",
        level: "acadêmico",
        review: "Lossky (1903–1958), teólogo russo da diáspora em Paris e figura central do renascimento neo-patrístico, escreveu este livro para articular a teologia ortodoxa ao Ocidente com rigor filosófico e fidelidade patrística. A obra demonstra que a tradição oriental nunca separou mística e dogma: a *theosis* (deificação) não é meta de poucos contemplativos mas o destino escatológico de todo ser humano criado à imagem de Deus. Os capítulos sobre energias incriadas (teologia palamita), imagem e semelhança, e o 'festim do Reino' (capítulo final) são indispensáveis para compreender como a Ortodoxia entende a consumação escatológica como participação na vida divina — diferença radical em relação às tradições ocidentais. Georges Florovsky descreveu este livro como 'síntese neopatrística'. Lossky morreu antes de concluir os tomos planejados de uma dogmática sistemática."
      },
      {
        id: "schmemann-for-life-of-world",
        author: "Schmemann, Alexander",
        title: "For the Life of the World",
        subtitle: "Sacraments and Orthodoxy",
        publisher: "St. Vladimir's Seminary Press",
        year: 1973,
        isbn: "978-0-913-836-08-8",
        originalLanguage: "en",
        level: "intermediário",
        review: "Schmemann (1921–1983), decano do St. Vladimir's Orthodox Theological Seminary e figura decisiva no diálogo ecuménico do séc. 20, propõe neste clássico uma teologia da existência cristã inteiramente estruturada pela experiência litúrgica. A tese central: a liturgia — especialmente a Eucaristia — não é um 'rito sagrado' separado da vida, mas a manifestação e antecipação da realidade escatológica do Reino de Deus. 'Antes de mais nada, o Cristianismo não é uma religião, mas a revelação e a dádiva de uma nova vida.' O livro desenvolve uma visão de escatologia 'inaugurada' em que cada celebração eucarística é uma *parousia* sacramental — a forma ortodoxa de responder à mesma tensão já/ainda-não que Cullmann, Ladd e Wright abordam a partir do NT. Influenciou gerações de teólogos e liturgistas de múltiplas tradições."
      },
      {
        id: "ware-orthodox-church",
        author: "Ware, Kallistos",
        title: "The Orthodox Church",
        publisher: "Penguin Books",
        year: 1993,
        isbn: "978-0-140-14656-1",
        originalLanguage: "en",
        level: "introdutório",
        review: "Ware (1934–2022), Metropolita Kallistos de Diocleia e Spalding Lecturer em Oxford por 35 anos, produziu a referência em língua inglesa sobre a Igreja Ortodoxa há mais de seis décadas. Estruturado em duas partes — história e doutrina — o livro dedica a Parte II à teologia e à adoração ortodoxas, com capítulos sobre Deus, criação, pecado, salvação, sacramentos e escatologia. A visão ortodoxa de morte, ressurreição, juízo final, 'estado intermediário como consciência em espera', céu como theosis e a questão do purgatório (rejeitado pela Ortodoxia em termos latinos) são tratados com clareza e equanimidade. Complementar a Lossky (profundidade mística) e Meyendorff (rigor histórico-doutrinal) para uma visão integrada do que a Ortodoxia crê sobre os fins."
      },
      {
        id: "meyendorff-byzantine-theology",
        author: "Meyendorff, John",
        title: "Byzantine Theology",
        subtitle: "Historical Trends and Doctrinal Themes",
        publisher: "Fordham University Press",
        year: 1979,
        isbn: "978-0-823-20967-5",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Meyendorff (1926–1992), sacerdote ortodoxo russo e professor na Fordham University, produziu a síntese mais rigorosa da teologia cristã oriental disponível em inglês. A obra divide-se em tendências históricas (Calcedônia, iconoclasmo, monaquismo, Palamismo, Lux Orandi) e temas doutrinais (criação, homem, Cristo, Espírito, Trindade, sacramentos, Igreja e escatologia). O capítulo final, 'A Igreja no Mundo', desenvolve a visão ortodoxa de missão e escatologia a partir da liturgia e da pneumatologia, mostrando como a Ortodoxia entende o cristão como 'cidadão do Reino' já antecipado na Eucaristia. Jaroslav Pelikan descreveu-o como 'o tratamento mais iluminador da teologia bizantina disponível a leitores de língua inglesa'."
      },
      {
        id: "ware-orthodox-way",
        author: "Ware, Kallistos",
        title: "The Orthodox Way",
        publisher: "St. Vladimir's Seminary Press",
        year: 1995,
        isbn: "978-0-913-836-58-3",
        originalLanguage: "en",
        level: "intermediário",
        review: "Companheiro teológico de *The Orthodox Church*, escrito por Ware especificamente para aprofundar os fundamentos doutrinais e espirituais. O capítulo 'Morte e Ressurreição' é o tratamento mais acessível e completo da escatologia ortodoxa em livro de bolso: aborda o estado intermediário como esperança consciente (não sono da alma), a oração pelos mortos, a ressurreição corporal, o Juízo, a natureza do inferno e do céu na perspectiva ortodoxa (que rejeita tanto o purgatório latino quanto o aniquilacionismo), e a esperança na salvação de todos como oração mas não como dogma. A seção sobre theosis como destino humano — 'Deus se fez homem para que o homem pudesse tornar-se deus' — contextualiza escatologicamente toda a soteriologia ortodoxa. Influenciou convertidos e académicos em igual medida."
      }
    ]
  },
  {
    id: 'heterodoxosSionismo',
    title: 'Sistemas Heterodoxos e Milenaristas',
    intro: 'Adventismo do Sétimo Dia, Testemunhas de Jeová, Igreja de Jesus Cristo dos Santos dos Últimos Dias (SUD/LDS) e Movimentos milenaristas americanos.',
    entries: [
      {
        id: "knight-millennial-fever",
        author: "Knight, George R.",
        title: "Millennial Fever and the End of the World",
        subtitle: "A Study of Millerite Adventism",
        publisher: "Pacific Press Publishing Association",
        year: 1993,
        isbn: "978-0-816-31176-7",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Knight (professor emérito de teologia adventista, Andrews University) produziu o estudo histórico mais completo sobre o movimento milerita e a origem do Adventismo do Sétimo Dia. O livro narra o desenvolvimento das profecias de William Miller (Daniel 8:14), a expectativa do retorno de Cristo em 22 de outubro de 1844, a destruição dessas esperanças (a 'Grande Decepção'), e as diversas tentativas dos sobreviventes de reinterpretar o evento — o que gerou múltiplas denominações adventistas. A análise de como comunidades de fé lidam com profecia falseada é de importância central para qualquer estudo de escatologia heterodoxa. Church History (Cambridge) e American Historical Review avaliaram-o como pesquisa rigorosa, elogiando o uso de fontes primárias. Lido em paralelo com Boyer (Cat. 8), oferece contexto histórico direto para o dispensacionalismo americano."
      },
      {
        id: "penton-apocalypse-delayed",
        author: "Penton, M. James",
        title: "Apocalypse Delayed",
        subtitle: "The Story of Jehovah's Witnesses",
        publisher: "University of Toronto Press",
        year: 2015,
        isbn: "978-1-442-61605-9",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Penton (PhD, University of Iowa; professor emérito na University of Lethbridge) é ex-TJ de 4.ª geração, excomungado em 1981. Sua obra tornou-se o estudo definitivo do movimento desde 1985. A 3.ª edição (2015) acrescenta informação substancial sobre as fontes teológicas de Russell, os primeiros líderes, e desenvolvimentos recentes da organização. A estrutura tripartite — histórica, doutrinária, sociológica — permite ao leitor acompanhar como as sucessivas profecias de datas (1878, 1914, 1918, 1925, 1975) foram formuladas, falharam e foram reinterpretadas sem romper a coesão institucional. M. Darrol Bryant (University of Waterloo) classificou-o como 'obra monumental de erudição, bem escrita e exaustiva'. Timothy P. Weber considerou-o 'leitura obrigatória para qualquer um interessado em milenarismo moderno'."
      },
      {
        id: "davies-introduction-mormonism",
        author: "Davies, Douglas J.",
        title: "An Introduction to Mormonism",
        publisher: "Cambridge University Press",
        year: 2003,
        isbn: "978-0-521-52064-5",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Davies (professor de estudos religiosos na University of Durham) escreveu a introdução acadêmica mais equilibrada ao mormonismo para não-membros, sem propósito apologético ou crítico. O capítulo 4, 'Death, Faith and Eternity', é o tratamento mais completo da escatologia mórmon disponível em obra acadêmica acessível: pre-existência das almas, o 'plano de salvação', os reinos de glória (Celestial, Terrestre, Telestial), a exaltação como theosis peculiar ao SUD, batismo pelos mortos, templos e rituais escatológicos. Davies aponta as raízes teológicas no ensinamento de Joseph Smith e situa o mormonismo na tradição do protestantismo americano do séc. 19. *Nova Religio* descreveu a obra como 'abrangente, cuidadosa e perspicaz'."
      },
      {
        id: "martin-kingdom-cults",
        author: "Martin, Walter R.",
        coAuthors: ["Zacharias, Ravi K. (ed. geral)", "Rische, Jill Martin (ed. gestora)"],
        title: "The Kingdom of the Cults",
        publisher: "Bethany House Publishers",
        year: 2003,
        isbn: "978-0-764-22821-6",
        originalLanguage: "en",
        level: "intermediário",
        review: "Referência canônica da apologética cristã-evangélica desde 1965, com edições revisadas em 1985, 1997 e 2003. Martin (fundador do Christian Research Institute) examina em cada capítulo a história, a terminologia e as doutrinas dos principais grupos (TJ, SUD, Ciência Cristã, Adventismo, Unitarismo, Bahaísmo, Nova Era, Scientology, entre outros), contrastando-as sistematicamente com a teologia bíblica ortodoxa. Para o leitor de escatologia, os capítulos sobre TJ (1914, o corpo eleito de 144.000, o Armagédon como destruição iminente) e SUD (exaltação, reinos de glória, milênio terrestre) são os mais relevantes. A 3.ª ed. inclui Ravi Zacharias como editor-geral, responsável por atualizações e novas seções. Obra de primeira consulta para pastores e leigos no Brasil."
      },
      {
        id: "newport-apocalypse-millennium",
        author: "Newport, Kenneth G. C.",
        title: "Apocalypse and Millennium",
        subtitle: "Studies in Biblical Eisegesis",
        publisher: "Cambridge University Press",
        year: 2000,
        isbn: "978-0-521-77139-3",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Newport (professor de estudos cristãos na Liverpool Hope University) analisa como grupos milenaristas utilizam e distorcem textos bíblicos proféticos ('eisegese' em oposição a 'exegese') para sustentar cálculos de datas e construções doutrinárias específicas. Os estudos de caso cobrem as Testemunhas de Jeová (Daniel, Apocalipse e a data de 1914), os Adventistas do Sétimo Dia (Daniel 8:14 e o Santuário Celestial), e o movimento dos Branch Davidians de David Koresh (interpretação de Apocalipse 5–8). Newport não escreve como teólogo confessional mas como acadêmico de estudos religiosos, o que torna a análise mais comparativa e metodologicamente transparente. O livro complementa Penton (TJ) e Knight (Adventismo) ao focar especificamente nos mecanismos hermenêuticos que geram escatologias heterodoxas."
      }
    ]
  },
  {
    id: 'escatologiaPaulina',
    title: 'Escatologia Paulina',
    intro: 'Já/ainda-não, Parusia, Ressurreição dos mortos, Coríntios 15, Tessalonicenses e Background judaico de Paulo.',
    entries: [
      {
        id: "sanders-paul-and-palestinian-judaism",
        author: "Sanders, E. P.",
        title: "Paul and Palestinian Judaism",
        subtitle: "A Comparison of Patterns of Religion",
        publisher: "Fortress Press",
        year: 1977,
        isbn: "978-0-8006-1899-5",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Sanders (Duke University) reorientou os estudos paulinos ao demonstrar que o judaísmo do Segundo Templo não era um sistema de 'obras-merecimento' mas de 'nomismo pactual': a entrada no povo de Deus é por graça do pacto; a permanência é pelo cumprimento da Torá. Isso implica que Paulo não polemizava contra o legalismo judaico, mas contra a exclusividade étnica do povo de Deus. A categoria de 'escatologia participacionista' que Sanders propõe — estar 'em Cristo' como nova realidade escatológica — tornou-se o ponto de partida para décadas de debate sobre 'nova perspectiva sobre Paulo'. Os últimos 150 páginas sobre Paulo especificamente contêm as teses escatológicas centrais. Sem este livro, o debate contemporâneo sobre Dunn, Wright e a escatologia paulina é incompreensível."
      },
      {
        id: "dunn-theology-paul-apostle",
        author: "Dunn, James D. G.",
        title: "The Theology of Paul the Apostle",
        publisher: "Wm. B. Eerdmans",
        year: 1998,
        isbn: "978-0-8028-3844-5",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Dunn (Lightfoot Professor of Divinity, Durham; 1939–2020) utilizou Romanos como estrutura vertebral para uma exposição temática completa da teologia paulina. A Parte VI ('The Life of Grace', caps. 16–23) e os capítulos sobre ressurreição e escatologia (caps. 20–23) representam o tratamento mais detalhado da tensão 'já/ainda-não' em Paulo disponível em um único volume. Dunn integra as categorias de Sanders (nomismo pactual) e debate com Bultmann, Käsemann e Wright. C. F. D. Moule o descreveu como 'leitura obrigatória' e *Theology Today* como 'síntese de grande poder e beleza'. *Christianity Today* colocou-o entre os 25 livros do ano de 1999."
      },
      {
        id: "witherington-jesus-paul-end-world",
        author: "Witherington III, Ben",
        title: "Jesus, Paul and the End of the World",
        subtitle: "A Comparative Study in New Testament Eschatology",
        publisher: "InterVarsity Press",
        year: 1992,
        isbn: "978-0-830-81759-7",
        originalLanguage: "en",
        level: "intermediário",
        review: "Witherington (PhD, Durham; Professor de NT no Asbury Theological Seminary) responde diretamente a Albert Schweitzer — 'Jesus acreditava que o fim apocalíptico estava iminente?' — e examina a continuidade entre a escatologia de Jesus e a de Paulo. Os seis tópicos cobertos (linguagem de iminência, domínio de Deus, comunidade de Cristo, Israel de Deus, dia do Senhor, ressurreição dos mortos) permitem comparação sistemática e crítica. Witherington conclui que Jesus e Paulo compartilham uma escatologia inaugurada comum — o Reino já começou mas ainda não se consumou — e que Paulo não distorceu o ensino de Jesus. Leitura acessível para o leitor acadêmico não especialista, e referência essencial antes de estudos em qualquer das epístolas paulinas."
      },
      {
        id: "thiselton-first-corinthians-nigtc",
        author: "Thiselton, Anthony C.",
        title: "The First Epistle to the Corinthians",
        subtitle: "New International Greek Testament Commentary (NIGTC)",
        publisher: "Wm. B. Eerdmans",
        year: 2000,
        isbn: "978-0-8028-2449-3",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Thiselton (professor emérito de teologia cristã em Nottingham; 1937–2023) produziu o comentário mais detalhado já escrito sobre 1 Coríntios em língua inglesa. O capítulo 15 sobre a ressurreição dos mortos (pp. 1169–1298) é um tratado independente: analisa o vocabulário paulino (σῶμα πνευματικόν, ἀπαρχή, τέλος), rastreia a história da interpretação desde os Pais da Igreja até Pannenberg e Wright, e resolve debates sobre os 'mortos em Cristo' (4:13-18), o 'arrebatamento' e o 'corpo espiritual'. Thiselton é também expert em hermenêutica filosófica, o que torna a exegese metodologicamente transparente. Craig Blomberg descreveu-o como 'o comentário mais detalhado, de maior alcance e exegeticamente mais convincente já escrito sobre qualquer livro da Bíblia'."
      },
      {
        id: "wright-paul-fresh-perspective",
        author: "Wright, N. T.",
        title: "Paul in Fresh Perspective",
        publisher: "Fortress Press",
        year: 2005,
        isbn: "978-0-8006-3767-5",
        originalLanguage: "en",
        level: "intermediário",
        review: "Baseado em conferências para o British and Foreign Bible Society, este volume oferece o resumo mais acessível das grandes teses de Wright sobre Paulo — a síntese que prepara para *Paul and the Faithfulness of God* (2013). Wright estrutura a teologia paulina em torno de três pares: criação e nova criação, Israel e humanidade, Messias e Espírito. A escatologia é tratada como 'nova criação inaugurada': a ressurreição de Jesus é o início da nova criação (já), a transformação plena do cosmos está por vir (ainda não). Wright critica explicitamente tanto o dispensacionalismo (que lê Paulo sem contexto judaico) quanto o luteranismo antinômico (que dissolve a continuidade AT-NT). Para quem estudou Sanders e Dunn, este livro representa a terceira perspectiva da 'nova perspectiva sobre Paulo'."
      }
    ]
  },
  {
    id: 'escatologiaJoanina',
    title: 'Escatologia Joanina',
    intro: 'Evangelho de João, Epístolas Joaninas e Apocalipse. Escatologia realizada e futura ("A hora que vem e agora é").',
    entries: [
      {
        id: "kostenberger-theology-john",
        author: "Köstenberger, Andreas J.",
        title: "A Theology of John's Gospel and Letters",
        subtitle: "The Word, the Christ, the Son of God",
        publisher: "Zondervan",
        year: 2009,
        isbn: "978-0-310-26986-1",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Volume inaugural da série BTNT (Biblical Theology of the New Testament) da Zondervan. Köstenberger (PhD, Trinity Evangelical Divinity School; professor de NT no Midwestern Baptist Theological Seminary) cobre o Evangelho e as três Epístolas com profundidade exegética e atenção ao quadro teológico-canônico mais amplo. Para a escatologia especificamente, os capítulos sobre o 'Eu Sou', a cristologia e a pneumatologia são indispensáveis: em João, a escatologia é radicalmente cristológica — a parusia de Jesus ao longo do Evangelho (Jo 4:23; 5:25; 11:25) cria uma tensão entre escatologia realizada e futura que Köstenberger mapeia cuidadosamente. D. A. Carson (TEDS) afirmou: 'Para a abrangência de cobertura no campo da teologia joanina, não há nada comparável a esta obra'."
      },
      {
        id: "bauckham-climax-of-prophecy",
        author: "Bauckham, Richard",
        title: "The Climax of Prophecy",
        subtitle: "Studies on the Book of Revelation",
        publisher: "T&T Clark",
        year: 1993,
        isbn: "978-0-567-29290-7",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Coleção de estudos exegéticos de Bauckham (St Andrews) que aprofundam a sua *Theology of the Book of Revelation* (Cat. 4) com análise técnica detalhada. O livro examina: a estrutura numérica do Apocalipse (séries de sete e suas interrelações), as citações e alusões ao AT (Ezequiel, Daniel, Isaías), a retórica de oposição ao Império Romano, o significado dos 144.000 e da grande multidão, a cosmologia de Ap 21–22 e a crítica à Babilônia (Roma). Os capítulos 'The Apocalypse as a Christian War Scroll' e 'The Riches of Babylon' são os mais citados em comentários posteriores. Para quem vai trabalhar o texto grego do Apocalipse, este livro responde as questões que os comentários-parágrafo-a-parágrafo não têm espaço para abordar."
      },
      {
        id: "smalley-1-2-3-john-wbc",
        author: "Smalley, Stephen S.",
        title: "1, 2, 3 John",
        subtitle: "Word Biblical Commentary, vol. 51",
        publisher: "Word Books",
        year: 1984,
        isbn: "978-0-8499-0229-1",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Smalley (professor de NT e deão da Catedral de Chester) produziu o comentário WBC sobre as Epístolas Joaninas, combinando análise histórico-crítica com sensibilidade teológica. Para a escatologia, as seções mais relevantes são: 1Jo 2:18 ('última hora' — *eschate hora*), que indica que a comunidade joanina se via vivendo no tempo escatológico final; a doutrina dos 'anticristos' como figura profética com implicações cristológicas; e 1Jo 4:17 ('perfeita no amor para que tenhamos confiança no dia do juízo'). Smalley demonstra que a escatologia das Epístolas é coerente com a do Evangelho: o julgamento já está em curso na decisão de crer ou não, enquanto um julgamento final ainda é esperado. Complementa Köstenberger para o corpus completo."
      },
      {
        id: "koester-revelation-ayb",
        author: "Koester, Craig R.",
        title: "Revelation",
        subtitle: "A New Translation with Introduction and Commentary",
        publisher: "Yale University Press",
        year: 2014,
        isbn: "978-0-300-14085-1",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Koester (Luther Seminary) produziu o comentário mais abrangente sobre o Apocalipse disponível em inglês no séc. 21, combinando sensibilidade ao texto grego, atenção ao contexto greco-romano e análise das imagens visuais (inscrições, moedas, arte funerária). A introdução (200 páginas) trata de: questões de autoria, data, destinatários, estrutura, gênero e hermenêutica. O comentário propriamente dito percorre cada seção com tradução própria, notas textuais e interpretação. Koester adota uma leitura que integra preterismo parcial (referências históricas ao séc. 1) e significado escatológico permanente. Para os capítulos 20–22 (milênio, ressurreição, Nova Jerusalém), oferece o tratamento mais equilibrado entre as posições milenaristas disponível em um comentário."
      },
      {
        id: "carson-gospel-of-john-pntc",
        author: "Carson, D. A.",
        title: "The Gospel According to John",
        subtitle: "The Pillar New Testament Commentary (PNTC)",
        publisher: "Wm. B. Eerdmans",
        year: 1991,
        isbn: "978-0-8028-3683-0",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Carson (Research Professor of NT, Trinity Evangelical Divinity School) produziu o comentário de nível acadêmico mais amplamente utilizado sobre o Evangelho de João no evangelicalismo anglófono. Para a escatologia joanina, os capítulos mais decisivos são Jo 5:24-29 — onde a expressão 'a hora que vem e *agora* é' cria a tensão clássica entre escatologia realizada ('já ouve a voz do Filho de Deus e vive') e futura ('os mortos *ouvirão* a voz do Filho de Deus') — e o ciclo de Jo 6 sobre o 'pão da vida'. Carson demonstra que João não dissolve a escatologia futura na realizada (como Bultmann fez) nem vice-versa: ambas coexistem em tensão intencional, refletindo a perspectiva de inauguração sem consumação. Com Thiselton (Cat. 12), representa o polo evangélico-reformado na exegese joanina."
      }
    ]
  },
  {
    id: 'exegeseComentarios',
    title: 'Exegese e Comentários',
    intro: 'Comentários técnicos sobre textos escatológicos centrais: Daniel, 1 Coríntios 15, 1–2 Tessalonicenses e Apocalipse.',
    entries: [
      {
        id: "collins-daniel-hermeneia",
        author: "Collins, John J.",
        title: "Daniel",
        subtitle: "A Commentary on the Book of Daniel",
        publisher: "Fortress Press",
        year: 1993,
        isbn: "978-0-8006-6010-9",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Collins (Holmes Professor of OT Criticism and Interpretation, Yale Divinity School) produziu o comentário padrão sobre Daniel na tradição histórico-crítica, com particular atenção ao período macabeano (170–164 a.C.) como contexto da composição de Daniel 7–12. O comentário analisa os quatro reinos (Dan 2 e 7), o Filho do Homem (Dan 7:13–14), a visão das 70 semanas (Dan 9:24–27) e o 'tempo do fim' (Dan 11–12) com tradução própria, notas textuais e excursuses sobre cada tradição interpretativa. Collins demonstra que Daniel 7 é o texto seminal da imaginação apocalíptica — 'Filho do Homem' como ser celeste e como símbolo do povo dos santos — e que 1 Enoque, o NT e o apocaliptismo cristão dependem diretamente deste modelo. Leitura obrigatória antes de qualquer exegese de Mc 13, 1Ts 4, Ap 12–13."
      },
      {
        id: "fee-first-corinthians-nicnt",
        author: "Fee, Gordon D.",
        title: "The First Epistle to the Corinthians",
        subtitle: "New International Commentary on the New Testament (NICNT), edição revisada",
        publisher: "Wm. B. Eerdmans",
        year: 2014,
        isbn: "978-0-8028-6777-3",
        originalLanguage: "en",
        level: "intermediário",
        review: "Fee (PhD, USC; professor emérito de NT no Regent College, Vancouver) produziu o comentário mais amplamente utilizado sobre 1 Coríntios no nível intermediário-avançado, entre os dois polos do Thiselton (NIGTC, 1.446 páginas) e dos comentários populares. A edição revisada de 2014 atualiza a bibliografia e refina as posições de Fee sobre baptismo pelos mortos (15:29), o corpo espiritual e a natureza da ressurreição corporal. O capítulo 15 (pp. 711–882) é tratado como 'ápice da carta' — o argumento escatológico que dá sentido a todos os problemas pastorais anteriores: se não há ressurreição, a ética, a comunidade e o sofrimento carecem de fundamento. Fee é pré-milenarista histórico e pré-tribulacionista moderado, mas mantém rigor exegético que torna a obra útil para leitores de qualquer posição."
      },
      {
        id: "wanamaker-thessalonians-nigtc",
        author: "Wanamaker, Charles A.",
        title: "The Epistles to the Thessalonians",
        subtitle: "A Commentary on the Greek Text",
        publisher: "Wm. B. Eerdmans",
        year: 1990,
        isbn: "978-0-8028-2394-6",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Wanamaker (University of Cape Town; doutorou-se em NT sob C. K. Barrett em Durham) integrou análise sociológica e retórica à exegese histórico-crítica tradicional. Para a escatologia, os textos capitais são: 1Ts 4:13–5:11 (Parusia, arrebatamento, 'como um ladrão na noite') e 2Ts 2:1–12 (o 'Homem do Pecado', o *katechon* que retém e a apostasia). Wanamaker trata a questão da autenticidade de 2 Tessalonicenses com equilíbrio, concluindo que as evidências favorecem a autoria paulina. Sua discussão sobre 1Ts 4:17 (ἁρπαγησόμεθα — 'seremos arrebatados') é a mais tecnicamente precisa disponível em inglês para entender a origem do conceito de 'arrebatamento' sem pressupor o sistema dispensacionalista. Complemento indispensável a Weber (Cat. 8) e Hultberg/Blaising/Moo (Cat. 3)."
      },
      {
        id: "mounce-revelation-nicnt",
        author: "Mounce, Robert H.",
        title: "The Book of Revelation",
        subtitle: "New International Commentary on the New Testament (NICNT), edição revisada",
        publisher: "Wm. B. Eerdmans",
        year: 1998,
        isbn: "978-0-8028-2537-7",
        originalLanguage: "en",
        level: "intermediário",
        review: "Mounce (presidente emérito do Whitworth College) produziu o comentário NICNT sobre o Apocalipse que por décadas serviu como texto padrão para seminários e cursos de doutorado. A edição revisada de 1998 incorporou os debates sobre preterismo, futurismo e idealismo suscitados pelo trabalho de Beale, Bauckham e Collins. Mounce adota um futurismo histórico-gramatical (pré-milenarismo histórico) e rejeita tanto o dispensacionalismo rígido quanto o preterismo total. Para as seções mais disputadas — Ap 7 (144.000), Ap 12 (mulher e dragão), Ap 20 (milênio) e Ap 21–22 (Nova Jerusalém) — a análise de Mounce é sempre clara, documenta as principais posições e apresenta sua própria exegese com razões. Mais acessível que Beale (NIGTC) e Osborne (BECNT), mantendo rigor suficiente para uso acadêmico."
      },
      {
        id: "aune-revelation-wbc",
        author: "Aune, David E.",
        title: "Revelation 1–5; Revelation 6–16; Revelation 17–22",
        subtitle: "Word Biblical Commentary, vols. 52A–52C",
        publisher: "Thomas Nelson",
        year: 1997,
        isbn: "978-0-8499-0228-4",
        originalLanguage: "en",
        level: "acadêmico",
        review: "Aune (professor de NT e Christian Origins na Notre Dame) produziu o comentário mais extenso sobre o Apocalipse em qualquer língua moderna. A obra em três volumes (WBC 52A–C) examina cada versículo com: (a) tradução e notas textuais; (b) forma/estrutura/contexto; (c) comentário verso a verso; (d) explicação. Aune incorporou de modo mais sistemático que qualquer outro comentarista o amplo material greco-romano (papiros, inscrições, oráculo délfico, papiros mágicos, cartas reais, proclamações imperiais) que ilumina o vocabulário e as imagens do Apocalipse. Sua análise do gênero ('prophetisches Sendschreiben'), do 'Filho do Homem' em Ap 1 e das visões do trono (Ap 4–5) continua sendo referência. Críticos apontam que às vezes a erudição ofusca a visão de conjunto — daí a utilidade de Mounce e Koester para leituras complementares."
      }
    ]
  }
];

export function buildAuthorIndex(cats: BibCategory[]): BibAuthorIndexItem[] {
  const authorMap = new Map<string, Set<string>>();

  function normalizeAuthorName(author: string): string {
  // Remove suffixes like (ed.), (eds.), (ed. geral), etc.
  let normalized = author.replace(/\s*\(eds?\.?[^)]*\)/gi, '').trim();

  // Handle standard 'Lastname, Firstname'
  if (normalized.includes(",")) return normalized;

  // Fallback for names without comma (rare or malformed)
  const parts = normalized.split(" ");
  if (parts.length > 1) {
    const lastName = parts.pop();
    return `${lastName}, ${parts.join(" ")}`;
  }
  return normalized;
}

  cats.forEach(cat => {
    cat.entries.forEach(entry => {
      const allAuthors = [entry.author];
      if (entry.coAuthors) {
        allAuthors.push(...entry.coAuthors);
      }

      allAuthors.forEach(raw => {
        const normalized = normalizeAuthorName(raw);
        if (!authorMap.has(normalized)) {
          authorMap.set(normalized, new Set());
        }
        authorMap.get(normalized)!.add(entry.id);
      });
    });
  });

  const result = Array.from(authorMap.entries()).map(([author, idSet]) => ({
    author,
    entryIds: Array.from(idSet)
  }));

  result.sort((a, b) => a.author.localeCompare(b.author, 'pt-BR'));
  return result;
}

export const bibliographyData: BibliographyData = {
  categories,
  authorIndex: buildAuthorIndex(categories)
};

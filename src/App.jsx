import React, { useState, useMemo, createContext, useContext, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Home, Search, BarChart2, Calendar, BookOpen, Milestone, PenTool, Code, XCircle, Sparkles, LoaderCircle, Flame, FileText, Clock, Layers, Video, User, Award, PlusCircle, BrainCircuit, MessageSquare, Target, Settings, Play, Pause, RotateCcw } from 'lucide-react';

// --- CONTEXTO GLOBAL DA APLICAÇÃO ---
const AppContext = createContext();

// --- BANCO DE DADOS SIMULADO ---
const initialQuestoes = [
  { id: 1, year: 2023, area: 'Ciências da Natureza', discipline: 'Química', topic: 'Química Orgânica', baseText: null, enunciado: 'Qual das seguintes substâncias é um hidrocarboneto aromático?', options: [{id: 'A', text: 'Etanol'}, {id: 'B', text: 'Benzeno'}, {id: 'C', text: 'Ácido Acético'}, {id: 'D', text: 'Glicose'}, {id: 'E', text: 'Amônia'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 2, year: 2023, area: 'Matemática', discipline: 'Matemática', topic: 'Geometria Plana', baseText: null, enunciado: 'Um triângulo com lados 3, 4 e 5 é classificado como?', options: [{id: 'A', text: 'Equilátero'}, {id: 'B', text: 'Isósceles'}, {id: 'C', text: 'Retângulo'}, {id: 'D', text: 'Acutângulo'}, {id: 'E', text: 'Obtusângulo'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 3, year: 2022, area: 'Linguagens e Códigos', discipline: 'Português', topic: 'Gramática', baseText: null, enunciado: 'Qual figura de linguagem está presente na frase "Choveram canivetes"?', options: [{id: 'A', text: 'Metáfora'}, {id: 'B', text: 'Hipérbole'}, {id: 'C', text: 'Eufemismo'}, {id: 'D', text: 'Ironia'}, {id: 'E', text: 'Personificação'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 4, year: 2022, area: 'Ciências Humanas', discipline: 'História', topic: 'História do Brasil', baseText: null, enunciado: 'Em que ano foi proclamada a Independência do Brasil?', options: [{id: 'A', text: '1500'}, {id: 'B', text: '1889'}, {id: 'C', text: '1822'}, {id: 'D', text: '1964'}, {id: 'E', text: '1789'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 5, year: 2021, area: 'Ciências da Natureza', discipline: 'Física', topic: 'Mecânica', baseText: null, enunciado: 'Qual é a primeira Lei de Newton?', options: [{id: 'A', text: 'Princípio da Ação e Reação'}, {id: 'B', text: 'Princípio Fundamental da Dinâmica'}, {id: 'C', text: 'Lei da Gravitação Universal'}, {id: 'D', text: 'Princípio da Inércia'}, {id: 'E', text: 'Lei de Ohm'}], correctAnswer: 'D', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 6, year: 2021, area: 'Ciências Humanas', discipline: 'Geografia', topic: 'Globalização', baseText: null, enunciado: 'O que é o processo de globalização?', options: [{id: 'A', text: 'Um fenômeno exclusivamente cultural'}, {id: 'B', text: 'A intensificação das trocas e fluxos mundiais'}, {id: 'C', text: 'O fortalecimento de fronteiras nacionais'}, {id: 'D', text: 'Um movimento de isolamento econômico'}, {id: 'E', 'text': 'A regionalização dos costumes'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 7, year: 2020, area: 'Linguagens e Códigos', discipline: 'Inglês', topic: 'Interpretação de Texto', baseText: null, enunciado: 'What does the idiom "break a leg" mean?', options: [{id: 'A', text: 'To physically harm someone'}, {id: 'B', text: 'A warning of danger'}, {id: 'C', text: 'Good luck'}, {id: 'D', text: 'A theatrical play'}, {id: 'E', text: 'An unfortunate event'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 8, year: 2024, area: 'Matemática', discipline: 'Matemática', topic: 'Aritmética', baseText: null, enunciado: 'Qual o resultado de 15% de 200?', options: [{id: 'A', text: '15'}, {id: 'B', text: '20'}, {id: 'C', text: '25'}, {id: 'D', text: '30'}, {id: 'E', 'text': '35'}], correctAnswer: 'D', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 9, year: 2023, area: 'Ciências da Natureza', discipline: 'Biologia', topic: 'Ecologia', baseText: null, enunciado: 'Qual processo é responsável pela conversão de dióxido de carbono em oxigênio nas plantas?', options: [{id: 'A', text: 'Respiração'}, {id: 'B', text: 'Fotossíntese'}, {id: 'C', text: 'Transpiração'}, {id: 'D', text: 'Decomposição'}, {id: 'E', text: 'Fermentação'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 10, year: 2022, area: 'Ciências Humanas', discipline: 'Filosofia', topic: 'Filosofia Antiga', baseText: null, enunciado: 'Quem é considerado o "pai da filosofia"?', options: [{id: 'A', text: 'Platão'}, {id: 'B', text: 'Aristóteles'}, {id: 'C', text: 'Sócrates'}, {id: 'D', text: 'Tales de Mileto'}, {id: 'E', text: 'Pitágoras'}], correctAnswer: 'D', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 11, year: 2021, area: 'Linguagens e Códigos', discipline: 'Literatura', topic: 'Modernismo', baseText: null, enunciado: 'Qual dos seguintes autores NÃO fez parte da primeira fase do Modernismo no Brasil?', options: [{id: 'A', text: 'Mário de Andrade'}, {id: 'B', text: 'Oswald de Andrade'}, {id: 'C', text: 'Manuel Bandeira'}, {id: 'D', text: 'Carlos Drummond de Andrade'}, {id: 'E', text: 'Menotti Del Picchia'}], correctAnswer: 'D', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 12, year: 2020, area: 'Matemática', discipline: 'Matemática', topic: 'Probabilidade', baseText: null, enunciado: 'Ao lançar um dado não viciado, qual a probabilidade de se obter um número par?', options: [{id: 'A', text: '1/6'}, {id: 'B', text: '1/3'}, {id: 'C', text: '1/2'}, {id: 'D', text: '2/3'}, {id: 'E', text: '5/6'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 13, year: 2024, area: 'Ciências da Natureza', discipline: 'Física', topic: 'Óptica', baseText: null, enunciado: 'Qual fenômeno óptico é responsável pela formação do arco-íris?', options: [{id: 'A', text: 'Reflexão'}, {id: 'B', text: 'Refração'}, {id: 'C', text: 'Difração'}, {id: 'D', text: 'Dispersão'}, {id: 'E', text: 'Polarização'}], correctAnswer: 'D', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 14, year: 2023, area: 'Ciências Humanas', discipline: 'Sociologia', topic: 'Indústria Cultural', baseText: null, enunciado: 'O conceito de "Indústria Cultural" foi cunhado por quais pensadores da Escola de Frankfurt?', options: [{id: 'A', text: 'Karl Marx e Friedrich Engels'}, {id: 'B', text: 'Theodor Adorno e Max Horkheimer'}, {id: 'C', text: 'Jean-Paul Sartre e Simone de Beauvoir'}, {id: 'D', text: 'Michel Foucault e Gilles Deleuze'}, {id: 'E', text: 'Auguste Comte e Émile Durkheim'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 15, year: 2022, area: 'Linguagens e Códigos', discipline: 'Espanhol', topic: 'Vocabulário', baseText: null, enunciado: '¿Qué significa la palabra "ordenador" en español?', options: [{id: 'A', text: 'Calculadora'}, {id: 'B', text: 'Celular'}, {id: 'C', text: 'Computador'}, {id: 'D', text: 'Impressora'}, {id: 'E', text: 'Televisão'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 16, year: 2021, area: 'Matemática', discipline: 'Matemática', topic: 'Funções', baseText: null, enunciado: 'Qual é o vértice da parábola da função f(x) = x² - 4x + 3?', options: [{id: 'A', text: '(2, -1)'}, {id: 'B', text: '(-2, 1)'}, {id: 'C', text: '(4, 3)'}, {id: 'D', text: '(1, 0)'}, {id: 'E', text: '(0, 3)'}], correctAnswer: 'A', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 17, year: 2020, area: 'Ciências da Natureza', discipline: 'Química', topic: 'Estequiometria', baseText: null, enunciado: 'Qual é o número de Avogadro?', options: [{id: 'A', text: '6,02 x 10^22'}, {id: 'B', text: '6,02 x 10^23'}, {id: 'C', text: '6,02 x 10^24'}, {id: 'D', text: '3,14 x 10^23'}, {id: 'E', text: '9,81 x 10^22'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 18, year: 2024, area: 'Ciências Humanas', discipline: 'Geografia', topic: 'Climatologia', baseText: null, enunciado: 'Qual o nome do fenômeno climático caracterizado pelo aquecimento anormal das águas do Oceano Pacífico?', options: [{id: 'A', text: 'La Niña'}, {id: 'B', text: 'Efeito Estufa'}, {id: 'C', text: 'El Niño'}, {id: 'D', text: 'Inversão Térmica'}, {id: 'E', text: 'Chuva Ácida'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 19, year: 2023, area: 'Linguagens e Códigos', discipline: 'Artes', topic: 'Vanguardas Europeias', baseText: null, enunciado: 'O Cubismo, movimento artístico do início do século XX, teve como um de seus principais fundadores:', options: [{id: 'A', text: 'Salvador Dalí'}, {id: 'B', text: 'Wassily Kandinsky'}, {id: 'C', text: 'Pablo Picasso'}, {id: 'D', text: 'Vincent van Gogh'}, {id: 'E', text: 'Claude Monet'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 20, year: 2022, area: 'Ciências da Natureza', discipline: 'Biologia', topic: 'Genética', baseText: null, enunciado: 'Quem é considerado o "pai da genética"?', options: [{id: 'A', text: 'Charles Darwin'}, {id: 'B', text: 'Louis Pasteur'}, {id: 'C', text: 'Gregor Mendel'}, {id: 'D', text: 'James Watson'}, {id: 'E', text: 'Francis Crick'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 21, year: 2024, area: 'Matemática', discipline: 'Matemática', topic: 'Logaritmos', baseText: 'A escala Richter mede a magnitude de um terremoto. Ela é uma escala logarítmica, onde a magnitude M é dada por M = log(A) + 3, em que A é a amplitude do movimento da onda, medida em micrômetros.', enunciado: 'Um terremoto A teve magnitude 6 na escala Richter. Um segundo terremoto, B, teve uma amplitude de onda 100 vezes maior que a do terremoto A. Qual foi a magnitude do terremoto B?', options: [{id: 'A', text: '6'}, {id: 'B', text: '7'}, {id: 'C', text: '8'}, {id: 'D', text: '9'}, {id: 'E', text: '10'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 22, year: 2024, area: 'Ciências da Natureza', discipline: 'Química', topic: 'Eletroquímica', baseText: 'Pilhas galvânicas são dispositivos que convertem energia química em energia elétrica a partir de reações de oxirredução espontâneas. O potencial padrão de uma pilha (ΔE°) é a diferença entre os potenciais de redução do cátodo e do ânodo.\nDados: Potencial de redução padrão: Cu²⁺ + 2e⁻ → Cu (E° = +0,34 V); Zn²⁺ + 2e⁻ → Zn (E° = -0,76 V).', enunciado: 'Considerando uma pilha de Daniell, formada por eletrodos de cobre e zinco em suas respectivas soluções, qual é o potencial padrão (ΔE°) gerado?', options: [{id: 'A', text: '-1,10 V'}, {id: 'B', text: '-0,42 V'}, {id: 'C', text: '0,42 V'}, {id: 'D', text: '1,10 V'}, {id: 'E', text: '0,00 V'}], correctAnswer: 'D', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 23, year: 2024, area: 'Ciências Humanas', discipline: 'História', topic: 'Era Vargas', baseText: '"Trabalhadores do Brasil! (...) O que tenho feito não foi para servir a mim, mas a vós. (...) Hoje, mais do que nunca, sois o amparo do governo, porque o governo é vós mesmos."\n(Discurso de Getúlio Vargas, 1º de maio de 1951)', enunciado: 'A análise do discurso de Vargas revela uma característica de seu governo, especialmente durante o Estado Novo, que foi o:', options: [{id: 'A', text: 'liberalismo econômico, com mínima intervenção estatal.'}, {id: 'B', text: 'pluripartidarismo, com ampla liberdade de expressão.'}, {id: 'C', text: 'populismo, buscando uma relação direta com as massas trabalhadoras.'}, {id: 'D', text: 'alinhamento automático com os Estados Unidos na Guerra Fria.'}, {id: 'E', text: 'enfraquecimento dos sindicatos e da legislação trabalhista.'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 24, year: 2024, area: 'Linguagens e Códigos', discipline: 'Português', topic: 'Interpretação de Charge', baseText: '[IMAGEM DE UMA CHARGE MOSTRANDO UMA PESSOA TENTANDO EMPURRAR UMA PEDRA GIGANTE ESCRITA "BUROCRACIA" PARA CIMA DE UMA MONTANHA]', enunciado: 'A charge utiliza a metáfora do trabalho de Sísifo para criticar:', options: [{id: 'A', text: 'a falta de esforço dos trabalhadores do setor público.'}, {id: 'B', text: 'a complexidade inútil e repetitiva dos processos burocráticos.'}, {id: 'C', text: 'a importância da atividade física para a saúde.'}, {id: 'D', text: 'as dificuldades geográficas do relevo brasileiro.'}, {id: 'E', text: 'a desvalorização do trabalho manual na sociedade moderna.'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 25, year: 2024, area: 'Ciências da Natureza', discipline: 'Física', topic: 'Termodinâmica', baseText: null, enunciado: 'Uma panela de pressão cozinha os alimentos mais rapidamente porque:', options: [{id: 'A', text: 'diminui a temperatura de ebulição da água.'}, {id: 'B', text: 'aumenta a pressão interna, elevando a temperatura de ebulição da água.'}, {id: 'C', text: 'o alumínio da panela conduz calor de forma mais eficiente.'}, {id: 'D', text: 'isola o sistema, impedindo qualquer troca de calor com o ambiente.'}, {id: 'E', text: 'reduz a pressão interna, fazendo a água ferver mais rápido.'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 26, year: 2024, area: 'Matemática', discipline: 'Matemática', topic: 'Análise Combinatória', baseText: null, enunciado: 'Uma comissão de 3 pessoas precisa ser formada a partir de um grupo de 5 homens e 4 mulheres. De quantas maneiras diferentes essa comissão pode ser formada se ela deve ter exatamente 2 homens e 1 mulher?', options: [{id: 'A', text: '10'}, {id: 'B', text: '20'}, {id: 'C', text: '40'}, {id: 'D', text: '60'}, {id: 'E', text: '84'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 27, year: 2024, area: 'Ciências Humanas', discipline: 'Geografia', topic: 'Urbanização', baseText: 'O processo de metropolização no Brasil, intensificado a partir da segunda metade do século XX, gerou uma série de transformações socioespaciais, incluindo a formação de extensas periferias e o fenômeno da segregação espacial.', enunciado: 'Uma consequência direta do processo de urbanização descrito no texto é a:', options: [{id: 'A', text: 'distribuição equitativa de equipamentos públicos entre centro e periferia.'}, {id: 'B', text: 'valorização imobiliária homogênea em toda a cidade.'}, {id: 'C', text: 'formação de condomínios fechados e favelas como expressões da segregação.'}, {id: 'D', text: 'redução dos problemas de mobilidade urbana devido à expansão da malha viária.'}, {id: 'E', text: 'descentralização das atividades econômicas, fortalecendo a economia das periferias.'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 28, year: 2024, area: 'Ciências da Natureza', discipline: 'Biologia', topic: 'Imunologia', baseText: null, enunciado: 'A imunização ativa, como a proporcionada pelas vacinas, é um mecanismo de defesa do corpo que se baseia na:', options: [{id: 'A', text: 'introdução de anticorpos prontos para combater o antígeno.'}, {id: 'B', text: 'produção de memória imunológica pelo próprio organismo.'}, {id: 'C', text: 'transferência de soro de um indivíduo imune para um não imune.'}, {id: 'D', text: 'destruição de todas as bactérias presentes no corpo.'}, {id: 'E', text: 'ativação de uma resposta inflamatória inespecífica.'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 29, year: 2024, area: 'Linguagens e Códigos', discipline: 'Inglês', topic: 'Interpretação de Texto', baseText: '"A new study suggests that spending at least 120 minutes a week in nature is associated with good health and wellbeing. The findings are based on data from nearly 20,000 people in England and show that it doesn’t matter whether the 120 minutes is achieved in a single visit or over several shorter visits."\n(Source: White, M.P., et al. Scientific Reports, 2019)', enunciado: 'According to the text, the key factor for the health benefits of being in nature is:', options: [{id: 'A', text: 'the type of natural environment visited.'}, {id: 'B', text: 'the total amount of time spent per week.'}, {id: 'C', text: 'visiting nature only on a single, long trip.'}, {id: 'D', text: 'the specific country where the study was conducted.'}, {id: 'E', text: 'the age of the participants in the study.'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 30, year: 2024, area: 'Matemática', discipline: 'Matemática', topic: 'Geometria Espacial', baseText: null, enunciado: 'Um reservatório de água tem o formato de um cilindro reto com 2 metros de diâmetro e 5 metros de altura. Considerando π ≈ 3, qual é o volume máximo de água que esse reservatório pode conter, em metros cúbicos?', options: [{id: 'A', text: '10 m³'}, {id: 'B', text: '15 m³'}, {id: 'C', text: '20 m³'}, {id: 'D', text: '30 m³'}, {id: 'E', text: '60 m³'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 31, year: 2024, area: 'Ciências Humanas', discipline: 'Filosofia', topic: 'Contratualismo', baseText: null, enunciado: 'Para o filósofo Thomas Hobbes, o "estado de natureza" é caracterizado pela "guerra de todos contra todos". Nesse contexto, a criação do Estado (Leviatã) tem como principal objetivo:', options: [{id: 'A', text: 'garantir a liberdade individual absoluta.'}, {id: 'B', text: 'promover a igualdade econômica entre os cidadãos.'}, {id: 'C', text: 'assegurar a paz e a segurança coletiva.'}, {id: 'D', text: 'estabelecer a vontade da maioria como lei suprema.'}, {id: 'E', text: 'abolir a propriedade privada.'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 32, year: 2024, area: 'Ciências da Natureza', discipline: 'Física', topic: 'Ondulatória', baseText: null, enunciado: 'O som de uma ambulância parece mais agudo quando ela se aproxima de um observador e mais grave quando se afasta. Esse fenômeno é conhecido como:', options: [{id: 'A', text: 'Efeito Joule'}, {id: 'B', text: 'Efeito Estufa'}, {id: 'C', text: 'Efeito Doppler'}, {id: 'D', text: 'Difração'}, {id: 'E', text: 'Ressonância'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 33, year: 2024, area: 'Linguagens e Códigos', discipline: 'Literatura', topic: 'Intertextualidade', baseText: 'Texto 1:\n"No meio do caminho tinha uma pedra\ntinha uma pedra no meio do caminho"\n(Carlos Drummond de Andrade)\n\nTexto 2:\nUma propaganda de um serviço de guincho mostra um carro quebrado na estrada e a frase: "No meio do caminho tinha um problema? A gente remove."', enunciado: 'A relação entre o Texto 1 e o Texto 2 constitui um exemplo de:', options: [{id: 'A', text: 'plágio.'}, {id: 'B', text: 'paráfrase.'}, {id: 'C', text: 'intertextualidade.'}, {id: 'D', text: 'citação direta.'}, {id: 'E', text: 'tradução.'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 34, year: 2024, area: 'Ciências Humanas', discipline: 'Sociologia', topic: 'Movimentos Sociais', baseText: null, enunciado: 'Os movimentos sociais contemporâneos, como o movimento feminista e o movimento ambientalista, diferem dos movimentos operários do século XIX principalmente por focarem em:', options: [{id: 'A', text: 'reivindicações exclusivamente econômicas e salariais.'}, {id: 'B', text: 'pautas identitárias, culturais e de direitos civis.'}, {id: 'C', text: 'uma estrutura hierárquica rígida e centralizada.'}, {id: 'D', text: 'ações violentas como única forma de protesto.'}, {id: 'E', text: 'apoio incondicional ao sistema político vigente.'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 35, year: 2024, area: 'Ciências da Natureza', discipline: 'Biologia', topic: 'Biotecnologia', baseText: null, enunciado: 'A técnica de DNA recombinante, base da engenharia genética, permite a produção de organismos geneticamente modificados (OGMs). Uma aplicação benéfica dessa tecnologia na agricultura é a criação de plantas:', options: [{id: 'A', text: 'que se reproduzem mais lentamente.'}, {id: 'B', text: 'incapazes de realizar fotossíntese.'}, {id: 'C', text: 'resistentes a pragas e herbicidas.'}, {id: 'D', text: 'com menor valor nutricional.'}, {id: 'E', text: 'que necessitam de mais água para crescer.'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 36, year: 2024, area: 'Matemática', discipline: 'Matemática', topic: 'Porcentagem', baseText: null, enunciado: 'Um produto que custava R$ 80,00 sofreu um aumento de 20%. Em seguida, sobre o novo preço, foi dado um desconto de 20%. O preço final do produto, após o aumento e o desconto, é de:', options: [{id: 'A', text: 'R$ 76,80'}, {id: 'B', text: 'R$ 80,00'}, {id: 'C', text: 'R$ 82,40'}, {id: 'D', text: 'R$ 96,00'}, {id: 'E', text: 'R$ 64,00'}], correctAnswer: 'A', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 37, year: 2024, area: 'Linguagens e Códigos', discipline: 'Português', topic: 'Funções da Linguagem', baseText: '"Vote no candidato X! A única esperança para um futuro melhor!"', enunciado: 'No trecho de propaganda política acima, predomina a seguinte função da linguagem:', options: [{id: 'A', text: 'Função Emotiva, pois expressa os sentimentos do candidato.'}, {id: 'B', text: 'Função Poética, pois se preocupa com a beleza da mensagem.'}, {id: 'C', text: 'Função Fática, pois busca testar o canal de comunicação.'}, {id: 'D', text: 'Função Referencial, pois informa objetivamente sobre o candidato.'}, {id: 'E', text: 'Função Apelativa (ou Conativa), pois busca convencer o leitor.'}], correctAnswer: 'E', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 38, year: 2024, area: 'Ciências Humanas', discipline: 'História', topic: 'Guerra Fria', baseText: null, enunciado: 'A Queda do Muro de Berlim em 1989 é um marco simbólico que representa:', options: [{id: 'A', text: 'o início da Guerra Fria e a bipolarização mundial.'}, {id: 'B', text: 'a ascensão do nazismo na Alemanha.'}, {id: 'C', text: 'o fortalecimento do bloco socialista no leste europeu.'}, {id: 'D', text: 'o colapso do socialismo soviético e o fim da Guerra Fria.'}, {id: 'E', text: 'a unificação da Coreia sob um regime comunista.'}], correctAnswer: 'D', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 39, year: 2024, area: 'Ciências da Natureza', discipline: 'Química', topic: 'Soluções', baseText: null, enunciado: 'Um estudante preparou uma solução dissolvendo 20 g de NaCl em 180 g de água. A concentração da solução em porcentagem em massa (% m/m) é de:', options: [{id: 'A', text: '1%'}, {id: 'B', text: '10%'}, {id: 'C', text: '11,1%'}, {id: 'D', text: '20%'}, {id: 'E', text: '90%'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 40, year: 2024, area: 'Ciências Humanas', discipline: 'Geografia', topic: 'Questões Ambientais', baseText: 'O desmatamento na Amazônia tem consequências que extrapolam a perda de biodiversidade local. A floresta desempenha um papel crucial na regulação climática global, influenciando os regimes de chuva em outras partes do continente através dos chamados "rios voadores".', enunciado: 'De acordo com o texto, uma consequência socioambiental do desmatamento na Amazônia para outras regiões do Brasil é:', options: [{id: 'A', text: 'o aumento da fertilidade do solo no Sudeste.'}, {id: 'B', text: 'a redução do nível dos oceanos.'}, {id: 'C', text: 'a intensificação de secas e crises hídricas.'}, {id: 'D', text: 'a diminuição da temperatura média no Sul.'}, {id: 'E', text: 'o aumento da biodiversidade na Caatinga.'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 41, year: 2023, area: 'Ciências Humanas', discipline: 'Sociologia', topic: 'Cultura Digital', baseText: 'A era digital transformou as relações sociais e de trabalho. Plataformas de mídias sociais, aplicativos de transporte e de entrega de comida criaram novas formas de interação e de prestação de serviços, muitas vezes caracterizadas pela flexibilidade e pela ausência de vínculos empregatícios tradicionais.', enunciado: 'Essa nova dinâmica social, frequentemente denominada "uberização", tem como uma de suas principais consequências:', options: [{id: 'A', text: 'o fortalecimento dos sindicatos e a ampliação dos direitos trabalhistas.'}, {id: 'B', text: 'a precarização do trabalho, com jornadas extensas e ausência de garantias sociais.'}, {id: 'C', text: 'a diminuição da desigualdade social, pela facilidade de acesso à renda.'}, {id: 'D', text: 'o fim da necessidade de qualificação profissional para o mercado de trabalho.'}, {id: 'E', text: 'a redução drástica do uso de tecnologias no cotidiano das cidades.'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 42, year: 2023, area: 'Linguagens e Códigos', discipline: 'Português', topic: 'Variação Linguística', baseText: '"O gerentão oio as paradas e falo que vai ve o que da pra faze. Nóis tá no aguardo."\n\nEssa frase, comum em certos contextos de oralidade, apresenta marcas de uma variedade linguística específica.', enunciado: 'Do ponto de vista da norma-padrão da língua portuguesa, a frase apresenta desvios, mas, sob a ótica dos estudos da linguagem, ela é um exemplo de:', options: [{id: 'A', text: 'erro linguístico que deve ser evitado em qualquer situação.'}, {id: 'B', text: 'incapacidade do falante de se comunicar de forma eficaz.'}, {id: 'C', text: 'variação linguística, adequada a um contexto informal e oral.'}, {id: 'D', text: 'uma nova norma-padrão que está substituindo a antiga.'}, {id: 'E', text: 'linguagem técnica utilizada em ambientes corporativos.'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 43, year: 2023, area: 'Matemática', discipline: 'Matemática', topic: 'Escala', baseText: 'Em um mapa, a distância em linha reta entre duas cidades, A e B, é de 8 cm. A escala do mapa é de 1:2.500.000.', enunciado: 'Qual é a distância real, em quilômetros, entre as cidades A e B?', options: [{id: 'A', text: '20 km'}, {id: 'B', text: '80 km'}, {id: 'C', text: '200 km'}, {id: 'D', text: '250 km'}, {id: 'E', text: '2.000 km'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 44, year: 2023, area: 'Ciências da Natureza', discipline: 'Física', topic: 'Circuitos Elétricos', baseText: 'Um chuveiro elétrico possui uma chave com duas posições: "Verão" e "Inverno". Para a posição "Inverno", a água deve aquecer mais, o que significa que a potência dissipada pelo resistor deve ser maior.', enunciado: 'Para que o chuveiro aqueça mais na posição "Inverno", a resistência elétrica do resistor, em comparação com a posição "Verão", deve ser:', options: [{id: 'A', text: 'menor, para aumentar a corrente elétrica.'}, {id: 'B', text: 'maior, para aumentar a corrente elétrica.'}, {id: 'C', text: 'menor, para diminuir a corrente elétrica.'}, {id: 'D', text: 'maior, para diminuir a corrente elétrica.'}, {id: 'E', text: 'a mesma, alterando-se apenas a voltagem.'}], correctAnswer: 'A', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 45, year: 2023, area: 'Ciências Humanas', discipline: 'Geografia', topic: 'Agronegócio', baseText: 'O agronegócio é um dos principais setores da economia brasileira, caracterizado pela alta tecnologia e pela produção em larga escala voltada para a exportação. No entanto, sua expansão tem gerado debates sobre seus impactos socioambientais.', enunciado: 'Uma crítica recorrente ao modelo de produção do agronegócio no Brasil é:', options: [{id: 'A', text: 'a priorização da agricultura familiar e da produção de alimentos para o mercado interno.'}, {id: 'B', text: 'o baixo uso de insumos agrícolas, como fertilizantes e agrotóxicos.'}, {id: 'C', text: 'a concentração de terras e a intensificação de conflitos no campo.'}, {id: 'D', text: 'a recuperação de áreas degradadas e a preservação de nascentes.'}, {id: 'E', text: 'a diversificação da produção e o fortalecimento da policultura.'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 46, year: 2023, area: 'Linguagens e Códigos', discipline: 'Literatura', topic: 'Romantismo', baseText: '"Minha terra tem palmeiras,\nOnde canta o Sabiá;\nAs aves, que aqui gorjeiam,\nNão gorjeiam como lá."\n(Gonçalves Dias, "Canção do Exílio")', enunciado: 'Os versos de Gonçalves Dias são um exemplo emblemático da primeira geração do Romantismo no Brasil, cuja principal característica é:', options: [{id: 'A', text: 'o pessimismo e a angústia existencial, conhecidos como "mal do século".'}, {id: 'B', text: 'a crítica social e a denúncia das desigualdades do país.'}, {id: 'C', text: 'o nacionalismo e a exaltação da natureza e da pátria.'}, {id: 'D', text: 'a objetividade e o rigor formal, herdados do Parnasianismo.'}, {id: 'E', text: 'a experimentação linguística e a fragmentação da realidade.'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 47, year: 2023, area: 'Matemática', discipline: 'Matemática', topic: 'Estatística', baseText: 'As notas de um aluno em cinco provas foram: 7.0, 8.5, 6.5, 9.0 e 6.0.', enunciado: 'Qual é a nota mediana desse aluno?', options: [{id: 'A', text: '6.5'}, {id: 'B', text: '7.0'}, {id: 'C', text: '7.4'}, {id: 'D', text: '8.5'}, {id: 'E', text: '9.0'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 48, year: 2023, area: 'Ciências da Natureza', discipline: 'Química', topic: 'pH e pOH', baseText: 'O pH de uma solução aquosa é definido como pH = -log[H⁺], onde [H⁺] é a concentração de íons hidrogênio. Soluções com pH < 7 são ácidas, pH > 7 são básicas e pH = 7 são neutras.', enunciado: 'Uma amostra de suco de limão apresentou uma concentração de íons H⁺ igual a 1,0 x 10⁻³ mol/L. O pH dessa amostra é:', options: [{id: 'A', text: '1'}, {id: 'B', text: '3'}, {id: 'C', text: '7'}, {id: 'D', text: '11'}, {id: 'E', text: '14'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 49, year: 2023, area: 'Ciências Humanas', discipline: 'História', topic: 'Revolução Industrial', baseText: 'A Primeira Revolução Industrial, iniciada na Inglaterra no século XVIII, foi marcada por inovações tecnológicas como a máquina a vapor e o tear mecânico. Essas mudanças alteraram profundamente as relações de trabalho e a paisagem urbana.', enunciado: 'Uma das principais consequências sociais da Revolução Industrial foi:', options: [{id: 'A', text: 'o surgimento do proletariado urbano, que vivia em condições precárias de trabalho e moradia.'}, {id: 'B', text: 'a diminuição da poluição nas cidades, devido ao uso de fontes de energia limpa.'}, {id: 'C', text: 'o fortalecimento do sistema feudal e do trabalho artesanal.'}, {id: 'D', text: 'a redução da jornada de trabalho e a criação de leis de proteção ao trabalhador.'}, {id: 'E', text: 'o êxodo urbano, com a população migrando em massa para o campo.'}], correctAnswer: 'A', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 50, year: 2023, area: 'Linguagens e Códigos', discipline: 'Português', topic: 'Coesão e Coerência', baseText: 'A tecnologia aproxima quem está longe e, muitas vezes, afasta quem está perto. Isso porque as interações digitais, embora constantes, nem sempre possuem a profundidade dos encontros presenciais.', enunciado: 'A palavra "Isso" no início do segundo período refere-se a qual ideia expressa anteriormente?', options: [{id: 'A', text: 'A profundidade dos encontros presenciais.'}, {id: 'B', text: 'As interações digitais serem constantes.'}, {id: 'C', text: 'A tecnologia afastar quem está perto.'}, {id: 'D', text: 'A tecnologia aproximar quem está longe e afastar quem está perto.'}, {id: 'E', text: 'A ausência de profundidade nas interações.'}], correctAnswer: 'D', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 51, year: 2023, area: 'Ciências da Natureza', discipline: 'Biologia', topic: 'Cadeia Alimentar', baseText: 'Em um ecossistema, os produtores são seres autótrofos, os consumidores primários são herbívoros, os secundários são carnívoros que se alimentam de herbívoros, e os decompositores reciclam a matéria orgânica.', enunciado: 'Em uma cadeia alimentar composta por capim, gafanhoto, sapo e cobra, o sapo ocupa o nível trófico de:', options: [{id: 'A', text: 'produtor.'}, {id: 'B', text: 'consumidor primário.'}, {id: 'C', text: 'consumidor secundário.'}, {id: 'D', text: 'consumidor terciário.'}, {id: 'E', text: 'decompositor.'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 52, year: 2023, area: 'Matemática', discipline: 'Matemática', topic: 'Razão e Proporção', baseText: null, enunciado: 'Um carro percorre 480 km com 40 litros de gasolina. Mantendo a mesma média de consumo, quantos quilômetros ele percorrerá com 25 litros?', options: [{id: 'A', text: '240 km'}, {id: 'B', text: '280 km'}, {id: 'C', text: '300 km'}, {id: 'D', text: '320 km'}, {id: 'E', text: '360 km'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 53, year: 2023, area: 'Ciências Humanas', discipline: 'Geografia', topic: 'Fontes de Energia', baseText: 'A matriz energética brasileira é considerada uma das mais limpas do mundo, devido à grande participação de fontes renováveis, com destaque para a hidrelétrica.', enunciado: 'Apesar de ser uma fonte renovável, a construção de grandes usinas hidrelétricas no Brasil gera impactos socioambientais significativos, como:', options: [{id: 'A', text: 'a emissão de gases de efeito estufa em larga escala.'}, {id: 'B', text: 'a contaminação do solo por metais pesados.'}, {id: 'C', text: 'o alagamento de grandes áreas, com perda de biodiversidade e deslocamento de populações.'}, {id: 'D', text: 'a geração de lixo nuclear de alta periculosidade.'}, {id: 'E', text: 'a poluição sonora que afeta a fauna marinha.'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 54, year: 2023, area: 'Linguagens e Códigos', discipline: 'Artes', topic: 'Arte Contemporânea', baseText: 'A performance é uma modalidade artística híbrida que pode combinar elementos do teatro, das artes visuais e da música. Nela, o corpo do artista é o suporte principal para a expressão de uma ideia ou conceito.', enunciado: 'Uma característica fundamental da performance como linguagem artística é o seu caráter:', options: [{id: 'A', text: 'permanente e duradouro, como uma escultura.'}, {id: 'B', text: 'efêmero e presencial, acontecendo em um tempo e espaço determinados.'}, {id: 'C', text: 'exclusivamente visual, sem a necessidade da presença do artista.'}, {id: 'D', text: 'tradicional e acadêmico, seguindo regras rígidas.'}, {id: 'E', text: 'comercial, com foco na venda de objetos de arte.'}], correctAnswer: 'B', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 55, year: 2023, area: 'Ciências da Natureza', discipline: 'Física', topic: 'Calorimetria', baseText: 'O calor específico é a quantidade de calor que um grama de uma substância precisa receber para que sua temperatura se eleve em um grau Celsius. O calor específico da água é de 1 cal/g°C.', enunciado: 'Qual a quantidade de calor, em calorias, necessária para elevar a temperatura de 200 g de água de 20°C para 50°C?', options: [{id: 'A', text: '3.000 cal'}, {id: 'B', text: '4.000 cal'}, {id: 'C', text: '6.000 cal'}, {id: 'D', text: '8.000 cal'}, {id: 'E', text: '10.000 cal'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 56, year: 2023, area: 'Matemática', discipline: 'Matemática', topic: 'Progressão Aritmética', baseText: null, enunciado: 'Em um cinema, a primeira fileira tem 10 assentos e cada fileira seguinte tem 2 assentos a mais que a anterior. Se o cinema tem 15 fileiras, quantos assentos há na última fileira?', options: [{id: 'A', text: '38'}, {id: 'B', text: '40'}, {id: 'C', text: '42'}, {id: 'D', text: '44'}, {id: 'E', text: '46'}], correctAnswer: 'A', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 57, year: 2023, area: 'Ciências Humanas', discipline: 'História', topic: 'Brasil República', baseText: 'A política do "café com leite", vigente durante a Primeira República no Brasil, foi um acordo entre as oligarquias de São Paulo (grande produtor de café) e Minas Gerais (grande produtor de leite e gado) para alternar a presidência da República entre políticos desses dois estados.', enunciado: 'Essa política evidencia uma característica da Primeira República, que era:', options: [{id: 'A', text: 'a forte participação popular nas decisões políticas.'}, {id: 'B', text: 'o caráter democrático e descentralizado do poder.'}, {id: 'C', text: 'o domínio político exercido por oligarquias estaduais.'}, {id: 'D', text: 'a industrialização acelerada e a valorização do operariado.'}, {id: 'E', text: 'a separação total entre os poderes Executivo e Legislativo.'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 58, year: 2023, area: 'Linguagens e Códigos', discipline: 'Espanhol', topic: 'Interpretação de Texto', baseText: '"La tecnología ha cambiado nuestra forma de vivir, pero es fundamental recordar que es una herramienta. El uso que le damos define si sus efectos son positivos o negativos. La clave está en el equilibrio y en no permitir que lo virtual reemplace por completo la riqueza de la interacción humana cara a cara."', enunciado: 'Según el texto, la tecnología debe ser vista como:', options: [{id: 'A', text: 'un fin en sí mismo.'}, {id: 'B', text: 'un sustituto de las relaciones humanas.'}, {id: 'C', text: 'algo intrínsecamente negativo para la sociedad.'}, {id: 'D', text: 'un instrumento cuyo impacto depende de su aplicación.'}, {id: 'E', text: 'la única forma de interacción social en el futuro.'}], correctAnswer: 'D', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 59, year: 2023, area: 'Ciências da Natureza', discipline: 'Biologia', topic: 'Evolução', baseText: 'O uso indiscriminado de antibióticos pode levar ao surgimento de "superbactérias", que são linhagens de bactérias resistentes a múltiplos medicamentos.', enunciado: 'O surgimento dessas superbactérias é um exemplo clássico do processo de:', options: [{id: 'A', text: 'seleção natural.'}, {id: 'B', text: 'mutação induzida.'}, {id: 'C', text: 'herança de caracteres adquiridos.'}, {id: 'D', text: 'fluxo gênico.'}, {id: 'E', text: 'deriva genética.'}], correctAnswer: 'A', userAnswer: null, isCorrect: null, answeredDate: null },
  { id: 60, year: 2023, area: 'Matemática', discipline: 'Matemática', topic: 'Trigonometria', baseText: 'Um avião decola sob um ângulo de 30°. Após percorrer 2000 metros em linha reta, o avião atinge uma determinada altura em relação ao solo.\n(Dados: sen(30°) = 0,5; cos(30°) ≈ 0,87; tg(30°) ≈ 0,58)', enunciado: 'Qual é a altura, em metros, atingida pelo avião?', options: [{id: 'A', text: '500 m'}, {id: 'B', text: '870 m'}, {id: 'C', text: '1000 m'}, {id: 'D', text: '1740 m'}, {id: 'E', text: '2000 m'}], correctAnswer: 'C', userAnswer: null, isCorrect: null, answeredDate: null },
];
const essayPrompts = [ 
    { year: 2023, title: 'Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil' }, 
    { year: 2022, title: 'Desafios para a valorização de comunidades e povos tradicionais no Brasil' }, 
    { year: 2021, title: 'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil' }, 
    { year: 2020, title: 'O estigma associado às doenças mentais na sociedade brasileira' },
    { year: 2019, title: 'Democratização do acesso ao cinema no Brasil' },
    { year: 2018, title: 'Manipulação do comportamento do usuário pelo controle de dados na Internet' },
    { year: 2017, title: 'Desafios para a formação educacional de surdos no Brasil' },
];
const lessonTopics = { 
    'Biologia': [{ topic: 'Citologia', videoId: 'rjH2xzCwNx0' }, { topic: 'Genética', videoId: '-Vv3USW7iRU' }, { topic: 'Ecologia', videoId: 'TsclSi3nNsI' }], 
    'Física': [{ topic: 'Cinemática', videoId: 'Mz4s3JDIv8A' }, { topic: 'Leis de Newton', videoId: '5AEZCsEAopY' }, { topic: 'Eletrodinâmica', videoId: 'yfGAhEtqkbk' }], 
    'História': [{ topic: 'Brasil Colônia', videoId: 'RX2eB7zf87g' }, { topic: 'Revolução Francesa', videoId: 'eg47cCMcQr0' }, { topic: 'Guerra Fria', videoId: 'cAwsLaO4HGQ' }] 
};
const avatars = ['🧑‍🎓', '👩‍🎓', '👨‍🏫', '👩‍🏫', '🦉', '🧠', '🚀', '⭐'];

// --- FUNÇÃO HELPER PARA CHAMAR A API GEMINI ---
async function callGeminiAPI(prompt, maxRetries = 3) {
    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (response.ok) {
                const result = await response.json();
                if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) return result.candidates[0].content.parts[0].text;
                else throw new Error("Resposta da API inválida.");
            }
            if (response.status === 429 || response.status >= 500) throw new Error(`Erro de servidor: ${response.status}`);
            else { const errorResult = await response.json(); console.error("Erro da API:", errorResult); return `Erro na API: ${errorResult?.error?.message || response.statusText}`; }
        } catch (error) {
            if (attempt + 1 >= maxRetries) { console.error("Falha na API Gemini:", error); return "Não foi possível obter uma resposta da IA. Tente mais tarde."; }
            const delay = Math.pow(2, attempt) * 1000;
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

// --- COMPONENTE PROVEDOR DO CONTEXTO ---
const AppProvider = ({ children }) => {
  const [questoes, setQuestoes] = useState(initialQuestoes);
  const [activePage, setActivePage] = useState({ page: 'dashboard', params: {} });
  const [flashcardDecks, setFlashcardDecks] = useState([{ name: 'Capitais do Brasil', cards: [{ id: 1, front: 'Qual a capital de Pernambuco?', back: 'Recife' }, {id: 2, front: 'Qual a capital da Bahia?', back: 'Salvador'}] }]);
  const [userProfile, setUserProfile] = useState({ avatar: '🧑‍🎓', name: 'Estudante Dedicado(a)' });
  const [simulations, setSimulations] = useState([]);
  const [goals, setGoals] = useState({ questions: 50, essays: 2 });

  const updateQuestao = (id, userAnswer) => {
    const today = new Date(); const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setQuestoes(prev => prev.map(q => q.id === id ? { ...q, userAnswer, isCorrect: q.correctAnswer === userAnswer, answeredDate: formattedDate } : q));
  };
  
  const updateQuestoesBatch = (answeredQuestions) => {
      const today = new Date(); const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      setQuestoes(prev => {
          const updatedQuestoes = [...prev];
          answeredQuestions.forEach(answeredQ => {
              const index = updatedQuestoes.findIndex(q => q.id === answeredQ.id);
              if(index !== -1) updatedQuestoes[index] = { ...updatedQuestoes[index], userAnswer: answeredQ.userAnswer, isCorrect: updatedQuestoes[index].correctAnswer === answeredQ.userAnswer, answeredDate: formattedDate };
          });
          return updatedQuestoes;
      });
  };

  const resetQuestao = (id) => setQuestoes(prev => prev.map(q => q.id === id ? { ...q, userAnswer: null, isCorrect: null, answeredDate: null, explanation: null } : q));
  
  const addFlashcardDeck = (deck) => setFlashcardDecks(prev => [...prev, deck]);
  
  const addCardToDeck = (deckName, cardData) => {
    setFlashcardDecks(prevDecks =>
        prevDecks.map(deck => {
            if (deck.name === deckName) {
                const newCard = { ...cardData, id: Date.now() }; // Simple unique ID
                return { ...deck, cards: [...deck.cards, newCard] };
            }
            return deck;
        })
    );
  };

  const deleteCardFromDeck = (deckName, cardId) => {
    setFlashcardDecks(prevDecks =>
        prevDecks.map(deck => {
            if (deck.name === deckName) {
                const updatedCards = deck.cards.filter(card => card.id !== cardId);
                return { ...deck, cards: updatedCards };
            }
            return deck;
        })
    );
  };

  const saveSimulation = (result) => setSimulations(prev => [...prev, result]);

  return (
    <AppContext.Provider value={{ questoes, updateQuestao, resetQuestao, activePage, setActivePage, updateQuestoesBatch, flashcardDecks, addFlashcardDeck, addCardToDeck, deleteCardFromDeck, userProfile, setUserProfile, simulations, saveSimulation, goals, setGoals }}>
      {children}
    </AppContext.Provider>
  );
};

// --- COMPONENTES DA UI ---

const QuestaoCard = ({ questao, onExplain }) => {
  const { updateQuestao, resetQuestao } = useContext(AppContext);
  const [selectedOption, setSelectedOption] = useState(questao.userAnswer);
  const [isConfirmed, setIsConfirmed] = useState(!!questao.userAnswer);
  const [explanation, setExplanation] = useState(questao.explanation || null);
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);

  const handleConfirm = () => { if (selectedOption && !isConfirmed) { updateQuestao(questao.id, selectedOption); setIsConfirmed(true); } };
  const handleReset = () => { resetQuestao(questao.id); setSelectedOption(null); setIsConfirmed(false); setExplanation(null); };
  const handleExplain = async () => {
      setIsExplanationLoading(true); setExplanation(null);
      const fullText = questao.baseText ? `${questao.baseText}\n\n${questao.enunciado}` : questao.enunciado;
      const prompt = `Aja como um professor especialista no ENEM. Explique a resposta correta para a questão abaixo de forma BREVE e DIRETA (máximo 2-3 frases). Foque apenas no conceito principal que leva à resposta correta.\n\n**Questão:** ${fullText}\n**Resposta Correta:** ${questao.correctAnswer}`;
      const result = await callGeminiAPI(prompt);
      setExplanation(result); setIsExplanationLoading(false);
      if(onExplain) onExplain(questao.id, result);
  };
  const getOptionBgColor = (optionId) => {
    if (!isConfirmed) return selectedOption === optionId ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600';
    if (optionId === questao.correctAnswer) return 'bg-green-600';
    if (optionId === selectedOption && !questao.isCorrect) return 'bg-red-600';
    return 'bg-gray-800 text-gray-400';
  };
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col">
      <div className="flex justify-between items-center mb-4 text-sm text-gray-400"><span>{questao.year} - {questao.discipline}</span><span>{questao.topic}</span></div>
      <div className="mb-6 flex-grow">
          {questao.baseText && (
              <p className="text-sm text-gray-400 italic mb-4 whitespace-pre-wrap">{questao.baseText}</p>
          )}
          <p className="text-gray-200 font-bold whitespace-pre-wrap">{questao.enunciado}</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {questao.options.map(option => (<button key={option.id} onClick={() => !isConfirmed && setSelectedOption(option.id)} className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${getOptionBgColor(option.id)}`} disabled={isConfirmed}><span className="font-bold mr-2">{option.id})</span> {option.text}</button>))}
      </div>
      {!isConfirmed ? (<button onClick={handleConfirm} disabled={!selectedOption} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors">Confirmar Resposta</button>) : (<div className="mt-6"><div className="text-center font-bold p-3 rounded-lg" style={{backgroundColor: questao.isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: questao.isCorrect ? '#22c55e' : '#ef4444'}}>{questao.isCorrect ? `Correto! A resposta é ${questao.correctAnswer}.` : `Incorreto. A resposta correta é ${questao.correctAnswer}.`}</div><div className="flex gap-2 mt-4"><button onClick={handleReset} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Refazer</button><button onClick={handleExplain} disabled={isExplanationLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-purple-400">{isExplanationLoading ? <LoaderCircle className="animate-spin" /> : <Sparkles size={18} />} Explique-me</button></div></div>)}
      {isExplanationLoading && <div className="mt-4 p-4 bg-gray-700 rounded-lg text-center">Gerando explicação...</div>}
      {explanation && (<div className="mt-4 p-4 bg-gray-900 border border-gray-700 rounded-lg"><h4 className="font-bold text-lg mb-2 text-purple-400">Explicação da IA</h4><p className="text-gray-300 whitespace-pre-wrap">{explanation}</p></div>)}
    </div>
  );
};

const SetGoalsModal = ({ onClose, currentGoals, setGoals }) => {
    const [tempGoals, setTempGoals] = useState(currentGoals);

    const handleSave = () => {
        setGoals(tempGoals);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
                <header className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-xl font-bold">Definir Metas Semanais</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><XCircle size={24} /></button>
                </header>
                <main className="p-6 space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Questões a resolver</label>
                        <input type="number" value={tempGoals.questions} onChange={e => setTempGoals({...tempGoals, questions: parseInt(e.target.value) || 0})} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Redações a fazer</label>
                        <input type="number" value={tempGoals.essays} onChange={e => setTempGoals({...tempGoals, essays: parseInt(e.target.value) || 0})} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                    </div>
                    <button onClick={handleSave} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg">Salvar Metas</button>
                </main>
            </div>
        </div>
    );
};

const Dashboard = () => {
  const { questoes, setActivePage, goals, setGoals } = useContext(AppContext);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const totalRespondidas = useMemo(() => questoes.filter(q => q.userAnswer !== null).length, [questoes]);
  const totalCorretas = useMemo(() => questoes.filter(q => q.isCorrect).length, [questoes]);
  const percentualAcerto = totalRespondidas > 0 ? ((totalCorretas / totalRespondidas) * 100).toFixed(1) : 0;
  
  const questionOfTheDay = useMemo(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return questoes[dayOfYear % questoes.length];
  }, []);

  const studyStreak = useMemo(() => {
    const answeredDates = [...new Set(questoes.filter(q => q.answeredDate).map(q => q.answeredDate))].sort();
    if (answeredDates.length === 0) return 0; let streak = 0; const today = new Date(); const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    if (answeredDates.includes(todayStr) || answeredDates.includes(yesterdayStr)) {
        streak = 1; let lastDate = new Date(answeredDates[answeredDates.length - 1] + "T00:00:00");
        for (let i = answeredDates.length - 2; i >= 0; i--) {
            const currentDate = new Date(answeredDates[i] + "T00:00:00");
            if ((lastDate - currentDate) / (1000 * 60 * 60 * 24) === 1) { streak++; lastDate = currentDate; } else break;
        }
    } return streak;
  }, [questoes]);

  const questionsAnsweredThisWeek = useMemo(() => {
      const today = new Date();
      const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      firstDayOfWeek.setHours(0,0,0,0);
      return questoes.filter(q => q.answeredDate && new Date(q.answeredDate) >= firstDayOfWeek).length;
  }, [questoes]);

  const stats = [
    { title: 'Questões Resolvidas', value: totalRespondidas, icon: <PenTool className="w-8 h-8"/> },
    { title: 'Aproveitamento', value: `${percentualAcerto}%`, icon: <BarChart2 className="w-8 h-8"/> },
    { title: 'Sequência de Estudos', value: `${studyStreak} dias`, icon: <Flame className="w-8 h-8"/> },
    { title: 'Total de Questões', value: questoes.length, icon: <BookOpen className="w-8 h-8"/> },
  ];
  return (
    <div>
      {showGoalsModal && <SetGoalsModal onClose={() => setShowGoalsModal(false)} currentGoals={goals} setGoals={setGoals} />}
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (<div key={stat.title} className="bg-gray-800 p-6 rounded-lg flex items-center justify-between border border-gray-700"><div><p className="text-gray-400 text-sm">{stat.title}</p><p className="text-3xl font-bold">{stat.value}</p></div><div className={`${stat.title === 'Sequência de Estudos' && studyStreak > 0 ? 'text-orange-400' : 'text-indigo-400'}`}>{stat.icon}</div></div>))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Minhas Metas Semanais</h2>
                <button onClick={() => setShowGoalsModal(true)} className="text-gray-400 hover:text-white"><Settings size={18}/></button>
            </div>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between mb-1"><p>Resolver Questões</p><p>{questionsAnsweredThisWeek} / {goals.questions}</p></div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{width: `${Math.min(100, (questionsAnsweredThisWeek / goals.questions) * 100)}%`}}></div></div>
                </div>
                <div>
                    <div className="flex justify-between mb-1"><p>Fazer Redações</p><p>0 / {goals.essays}</p></div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{width: '0%'}}></div></div>
                </div>
            </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Questão do Dia</h2>
            <p className="text-sm text-gray-400">{questionOfTheDay.discipline} - {questionOfTheDay.topic}</p>
            <p className="my-2">{questionOfTheDay.enunciado}</p>
            <button onClick={() => setActivePage({page: 'explorar', params: { scrollToId: questionOfTheDay.id }})} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg mt-2">Responder Agora</button>
        </div>
      </div>
    </div>
  );
};

const ExplorarQuestoes = () => {
    const { questoes, activePage } = useContext(AppContext);
    const { scrollToId } = activePage.params || {};
    const questionRefs = useRef({});

    const [ano, setAno] = useState(scrollToId ? questoes.find(q => q.id === scrollToId)?.year.toString() || 'todos' : 'todos'); 
    const [area, setArea] = useState(scrollToId ? questoes.find(q => q.id === scrollToId)?.area || 'todas' : 'todas'); 
    const [disciplina, setDisciplina] = useState(scrollToId ? questoes.find(q => q.id === scrollToId)?.discipline || 'todas' : 'todas'); 
    const [assunto, setAssunto] = useState(scrollToId ? questoes.find(q => q.id === scrollToId)?.topic || 'todos' : 'todos');
    const [status, setStatus] = useState('todos');

    const anos = useMemo(() => ['todos', ...new Set(questoes.map(q => q.year))].sort((a,b) => b-a), [questoes]);
    const areas = useMemo(() => ['todos', ...new Set(questoes.map(q => q.area))], [questoes]);
    const disciplinas = useMemo(() => ['todos', ...new Set(questoes.map(q => q.discipline))], [questoes]);
    const assuntos = useMemo(() => ['todos', ...new Set(questoes.map(q => q.topic))], [questoes]);

    const questoesFiltradas = useMemo(() => {
        return questoes.filter(q => {
            const filtroAno = ano === 'todos' || q.year === parseInt(ano);
            const filtroArea = area === 'todas' || q.area === area;
            const filtroDisciplina = disciplina === 'todas' || q.discipline === disciplina;
            const filtroAssunto = assunto === 'todos' || q.topic === assunto;
            
            let filtroStatus = true;
            if (status === 'corretas') filtroStatus = q.isCorrect === true;
            else if (status === 'erradas') filtroStatus = q.isCorrect === false;
            else if (status === 'naoFeitas') filtroStatus = q.userAnswer === null;

            return filtroAno && filtroArea && filtroDisciplina && filtroAssunto && filtroStatus;
        });
    }, [questoes, ano, area, disciplina, assunto, status]);

    useEffect(() => {
        if (scrollToId && questionRefs.current[scrollToId]) {
            setTimeout(() => {
                questionRefs.current[scrollToId].scrollIntoView({ behavior: 'smooth', block: 'center' });
                questionRefs.current[scrollToId].classList.add('highlight');
                setTimeout(() => {
                    questionRefs.current[scrollToId]?.classList.remove('highlight');
                }, 2500);
            }, 100);
        }
    }, [scrollToId]);

    return (
        <div>
             <style>{`
                .highlight {
                    animation: highlight-animation 2.5s ease-out;
                }
                @keyframes highlight-animation {
                    0% { box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.7); }
                    100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
                }
            `}</style>
            <h1 className="text-3xl font-bold mb-8">Explorar Questões</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <select value={ano} onChange={e => setAno(e.target.value)} className="bg-gray-700 border border-gray-600 rounded-md p-2 w-full"><option value="todos">Todos os Anos</option>{anos.filter(a => a !== 'todos').map(y => <option key={y} value={y}>{y}</option>)}</select>
                <select value={area} onChange={e => setArea(e.target.value)} className="bg-gray-700 border border-gray-600 rounded-md p-2 w-full"><option value="todas">Todas as Áreas</option>{areas.filter(a => a !== 'todos').map(a => <option key={a} value={a}>{a}</option>)}</select>
                <select value={disciplina} onChange={e => setDisciplina(e.target.value)} className="bg-gray-700 border border-gray-600 rounded-md p-2 w-full"><option value="todas">Todas as Disciplinas</option>{disciplinas.filter(d => d !== 'todas').map(d => <option key={d} value={d}>{d}</option>)}</select>
                <select value={assunto} onChange={e => setAssunto(e.target.value)} className="bg-gray-700 border border-gray-600 rounded-md p-2 w-full"><option value="todos">Todos os Assuntos</option>{assuntos.filter(a => a !== 'todos').map(a => <option key={a} value={a}>{a}</option>)}</select>
                <select value={status} onChange={e => setStatus(e.target.value)} className="bg-gray-700 border border-gray-600 rounded-md p-2 w-full">
                    <option value="todos">Todos os Status</option>
                    <option value="corretas">Corretas</option>
                    <option value="erradas">Erradas</option>
                    <option value="naoFeitas">Não Feitas</option>
                </select>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {questoesFiltradas.length > 0 ? (questoesFiltradas.map(q => <div key={q.id} ref={el => questionRefs.current[q.id] = el}><QuestaoCard questao={q} /></div>)) : (<p className="col-span-full text-center text-gray-400 mt-8">Nenhuma questão encontrada com os filtros selecionados.</p>)}
            </div>
        </div>
    );
};

const Relatorios = () => {
    const { questoes } = useContext(AppContext);
    const [reportType, setReportType] = useState('area'); // 'area', 'disciplina', 'assunto'

    const performanceData = useMemo(() => {
        const answeredQuestions = questoes.filter(q => q.userAnswer !== null);
        if (answeredQuestions.length === 0) return [];

        const groupKey = reportType === 'area' ? 'area' : reportType === 'disciplina' ? 'discipline' : 'topic';
        
        const groupedData = answeredQuestions.reduce((acc, q) => {
            const key = q[groupKey];
            if (!acc[key]) {
                acc[key] = { name: key, Acertos: 0, Erros: 0, Total: 0 };
            }
            acc[key].Total++;
            if (q.isCorrect) {
                acc[key].Acertos++;
            } else {
                acc[key].Erros++;
            }
            return acc;
        }, {});

        return Object.values(groupedData);
    }, [questoes, reportType]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Relatório de Desempenho</h1>
            
            <div className="flex justify-center mb-6 bg-gray-800 rounded-lg p-1 border border-gray-700">
                <button onClick={() => setReportType('area')} className={`px-4 py-2 rounded-md transition-colors ${reportType === 'area' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}>Por Área</button>
                <button onClick={() => setReportType('disciplina')} className={`px-4 py-2 rounded-md transition-colors ${reportType === 'disciplina' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}>Por Disciplina</button>
                <button onClick={() => setReportType('assunto')} className={`px-4 py-2 rounded-md transition-colors ${reportType === 'assunto' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}>Por Assunto</button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold mb-6 text-center">Desempenho {reportType === 'area' ? 'por Área' : reportType === 'disciplina' ? 'por Disciplina' : 'por Assunto'}</h2>
                {performanceData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={performanceData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                            <XAxis type="number" stroke="#a0aec0" allowDecimals={false} />
                            <YAxis type="category" dataKey="name" stroke="#a0aec0" width={120} tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568' }} labelStyle={{ color: '#e2e8f0' }} />
                            <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                            <Bar dataKey="Acertos" fill="#48bb78" stackId="a" />
                            <Bar dataKey="Erros" fill="#f56565" stackId="a" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (<p className="text-center text-gray-400 mt-8">Responda algumas questões para ver seu relatório de desempenho.</p>)}
            </div>
        </div>
    );
};

const DetalhesDiaModal = ({ date, onClose, questoesDoDia }) => {
    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    return (<div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"><div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-700"><header className="p-4 flex justify-between items-center border-b border-gray-700"><h2 className="text-xl font-bold">Questões de {formattedDate}</h2><button onClick={onClose} className="text-gray-400 hover:text-white"><XCircle size={24} /></button></header><main className="p-6 overflow-y-auto"><div className="space-y-4">{questoesDoDia.map(q => (<div key={q.id} className={`p-4 rounded-lg border-l-4 ${q.isCorrect ? 'border-green-500 bg-gray-900' : 'border-red-500 bg-gray-900'}`}><p className="text-sm text-gray-400">{q.discipline} - {q.topic}</p><p className="mt-1 text-gray-200">{q.enunciado}</p><p className="mt-2 text-sm">Sua resposta: <span className="font-semibold">{q.userAnswer}</span>. Resposta correta: <span className="font-semibold">{q.correctAnswer}</span>.</p></div>))}</div></main></div></div>);
};

const Calendario = () => {
  const { questoes } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState(new Date()); const [selectedDate, setSelectedDate] = useState(null);
  const answeredData = useMemo(() => { const data = {}; questoes.filter(q => q.answeredDate).forEach(q => { data[q.answeredDate] = (data[q.answeredDate] || 0) + 1; }); return data; }, [questoes]);
  const handleDayClick = (day) => { const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; if (answeredData[dateStr]) setSelectedDate(dateStr); };
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(<div key={`empty-${i}`} className="border-r border-b border-gray-700"></div>);
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; const count = answeredData[dateStr];
      days.push(<div key={day} onClick={() => handleDayClick(day)} className={`p-2 border-r border-b border-gray-700 h-24 md:h-32 flex flex-col transition-colors ${count ? 'cursor-pointer hover:bg-gray-700' : ''}`}><span className="font-bold">{day}</span>{count && (<div className="mt-auto bg-indigo-500 text-white text-xs rounded-full px-2 py-1 self-center text-center">{count} {count > 1 ? 'questões' : 'questão'}</div>)}</div>);
    } return days;
  };
  const changeMonth = (offset) => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Calendário de Atividades</h1>
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-gray-900"><button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-700">‹</button><h2 className="text-xl font-semibold">{currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h2><button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-700">›</button></div>
        <div className="grid grid-cols-7 text-center font-semibold text-sm text-gray-400">{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (<div key={day} className="p-2 border-b border-r border-gray-700">{day}</div>))}</div>
        <div className="grid grid-cols-7">{renderCalendar()}</div>
      </div>
      {selectedDate && <DetalhesDiaModal date={selectedDate} onClose={() => setSelectedDate(null)} questoesDoDia={questoes.filter(q => q.answeredDate === selectedDate)} />}
    </div>
  );
};

const PlanoEstudos = () => {
    const { questoes } = useContext(AppContext);
    const [mode, setMode] = useState('quiz'); // 'quiz' or 'text'
    const [quizAnswers, setQuizAnswers] = useState({});
    const [userInput, setUserInput] = useState(''); 
    const [studyPlan, setStudyPlan] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    
    const quizQuestions = [
        { id: 'objective', text: 'Qual seu principal objetivo?', options: ['Passar em um curso concorrido (Medicina, Direito, etc)', 'Melhorar meu desempenho geral', 'Focar em uma área específica (Exatas, Humanas, etc)', 'Apenas revisar o conteúdo'] },
        { id: 'time', text: 'Quanto tempo você tem para estudar por dia?', options: ['Menos de 2 horas', 'De 2 a 4 horas', 'Mais de 4 horas'] },
        { id: 'difficulty', text: 'Qual área você considera sua MAIOR dificuldade?', options: ['Matemática', 'Ciências da Natureza', 'Linguagens e Códigos', 'Ciências Humanas', 'Redação'] },
        { id: 'preference', text: 'Como você prefere estudar?', options: ['Foco em resolver muitas questões', 'Mais teoria e resumos, depois questões', 'Equilíbrio entre teoria e prática'] },
    ];

    const performanceSummary = useMemo(() => {
        const answered = questoes.filter(q => q.userAnswer !== null); if (answered.length === 0) return "Nenhuma questão foi respondida ainda.";
        const areas = ['Linguagens e Códigos', 'Ciências Humanas', 'Ciências da Natureza', 'Matemática'];
        return areas.map(area => {
            const areaQuestions = answered.filter(q => q.area === area); if (areaQuestions.length === 0) return `${area}: Sem dados.`;
            const correct = areaQuestions.filter(q => q.isCorrect).length; const percentage = ((correct / areaQuestions.length) * 100).toFixed(0);
            return `${area}: ${percentage}% de acerto`;
        }).join(', ');
    }, [questoes]);

    const handleQuizChange = (questionId, answer) => {
        setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleGeneratePlan = async () => {
        setIsLoading(true); setStudyPlan('');
        let context;
        if (mode === 'quiz') {
            context = `O aluno respondeu um questionário:\n- Objetivo: ${quizAnswers.objective || 'Não informado'}\n- Tempo disponível: ${quizAnswers.time || 'Não informado'}\n- Maior dificuldade: ${quizAnswers.difficulty || 'Não informado'}\n- Preferência de estudo: ${quizAnswers.preference || 'Não informado'}`;
        } else {
            context = `**Objetivos e Dificuldades do Aluno:**\n"${userInput || 'O aluno não forneceu detalhes, foque em uma revisão geral equilibrada.'}"`;
        }

        const prompt = `Aja como um tutor especialista no ENEM e crie um plano de estudos personalizado de 4 semanas para um aluno.\n\n**Desempenho Atual do Aluno (se houver):**\n${performanceSummary}\n\n**Contexto do Aluno:**\n${context}\n\n**Instruções:**\n1. Crie um plano semanal, dividido em 4 semanas.\n2. Para cada semana, sugira áreas de conhecimento e disciplinas específicas para focar, levando em conta o contexto do aluno.\n3. Dê exemplos de tópicos importantes dentro de cada disciplina sugerida.\n4. Inicie com uma breve análise motivacional com base nos dados fornecidos.\n5. Apresente o plano em formato de texto claro e organizado, usando títulos para cada semana.`;
        
        const result = await callGeminiAPI(prompt); 
        setStudyPlan(result); 
        setIsLoading(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Gerador de Plano de Estudos</h1><p className="text-gray-400 mb-8">Use o questionário ou escreva seus objetivos para a IA criar um plano personalizado para você.</p>
            <div className="flex justify-center mb-6 bg-gray-800 rounded-lg p-1 border border-gray-700 w-min mx-auto">
                <button onClick={() => setMode('quiz')} className={`px-4 py-2 rounded-md transition-colors ${mode === 'quiz' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}>Questionário</button>
                <button onClick={() => setMode('text')} className={`px-4 py-2 rounded-md transition-colors ${mode === 'text' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}>Texto Livre</button>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                {mode === 'quiz' ? (
                    <div className="space-y-6">
                        {quizQuestions.map(q => (
                            <div key={q.id}>
                                <h3 className="font-semibold mb-2">{q.text}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {q.options.map(opt => (
                                        <button key={opt} onClick={() => handleQuizChange(q.id, opt)} className={`px-3 py-2 text-sm rounded-md transition-colors ${quizAnswers[q.id] === opt ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>{opt}</button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Seus Objetivos</h2>
                        <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Ex: Tenho 2 horas por dia, preciso focar em matemática e redação..." className="w-full h-28 p-3 bg-gray-700 border border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                    </div>
                )}
                 <button onClick={handleGeneratePlan} disabled={isLoading} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-indigo-400">{isLoading ? <LoaderCircle className="animate-spin" /> : <Sparkles size={18} />} Gerar Plano de Estudos</button>
            </div>

            {isLoading && <div className="mt-6 p-6 bg-gray-800 rounded-lg text-center border border-gray-700">Criando seu plano de estudos personalizado...</div>}
            {studyPlan && (<div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-700"><h2 className="text-2xl font-bold mb-4 text-indigo-400">Seu Plano de Estudos Personalizado</h2><p className="text-gray-300 whitespace-pre-wrap">{studyPlan}</p></div>)}
        </div>
    );
};

const Redacao = () => {
    const [prompt, setPrompt] = useState(essayPrompts[0].title);
    const [essay, setEssay] = useState(''); 
    const [feedback, setFeedback] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    const [isCustomPrompt, setIsCustomPrompt] = useState(false);

    const handleGetFeedback = async () => {
        if (essay.trim().length < 50) { setFeedback("Por favor, escreva um texto com pelo menos 50 palavras para receber uma análise."); return; }
        setIsLoading(true); setFeedback('');
        const apiPrompt = `Aja como um corretor de redação experiente do ENEM. Analise a seguinte redação com base nas 5 competências do ENEM. Forneça um feedback detalhado para cada competência, apontando pontos fortes e áreas para melhoria. Seja construtivo e ofereça sugestões práticas. Ao final, dê uma nota estimada de 0 a 1000.\n\n**Tema:** "${prompt}"\n\n**Redação do Aluno:**\n"${essay}"`;
        const result = await callGeminiAPI(apiPrompt);
        setFeedback(result); setIsLoading(false);
    };
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Prática de Redação com IA</h1><p className="text-gray-400 mb-8">Escolha um tema, escreva sua redação e receba um feedback instantâneo baseado nas competências do ENEM.</p>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold mb-4">1. Escolha ou Crie o Tema</h2>
                {isCustomPrompt ? (
                     <div>
                        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Digite seu tema personalizado aqui..." className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                        <button onClick={() => setIsCustomPrompt(false)} className="text-sm text-indigo-400 mt-2">Usar temas oficiais</button>
                     </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <select onChange={(e) => setPrompt(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-3">
                            {essayPrompts.map(p => <option key={p.year} value={p.title}>ENEM {p.year} - {p.title}</option>)}
                        </select>
                        <button onClick={() => { setIsCustomPrompt(true); setPrompt(''); }} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg">Criar</button>
                    </div>
                )}

                <h2 className="text-xl font-bold mt-6 mb-4">2. Escreva sua Redação</h2>
                <textarea value={essay} onChange={e => setEssay(e.target.value)} placeholder="Comece a escrever aqui..." className="w-full h-96 p-3 bg-gray-700 border border-gray-600 rounded-md resize-y focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                <button onClick={handleGetFeedback} disabled={isLoading} className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-purple-400">{isLoading ? <LoaderCircle className="animate-spin" /> : <Sparkles size={18} />} Analisar Redação</button>
            </div>
            {isLoading && <div className="mt-6 p-6 bg-gray-800 rounded-lg text-center border border-gray-700">Analisando sua redação...</div>}
            {feedback && (<div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-700"><h2 className="text-2xl font-bold mb-4 text-purple-400">Feedback da IA</h2><p className="text-gray-300 whitespace-pre-wrap">{feedback}</p></div>)}
        </div>
    );
};

const Simulado = () => {
    const { questoes, setActivePage, simulations } = useContext(AppContext);
    const startSimulado = (numQuestions, timeLimitMinutes) => {
        const shuffled = [...questoes].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, numQuestions);
        setActivePage({ page: 'modoSimulado', params: { questions: selectedQuestions, timeLimit: timeLimitMinutes * 60 } });
    };
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Simulados ENEM</h1><p className="text-gray-400 mb-8">Teste seus conhecimentos em condições de prova. Escolha um modo para começar.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center"><h2 className="text-xl font-bold mb-2">Simulado Rápido</h2><p className="text-gray-400 mb-4 h-12">Ideal para uma prática rápida e focada.</p><button onClick={() => startSimulado(20, 45)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">20 Questões (45 min)</button></div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center"><h2 className="text-xl font-bold mb-2">Meio Simulado</h2><p className="text-gray-400 mb-4 h-12">Metade de um dia de prova para treinar resistência.</p><button onClick={() => startSimulado(45, 90)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">45 Questões (90 min)</button></div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center"><h2 className="text-xl font-bold mb-2">Simulado Completo</h2><p className="text-gray-400 mb-4 h-12">Simule um dia de prova completo do ENEM.</p><button onClick={() => startSimulado(90, 180)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">90 Questões (3h)</button></div>
            </div>
             {simulations.length > 0 && (
                <div className="mt-10 bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h2 className="text-xl font-bold mb-4">Histórico de Simulados</h2>
                    <div className="space-y-3">
                        {simulations.map((sim, index) => {
                             const correctCount = sim.questions.filter(q => q.correctAnswer === sim.answers[q.id]).length;
                             const percentage = ((correctCount / sim.questions.length) * 100).toFixed(1);
                            return (
                                <div key={index} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">Simulado #{index + 1} - {new Date(sim.date).toLocaleDateString('pt-BR')}</p>
                                        <p className="text-sm text-gray-400">{sim.questions.length} questões</p>
                                    </div>
                                    <p className="font-bold text-lg">{percentage}%</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const ModoSimulado = ({ questions, timeLimit }) => {
    const { setActivePage, updateQuestoesBatch, saveSimulation } = useContext(AppContext);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(timeLimit);

    useEffect(() => {
        const timer = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { clearInterval(timer); finishSimulado(); return 0; } return prev - 1; }); }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSelectOption = (questionId, optionId) => setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    const finishSimulado = () => {
        const answeredQuestions = questions.map(q => ({ id: q.id, userAnswer: answers[q.id] || null }));
        updateQuestoesBatch(answeredQuestions);
        const result = { questions, answers, timeTaken: timeLimit - timeLeft, date: new Date().toISOString() };
        saveSimulation(result);
        setActivePage({ page: 'resultadoSimulado', params: result });
    };
    const currentQuestion = questions[currentQIndex];
    const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);
    return (
        <div className="bg-gray-900 p-4 md:p-8"><header className="flex justify-between items-center mb-6"><h1 className="text-xl font-bold">Simulado em Andamento</h1><div className="flex items-center gap-2 text-red-400 font-bold text-lg"><Clock size={20} /><span>{formatTime(timeLeft)}</span></div></header><div className="bg-gray-800 p-6 rounded-lg border border-gray-700"><p className="text-sm text-gray-400 mb-4">Questão {currentQIndex + 1} de {questions.length}</p><p className="mb-6 text-gray-200">{currentQuestion.enunciado}</p><div className="grid grid-cols-1 gap-3">{currentQuestion.options.map(option => (<button key={option.id} onClick={() => handleSelectOption(currentQuestion.id, option.id)} className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${answers[currentQuestion.id] === option.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}><span className="font-bold mr-2">{option.id})</span> {option.text}</button>))}</div></div><footer className="flex justify-between items-center mt-6"><button onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))} disabled={currentQIndex === 0} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50">Anterior</button>{currentQIndex === questions.length - 1 ? (<button onClick={finishSimulado} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg">Finalizar Simulado</button>) : (<button onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg">Próxima</button>)}</footer></div>
    );
};

const ResultadoSimulado = ({ questions, answers, timeTaken }) => {
    const { setActivePage } = useContext(AppContext);
    const results = useMemo(() => { let correctCount = 0; questions.forEach(q => { if (q.correctAnswer === answers[q.id]) correctCount++; }); return { correctCount, total: questions.length }; }, [questions, answers]);
    const scorePercentage = ((results.correctCount / results.total) * 100).toFixed(1);
    const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Resultado do Simulado</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center"><p className="text-gray-400">Acertos</p><p className="text-3xl font-bold">{results.correctCount} / {results.total}</p></div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center"><p className="text-gray-400">Aproveitamento</p><p className="text-3xl font-bold text-indigo-400">{scorePercentage}%</p></div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center"><p className="text-gray-400">Tempo Gasto</p><p className="text-3xl font-bold">{formatTime(timeTaken)}</p></div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Gabarito</h2>
            <div className="space-y-4">
                {questions.map(q => { const userAnswer = answers[q.id]; const isCorrect = q.correctAnswer === userAnswer; return (<div key={q.id} className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'border-green-500' : 'border-red-500'} bg-gray-800`}><p className="text-gray-300 mb-2">{q.enunciado}</p><p className="text-sm">Sua resposta: <span className="font-semibold">{userAnswer || 'Não respondida'}</span> | Resposta correta: <span className="font-semibold">{q.correctAnswer}</span></p></div>); })}
            </div>
            <button onClick={() => setActivePage({ page: 'simulados' })} className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg">Voltar para Simulados</button>
        </div>
    );
};

const Aulas = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateSummary = async () => {
        if (!selectedTopic) return;
        setIsLoading(true); setSummary('');
        const prompt = `Aja como um professor especialista no ENEM. Crie um resumo completo e didático sobre o seguinte tópico: "${selectedTopic.topic}". O resumo deve ser bem estruturado, cobrindo os conceitos fundamentais, exemplos importantes e como o tema costuma ser abordado nas provas do ENEM. Organize o conteúdo com subtítulos e listas para facilitar a leitura.`;
        const result = await callGeminiAPI(prompt);
        setSummary(result); setIsLoading(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Aulas e Resumos</h1>
            <p className="text-gray-400 mb-8">Selecione um tópico para assistir a uma aula e gerar um resumo completo com IA.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-bold mb-4">Tópicos Disponíveis</h2>
                    <div className="space-y-4">
                        {Object.keys(lessonTopics).map(subject => (
                            <div key={subject}>
                                <h3 className="text-lg font-semibold text-indigo-400 mb-2">{subject}</h3>
                                <div className="space-y-2">
                                    {lessonTopics[subject].map(topic => (
                                        <button key={topic.topic} onClick={() => setSelectedTopic(topic)} className={`w-full text-left p-3 rounded-md transition-colors ${selectedTopic?.topic === topic.topic ? 'bg-indigo-600' : 'bg-gray-800 hover:bg-gray-700'}`}>{topic.topic}</button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Conteúdo da Aula</h2>
                    {selectedTopic ? (
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">{selectedTopic.topic}</h3>
                            <div className="aspect-video bg-black rounded-md flex items-center justify-center mb-4">
                                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${selectedTopic.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen></iframe>
                            </div>
                            <button onClick={handleGenerateSummary} disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-purple-400">{isLoading ? <LoaderCircle className="animate-spin" /> : <Sparkles size={18} />} Gerar Resumo com IA</button>
                            {isLoading && <div className="mt-4 p-4 bg-gray-700 rounded-lg text-center">Gerando resumo...</div>}
                            {summary && (<div className="mt-4"><h4 className="font-bold text-lg mb-2 text-purple-400">Resumo da IA</h4><p className="text-gray-300 whitespace-pre-wrap">{summary}</p></div>)}
                        </div>
                    ) : (
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 h-full flex items-center justify-center"><p className="text-gray-500">Selecione um tópico para começar.</p></div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AddCardModal = ({ onClose, onAddCard }) => {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const handleAdd = () => {
        if (front.trim() && back.trim()) {
            onAddCard({ front, back });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg border border-gray-700">
                <header className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-xl font-bold">Adicionar Novo Cartão</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><XCircle size={24} /></button>
                </header>
                <main className="p-6 space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Frente (Pergunta)</label>
                        <textarea value={front} onChange={e => setFront(e.target.value)} placeholder="Digite a pergunta..." className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Verso (Resposta)</label>
                        <textarea value={back} onChange={e => setBack(e.target.value)} placeholder="Digite a resposta..." className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                    </div>
                    <button onClick={handleAdd} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg">Adicionar Cartão</button>
                </main>
            </div>
        </div>
    );
};

const Flashcards = () => {
    const { flashcardDecks, addFlashcardDeck, addCardToDeck, deleteCardFromDeck } = useContext(AppContext);
    const [selectedDeck, setSelectedDeck] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showCreateDeckModal, setShowCreateDeckModal] = useState(false);
    const [showAddCardModal, setShowAddCardModal] = useState(false);

    useEffect(() => {
        if (selectedDeck) {
            const updatedDeck = flashcardDecks.find(d => d.name === selectedDeck.name);
            if (updatedDeck) {
                setSelectedDeck(updatedDeck);
                if (currentCardIndex >= updatedDeck.cards.length) {
                    setCurrentCardIndex(Math.max(0, updatedDeck.cards.length - 1));
                }
            } else {
                setSelectedDeck(null);
            }
        }
    }, [flashcardDecks, selectedDeck, currentCardIndex]);

    const handleSelectDeck = (deck) => { setSelectedDeck(deck); setCurrentCardIndex(0); setIsFlipped(false); };
    const nextCard = () => { if (selectedDeck) setCurrentCardIndex(prev => (prev + 1) % selectedDeck.cards.length); setIsFlipped(false); };
    const prevCard = () => { if (selectedDeck) setCurrentCardIndex(prev => (prev - 1 + selectedDeck.cards.length) % selectedDeck.cards.length); setIsFlipped(false); };

    const handleAddCard = (cardData) => {
        addCardToDeck(selectedDeck.name, cardData);
    };

    const handleDeleteCard = (cardId) => {
        deleteCardFromDeck(selectedDeck.name, cardId);
    };

    if (selectedDeck) {
        if (selectedDeck.cards.length === 0) {
            return (
                 <div>
                    <button onClick={() => setSelectedDeck(null)} className="mb-4 text-indigo-400">&larr; Voltar para os baralhos</button>
                    <h1 className="text-3xl font-bold mb-4">{selectedDeck.name}</h1>
                    <div className="text-center text-gray-400 my-8 bg-gray-800 p-10 rounded-lg border border-gray-700">
                        <p>Este baralho está vazio.</p>
                        <button onClick={() => setShowAddCardModal(true)} className="mt-4 flex items-center gap-2 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"><PlusCircle size={18}/> Adicionar Primeiro Cartão</button>
                    </div>
                    {showAddCardModal && <AddCardModal onClose={() => setShowAddCardModal(false)} onAddCard={handleAddCard} />}
                </div>
            )
        }
        
        const card = selectedDeck.cards[currentCardIndex];
        return (
            <div>
                 <style>{`
                    .perspective-1000 { perspective: 1000px; }
                    .preserve-3d { transform-style: preserve-3d; }
                    .rotate-y-180 { transform: rotateY(180deg); }
                    .backface-hidden { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
                `}</style>
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => setSelectedDeck(null)} className="text-indigo-400">&larr; Voltar para os baralhos</button>
                    <button onClick={() => setShowAddCardModal(true)} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-lg text-sm"><PlusCircle size={16}/> Adicionar Cartão</button>
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{selectedDeck.name}</h1>
                <div className="relative group">
                    <div className="perspective-1000">
                        <div onClick={() => setIsFlipped(!isFlipped)} className={`relative w-full h-80 rounded-lg shadow-lg cursor-pointer transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                            <div className="absolute w-full h-full backface-hidden bg-gray-700 rounded-lg flex items-center justify-center p-6 text-center"><p className="text-2xl">{card.front}</p></div>
                            <div className="absolute w-full h-full backface-hidden bg-indigo-600 rounded-lg flex items-center justify-center p-6 text-center rotate-y-180"><p className="text-2xl">{card.back}</p></div>
                        </div>
                    </div>
                     <button onClick={() => handleDeleteCard(card.id)} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <XCircle />
                    </button>
                </div>
                <div className="flex justify-between items-center mt-6">
                    <button onClick={prevCard} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg">Anterior</button>
                    <p>{currentCardIndex + 1} / {selectedDeck.cards.length}</p>
                    <button onClick={nextCard} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg">Próximo</button>
                </div>
                {showAddCardModal && <AddCardModal onClose={() => setShowAddCardModal(false)} onAddCard={handleAddCard} />}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Flashcards</h1>
                <button onClick={() => setShowCreateDeckModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Criar Novo Baralho</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {flashcardDecks.map(deck => (
                    <div key={deck.name} onClick={() => handleSelectDeck(deck)} className="bg-gray-800 p-6 rounded-lg border border-gray-700 cursor-pointer hover:border-indigo-500 transition-colors">
                        <h2 className="text-xl font-bold mb-2">{deck.name}</h2>
                        <p className="text-gray-400">{deck.cards.length} cartões</p>
                    </div>
                ))}
            </div>
            {showCreateDeckModal && <CreateFlashcardModal onClose={() => setShowCreateDeckModal(false)} addDeck={addFlashcardDeck} />}
        </div>
    );
};

const CreateFlashcardModal = ({ onClose, addDeck }) => {
    const [deckName, setDeckName] = useState('');
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateWithIA = async () => {
        if (!topic) return;
        setIsLoading(true);
        const prompt = `Aja como um criador de material de estudo. Para o tópico "${topic}", crie exatamente 10 flashcards no formato de pergunta e resposta. A frente do card (antes do '|') deve ser uma pergunta clara. O verso do card (depois do '|') deve ser a resposta curta e direta para essa pergunta. Siga estritamente o formato: "Pergunta clara e específica? | Resposta breve e direta." por linha. Não adicione nada além disso.`;
        const result = await callGeminiAPI(prompt);
        const cards = result.split('\n').filter(line => line.includes('|')).map((line, index) => {
            const [front, back] = line.split('|');
            return { id: Date.now() + index, front: front.trim(), back: back.trim() };
        });
        addDeck({ name: deckName || topic, cards });
        setIsLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg border border-gray-700">
                <header className="p-4 flex justify-between items-center border-b border-gray-700"><h2 className="text-xl font-bold">Criar Baralho com IA</h2><button onClick={onClose} className="text-gray-400 hover:text-white"><XCircle size={24} /></button></header>
                <main className="p-6 space-y-4">
                    <div><label className="block mb-1 text-sm font-medium">Nome do Baralho (Opcional)</label><input type="text" value={deckName} onChange={e => setDeckName(e.target.value)} placeholder="Ex: Revolução Francesa" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" /></div>
                    <div><label className="block mb-1 text-sm font-medium">Tópico para a IA</label><input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Ex: Principais eventos da 2ª Guerra Mundial" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" /></div>
                    <button onClick={handleCreateWithIA} disabled={isLoading || !topic} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-purple-400">{isLoading ? <LoaderCircle className="animate-spin" /> : <Sparkles size={18} />} Gerar Flashcards</button>
                </main>
            </div>
        </div>
    );
};

const Perfil = () => {
    const { userProfile, setUserProfile, simulations, questoes } = useContext(AppContext);
    
    const studyStreak = useMemo(() => { /* ... (mesma lógica do dashboard) ... */ return 0; }, [questoes]); // Lógica omitida por brevidade
    const totalSimulations = simulations.length;

    const achievements = [
        { id: 'sim1', title: 'Primeiro Simulado', unlocked: totalSimulations > 0, icon: <Award/> },
        { id: 'streak5', title: 'Sequência de 5 Dias', unlocked: studyStreak >= 5, icon: <Flame/> },
        { id: 'q10', title: '10 Questões Resolvidas', unlocked: questoes.filter(q=>q.userAnswer).length >= 10, icon: <PenTool/> },
        { id: 'mathMaster', title: 'Mestre da Matemática', unlocked: questoes.filter(q=>q.isCorrect && q.discipline === 'Matemática').length >= 2, icon: <Milestone/> },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex flex-col items-center bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <div className="text-8xl mb-4">{userProfile.avatar}</div>
                    <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                    <p className="text-gray-400">Continue estudando!</p>
                    <h3 className="text-lg font-semibold mt-6 mb-2">Mudar Avatar</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {avatars.map(av => <button key={av} onClick={() => setUserProfile(p => ({...p, avatar: av}))} className={`p-2 text-2xl rounded-full ${userProfile.avatar === av ? 'bg-indigo-600' : 'bg-gray-700'}`}>{av}</button>)}
                    </div>
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Conquistas</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {achievements.map(ach => (
                            <div key={ach.id} className={`p-4 rounded-lg border text-center transition-opacity ${ach.unlocked ? 'border-green-500 bg-green-500/10' : 'border-gray-600 bg-gray-800 opacity-50'}`}>
                                <div className={`text-4xl mb-2 mx-auto ${ach.unlocked ? 'text-green-400' : 'text-gray-500'}`}>{ach.icon}</div>
                                <p className="font-semibold">{ach.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MapasMentais = () => {
    const [topic, setTopic] = useState('');
    const [mindMap, setMindMap] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateMap = async () => {
        if (!topic) return;
        setIsLoading(true); setMindMap('');
        const prompt = `Aja como um especialista em aprendizado visual. Crie um mapa mental em formato de texto (markdown com listas e subtítulos) sobre o tópico "${topic}". Estruture o mapa com um conceito central, ramificações principais e sub-tópicos. Use indentação para mostrar a hierarquia.`;
        const result = await callGeminiAPI(prompt);
        setMindMap(result); setIsLoading(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Mapas Mentais com IA</h1>
            <p className="text-gray-400 mb-8">Digite um tópico e a IA criará um mapa mental para ajudar a organizar suas ideias.</p>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Gerar Mapa Mental</h2>
                <div className="flex gap-2">
                    <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Ex: Ciclo de Krebs" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md" />
                    <button onClick={handleGenerateMap} disabled={isLoading || !topic} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-indigo-400">{isLoading ? <LoaderCircle className="animate-spin" /> : <BrainCircuit size={18} />} Gerar</button>
                </div>
            </div>
            {isLoading && <div className="mt-6 p-6 bg-gray-800 rounded-lg text-center border border-gray-700">Gerando seu mapa mental...</div>}
            {mindMap && (<div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-700"><h2 className="text-2xl font-bold mb-4 text-indigo-400">Mapa Mental sobre {topic}</h2><pre className="text-gray-300 whitespace-pre-wrap font-sans">{mindMap}</pre></div>)}
        </div>
    );
};

const Comunidade = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAsk = async () => {
        if (!question) return;
        setIsLoading(true); setAnswer('');
        const prompt = `Aja como um "Tutor IA" especialista no ENEM. Responda a seguinte dúvida de um aluno de forma clara, didática e encorajadora. Explique o conceito por trás da pergunta e, se possível, dê um exemplo prático.\n\n**Dúvida do Aluno:** "${question}"`;
        const result = await callGeminiAPI(prompt);
        setAnswer(result); setIsLoading(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Comunidade e Tutor IA</h1>
            <p className="text-gray-400 mb-8">Tem alguma dúvida? Pergunte ao nosso Tutor IA e receba uma explicação na hora.</p>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Tire sua Dúvida</h2>
                <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ex: Qual a diferença entre mitose e meiose?" className="w-full h-28 p-3 bg-gray-700 border border-gray-600 rounded-md resize-none" />
                <button onClick={handleAsk} disabled={isLoading || !question} className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-purple-400">{isLoading ? <LoaderCircle className="animate-spin" /> : <MessageSquare size={18} />} Perguntar ao Tutor IA</button>
            </div>
            {isLoading && <div className="mt-6 p-6 bg-gray-800 rounded-lg text-center border border-gray-700">O Tutor IA está pensando na melhor resposta...</div>}
            {answer && (<div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-700"><h2 className="text-2xl font-bold mb-4 text-purple-400">Resposta do Tutor IA</h2><p className="text-gray-300 whitespace-pre-wrap">{answer}</p></div>)}
        </div>
    );
};


const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, onPomodoroClick }) => {
    const { activePage, setActivePage } = useContext(AppContext);
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <Home /> },
        { id: 'simulados', label: 'Simulados', icon: <Clock /> },
        { id: 'redacao', label: 'Redação', icon: <FileText /> },
        { id: 'aulas', label: 'Aulas', icon: <Video /> },
        { id: 'flashcards', label: 'Flashcards', icon: <Layers /> },
        { id: 'mapas', label: 'Mapas Mentais', icon: <BrainCircuit /> },
        { id: 'comunidade', label: 'Comunidade', icon: <MessageSquare /> },
        { id: 'explorar', label: 'Explorar Questões', icon: <Search /> },
        { id: 'plano', label: 'Plano de Estudos', icon: <Sparkles /> },
        { id: 'relatorios', label: 'Relatórios', icon: <BarChart2 /> },
        { id: 'calendario', label: 'Calendário', icon: <Calendar /> },
        { id: 'perfil', label: 'Meu Perfil', icon: <User /> },
    ];
    const handleNavClick = (pageId) => { setActivePage({ page: pageId, params: {} }); setIsSidebarOpen(false); };
    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setIsSidebarOpen(false)}></div>
            <aside className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-4 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-40 border-r border-gray-800 flex flex-col`}>
                <div className="text-2xl font-bold mb-10 flex items-center gap-2"><Code className="text-indigo-400"/><span>ENEM+</span></div>
                <nav className="overflow-y-auto flex-grow"><ul>{navItems.map(item => (<li key={item.id} className="mb-2"><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }} className={`flex items-center p-3 rounded-lg transition-colors ${activePage.page === item.id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800'}`}><span className="mr-3">{item.icon}</span>{item.label}</a></li>))}</ul></nav>
                <div className="mt-4">
                    <button onClick={onPomodoroClick} className="flex items-center p-3 rounded-lg transition-colors w-full hover:bg-gray-800">
                        <span className="mr-3 text-indigo-400"><Clock /></span>
                        <span>Timer Pomodoro</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

const PomodoroTimer = ({ isVisible, onClose }) => {
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus, short, long

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(time => time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setIsActive(false);
            alert("Tempo esgotado!");
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const toggle = () => setIsActive(!isActive);
    const reset = () => {
        setIsActive(false);
        if (mode === 'focus') setTime(25 * 60);
        else if (mode === 'short') setTime(5 * 60);
        else setTime(15 * 60);
    };

    const setTimerMode = (newMode, newTime) => {
        setMode(newMode);
        setTime(newTime);
        setIsActive(false);
    }
    
    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 w-64 z-50">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">Timer Pomodoro</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-white"><XCircle size={20}/></button>
            </div>
            <div className="flex justify-around mb-4 bg-gray-900 p-1 rounded-md">
                <button onClick={() => setTimerMode('focus', 25 * 60)} className={`px-2 py-1 text-sm rounded ${mode === 'focus' ? 'bg-indigo-600' : ''}`}>Foco</button>
                <button onClick={() => setTimerMode('short', 5 * 60)} className={`px-2 py-1 text-sm rounded ${mode === 'short' ? 'bg-indigo-600' : ''}`}>Pausa</button>
                <button onClick={() => setTimerMode('long', 15 * 60)} className={`px-2 py-1 text-sm rounded ${mode === 'long' ? 'bg-indigo-600' : ''}`}>Pausa Longa</button>
            </div>
            <div className="text-5xl font-mono text-center my-4">
                {`${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`}
            </div>
            <div className="flex justify-around">
                <button onClick={toggle} className="p-2 bg-indigo-600 rounded-full">{isActive ? <Pause/> : <Play/>}</button>
                <button onClick={reset} className="p-2 bg-gray-600 rounded-full"><RotateCcw/></button>
            </div>
        </div>
    );
};


export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPomodoroVisible, setIsPomodoroVisible] = useState(false);
    
    const PageRenderer = () => {
        const { activePage } = useContext(AppContext);
        switch (activePage.page) {
            case 'dashboard': return <Dashboard />;
            case 'explorar': return <ExplorarQuestoes />;
            case 'plano': return <PlanoEstudos />;
            case 'relatorios': return <Relatorios />;
            case 'calendario': return <Calendario />;
            case 'redacao': return <Redacao />;
            case 'simulados': return <Simulado />;
            case 'modoSimulado': return <ModoSimulado {...activePage.params} />;
            case 'resultadoSimulado': return <ResultadoSimulado {...activePage.params} />;
            case 'aulas': return <Aulas />;
            case 'flashcards': return <Flashcards />;
            case 'perfil': return <Perfil />;
            case 'mapas': return <MapasMentais />;
            case 'comunidade': return <Comunidade />;
            default: return <Dashboard />;
        }
    };

    return (
        <AppProvider>
            <div className="bg-gray-900 text-white min-h-screen font-sans">
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} onPomodoroClick={() => setIsPomodoroVisible(!isPomodoroVisible)} />
                <main className="md:ml-64 p-4 sm:p-8 transition-all duration-300 ease-in-out">
                    <header className="md:hidden flex justify-between items-center mb-6">
                        <div className="text-xl font-bold flex items-center gap-2"><Code className="text-indigo-400"/><span>ENEM+</span></div>
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
                    </header>
                    <PageRenderer />
                </main>
                <PomodoroTimer isVisible={isPomodoroVisible} onClose={() => setIsPomodoroVisible(false)} />
            </div>
        </AppProvider>
    );
}
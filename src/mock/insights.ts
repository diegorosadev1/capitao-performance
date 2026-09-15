import { OperationalInsight, ExecutiveSummary, ChatMessage } from '../types';

export const MOCK_OPERATIONAL_INSIGHTS: OperationalInsight[] = [
  {
    id: 'ins-1',
    type: 'positivo',
    title: 'Faturamento em alta consistente',
    description: 'Faturamento atual (R$ 87.450) está 8,4% acima do mesmo período do mês anterior, puxado por forte procura às quintas e sextas.',
    metric: '+8,4%',
    change: 'vs. mês anterior',
    createdAt: 'Hoje às 08:30',
  },
  {
    id: 'ins-2',
    type: 'alerta',
    title: 'Dispersão de metas individuais',
    description: '3 profissionais estão abaixo de 80% da meta prevista para a data atual (Rafael, Felipe e Thiago).',
    metric: '3 barbeiros',
    change: '< 80% meta',
    actionableRecommendation: 'Revisar distribuição de agendamentos e focar na oferta guiada de combos.',
    createdAt: 'Hoje às 09:15',
  },
  {
    id: 'ins-3',
    type: 'positivo',
    title: 'Aumento expressivo no Ticket Médio',
    description: 'O ticket médio geral aumentou 5,2% nas últimas quatro semanas, alcançando R$ 98,03 com maior adesão à barboterapia.',
    metric: 'R$ 98,03',
    change: '+5,2% em 4 semanas',
    createdAt: 'Ontem',
  },
  {
    id: 'ins-4',
    type: 'projecao',
    title: 'Projeção de fechamento favorável',
    description: 'Se o ritmo atual de faturamento diário médio de R$ 3.802 se mantiver, a unidade deve fechar o mês em R$ 103.400 (103,4% da meta).',
    metric: 'R$ 103.400',
    change: 'Previsão final',
    createdAt: 'Atualizado em tempo real',
  },
];

export const MOCK_EXECUTIVE_SUMMARY: ExecutiveSummary = {
  headline: 'Operação acelerada com tendência de superação da meta mensal global (+3,4%), com oportunidade de equalização da equipe técnica.',
  situation: 'excelente',
  positivePoints: [
    'Crescimento de faturamento de +8,4% versus mês anterior (R$ 87.450 realizados até o momento).',
    'Ticket médio consolidado em R$ 98,03 (+5,2% nas últimas quatro semanas), impulsionado por combos corte + barba.',
    'Mateus Silveira e Rodrigo Fontes já superaram ou estão a poucos atendimentos de atingir 100% da meta.',
    'Alta taxa de satisfação média dos clientes aferida em 4.87 / 5.0 estrelas.',
  ],
  attentionPoints: [
    'Rafael Toledo, Felipe Santana e Thiago Mendes necessitam de ritmo diário reforçado para não fecharem abaixo de 80%.',
    'Volume de agendamentos no início da semana (segunda e terça) opera com 35% de ociosidade nas cadeiras.',
    '7 clientes habituais completaram 60+ dias sem retorno (risco de churn detectado no CRM).',
    'A venda de produtos home care representa 6,8% do faturamento, abaixo do benchmark de 12% da rede.',
  ],
  recommendations: [
    {
      id: 'rec-1',
      title: 'Ajuste de Pacing para Rafael Toledo',
      description: 'Rafael está 19,7% abaixo da meta e precisa aumentar o faturamento diário em aproximadamente R$ 210 para alcançar o objetivo. Sugerir combo toalha quente em todo corte de tesoura.',
      impact: 'alto',
      professionalName: 'Rafael Toledo',
    },
    {
      id: 'rec-2',
      title: 'Campanha de Reativação CRM (Risco de Churn)',
      description: 'Disparar convite personalizado de retorno via WhatsApp para os clientes sem agendamento há mais de 45 dias com cortesia de hidratação ou café premium.',
      impact: 'alto',
    },
    {
      id: 'rec-3',
      title: 'Treinamento de Upselling de Produtos Home Care',
      description: 'Realizar workshop prático de 20 minutos com a equipe júnior sobre como finalizar o penteado com pomada e oferecer o frasco no caixa.',
      impact: 'medio',
    },
    {
      id: 'rec-4',
      title: 'Preenchimento de Horários Ociosos (Segunda & Terça)',
      description: 'Criar condição especial ou pontuação em dobro no clube de vantagens para atendimentos realizados entre 10h e 15h no início da semana.',
      impact: 'medio',
    },
  ],
};

export const MOCK_AI_RESPONSES: Record<string, { text: string; metricsData?: { label: string; value: string }[] }> = {
  'como estamos neste mes': {
    text: 'A unidade Bom Retiro está operando com forte tração neste mês de Setembro. O faturamento acumulado é de **R$ 87.450**, representando **87,4%** da meta global de R$ 100.000. O ritmo diário atual (R$ 3.802/dia) indica fechamento estimado em **R$ 103.400**, superando o teto orçado em +3,4%. O ticket médio atingiu R$ 98,03 (+5,2%).',
    metricsData: [
      { label: 'Faturamento', value: 'R$ 87.450' },
      { label: 'Meta Atingida', value: '87,4%' },
      { label: 'Projeção', value: 'R$ 103.400' },
      { label: 'Ticket Médio', value: 'R$ 98,03' },
    ],
  },
  'quem esta abaixo da meta': {
    text: 'Identifiquei 3 profissionais que demandam atenção especial para não comprometerem seu resultado individual:\n\n1. **Thiago Mendes**: atingiu 62,0% da meta (R$ 6.200 de R$ 10.000). Necessita de **R$ 540/dia** até o fechamento.\n2. **Felipe Santana**: atingiu 73,6% da meta (R$ 8.100 de R$ 11.000). Necessita de **R$ 415/dia**.\n3. **Rafael Toledo**: atingiu 80,3% da meta (R$ 11.250 de R$ 14.000). Necessita de **R$ 210 a R$ 390/dia**.\n\nRecomendo repassar a esses profissionais os encaixes de clientes novos na recepção.',
    metricsData: [
      { label: 'Thiago Mendes', value: '62,0% (Falta R$ 3.800)' },
      { label: 'Felipe Santana', value: '73,6% (Falta R$ 2.900)' },
      { label: 'Rafael Toledo', value: '80,3% (Falta R$ 2.750)' },
    ],
  },
  'qual profissional mais evoluiu': {
    text: 'O destaque absoluto em evolução percentual neste mês é **Felipe Santana (Lipão)** com **+15,8% de crescimento** sobre o ciclo passado. Já em termos de volume bruto e faturamento, **Mateus Silveira** manteve a liderança isolada crescendo +14,2% e batendo a meta com folga (R$ 18.450 faturados). Em ticket médio, **Rodrigo Fontes** lidera com R$ 109,45 por cliente.',
    metricsData: [
      { label: 'Maior Crescimento %', value: 'Felipe Santana (+15,8%)' },
      { label: 'Líder em Receita', value: 'Mateus Silveira (R$ 18.450)' },
      { label: 'Maior Ticket Médio', value: 'Rodrigo Fontes (R$ 109,45)' },
    ],
  },
  'o que devo discutir na reuniao': {
    text: 'Sugiro a seguinte pauta executiva de 30 minutos para a reunião de alinhamento com a equipe:\n\n1. **Reconhecimento**: Celebrar os resultados de Mateus Silveira e Rodrigo Fontes que puxaram o recorde da barbearia.\n2. **Plano de Resgate de Metas**: Estratégia de upsell para Rafael, Felipe e Thiago (oferecer toalha quente e barba para clientes que pediram apenas corte).\n3. **Campanha Home Care**: Apresentar comissão diferenciada para venda de pomadas e tônicos, aproveitando que temos 140 unidades em estoque.\n4. **Preenchimento de Horários**: Dinâmica de agendamento ativo para segunda e terça.',
    metricsData: [
      { label: 'Foco 1', value: 'Reconhecimento e Pódio' },
      { label: 'Foco 2', value: 'Equalização de Metas' },
      { label: 'Foco 3', value: 'Venda de Produtos' },
    ],
  },
  'qual unidade esta com pior desempenho': {
    text: 'Comparando as três unidades em operação da rede:\n\n1. **Jardins**: Desempenho excelente (R$ 94.200 / R$ 105.000 - 89,7% da meta, ticket R$ 112,50).\n2. **Bom Retiro**: Desempenho muito forte (R$ 87.450 / R$ 100.000 - 87,4% da meta, ticket R$ 98,03).\n3. **Alphaville**: Desempenho mais comedido (R$ 68.150 / R$ 80.000 - 85,2% da meta, crescimento de +4,8% vs +12,1% dos Jardins).\n\nA unidade Alphaville opera com 5 barbeiros e possui potencial de expandir a agenda aos sábados.',
    metricsData: [
      { label: '1º Jardins', value: '89,7% (Ticket R$ 112)' },
      { label: '2º Bom Retiro', value: '87,4% (Ticket R$ 98)' },
      { label: '3º Alphaville', value: '85,2% (Ticket R$ 104)' },
    ],
  },
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'ia',
    text: 'Olá, Carlos! Sou o motor de inteligência analítica do **Capitão Performance**. Estou processando todos os dados de faturamento, atendimentos, metas e clientes da sua rede em tempo real. O que você gostaria de analisar hoje?',
    timestamp: '09:00',
    suggestions: [
      'Como estamos neste mês?',
      'Quem está abaixo da meta?',
      'Qual profissional mais evoluiu?',
      'O que devo discutir na reunião?',
      'Qual unidade está com pior desempenho?',
    ],
  },
];

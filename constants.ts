
import { Party, Candidate, AuditLog } from './types';

export const PARTIES: Party[] = [
  { acronym: "MDB", name: "Movimento Democrático Brasileiro" },
  { acronym: "PDT", name: "Partido Democrático Trabalhista" },
  { acronym: "PT", name: "Partido dos Trabalhadores" },
  { acronym: "PCdoB", name: "Partido Comunista do Brasil" },
  { acronym: "PSB", name: "Partido Socialista Brasileiro" },
  { acronym: "PSDB", name: "Partido da Social Democracia Brasileira" },
  { acronym: "AGIR", name: "Agir" },
  { acronym: "MOBILIZA", name: "Mobilização Nacional" },
  { acronym: "CIDADANIA", name: "Cidadania" },
  { acronym: "PV", name: "Partido Verde" },
  { acronym: "AVANTE", name: "Avante" },
  { acronym: "PP", name: "Progressistas" },
  { acronym: "PSTU", name: "Partido Socialista dos Trabalhadores Unificado" },
  { acronym: "PCB", name: "Partido Comunista Brasileiro" },
  { acronym: "PRTB", name: "Partido Renovador Trabalhista Brasileiro" },
  { acronym: "DC", name: "Democracia Cristã" },
  { acronym: "PCO", name: "Partido da Causa Operária" },
  { acronym: "PODE", name: "Podemos" },
  { acronym: "REPUBLICANOS", name: "Republicanos" },
  { acronym: "PSOL", name: "Partido Socialismo e Liberdade" },
  { acronym: "PL", name: "Partido Liberal" },
  { acronym: "PSD", name: "Partido Social Democrático" },
  { acronym: "SOLIDARIEDADE", name: "Solidariedade" },
  { acronym: "NOVO", name: "Partido Novo" },
  { acronym: "REDE", name: "Rede Sustentabilidade" },
  { acronym: "PMB", name: "Partido da Mulher Brasileira" },
  { acronym: "UP", name: "Unidade Popular" },
  { acronym: "UNIÃO", name: "União Brasil" },
  { acronym: "PRD", name: "Partido da Renovação Democrática" },
];

export const MOCK_CANDIDATES: Candidate[] = [
    {
        id: 1,
        slug: 'ana-silva',
        name: 'Ana Silva',
        photoUrl: 'https://picsum.photos/id/237/400/400',
        party: PARTIES[2], // PT
        city: 'São Paulo',
        state: 'SP',
        description: 'Lutando por uma educação de qualidade e mais oportunidades para todos os cidadãos de São Paulo.',
        campaignCnpj: '12.345.678/0001-90',
        paymentStatus: 'Ativo',
        tseStatus: 'Deferida',
        donations: [
            { id: 101, donorName: 'Carlos Pereira', donorCpf: '111.***.***-11', amount: 150, paymentMethod: 'PIX', date: '2024-07-20T10:00:00Z', receiptId: 'REC-2026-101' },
            { id: 102, donorName: 'Mariana Costa', donorCpf: '222.***.***-22', amount: 75, paymentMethod: 'Cartão de Crédito', date: '2024-07-21T14:30:00Z', receiptId: 'REC-2026-102' },
        ],
    },
    {
        id: 2,
        slug: 'bruno-santos',
        name: 'Bruno Santos',
        photoUrl: 'https://picsum.photos/id/238/400/400',
        party: PARTIES[5], // PSDB
        city: 'Rio de Janeiro',
        state: 'RJ',
        description: 'Compromisso com a segurança pública e o desenvolvimento econômico do Rio de Janeiro.',
        campaignCnpj: '23.456.789/0001-80',
        paymentStatus: 'Ativo',
        tseStatus: 'Deferida com Recurso',
        donations: [
            { id: 201, donorName: 'Fernanda Lima', donorCpf: '333.***.***-33', amount: 200, paymentMethod: 'Boleto', date: '2024-07-19T09:00:00Z', receiptId: 'REC-2026-201' },
        ],
    },
    {
        id: 3,
        slug: 'kleyton-cruz',
        name: 'Kleyton Cruz',
        photoUrl: 'https://picsum.photos/id/239/400/400',
        party: PARTIES[20], // PL
        city: 'Belo Horizonte',
        state: 'MG',
        description: 'Foco na saúde e na infraestrutura para melhorar a vida dos mineiros.',
        campaignCnpj: '34.567.890/0001-70',
        paymentStatus: 'Pendente',
        tseStatus: 'Aguardando',
        donations: [
            { id: 301, donorName: 'Ricardo Alves', donorCpf: '444.***.***-44', amount: 50, paymentMethod: 'PIX', date: '2024-07-22T11:20:00Z', receiptId: 'REC-2026-301' },
            { id: 302, donorName: 'Juliana Martins', donorCpf: '555.***.***-55', amount: 300, paymentMethod: 'PIX', date: '2024-07-22T18:00:00Z', receiptId: 'REC-2026-302' },
        ],
    },
    {
        id: 4,
        slug: 'claudia-melo',
        name: 'Cláudia Melo',
        photoUrl: 'https://picsum.photos/id/240/400/400',
        party: PARTIES[19], // PSOL
        city: 'Salvador',
        state: 'BA',
        description: 'Defendendo a cultura, o meio ambiente e os direitos humanos na Bahia.',
        campaignCnpj: '45.678.901/0001-60',
        paymentStatus: 'Ativo',
        tseStatus: 'Indeferida',
        donations: [
             { id: 401, donorName: 'Roberto Dias', donorCpf: '777.***.***-77', amount: 90, paymentMethod: 'Boleto', date: '2024-07-23T15:45:00Z', receiptId: 'REC-2026-401' },
        ],
    },
     {
        id: 5,
        slug: 'rodrigo-neves',
        name: 'Rodrigo Neves',
        photoUrl: 'https://picsum.photos/id/241/400/400',
        party: PARTIES[10], // AVANTE
        city: 'Curitiba',
        state: 'PR',
        description: 'Inovação e tecnologia para um futuro mais próspero para Curitiba.',
        campaignCnpj: '56.789.012/0001-50',
        paymentStatus: 'Rejeitado',
        tseStatus: 'Inapto',
        donations: [],
    },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
    { id: 1, timestamp: '20/11/2025, 19:20:31', user: 'admin@valeapoio.com', action: 'Pagamento Confirmado', details: 'Candidato: Ana Silva (ID: 1)' },
    { id: 2, timestamp: '20/11/2025, 19:15:31', user: 'admin@valeapoio.com', action: 'Consulta TSE', details: 'Candidato: Bruno Santos, Resultado: Deferida com Recurso' },
    { id: 3, timestamp: '20/11/2025, 18:30:10', user: 'system', action: 'Backup Automático', details: 'Backup diário do banco de dados realizado com sucesso.' },
    { id: 4, timestamp: '20/11/2025, 14:10:05', user: 'candidato@email.com', action: 'Solicitação de Saque', details: 'Valor: R$ 3.500,00 - Protocolo: #998877' },
];

export const TERMS_CONTENT = `
<h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Termos e Condições</h1>
<p class="text-lg text-gray-600 mb-4">
  CONTRATO DE PRESTAÇÃO DE SERVIÇO DE ARRECADAÇÃO VIA FINANCIAMENTO COLETIVO PARA CAMPANHA ELEITORAL DE 2026
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">I – DAS PARTES</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  De um lado, a parte <strong>CONTRATANTE</strong>, pessoa física, nominada e qualificada na ficha cadastral anexa a este instrumento, candidato às eleições 2026, de outro lado, pessoa jurídica <strong>VALEAPOIO.COM.BR LTDA</strong>, inscrita no CNPJ nº 02.345.678/0001-90, doravante denominado de parte <strong>CONTRATADA</strong>, ajustam entre si, mediante as cláusulas e condições que seguem.
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">II - DA FORMA</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  A prestação de serviços realizar-se-á através do site www.valeapoio.com.br, que fará o intermédio do financiamento coletivo de campanhas eleitorais, de acordo com a Resolução do Tribunal Superior Eleitoral de nº 23.607/2019, em seu artigo 22 e do artigo 23, § 4º, IV da Lei 9.504.
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">III – DO CADASTRO PRÉVIO NO TRIBUNAL SUPERIOR ELEITORAL</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  A contratada está com o cadastro deferido pelo Tribunal Superior Eleitoral, portanto, autorizada a efetuar a intermediação de doações financeiras para fins eleitorais, conforme informações dispostas no sítio eletrônico do TSE no link: <a href="https://financiamentocoletivo.tse.jus.br/publico/lista-empresa" target="_blank" class="text-primary hover:underline">https://financiamentocoletivo.tse.jus.br/publico/lista-empresa</a>
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">IV - FINALIDADE</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  A intermediação financeira de doações tem como finalidade única e específica arrecadar recursos financeiros para campanha eleitoral referente às eleições 2026, na qual o CONTRATANTE concorrerá.
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">V – FONTES E LIMITES DE DOAÇÃO</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  Só podem realizar doações a pessoa física com o CPF regular e ativo que não exerce atividade decorrente de permissão ou concessão de serviço público e que os recursos utilizados para doação não sejam de origem estrangeira. O limite total de doação, ou seja por toda a campanha e para todos os candidatos, é de 10% (dez porcento) dos rendimentos brutos auferidos no Imposto de Renda da pessoa no ano anterior ao da eleição. Já o limite diário para doações pela plataforma para um mesmo candidato é de até R$ 1.064,09 (mil e sessenta e quatro reais), sendo bloqueada pela plataforma a tentativa de doação superior em um mesmo dia, o doador poderá efetuar diversas doações respeitados o limite diário e deverá o doador observar o seu limite total de doação. A plataforma não solicitará a cópia de imposto de renda do doador para verificar a capacidade de doação do mesmo. A responsabilidade pelas informações fornecidas para preenchimento do cadastro do doador é única e exclusiva do doador, cabendo em um segundo momento ao contratante a verificação de sua legalidade. A doação acima do limite de 10% (dez por cento) dos rendimentos brutos auferidos no ano anterior ao da eleição sujeita o doador ao pagamento de multa no valor de até 100% (cem por cento) da quantia em excesso, sem prejuízo de o donatário responder por abuso do poder econômico.
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">VI - TRANSFERÊNCIA DOS VALORES ARRECADADOS</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  Os valores doados ficarão sob custódia da Contratada e somente serão transferidos para a conta de específica de campanha do Contratante após solicitação expressa e cumpridos os seguintes requisitos: a) requerimento do registro de candidatura; b) inscrição no Cadastro Nacional da Pessoa Jurídica (CNPJ); c) abertura de conta bancária específica destinada a registrar a movimentação financeira de campanha;
</p>
<p class="text-gray-700 leading-relaxed mb-4">
  A documentação acima descrita deve ser comunicada à Contratada via área restrita do candidato junto à plataforma Vale Apoio para que sejam registradas e e subsequente(s) repasse(s) dos valores arrecadados. Caso o Contratante não obter registro junto ao TSE ou desistir da candidatura, deverá comunicar à contratada e os recursos arrecadados serão devolvidos aos respectivos doadores após descontadas todas as taxas referentes ao processamento das transações. Os valores doados estarão disponíveis para repasse ao contratante em no máximo 30 dias após a operação quando a doação for feita via cartão de crédito, e em no máximo 3 dias após a operação quando a doação for feita via cartão de débito, boleto bancário, transferência bancária ou PIX. Em caso de solicitação de antecipação imediata dos repasses será cobrada uma taxa de 3% em cima do valor a ser antecipado. As transferências para a conta de campanha do contratante serão realizadas no período eleitoral, mediante a solicitação na área restrita do candidato junto na plataforma. A primeira operação será sem custos, após, ensejará a cobrança da taxa de R$ 5,00 descontado do montante transferido. O prazo máximo para a transferência é de 48 horas.
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">VII - CUSTOS</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  A plataforma Vale Apoio cobra taxa de adesão de R$ 189,00 (cento e oitenta e nove reais), podendo, a seu critério, conceder descontos e isenções.
</p>
<p class="text-gray-700 leading-relaxed mb-4">
  <strong>TARIFA DE INTERMEDIAÇÃO:</strong> Doações, de todas as suas formas, se por cartão de crédito – 3,65% sobre o valor doado. Doações por boleto bancário – 3,65% sobre o valor doado. Doações por pix – 3,65% sobre o valor doado.
</p>
<p class="text-gray-700 leading-relaxed mb-4">
  Valor decorrente das doações, incidente sobre o valor total doado, descontado pela contratada antes do repasse ao contratante são considerados gastos de campanha para fins de prestação de contas.
</p>
<p class="text-gray-700 leading-relaxed mb-4">
  <strong>TAXA DE DEVOLUÇÃO:</strong> Nos casos em que seja necessária a devolução do valor doado aos doadores serão descontadas as taxas acima descritas referentes ao processamento da transação, e, ainda, o valor de R$ 5,00 referente a custas bancárias por cada transação cancelada.
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">VIII - CAMPANHAS DE ARRECADAÇÃO</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  A Contratada não promove campanhas de arrecadação para os candidatos. Os serviços oferecidos compreendem tão somente a disponibilização dos meios tecnológicos para proporcionar o arranjo de pagamento via cartões de crédito, boletos bancários, transferência bancária e PIX e a montagem da página pessoal do contratante.
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">IX - RESPONSABILIDADES</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  Ficam isentas as partes deste contrato de responsabilização por fraudes ou erros quanto aos erros de limites cometidos exclusivamente pelo doador no momento da doação. Os limites e requisitos para efetuar a doação são claramente explicitados ao doador na plataforma antes de efetuar qualquer operação. A contratada não se responsabiliza por abusos, excessos ou desvios ocorridos em atos de propaganda e campanhas de arrecadação promovidas pelo contratante. Não há ingerência ou interferência da plataforma nas campanhas de arrecadação. A contratada não se responsabiliza por prejuízos eventualmente causados aos doadores no caso de devolução dos valores doados por motivos de desistência do pretenso candidato de registrar a sua candidatura ou não apresentação da mesma pelo partido político.
</p>
<p class="text-gray-700 leading-relaxed mb-4">A Contratada é responsável pelo sistema que desenvolve as seguintes funcionalidades:</p>
<ul class="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-700">
  <li>Identificação de cada um dos doadores, com o nome completo e o número de inscrição no cadastro de pessoas físicas (CPF), o valor das quantias doadas individualmente, forma de pagamento e as datas das respectivas doações;</li>
  <li>Disponibilização na página do contratante da lista com identificação dos doadores e das respectivas quantias doadas (atualizada instantaneamente a cada nova doação);</li>
  <li>Emissão de recibo ao doador relativo a cada doação realizada;</li>
  <li>Envio para a Justiça Eleitoral e para o candidato de todas as informações relativas a cada doação no momento da transferência de recursos para o candidato;</li>
</ul>
<p class="text-gray-700 leading-relaxed mb-4">
  Por fim, de acordo com a Lei Geral de Proteção de dados e ainda com a legislação Eleitoral, fica a contratada autorizada a consolidar as informações necessárias do contratante e dos doadores para cumprir o que preceitua a legislação vigente.
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">X – DO CHARGEBACK (pedido de devolução de doações via cartão de crédito)</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  Em eventual solicitação de Chargeback (devolução de valores doados via cartão de crédito) o contratante tem ciência que eventual devolução será considerada como não realizada e os valores envolvidos serão retidos ou devem ser devolvidos a plataforma para a realização de devolução. A critério do contratante, esse pode entrar em contato direto com o doador que realizar a solicitação de devolução para reverter ou sanar quaisquer dúvidas, não ficando a contratada obrigada ao repasse até que seja considerada válida pela operadora de cartões.
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">XI - REGRAS DO BANCO CENTRAL - ARRANJO DE PAGAMENTO</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  A Resolução nº 4.282/2013 e o artigo 2º, II da Carta Circular nº 3.682/2013, ambas do Banco Central do Brasil, não são todos os arranjos de pagamento que estão sujeitos à regulação do BACEN, mas apenas os arranjos que apresentarem números superiores a R$ 500 milhões de valor total das transações, acumulado nos últimos doze meses, ou 25 milhões de transações, acumuladas nos últimos doze meses, fato esse que não se aplicará a plataforma Vale Apoio, posto que a plataforma não vislumbra a operacionalização de mais de 25 milhões de operações no corrente ano e, muito menos, a movimentação de valores superiores a R$500 milhões, não há necessidade de autorização do Banco Central. Não obstante, a contratada, empresa não integrante do Sistema de Pagamentos Brasileiro, irá acompanhar a evolução dos limites alhures, e se verificar a superação de qualquer desses limites, deverá: I - apresentar pedido de autorização no prazo de trinta dias, contados a partir da data de superação; II - comunicar às instituições que participam do arranjo, por meio de carta e de publicação em jornal de circulação compatível com a abrangência do serviço de pagamento disciplinado pelo arranjo, quanto à necessidade de solicitarem autorização para funcionamento, quando cabível, nos termos da Circular nº 3.683/2013.
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">XII - BANCO DE DADOS DE DOADORES</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  Todas as informações do banco de dados formado a partir dos dados fornecidos pelos doadores quando do cadastro necessário para a habilitação e doação na plataforma são de propriedade da parte contratante, que fica responsável por resguardar as informações protegidas por sigilo. A contratada se compromete a repassar ao contratante os dados fornecidos pelos doadores no ato do cadastro, bem como as informações dos valores doados por cada um deles pela plataforma, ainda, dentro das melhores práticas possíveis no cenário atual.
</p>

<h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">XIII - DISPOSIÇÕES FINAIS</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  A contratada não tem qualquer responsabilidade por doações recebidas de fontes vedadas e ou acima do limite. A Contratada se reserva o direito de alterar os termos os Contratos, bem como de introduzir modificações nos Serviços e demais funcionalidades disponibilizadas a qualquer tempo, sempre visando a melhor prestação possível do serviço, mediante notificação aos contratantes por e-mail. Fica o endereço eletrônico admin@valeapoio.com.br para maiores informações e esclarecimento de eventuais dúvidas sobre as disposições destes termos ou demais funcionalidades.
  <br />
  contato@valeapoio.com.br
</p>
`;

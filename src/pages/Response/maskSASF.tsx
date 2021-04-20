import React, {
  useState, useEffect, useContext,
} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import {
  withStyles, Theme,
} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import { Typography } from '@material-ui/core';
import MoonLoader from 'react-spinners/MoonLoader';

import {
  FirstSection, MyButton, Section, LoaderBody,
} from './styles';

import TableFourColumns from '../../components/TableFourColumns';
import TableEigthColumns from '../../components/TableEightColumns';
import TableTwoColumns from '../../components/TableTwoColumns';
import ListComponent from '../../components/ListComponent';

import { infoContext } from '../../providers/reactContext';

const StyledBreadcrumb = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[900],
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 15,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
  },
}))(Chip) as typeof Chip;

function createData(
  title: string,
  attribute1: number,
  attribute2: number,
  attribute3: number,
  attribute4: number,
  attribute5: number,
  attribute6: number,
  attribute7: number,
) {
  return {
    title, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6, attribute7,
  };
}

const atendidosMesHeaders = [
  '',
  'Nº de famílias',
];

const sexoRacaCorHeaders = [
  'Branca',
  'Preta',
  'Parda',
  'Amarela',
  'Indígena',
  'Não informada',
  'Total',
];

const motivoSaidaHeaders = ['', 'Quantidade'];

const familiasAtendidasHeaders = ['', 'Nº de famílias'];

const familiasVulnerabilidadeHeaders = ['', 'Nº de famílias'];

const demandaReprimidaHeaders = ['', 'Nº de adolescentes'];

const familiasInsumosHeaders = ['', 'N° de famílias'];

const encaminhamentosHeaders = ['Serviços', 'Encaminhamentos'];

const atendimentosRemotosHeaders = ['', 'Atendimentos Remotos'];

const atendimentosRemotosTiposHeaders = ['Tipos', ''];

const atendimentosRemotosFamiliaSemanaHeaders = ['Semanas', 'Nº de famílias'];

const Response:any = () => {
  const [services, setServices]:any = useState([]);
  const { context, setContext }:any = useContext(infoContext);
  const {
    nomeSAS, mes, serviceName, token, tipologia,
  } = context;
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const fetchUserProfiles = () => {
    axios.get(`http://localhost:8080/devolutivas/${nomeSAS}/${mes}/${token}/${tipologia}`).then((res) => {
      setServices(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const atendidosMes = [
    createData('Nº total de famílias atendidas pelo serviço no mês', services['sasfinfosnecessarias[famatend]'], 1, 1, 1, 1, 1, 1),
    createData('Nº de famílias atendidas presencialmente no mês', services['sasfinfosnecessarias[fampresencial]'], 1, 1, 1, 1, 1, 1),
    createData('Nº de famílias atendidas remotamente no mês', services['sasfinfosnecessarias[famremoto]'], 1, 1, 1, 1, 1, 1),
    createData('Nº de visitas domiciliares realizadas no mês', services['sasfinfosnecessarias[famvisitas]'], 1, 1, 1, 1, 1, 1),
    createData('Total', parseInt(services['sasfinfosnecessarias[famvisitas]'], 10)
                      + parseInt(services['sasfinfosnecessarias[famremoto]'], 10)
                      + parseInt(services['sasfinfosnecessarias[fampresencial]'], 10)
                      + parseInt(services['sasfinfosnecessarias[famatend]'], 10),

    parseInt(services['cjfluxopessoasatend[15a17m_presmesatual]'], 10)
    + parseInt(services['cjfluxopessoasatend[15a17f_presmesatual]'], 10),

    parseInt(services['cjfluxopessoasatend[15a17m_remmesatual]'], 10)
    + parseInt(services['cjfluxopessoasatend[15a17f_remmesatual]'], 10),
    1, 1, 1, 1),
  ];

  const sexoRacaCor = [
    createData('Feminino',
      services['sasfracasexo[fem_branc]'],
      services['sasfracasexo[fem_preto]'],
      services['sasfracasexo[fem_pardo]'],
      services['sasfracasexo[fem_amarelo]'],
      services['sasfracasexo[fem_indigena]'],
      services['sasfracasexo[fem_naoinf]'],
      parseInt(services['sasfracasexo[fem_branc]'], 10)
      + parseInt(services['sasfracasexo[fem_preto]'], 10)
      + parseInt(services['sasfracasexo[fem_pardo]'], 10)
      + parseInt(services['sasfracasexo[fem_amarelo]'], 10)
      + parseInt(services['sasfracasexo[fem_indigena]'], 10)
      + parseInt(services['sasfracasexo[fem_naoinf]'], 10)),
    createData('Masculino',
      services['sasfracasexo[masc_branc]'],
      services['sasfracasexo[masc_preto]'],
      services['sasfracasexo[masc_pardo]'],
      services['sasfracasexo[masc_amarelo]'],
      services['sasfracasexo[masc_indigena]'],
      services['sasfracasexo[masc_naoinf]'],
      parseInt(services['sasfracasexo[masc_branc]'], 10)
      + parseInt(services['sasfracasexo[masc_preto]'], 10)
      + parseInt(services['sasfracasexo[masc_pardo]'], 10)
      + parseInt(services['sasfracasexo[masc_amarelo]'], 10)
      + parseInt(services['sasfracasexo[masc_indigena]'], 10)
      + parseInt(services['sasfracasexo[masc_naoinf]'], 10)),
    createData('Total Geral',
      parseInt(services['sasfracasexo[masc_branc]'], 10)
      + parseInt(services['sasfracasexo[fem_branc]'], 10),
      parseInt(services['sasfracasexo[masc_preto]'], 10)
      + parseInt(services['sasfracasexo[fem_preto]'], 10),
      parseInt(services['sasfracasexo[masc_pardo]'], 10)
      + parseInt(services['sasfracasexo[fem_pardo]'], 10),
      parseInt(services['sasfracasexo[masc_amarelo]'], 10)
      + parseInt(services['sasfracasexo[fem_amarelo]'], 10),
      parseInt(services['sasfracasexo[masc_indigena]'], 10)
      + parseInt(services['sasfracasexo[fem_indigena]'], 10),
      parseInt(services['sasfracasexo[masc_naoinf]'], 10)
      + parseInt(services['sasfracasexo[fem_naoinf]'], 10),
      parseInt(services['sasfracasexo[masc_branc]'], 10)
      + parseInt(services['sasfracasexo[fem_branc]'], 10)
      + parseInt(services['sasfracasexo[masc_preto]'], 10)
      + parseInt(services['sasfracasexo[fem_preto]'], 10)
      + parseInt(services['sasfracasexo[masc_pardo]'], 10)
      + parseInt(services['sasfracasexo[fem_pardo]'], 10)
      + parseInt(services['sasfracasexo[masc_amarelo]'], 10)
      + parseInt(services['sasfracasexo[fem_amarelo]'], 10)
      + parseInt(services['sasfracasexo[masc_indigena]'], 10)
      + parseInt(services['sasfracasexo[fem_indigena]'], 10)
      + parseInt(services['sasfracasexo[masc_naoinf]'], 10)
      + parseInt(services['sasfracasexo[fem_naoinf]'], 10)),
  ];

  const motivoSaida = [
    createData('Recusa/desistência do acompanhamento',
      services['sasfsaida[recusa_qtd]'],
      1,
      1, 1, 1, 1, 1),
    createData('Mudança de endereço',
      services['sasfsaida[mudanca_qtd]'],
      1,
      1, 1, 1, 1, 1),
    createData('Alcance dos objetivos',
      services['sasfsaida[objetivos_qtd]'],
      1,
      1, 1, 1, 1, 1),
    createData('Total',
      parseInt(services['sasfsaida[mudanca_qtd]'], 10)
      + parseInt(services['sasfsaida[recusa_qtd]'], 10)
      + parseInt(services['sasfsaida[objetivos_qtd]'], 10),
      1,
      1, 1, 1, 1, 1),
  ];

  const familiasAtendidas = [
    createData('Nº de famílias atendidas presencialmente no mês', services['cjatendfam[cjfampres]'], 1, 1, 1, 1, 1, 1),
    createData('Nº de famílias acompanhadas de forma remota no mês', services['cjatendfam[cjfamrem]'], 1, 1, 1, 1, 1, 1),
    createData('Nº total de famílias atendidas no mês', services['cjatendfam[cjfamtotal]'], 1, 1, 1, 1, 1, 1),
  ];

  const familiasVulnerabilidade = [
    createData('Conflitos', services['sasfvulnerab[conflit]'], 1, 1, 1, 1, 1, 1),
    createData('Preconceitos/discriminação', services['sasfvulnerab[Precon]'], 1, 1, 1, 1, 1, 1),
    createData('Abandono', services['sasfvulnerab[aband]'], 1, 1, 1, 1, 1, 1),
    createData('Apartação', services['sasfvulnerab[apart]'], 1, 1, 1, 1, 1, 1),
    createData('Confinamento', services['sasfvulnerab[confinamet]'], 1, 1, 1, 1, 1, 1),
    createData('Isolamento', services['sasfvulnerab[isolament]'], 1, 1, 1, 1, 1, 1),
    createData('Violência', services['sasfvulnerab[violen]'], 1, 1, 1, 1, 1, 1),
  ];

  const atividadesItems = [
    ['Reuniões', services['sasfatividade[atvreuniao]']],
    ['Rodas de conversa', services['sasfatividade[atvrodaconversa]']],
    ['Palestras', services['sasfatividade[atvpalestra]']],
    ['Oficinas de desenvolvimento de habilidades e geração/complementação de renda', services['sasfatividade[atvhabilidade]']],
    ['Manifestações artísticas (canto, dança, fotografia, teatro, grafite, etc.)', services['sasfatividade[atvartistica]']],
    ['Geração de renda ou acesso a bens (horta comunitária, produção de ovos de páscoa, enfeites, bijuterias, salgadinhos, pães, bolos/doces, etc.)', services['sasfatividade[atvrenda]']],
    ['Artesanato (pintura , bordado, costura, etc.)', services['sasfatividade[atvarte]']],
    ['Atividades de inclusão digital', services['sasfatividade[atvincdigital]']],
    ['Atividades de linguagem (produção de texto, contação de histórias, roda de conversa etc.)', services['sasfatividade[atvlinguagem]']],
    ['Atividades que envolvam manipulação de alimentos (culinária, hortas etc.)', services['sasfatividade[atvculinaria]']],
    ['Atividades recreativas (jogos, brincadeiras, etc.)', services['sasfatividade[atvrecreacao]']],
    ['Atividades de apoio às ações educativas realizadas pelas próprias famílias junto às crianças e ações realizadas pelas gestantes', services['sasfatividade[atvfamilias]']],
  ];

  const temasItems = [
    ['Garantia de direitos sociais (saúde, educação, previdência, moradia, envelhecimento, saúde mental, etc.)', services['sasftemas[temadireitos]']],
    ['Relacionamento familiar (gravidez na adolescência, álcool e drogas, orientação sexual, aborto, etc.)', services['sasftemas[temafamiliar]']],
    ['Direitos e programas sociais', services['sasftemas[temadireitossociais]']],
    ['Trabalho lúdico com vistas ao fortalecimento de vínculos (com atenção e cuidados às crianças de 0 a 6 anos e seus responsáveis, gestantes e demais membros da família)', services['sasftemas[temaludico]']],
    ['Igualdade entre homens e mulheres', services['sasftemas[temaigualdade]']],
    ['Relações étnico-raciais', services['sasftemas[temaetnico]']],
    ['Prevenção à violência', services['sasftemas[temaprevencaovio]']],
    ['Parentalidade', services['sasftemas[temaparental]']],
    ['Deficiência e acessibilidade', services['sasftemas[temapcd]']],
    ['Mundo do trabalho', services['sasftemas[tematrabalho]']],
  ];

  const demandaReprimida = [
    createData('15 a 17 anos', services['cjlistaespera[15a17_quantidade]'], 1, 1, 1, 1, 1, 1),

    createData('Total',
      parseInt(services['cjlistaespera[15a17_quantidade]'], 10),
      1, 1, 1, 1, 1, 1),
  ];

  const numeroBPC = [
    createData('Nº de famílias beneficiárias do Programa Bolsa Família acompanhadas pelo serviço', services['sasfbeneficio[familiabolsafam]'], 1, 1, 1, 1, 1, 1),
    createData('Nº de idosos beneficiários do BPC acompanhados pelo serviço', services['sasfbeneficio[idososbpc]'], 1, 1, 1, 1, 1, 1),
    createData('Nº de pessoas com deficiência beneficiárias do BPC acompanhadas pelo serviço', services['sasfbeneficio[pessoasdeficiencia]'], 1, 1, 1, 1, 1, 1),
  ];

  const numeroPDU = [
    createData('Nº de idosos com PDU em andamento no mês', services['sasfpdu[pduidoso]'], 1, 1, 1, 1, 1, 1),
    createData('Nº de pessoas com deficiência com PDU em andamento no mês', services['sasfpdu[pdupcd]'], 1, 1, 1, 1, 1, 1),
  ];

  const numeroPPI = [
    createData('Nº de crianças acompanhadas pelas ações do Programa Primeira Infância no SUAS', services['sasfprogramainfancia[crianca]'], 1, 1, 1, 1, 1, 1),
    createData('Nº de visitas domiciliares realizadas às crianças acompanhadas pelas ações do Programa Primeira Infância no SUAS', services['sasfprogramainfancia[criancavisita]'], 1, 1, 1, 1, 1, 1),
    createData('Nº de gestantes acompanhadas pelas ações do Programa Primeira Infância no SUAS', services['sasfprogramainfancia[gestante]'], 1, 1, 1, 1, 1, 1),
    createData('Nº de visitas domiciliares realizadas às gestantes acompanhadas pelas ações do Programa Primeira Infância no SUAS', services['sasfprogramainfancia[gestantevisita]'], 1, 1, 1, 1, 1, 1),
  ];

  const familiasInsumos = [
    createData('Cesta de alimentos', services['sasfinsumos[alimentos_SQ001]'], 1, 1, 1, 1, 1, 1),
    createData('Kit de material de higiene', services['sasfinsumos[higiene_SQ001]'], 1, 1, 1, 1, 1, 1),
  ];

  const encaminhamentos = [
    createData('CRAS', services['sasfencaminhamentos[CRAS]'], 1, 1, 1, 1, 1, 1),
    createData('CREAS', services['sasfencaminhamentos[CREAS]'], 1, 1, 1, 1, 1, 1),
    createData('Outro serviço da rede socioassistencial', services['sasfencaminhamentos[redeas]'], 1, 1, 1, 1, 1, 1),
    createData('Saúde', services['sasfencaminhamentos[saude]'], 1, 1, 1, 1, 1, 1),
    createData('Educação', services['sasfencaminhamentos[educacao]'], 1, 1, 1, 1, 1, 1),
    createData('Conselhos de direito', services['sasfencaminhamentos[direito]'], 1, 1, 1, 1, 1, 1),
    createData('Habitação', services['sasfencaminhamentos[habitacao]'], 1, 1, 1, 1, 1, 1),
    createData('Trabalho e renda', services['sasfencaminhamentos[trabalho]'], 1, 1, 1, 1, 1, 1),
    createData('Previdência social', services['sasfencaminhamentos[previdencia]'], 1, 1, 1, 1, 1, 1),
    createData('Outras políticas públicas', services['sasfencaminhamentos[outraspoliticas]'], 1, 1, 1, 1, 1, 1),
  ];

  const atendimentosRemotos = [
    createData('Semana 1', services['cjatendremperiod[1sem]'], 1, 1, 1, 1, 1, 1),
    createData('Semana 2', services['cjatendremperiod[2sem]'], 1, 1, 1, 1, 1, 1),
    createData('Semana 3', services['cjatendremperiod[3sem]'], 1, 1, 1, 1, 1, 1),
    createData('Semana 4', services['cjatendremperiod[4sem]'], 1, 1, 1, 1, 1, 1),
    createData('Semana 5', services['cjatendremperiod[5sem]'], 1, 1, 1, 1, 1, 1),
    createData('Semana 6', services['cjatendremperiod[6sem]'], 1, 1, 1, 1, 1, 1),
  ];

  const atendimentosRemotosTipos = [
    createData('Telefone / Celular / Whatsapp', services['sasfremdisp[telef]'], 1, 1, 1, 1, 1, 1),
    createData('Email', services['sasfremdisp[email]'], 1, 1, 1, 1, 1, 1),
    createData('Facebook', services['sasfremdisp[face]'], 1, 1, 1, 1, 1, 1),
    createData('YouTube', services['sasfremdisp[youtu]'], 1, 1, 1, 1, 1, 1),
    createData('Outras redes sociais', services['sasfremdisp[outrasredes]'], 1, 1, 1, 1, 1, 1),
    createData('Entrega de kits de atividades', services['sasfremdisp[entreg]'], 1, 1, 1, 1, 1, 1),
    createData('Outros', services['sasfremdisp[outros]'], 1, 1, 1, 1, 1, 1),
  ];

  const atendimentosRemotosFamiliaSemana = [
    createData('Semana 1', services['sasfremfamperiod[1sem]'], 1, 1, 1, 1, 1, 1),
    createData('Semana 2', services['sasfremfamperiod[2sem]'], 1, 1, 1, 1, 1, 1),
    createData('Semana 3', services['sasfremfamperiod[3sem]'], 1, 1, 1, 1, 1, 1),
    createData('Semana 4', services['sasfremfamperiod[4sem]'], 1, 1, 1, 1, 1, 1),
    createData('Semana 5', services['sasfremfamperiod[5sem]'], 1, 1, 1, 1, 1, 1),
    createData('Semana 6', services['sasfremfamperiod[6sem]'], 1, 1, 1, 1, 1, 1),
  ];

  let monthString = '';

  if (mes === '0121') {
    monthString = 'Janeiro 2021';
  } else if (mes === '0221') {
    monthString = 'Fevereiro 2021';
  } else if (mes === '0321') {
    monthString = 'Março 2021';
  }

  return (
    loading
      ? (
        <LoaderBody>
          <MoonLoader color="#3f51b5" size={100} />
        </LoaderBody>
      )
      : (
        <>
          <FirstSection>
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                component="a"
                onClick={() => {
                  history.push('/');
                }}
                label={nomeSAS}
                icon={<HomeIcon fontSize="small" />}
              />
              <StyledBreadcrumb
                component="a"
                onClick={() => {
                  setContext({
                    nomeSAS,
                    mes,
                  });
                  history.push('months');
                }}
                label={monthString}
              />
              <StyledBreadcrumb
                component="a"
                onClick={() => {
                  setContext({
                    nomeSAS,
                    mes,
                  });
                  history.push('/reports');
                }}
                label={serviceName}
              />
              <Typography color="textPrimary">Respostas</Typography>
            </Breadcrumbs>
            <div>

              <MyButton
                variant="contained"
                onClick={() => {
                  window.print();
                }}
                color="primary"
              >
                Imprimir

              </MyButton>
              <MyButton
                variant="contained"
                color="primary"
                onClick={() => {
                  setContext({
                    nomeSAS,
                    mes,
                  });
                  history.push('/reports');
                }}
              >
                Voltar

              </MyButton>
            </div>

          </FirstSection>

          <Section>
            <h2>
              1. Informe um valor para cada situação apresentada abaixo:
            </h2>
            <TableTwoColumns headers={atendidosMesHeaders} body={atendidosMes} />

            <h2>
              2. Quantidade responsáveis familiares atendidos
              por sexo e raça/cor no mês de referência.
            </h2>
            <TableEigthColumns headers={sexoRacaCorHeaders} body={sexoRacaCor} />
            <h2>
              3. Nº de famílias por motivo de saída do serviço no mês de referência:
            </h2>
            <TableTwoColumns headers={motivoSaidaHeaders} body={motivoSaida} />

            <h2>
              4. Encaminhamentos realizados pelo serviço no mês de referência:
            </h2>

            <TableTwoColumns headers={encaminhamentosHeaders} body={encaminhamentos} />
            <br />
            <h2>
              5. Nº de famílias que receberam insumos no mês de referência:
            </h2>
            <TableTwoColumns headers={familiasInsumosHeaders} body={familiasInsumos} />
            <br />
            <h2>
              6. Nº de pessoas ou famílias beneficiários de
              Programas de Transferência de Renda e/ou
              Benefício de Prestação Continuada no mês de referência:
            </h2>
            <TableTwoColumns headers={['', '']} body={numeroBPC} />
            <h2>
              7. O valor para as situações abaixo
              relacionadas ao Plano de Desenvolvimento do Usuário – PDU
            </h2>

            <TableTwoColumns headers={['', '']} body={numeroPDU} />
            <h2>
              8. O valor para cada situação apresentada sobre
              o Programa Primeira Infância no SUAS no mês de referência
            </h2>

            <TableTwoColumns headers={['', '']} body={numeroPPI} />

            <h2>
              9. Indique o número de famílias ou pessoas que buscaram
              atendimento presencial no mês de referência devido a
              alguma vulnerabilidade relacional
            </h2>
            <TableTwoColumns
              headers={familiasVulnerabilidadeHeaders}
              body={familiasVulnerabilidade}
            />

            <h2>
              10. Indique as atividades realizadas com as
              famílias atendidas pelo serviço no mês de referência
            </h2>

            <ListComponent items={atividadesItems} />
            <br />
            <h2>
              11. Indique os temas discutidos com as
              famílias atendidas pelo serviço no mês de referência
            </h2>
            <ListComponent items={temasItems} />
            <br />

            <br />
            <h2>
              12. Quantidade de atendimentos remotos de famílias por semana no mês
            </h2>

            <TableTwoColumns
              headers={atendimentosRemotosFamiliaSemanaHeaders}
              body={atendimentosRemotosFamiliaSemana}
            />

            <h2>
              13. Quantidade de atividades remotas
              realizadas no mês, pelos meios em que foram disponibilizadas
            </h2>

            <TableTwoColumns
              headers={atendimentosRemotosTiposHeaders}
              body={atendimentosRemotosTipos}
            />

          </Section>
        </>
      )
  );
};

export default Response;

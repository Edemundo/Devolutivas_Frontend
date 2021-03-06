import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import MoonLoader from 'react-spinners/MoonLoader';

import fetchServicesAnswers from './Request';

import {
  Section, LoaderBody,
} from './styles';
import {
  atendidosMesCCA,
  sexoRacaCorCCA,
  motivoSaidaCCA,
  familiasAtendidasCCA,
  familiasVulnerabilidadeCCA,
  atividadesItemsCCA,
  temasItemsCCA,
  demandaReprimidaCCA,
  familiasInsumosCCA,
  encaminhamentosCCA,
  atendimentosRemotosCCA,
  atendimentosRemotosTiposCCA,
  atendimentosRemotosFamiliaSemanaCCA,
} from './ServiceValues';

import TableFourColumns from '../../components/TableFourColumns';
import TableEigthColumns from '../../components/TableEightColumns';
import TableThreeColumns from '../../components/TableThreeColumns';
import TableTwoColumns from '../../components/TableTwoColumns';
import ListComponent from '../../components/ListComponent';
import HeaderInfo from '../../components/HeaderInfo';
import Navbar from '../../components/Navbar';

import { infoContext } from '../../providers/reactContext';

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

const Response: React.FC = () => {
  const [services, setServices]:any = useState([]);
  const { context }:any = useContext(infoContext);
  const {
    nomeSAS, mes, token, tipologia,
  } = context;
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServicesAnswers({
      nomeSAS, mes, token, tipologia, setServices, setLoading, history,
    });
  }, []);

  const atendidosMes = atendidosMesCCA({ services, createData });

  const sexoRacaCor = sexoRacaCorCCA({ services, createData });

  const motivoSaida = motivoSaidaCCA({ services, createData });

  const familiasAtendidas = familiasAtendidasCCA({ services, createData });

  const familiasVulnerabilidade = familiasVulnerabilidadeCCA({ services, createData });

  const atividadesItems = atividadesItemsCCA({ services, createData });

  const temasItems = temasItemsCCA({ services, createData });

  const demandaReprimida = demandaReprimidaCCA({ services, createData });

  const familiasInsumos = familiasInsumosCCA({ services, createData });

  const encaminhamentos = encaminhamentosCCA({ services, createData });

  const atendimentosRemotos = atendimentosRemotosCCA({ services, createData });

  const atendimentosRemotosTipos = atendimentosRemotosTiposCCA({ services, createData });

  const atendimentosRemotosFamiliaSemana = atendimentosRemotosFamiliaSemanaCCA({
    services, createData,
  });

  return (
    loading
      ? (
        <LoaderBody>
          <MoonLoader color="#3f51b5" size={100} />
        </LoaderBody>
      )
      : (
        <>
          <Navbar />

          <Section>
            <HeaderInfo />

            <h2>
              1. Quantidade de crian??as e adolescentes atendidos no m??s, por faixa et??ria e sexo
            </h2>
            <TableFourColumns
              headers={[
                'N?? de usu??rios atendidos no m??s',
                'N?? de usu??rios que frequentaram presencialmente o servi??o',
                'N?? de usu??rios atendidos remotamente pelo servi??o',
              ]}
              body={atendidosMes}
            />

            <h2>
              2. Quantidade crian??as e adolescentes atendidos no m??s, por sexo e ra??a/cor
            </h2>
            <TableEigthColumns
              headers={[
                'Branca',
                'Preta',
                'Parda',
                'Amarela',
                'Ind??gena',
                'N??o informada',
                'Total',
              ]}
              body={sexoRacaCor}
            />
            <h2>
              3. Quantidade de crian??as e adolescentes por motivo de sa??da do servi??o no m??s
            </h2>
            <TableThreeColumns headers={['6 a 11 anos', '12 a 14 anos']} body={motivoSaida} />

            <h2>
              4. A quantidade de crian??as e/ou adolescentes em situa????o de trabalho
              infantil encaminhadas pelo Cras/Creas no m??s de refer??ncia:
            </h2>
            <TableTwoColumns headers={['', 'Quantidade']} body={[createData('Crian??as(s) e Adolecente(s)', services.ccanovostrabinfantil, 1, 1, 1, 1, 1, 1)]} />

            <br />
            <h2>
              5. A quantidade de crian??as e adolescentes
              com defici??ncia atendidos no m??s de refer??ncia:
            </h2>
            <TableTwoColumns headers={['', 'Quantidade']} body={[createData('Crian??as(s) e Adolecente(s)', services.ccausuariospcd, 1, 1, 1, 1, 1, 1)]} />
            <br />
            <h2>6. Atendimento ??s fam??lias no m??s de refer??ncia</h2>
            <TableTwoColumns headers={['', 'N?? de fam??lias']} body={familiasAtendidas} />

            <h2>
              7. A quantidade de visitas domicilares realizadas no m??s de refer??ncia:
            </h2>
            <TableTwoColumns headers={['', 'Quantidade']} body={[createData('Visita(s)', services.ccavisitadom, 1, 1, 1, 1, 1, 1)]} />

            <h2>
              8. O n??mero de fam??lias ou pessoas que buscaram
              atendimento presencial no m??s de refer??ncia
              devido a alguma vulnerabilidade relacional listada abaixo
            </h2>

            <TableTwoColumns
              headers={['', 'N?? de fam??lias']}
              body={familiasVulnerabilidade}
            />

            <h2>
              9. As atividades
              realizadas com as crian??as e adolescentes atendidos pelo servi??o no m??s
            </h2>

            <ListComponent items={atividadesItems} />

            <h2>
              10. Os temas discutidos com
              as crian??as e adolescentes atendidos pelo servi??o no m??s
            </h2>

            <ListComponent items={temasItems} />
            <br />
            <h2>
              11. Quantidade de crian??as e/ou adolescentes inclu??dos em lista de espera
              (demanda reprimida) no m??s de refer??ncia
            </h2>

            <TableTwoColumns headers={['', 'N?? de crian??as e/ou adolescentes']} body={demandaReprimida} />

            <h2>
              12. Quantidade de fam??lias que receberam insumos no m??s de refer??ncia
            </h2>

            <TableTwoColumns headers={['', 'N?? de fam??lias']} body={familiasInsumos} />

            <h2>
              13. Quantidade de encaminhamentos realizados pelo servi??o no m??s de refer??ncia:
            </h2>

            <TableTwoColumns headers={['Servi??os', 'Encaminhamentos']} body={encaminhamentos} />

            <h2>
              14. Quantidade de atendimentos remotos de
              crian??as e adolescentes por semana no m??s
            </h2>

            <TableTwoColumns headers={['', 'Atendimentos Remotos']} body={atendimentosRemotos} />

            <h2>
              15. Quantidade de atividades remotas realizadas no m??s,
              pelos meios em que foram disponibilizadas
            </h2>

            <TableTwoColumns
              headers={['Tipos', '']}
              body={atendimentosRemotosTipos}
            />

            <h2>
              16. Quantidade de atendimentos
              remotos de familiares por semana no m??s
            </h2>

            <TableTwoColumns
              headers={['Semanas', 'N?? de fam??lias']}
              body={atendimentosRemotosFamiliaSemana}
            />

          </Section>
        </>
      )
  );
};

export default Response;

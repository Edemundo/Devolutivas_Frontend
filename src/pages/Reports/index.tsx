import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import {
  makeStyles, Theme, createStyles, withStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MoonLoader from 'react-spinners/MoonLoader';

import { Button } from '@material-ui/core';
import {
  FirstSection, SecondSection, Filter, LoaderBody,
} from './styles';

import { infoContext } from '../../providers/reactContext';

import TableSixColumns from '../../components/TableSixColumns';

const StyledTableCell = withStyles((theme: Theme) => createStyles({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme: Theme) => createStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return {
    name, calories, fat, carbs, protein,
  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(5),
  },
  root: {
    minWidth: 100,

  },
  bodyServicesItems: {
    width: '100%',
    maxWidth: 1200,
    flex: 1,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    maxHeight: 250,
    margin: '5px',
  },
  subtitle: {
    fontWeight: 'bold',
    maxWidth: '200px',
  },
  filterButton: {
    minHeight: '2rem',
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[900],
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 15,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[600],
    },
  },
  disclaimeMessage: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
  },
  buttonIcon: {
    marginRight: '10px',
  },
  table: {
    minWidth: 700,
  },
}));

const Reports: React.FC = () => {
  const classes = useStyles();
  const { context, setContext }:any = React.useContext(infoContext);
  const history = useHistory();
  const { nomeSAS, mes } = context;

  const [services, setServices]:any = useState([]);
  const [servicesFiltered, setServicesFiltered]:any = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchUserProfiles = () => {
    axios.get(`http://localhost:9090/devolutivas/${nomeSAS}/${mes}`).then((res) => {
      setServices(res.data);
      setServicesFiltered(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  let monthString = '';

  if (mes === '0121') {
    monthString = 'Janeiro 2021';
  } else if (mes === '0221') {
    monthString = 'Fevereiro 2021';
  } else if (mes === '0321') {
    monthString = 'Mar??o 2021';
  } else if (mes === '0421') {
    monthString = 'Abril 2021';
  }

  const handleClickPSB = () => {
    const result = services.filter((service:any) => service.protection === 'PSB');
    setServicesFiltered(result);
    console.log(servicesFiltered);
  };
  const handleClickPSE = () => {
    const result = services.filter((service:any) => service.protection.toUpperCase() === 'PSE MEDIA');
    setServicesFiltered(result);
    console.log(servicesFiltered);
  };

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
                  history.push('/months');
                }}
                label={monthString}
              />
              <Typography color="textPrimary">Servi??os</Typography>
            </Breadcrumbs>

          </FirstSection>
          <div className={classes.disclaimeMessage}>
            <h3>
              Os nomes dos servi??os constam segundo a
              nomenclatura usada no Formul??rio de Monitoramento
            </h3>
          </div>
          <SecondSection>
            <Filter>
              <div>
                <FilterListIcon />
                <h2>Filtro</h2>
              </div>
              <Button
                variant="contained"
                onClick={handleClickPSB}
                className={classes.filterButton}
              >
                Prote????o B??sica

              </Button>
              <Button
                variant="contained"
                onClick={handleClickPSE}
                className={classes.filterButton}
              >
                Prote????o Especial
              </Button>
              <Button
                variant="contained"
                onClick={() => { setServicesFiltered(services); }}
                className={classes.filterButton}
              >
                Todos
              </Button>
              <br />
              <br />
              <br />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  history.push('/months');
                }}
              >
                <ArrowBackOutlinedIcon className={classes.buttonIcon} />
                Voltar
              </Button>
            </Filter>
            <div className={classes.bodyServicesItems}>
              <TableSixColumns
                headers={['Tipologia', 'Nome do Servi??o', 'E-mail do Gerente', 'Respondido', 'Data da Resposta', 'Consultar']}
                body={servicesFiltered}
              />

              {/* <List component="nav" aria-label="main mailbox folders">
                {servicesFiltered.map((service:any) => (

                  <ListItem
                    button
                    onClick={() => {
                      setContext({
                        nomeSAS,
                        mes,
                        serviceName: service.firstname,
                        token: service.token,
                        tipologia: service.typology.substring(0, 3),
                        tipologiaCompleta: service.typology,
                        distrito: service.district,
                        protecao: service.protection,
                        termo: service.term,
                        capacidade: service.position,
                      });
                      history.push(`/response${service.typology}`);
                    }}
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${service.firstname} `} />
                    <h4>{service.typology}</h4>
                  </ListItem>

                ))}

              </List> */}

            </div>

          </SecondSection>

        </>
      )
  );
};

export default Reports;

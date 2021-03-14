import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { FiArrowLeft, FiEdit, FiTrash2 } from 'react-icons/fi';

import * as S from './styles';

import Button from '../../components/Button';

interface IRows {
  id: number;
  motivo: string;
  valor: number;
  data: string;
}

const Dashboard: React.FC = () => {
  const heads = ['Motivo', 'Valor', 'Data', ''];
  const [rows, setRows] = useState<IRows[]>([]);

  useEffect(() => {
    setRows([
      {
        id: 1,
        motivo: 'Empréstimo',
        valor: 10.5,
        data: '01/01/2011',
      },
      {
        id: 2,
        motivo: 'Pagamento de Aluguel',
        valor: 10.5,
        data: '01/01/2011',
      },
    ]);
  }, []);

  return (
    <S.Container>
      <S.Background />
      <S.Content>
        <S.HeaderContent>
          <h1>
            <small>
              <Link to="/">
                <span>
                  <FiArrowLeft size={20} />
                </span>
              </Link>
            </small>
            Leanne Graham
          </h1>

          <Link to="/debit">
            <Button>Novo</Button>
          </Link>
        </S.HeaderContent>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {heads.map(head => (
                  <TableCell align="left" key={head}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.motivo}</TableCell>
                  <TableCell align="left">{row.valor}</TableCell>
                  <TableCell align="left">{row.data}</TableCell>
                  <TableCell align="center">
                    <S.Actions>
                      <Link to="/">
                        <span>
                          <FiEdit size={20} />
                        </span>
                      </Link>
                      <Link to="/">
                        <span>
                          <FiTrash2 size={20} />
                        </span>
                      </Link>
                    </S.Actions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </S.Content>
    </S.Container>
  );
};

export default Dashboard;

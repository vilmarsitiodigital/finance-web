import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { FiZoomIn, FiTrash2 } from 'react-icons/fi';

import * as S from './styles';

import Button from '../../components/Button';

interface IRows {
  id: number;
  cliente: string;
  valor: number;
}

const Dashboard: React.FC = () => {
  const heads = ['Cliente', 'Dívida', ''];
  const [rows, setRows] = useState<IRows[]>([]);

  useEffect(() => {
    setRows([
      {
        id: 1,
        cliente: 'Leanne Graham',
        valor: 10.5,
      },
      {
        id: 2,
        cliente: 'Ervin Howell',
        valor: 5.67,
      },
    ]);
  }, []);

  return (
    <S.Container>
      <S.Background />
      <S.Content>
        <S.HeaderContent>
          <h1>
            Usuários <small>Inadimplentes</small>
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
                  <TableCell align="left">{row.cliente}</TableCell>
                  <TableCell align="left">{row.valor}</TableCell>
                  <TableCell align="center">
                    <S.Actions>
                      <Link to="/debits">
                        <span>
                          <FiZoomIn size={20} />
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

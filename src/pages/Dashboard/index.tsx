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
import api from '../../services/api';

import * as S from './styles';

import Button from '../../components/Button';

interface IUsers {
  id: number;
  name: string;
}

interface IDebit {
  id: string;
  user_id: number;
  value: number;
  reason: string;
  date: Date;
  user: IUsers | undefined;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [debits, setDebits] = useState<IDebit[]>([]);
  useEffect(() => {
    const arrayUsuarios: IUsers[] = users;
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        json.forEach((j: IUsers) => {
          arrayUsuarios.push(j);
        });
        setUsers(arrayUsuarios);
      })
      .then(() => {
        api.get<IDebit[]>('/debits').then(response => {
          const debitsFormatted = response.data.map(debit => ({
            ...debit,
            user: users.find(u => u.id === debit.user_id),
          }));

          setDebits(debitsFormatted);
        });
      });
  }, [users]);

  const heads = ['Cliente', 'Dívida', ''];

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
              {debits.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.user?.name}</TableCell>
                  <TableCell align="left">{row.value}</TableCell>
                  <TableCell align="center">
                    <S.Actions>
                      <Link to={`/debits/${row.user_id}`}>
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

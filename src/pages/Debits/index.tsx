import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { FiArrowLeft, FiEdit, FiTrash2 } from 'react-icons/fi';
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
  date: string;
  user: IUsers | undefined;
}

interface UserParams {
  user_id: string;
}

const Dashboard: React.FC = () => {
  const params = useParams<UserParams>();
  const [users, setUsers] = useState<IUsers[]>([]);
  const [debits, setDebits] = useState<IDebit[]>([]);
  const [title, setTitle] = useState('');
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
        api
          .get<IDebit[]>('/debits', {
            params: {
              user_id: params.user_id,
            },
          })
          .then(response => {
            const debitsFormatted = response.data.map(debit => ({
              ...debit,
              user: users.find(u => u.id === debit.user_id),
              date: format(parseISO(debit.date), 'dd/MM/yyyy'),
            }));

            debitsFormatted.forEach(e => {
              if (e.user?.name) {
                setTitle(e.user?.name);
              }
            });

            setDebits(debitsFormatted);
          });
      });
  }, [params.user_id, users]);

  const heads = ['Motivo', 'Valor', 'Data', ''];

  const handleDelete = useCallback(
    (id: string) => {
      api.delete(`/debits/${id}`);
      const newDebits = debits.filter(d => d.id !== id);
      setDebits(newDebits);
    },
    [debits],
  );

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
            {title}
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
                  <TableCell align="left">{row.reason}</TableCell>
                  <TableCell align="left">{row.value}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="center">
                    <S.Actions>
                      <Link to={`/debit/${row.id}`}>
                        <span>
                          <FiEdit size={20} />
                        </span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(row.id)}
                      >
                        <span>
                          <FiTrash2 size={20} />
                        </span>
                      </button>
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

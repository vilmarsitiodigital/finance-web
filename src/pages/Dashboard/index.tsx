import React, { useCallback, useEffect, useState } from 'react';
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
  id: number;
  user_id: number;
  value: number;
  name: string;
}

const Dashboard: React.FC = () => {
  const [debits, setDebits] = useState<IDebit[]>([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(async (responseUsers: IUsers[]) => {
        const { data: responseDebits } = await api.get<IDebit[]>('/debits');
        const ids: number[] = [];
        const result: IDebit[] = [];

        responseDebits.forEach(({ user_id, value }) => {
          if (user_id) {
            const idSelecionado = ids.indexOf(user_id);
            if (!result[idSelecionado]) {
              ids.push(user_id);
              const user = responseUsers.find(({ id }) => id === user_id);
              if (user) {
                result.push({
                  id: user?.id,
                  user_id,
                  value,
                  name: user.name,
                });
              }
            } else {
              result[idSelecionado].value += value;
            }
          }
        });
        setDebits(result);
      });
  }, []);

  const heads = ['Cliente', 'Dívida', ''];

  const handleDelete = useCallback(
    (user_id: number) => {
      api.delete(`/debits/all/${user_id}`);
      const newDebits = debits.filter(d => d.user_id !== user_id);
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
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.value}</TableCell>
                  <TableCell align="center">
                    <S.Actions>
                      <Link to={`/debits/${row.user_id}`}>
                        <span>
                          <FiZoomIn size={20} />
                        </span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(row.user_id)}
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

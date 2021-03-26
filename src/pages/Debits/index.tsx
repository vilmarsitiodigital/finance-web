import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { FiArrowLeft, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import heads from './data/heads.json';
import { useLoadDebits } from './hooks';
import { useDeleteDebits } from './hooks/useDeleteDebits';
import * as S from './styles';

interface UserParams {
  user_id?: string;
}

const Dashboard: React.FC = () => {
  const params = useParams<UserParams>();
  const { data: debits, handleSetDebitById } = useLoadDebits(
    Number(params.user_id),
  );
  const { handleDelete } = useDeleteDebits({ handleSetDebitById });

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
            {debits[0]?.name}
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
              {debits.length > 0 ? (
                debits.map(row => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Nenhum registro encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </S.Content>
    </S.Container>
  );
};

export default Dashboard;

import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FiZoomIn, FiTrash2 } from 'react-icons/fi';
import { useLoadDebits, useDeleteDebits } from './hooks';
import heads from './data/heads.json';

import * as S from './styles';
import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  const { data: debits, handleSetDebitById } = useLoadDebits();
  const { handleDelete } = useDeleteDebits({ handleSetDebitById });

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
              {debits.length > 0 ? (
                debits.map(row => (
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
                          onClick={() => {
                            handleDelete(row.user_id);
                          }}
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

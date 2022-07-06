import {Fragment} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Oval } from  'react-loader-spinner'
import {useUsers} from '../../app/hooks/useUsers'
import {IUsers} from '../../types'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  
const UsersTable: React.FC = () => {

    const {isLoading, data:response, fetchNextPage, isFetchingNextPage} = useUsers()

    const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
        if (e.currentTarget.clientHeight + e.currentTarget.scrollTop + 1 >= e.currentTarget.scrollHeight) {
            fetchNextPage()
        }
    }

    return (
        <Paper  data-testid='table' sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
            <TableContainer onScroll={handleScroll} sx={{ maxHeight: 440}} className='custom-scroll'>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">User Name</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Phone</StyledTableCell>
                            <StyledTableCell align="right">Website</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {
                            isLoading 
                            ? (
                                <div className='p-20 flex justify-center align-center w-full'>
                                    Загрузка...
                                </div>
                            )
                            : response?.pages.map((group, index) => (
                                    <Fragment key={index}>
                                        {
                                            group.data.map((user: IUsers) => (
                                                <StyledTableRow data-testid='user-item' key={user.id}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {user.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{user.username}</StyledTableCell>
                                                    <StyledTableCell align="right">{user.email}</StyledTableCell>
                                                    <StyledTableCell align="right">{user.phone}</StyledTableCell>
                                                    <StyledTableCell align="right">{user.website}</StyledTableCell>
                                                </StyledTableRow> 
                                            ))
                                        }
                                    </Fragment>
                                )
                            )
                        }
                    </TableBody>
                    
                </Table>
            </TableContainer>
            {
                isFetchingNextPage && 
                (
                    <div className='absolute bottom-0 flex gap-2'>
                        <Oval
                            ariaLabel="loading-indicator"
                            height={20}
                            width={20}
                            strokeWidth={10}
                            strokeWidthSecondary={5}
                            color="black"
                            secondaryColor="gray"
                        />
                        загрузка...
                    </div>
                )
            }
        </Paper>
    );
}

export default UsersTable
import React, {useState} from 'react';
import s from "./CustomTable.module.scss";
import {Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import Row from "./Row/Row";
import {useAppDispatch, useAppSelector} from "../../../app/store/store";
import {changeAllMessagesStatusAC} from "../messages-reducer";

const CustomTable = () => {
    const dispatch = useAppDispatch()
    const [isAllUsers, setIsAllUsers] = useState(false)
    const messages = useAppSelector(s => s.messages)
    const userId = useAppSelector(s => s.app.userId)

    const selectedUsers = () => {
        const selectedUsers: number[] = [];
        messages.filter(u => u.isSelected).map(u => selectedUsers.push(u.id)).join()
        return selectedUsers
    }

    const onChangeHandler = () => {
        setIsAllUsers(!isAllUsers)
        dispatch(changeAllMessagesStatusAC(!isAllUsers))
    }

    const blockStatusUsers = () => {
        // const ids = selectedUsers()
        // dispatch(changeStatusUsersTC({ids: ids, status: "blocked"}))
        // if (ids.includes(userId!)) {
        //     dispatch(logoutTC())
        // }
    }

    const activeStatusUsers = () => {
        // dispatch(changeStatusUsersTC({ids: selectedUsers(), status: "active"}))
    }

    const deleteUsers = () => {
        // const ids = selectedUsers()
        // dispatch(deleteUsersTC({ids: selectedUsers()}))
        // if (ids.includes(userId!)) {
        //     dispatch(logoutTC())
        // }
    }

    return (
        <div className={s.tableContainer}>
            <div className={s.toolbarContainer}>
                {/*<div className={s.toolbar}>*/}
                {/*    <div className={s.icon}>*/}
                {/*        <Button variant="outlined" color={"error"} onClick={blockStatusUsers}>Block</Button>*/}
                {/*    </div>*/}
                {/*    <div className={s.icon}>*/}
                {/*        <RestoreIcon fontSize={"medium"} onClick={activeStatusUsers}/>*/}
                {/*    </div>*/}
                {/*    <div className={s.icon}>*/}
                {/*        <DeleteForeverIcon fontSize={"medium"} onClick={deleteUsers}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <TableContainer component={Paper} className={s.tableBlock}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                    </TableHead>
                    <TableHead>
                        <TableRow style={{backgroundColor: '#EFEFEF'}}>
                            <TableCell style={{fontWeight: '600'}} width={"10%"}>
                                <Checkbox checked={isAllUsers} onChange={onChangeHandler}/>
                            </TableCell>
                            <TableCell style={{fontWeight: '600'}} width={"30%"}>
                                Sender name
                            </TableCell>
                            <TableCell align="left" style={{fontWeight: '600'}} width={"30%"}>
                                Subject
                            </TableCell>
                            <TableCell align="right" style={{fontWeight: '600'}} width={"30%"}>
                                Message received time
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {messages.length ? (
                        <TableBody>
                            {messages.map((row) => (
                                <Row key={row.id} row={row}/>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell style={{fontWeight: '600'}} width={"10%"}>
                                </TableCell>
                                <TableCell style={{fontWeight: '600'}} width={"30%"}>
                                    No results matching your request
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </div>
    );
};

export default CustomTable;
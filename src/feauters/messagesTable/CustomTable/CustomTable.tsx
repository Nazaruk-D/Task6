import React, {FC, useState} from 'react';
import s from "./CustomTable.module.scss";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import Row from "./Row/Row";
import {useAppDispatch, useAppSelector} from "../../../app/store/store";
import Button from "@mui/material/Button";
import SendFormModal from "../../../common/SendFormModal/SendFormModal";

type CustomTablePropsType = {
    ws: WebSocket | null
}

const CustomTable: FC<CustomTablePropsType> = ({ws}) => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector(s => s.messages)
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className={s.tableContainer}>
            <div className={s.toolbarContainer}>
                <div className={s.toolbar}>
                    <div className={s.icon}>
                        <Button variant="contained" onClick={() => setOpenModal(true)}>New message</Button>
                    </div>
                </div>
            </div>
            <TableContainer component={Paper} className={s.tableBlock}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor: '#b0b0b0'}}>
                            <TableCell width={"10%"}></TableCell>
                            <TableCell style={{fontWeight: '600'}} width={"30%"}>
                                From
                            </TableCell>
                            <TableCell align="left" style={{fontWeight: '600'}} width={"30%"}>
                                Subject
                            </TableCell>
                            <TableCell align="left" style={{fontWeight: '600'}} width={"30%"}>
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
                                    You don't have new emails
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <SendFormModal openModal={openModal} setOpenModal={setOpenModal} ws={ws}/>
        </div>
    );
};

export default CustomTable;
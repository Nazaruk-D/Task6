import React from 'react';
import s from "./Row.module.scss"
import dateFormat from "dateformat";
import {Collapse, IconButton, TableCell, TableRow} from "@mui/material";
import {useAppDispatch} from "../../../../app/store/store";
import {MessageType} from "../../../../api/messageAPI";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';


type RowPropsType = {
    row: MessageType
}

const Row: React.FC<RowPropsType> = ({row}) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}} className={s.row}
                      onClick={() => setOpen(!open)}>
                <TableCell component="th" scope="row">
                    <IconButton aria-label="expand row" size="small">
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.sender_name}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.subject}
                </TableCell>
                <TableCell component="th" scope="row">
                    {dateFormat(row.created_at, "mmmm dS, yyyy, h:MM:ss TT")}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1, minHeight: "40px", alignItems: "center"}}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <TableRow>
                                        <Box sx={{marginTop: 2, marginBottom: 2}}> {row.message}</Box>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default Row;
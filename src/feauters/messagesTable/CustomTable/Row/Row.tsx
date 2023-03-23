import React from 'react';
import dateFormat from "dateformat";
import {TableCell, TableRow} from "@mui/material";
import {useAppDispatch} from "../../../../app/store/store";
import {changeMessagesStatusAC} from "../../messages-reducer";
import {MessageType} from "../../../../api/messageAPI";

type RowPropsType = {
    row: MessageType
}

const Row: React.FC<RowPropsType> = ({row}) => {
    const dispatch = useAppDispatch()

    const onChangeHandler = (id: number, status: boolean) => {
        dispatch(changeMessagesStatusAC({id, status}))
    }

    return (
            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell component="th" scope="row">
                    {/*<Checkbox checked={row.isSelected} onChange={() => onChangeHandler(row.id, !row.isSelected)} />*/}
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
    );
};

export default Row;
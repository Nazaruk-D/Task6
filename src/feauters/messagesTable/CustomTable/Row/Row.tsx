import React from 'react';
// import dateFormat from "dateformat";
import {Checkbox, TableCell, TableRow} from "@mui/material";
import {useAppDispatch} from "../../../../app/store/store";
import {changeMessagesStatusAC, DomainMessagesType} from "../../messages-reducer";

type RowPropsType = {
    row: DomainMessagesType
}

const Row: React.FC<RowPropsType> = ({row}) => {
    const dispatch = useAppDispatch()

    const onChangeHandler = (id: number, status: boolean) => {
        dispatch(changeMessagesStatusAC({id, status}))
    }

    return (
            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell component="th" scope="row">
                    <Checkbox checked={row.isSelected} onChange={() => onChangeHandler(row.id, !row.isSelected)} />
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                {/*<TableCell component="th" scope="row">*/}
                {/*    {row.email}*/}
                {/*</TableCell>*/}
                {/*<TableCell component="th" scope="row">*/}
                {/*    {dateFormat(row.createdAt, "mmmm dS, yyyy")}*/}
                {/*</TableCell>*/}
                {/*<TableCell component="th" scope="row">*/}
                {/*    {dateFormat(row.loginData, "mmmm dS, yyyy, h:MM:ss TT")}*/}
                {/*</TableCell>*/}
                {/*<TableCell component="th" scope="row">*/}
                {/*    {row.status}*/}
                {/*</TableCell>*/}
            </TableRow>
    );
};

export default Row;
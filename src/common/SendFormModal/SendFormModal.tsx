import React, {FC} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Modal, TextField, Typography, Grid,} from '@material-ui/core';
import {useFormik} from "formik";
import SendIcon from '@mui/icons-material/Send';
import {useModal} from "../../hooks/useModal";
import CustomTable from "../../feauters/messagesTable/CustomTable/CustomTable";
import {sendMessageTC} from "../../feauters/messagesTable/messages-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store/store";
import {selectorNameUser} from "../../app/store/selector/selectorApp";


type SendFormModalPropsType = {
    openModal: boolean
    setOpenModal: (openModal: boolean) => void
}

const useStyles = makeStyles((theme: any) => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 'none',
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const SendFormModal: FC<SendFormModalPropsType> = ({openModal, setOpenModal}) => {
    const dispatch = useAppDispatch()
    const userName = useAppSelector(selectorNameUser)
    const classes = useStyles();


    const formik = useFormik({
        initialValues: {
            recipient: '',
            subject: '',
            message: '',
        },
        validate: (values) => {
            const errors: any = {}
            if (!values.recipient) {
                errors.recipient = 'Recipient Required'
            }
            if (!values.subject) {
                errors.subject = 'Subject Required'
            }
            if (!values.message) {
                errors.message = 'Message Required'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(sendMessageTC({senderName: userName, recipientName: values.recipient, subject: values.subject, message: values.message}))
            console.log(values)
            formik.resetForm()
        },
    })


    // const handleOpen = () => {
    //     setOpenModal(true);
    // };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <Modal open={openModal} onClose={handleClose}
               style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                    Send email form
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Recipient"
                                variant="outlined"
                                className={classes.textField}
                                {...formik.getFieldProps('recipient')}
                            />
                            {formik.touched.recipient && formik.errors.recipient &&
                                <div style={{color: "red"}}>{formik.errors.recipient}</div>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Subject"
                                variant="outlined"
                                className={classes.textField}
                                {...formik.getFieldProps('subject')}
                            />
                            {formik.touched.subject && formik.errors.subject &&
                                <div style={{color: "red"}}>{formik.errors.subject}</div>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={4}
                                className={classes.textField}
                                {...formik.getFieldProps('message')}
                            />
                            {formik.touched.message && formik.errors.message &&
                                <div style={{color: "red"}}>{formik.errors.message}</div>}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<SendIcon/>}
                                disabled={!(formik.isValid && formik.dirty)}
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Modal>
    );
}


export default SendFormModal;
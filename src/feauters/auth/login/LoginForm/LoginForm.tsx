import React from "react";
import {Button, FormControl, FormGroup, FormLabel, Grid, Paper, TextField} from "@mui/material";
import s from "./LoginForm.module.scss"
import {useFormik} from "formik";
import {loginTC, setIsisRegisteredAC} from "../../auth-reducer";
import {routes} from "../../../../app/routes/routes";
import {useAppDispatch} from "../../../../app/store/store";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validate: (values) => {
            const errors: any = {}
            if (!values.name) {
                errors.name = 'Name Required'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    function onClickHandler() {
        // dispatch(setIsisRegisteredAC({value: false}))
        // navigate(routes.registration)
    }

    return (
        <Grid container className={s.loginContainer}>
            <Grid item xs={"auto"} alignContent={"center"} justifyContent={"center"}>
                <Paper className={s.paper} elevation={8}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <h1 className={s.title}>Enter your name</h1>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    label="name"
                                    margin="normal"
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name &&
                                    <div style={{color: "red"}}>{formik.errors.name}</div>}
                                <Button className={s.button} type={'submit'} variant={'contained'} color={'primary'} disabled={!(formik.isValid && formik.dirty)}>
                                    Login
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LoginForm;
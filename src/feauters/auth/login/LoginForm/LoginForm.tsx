import React from "react";
import {Button, FormControl, FormGroup, FormLabel, Grid, Paper, TextField} from "@mui/material";
import s from "./LoginForm.module.scss"
import {useFormik} from "formik";
import {loginTC} from "../../../../store/reducers/auth-reducer";
import {useAppDispatch} from "../../../../store/store";


const LoginForm = () => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validate: (values) => {
            const errors: any = {}
            if (!values.name) {
                errors.name = 'Name Required'
            }
            if (values.name.length > 20) {
                errors.name = 'Name must not be longer than 20 characters'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

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
                                <Button className={s.button} type={'submit'} variant={'contained'} color={'primary'}
                                        disabled={!(formik.isValid && formik.dirty)}>
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
import * as React from 'react';
import { Button, Autocomplete, Grid, TextField, Stack } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { UserInfoState } from '../../../../state/user';
const record = [{ username: 'chenyuhao' },];
const Form = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [username2, setUsername2] = useState("");
    const [password2, setPassword2] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [disabled2, setDisabled2] = useState(false);
    const setUserInfoState = useSetRecoilState(UserInfoState);
    const navigate = useNavigate();
    const onSubmit = () => {
        (async () => {
            if (!username || !password) {
                alert("username/password 不能为空");
                return;
            }
            setDisabled(true);
            try {
                console.log("test login");
                /*
                const userInfo = await login({
                    username,
                    password,
                });
                setUserInfoState(userInfo);
                */
                /* if right : navigate("/home")*/
            } catch (e) {
                alert(e);
            } finally {
                setDisabled(false);
            }
        })()
    };
    const onSubmit2 = () => {
        (async () => {
            if (!username2 || !password2) {
                alert("username/password 不能为空");
                return;
            }
            /*may be register need confirm password?*/
            setDisabled2(true);
            try {
                console.log("test register");
                /*
                 await register({
                    username,
                    password,
                });
                */
            } catch (e) {
                alert(e);
            } finally {
                setDisabled2(false);
            }
        })()
    };
    return (
        <Grid container spacing={3} alignItems="center" justifyContent="center" rowSpacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={5}>
                <Stack component="form"
                    sx={{
                        width: '40ch',
                        margin: 0,
                    }}
                    spacing={2}
                    noValidate
                >
                    <Autocomplete
                        id="login-username"
                        freeSolo
                        options={record.map((option) => option.username)}
                        renderInput={(params) => <TextField {...params} required label="Username"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }} />}
                    />
                    <TextField
                        required
                        id="login-password"
                        label="Password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <Grid item xs={5}><Button variant="contained" onClick={onSubmit} disabled={disabled}>Login</Button></Grid>
                </Stack>
            </Grid>



            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
                <Stack component="form"
                    sx={{
                        width: '40ch',
                        margin: 0,
                    }}
                    spacing={2}
                    noValidate
                >
                    <TextField
                        required
                        id="sign-up-username"
                        label="Username"
                        onChange={(e) => {
                            setUsername2(e.target.value)
                        }}
                    />
                    <TextField
                        required
                        id="sign-up-password"
                        label="Password"
                        type="password"
                        onChange={(e) => {
                            setPassword2(e.target.value)
                        }}
                    />
                    <Grid item xs={5}><Button variant="contained" onClick={onSubmit2} disabled={disabled2}>Sign up</Button></Grid>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Form;
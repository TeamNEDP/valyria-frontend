import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={1}> </Grid>
                <Grid item xs={1}><img src={'/'} /> logo</Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={4}>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button variant="outlined" onClick={() => {
                            navigate("/");
                        }} >Home</Button>
                        <Button variant="outlined" onClick={() => {
                            navigate("/Contest");
                        }} >Contest</Button>
                        <Button variant="outlined" onClick={() => {
                            navigate("/Rank");
                        }} >Rank</Button>
                        <Button variant="outlined" onClick={() => {
                            navigate("/Battle");
                        }} >Battle</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}><Button variant="contained" onClick={() => {
                    navigate("/Login");
                }} >LOGIN/USERNAME</Button></Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={12}></Grid>
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
                        <TextField
                            required
                            id="login-username"
                            label="Username"
                            defaultValue="Username"
                            size='small'

                        />
                        <TextField
                            required
                            id="login-password"
                            label="Password"
                            defaultValue="Password"
                            size='small'
                            type="password"
                        />
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
                            defaultValue="Username"
                            size='small'
                        />
                        <TextField
                            required
                            id="sign-up-password"
                            label="Password"
                            defaultValue="Password"
                            size='small'
                            type="password"
                        />
                    </Stack>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}><Button variant="contained">Login</Button></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}><Button variant="contained">Sign up</Button></Grid>

            </Grid>
        </Box>
    );
}
export default Login;
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Component/Chart';
import Rating from './Component/Rating';
import Gamelist from './Component/Gamelist';
import DefaultState from './Component/DefaultState';
import Rightbar from './Component/Rightbar'
import { Toolbar } from '@mui/material';
const mdTheme = createTheme();
const UserProfile = () => {
    return (
        <Grid container spacing={1} rowSpacing={3}>
            <Grid item xs={12}></Grid>

            <DefaultState />
            <Grid item md={9} >


                <ThemeProvider theme={mdTheme}>
                    <Box sx={{ display: 'flex' }}>
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                overflow: 'auto',
                            }}
                        >
                            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                <Grid container spacing={3}>
                                    {/* Chart */}
                                    <Grid item xs={12} md={8} lg={9} >
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: 240,

                                            }}
                                        >
                                            <Chart />
                                        </Paper>
                                    </Grid>
                                    {/* Rating*/}
                                    <Grid item xs={12} md={4} lg={3}>
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: 240,
                                            }}
                                        >
                                            <Rating />
                                        </Paper>
                                    </Grid>
                                    {/* Gamelists*/}
                                    <Grid item xs={12}>
                                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                            <Gamelist />
                                        </Paper>
                                    </Grid>
                                </Grid>

                            </Container>
                        </Box>
                    </Box>
                </ThemeProvider>
            </Grid>
            <Rightbar />

        </Grid >

    );
}

export default UserProfile;


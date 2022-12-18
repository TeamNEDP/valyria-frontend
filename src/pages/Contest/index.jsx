import * as React from 'react';
import { Grid, Box, Container } from '@mui/material';
import GameList from './GameList';

import { Toolbar, } from "@mui/material";
function Contest() {
    return (
        <Container>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} justifyContent="center" rowSpacing={3}>
                <Grid item xs={12} > </Grid>
                <GameList />
            </Grid>
        </Box >
        </Container>

    );
}
export default Contest;
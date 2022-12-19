import * as React from 'react';
import RankList from './Component/RankList';
import Grid from '@mui/material/Grid'
import DefaultState from './Component/DefaultState'
import { Container, Toolbar } from "@mui/material";
const Rank = () => {
    return (
        <Container>
            <Grid container spacing={1} justifyContent="center" rowSpacing={1}>
                <DefaultState />
                <Toolbar />
                <Grid item xs={12} > </Grid>
                <RankList />
            </Grid>
        </Container>
    );
}
export default Rank;
import * as React from 'react';
import { Grid } from '@mui/material';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import MainCard from './chart/MainCard';
import { gridSpacing } from './chart/constant';
import chartData from './chart/total-growth-bar-chart';

export default function MyChart() {

    return (
        <>
            <MainCard>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Chart {...chartData} />
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
}
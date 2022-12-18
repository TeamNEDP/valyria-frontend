import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Rating from './Component/Setting';
import AppWidgetSummary from './Component/AppWidgetSummary';
import MyChart from './Component/Chart';
import { Toolbar, } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import logo from '@/logo/logo.svg';
import { UserInfoState } from '@/state/user';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
function Qualifying() {
  const userInfo = useRecoilValue(UserInfoState);
  const rating = useState(userInfo?.data.rating)
  return (
    <Grid container spacing={1} rowSpacing={3}>
      <Toolbar />
      <Grid item md={12} >
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
                {/* 积分*/}

                <Grid item xs={12} md={3} lg={3}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
                    <AppWidgetSummary title="积分" total={rating} icon={'GradeIcon'} />

                  </Paper>
                </Grid>
                {/* 总对局数*/}
                <Grid item xs={12} md={3} lg={3}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
                    <AppWidgetSummary title="总对局数" total={25} color="info" icon={'SportsEsportsIcon'} />
                  </Paper>
                </Grid>
                {/* 胜场*/}
                <Grid item xs={12} md={3} lg={3}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
                    <AppWidgetSummary title="总胜场数" total={12} color="warning" icon={'EmojiEventsIcon'} />
                  </Paper>
                </Grid>
                {/* 败场*/}
                <Grid item xs={12} md={3} lg={3}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
                    <AppWidgetSummary title="总败场数" total={5} color="error" icon={'GppBadIcon'} />
                  </Paper>
                </Grid>
                {/* 图*/}
                <Grid item xs={12} md={8} lg={8}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <MyChart />
                  </Paper>
                </Grid>
                {/* Rating*/}
                <Grid item xs={12} md={4} lg={4}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
                    <Rating />
                  </Paper>
                  <CardMedia
                    component="img"
                    sx={{ width: 360, display: { xs: 'none', sm: 'block' } }}
                    image={logo}
                    alt={'logo'}
                  />
                </Grid>

              </Grid>

            </Container>
          </Box>
        </Box>

      </Grid>

    </Grid >
  );
}
export default Qualifying;

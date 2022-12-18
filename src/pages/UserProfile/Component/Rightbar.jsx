import * as React from 'react';
import Typography from '@mui/material/Typography';
import { UserInfoState } from '@/state/user';
import { useRecoilValue } from 'recoil';
import { Avatar, ButtonGroup } from '@mui/material';
import { blue } from '@mui/material/colors';
import EmailIcon from '@mui/icons-material/Email';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ChangePwdForm from '@/pages/UserProfile/Component/ChangePwdForm';
import ChangeAvatar from '@/pages/UserProfile/Component/ChangeAvatar';
export default function Rightbar() {
    const userInfo = useRecoilValue(UserInfoState);
    return (
        <Grid item xs={12} sm={12} md={3} component={Paper} elevation={2} square>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                }}
            >
                <Avatar alt="Avatar" src={"/api/user/" + userInfo?.data.id + "/avatar"} sx={{ width: 140, height: 140 }} />
                <Typography component="h1" variant="h5">
                    {userInfo?.data.name}
                </Typography>
                <Typography >
                    <EmailIcon sx={{ color: blue[500], fontSize: 20, }} />Email: {userInfo?.data.email}
                </Typography>
                <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical contained button group"
                >
                    <ChangePwdForm />

                    <ChangeAvatar />

                </ButtonGroup>
            </Box>
        </Grid>
    );
}

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
import Toolbar from '@mui/material/Toolbar';
import { get_user_information } from "@/api/user_api";
import { useState } from 'react';
import { useEffect } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import { Button } from '@mui/material'
import GradeIcon from '@mui/icons-material/Grade';
import { ListItem, ListItemIcon } from '@mui/material'
export default function Rightbar(props) {
    const { id, role } = props;
    const [userInfo, setUserInfo] = useState('')
    useEffect(() => {
        (async () => {
            try {
                const [user] = await Promise.all([
                    get_user_information(id),
                ]);
                setUserInfo(user);
            } catch { }
        })();
    }, [id]);
    return (
        <>
            <Grid item xs={12} sm={8} md={2.5} component={Paper} elevation={2} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
                    <Avatar alt="Avatar" src={"/api/user/" + id + "/avatar"} sx={{ width: 140, height: 140 }} />
                    <Typography component="h1" variant="h6" sx={{ 'color': role == 'R' ? 'red' : 'blue' }}>
                        <strong><i>{userInfo.name}</i></strong>
                    </Typography>
                    <Typography >
                        <ListItem>
                            <ListItemIcon>
                                <MailIcon color="primary" />
                            </ListItemIcon>
                            {userInfo.email}
                        </ListItem>


                    </Typography>
                    <Typography >
                        <ListItem>
                            <ListItemIcon>
                                <GradeIcon color="primary" />
                            </ListItemIcon>
                            {userInfo.rating}

                        </ListItem>


                    </Typography>


                </Box>
            </Grid>
        </>
    );
}

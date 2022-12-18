import * as React from 'react';
import { Grid, Divider, ListItemAvatar, ListItemText, ListItem, List, Avatar } from '@mui/material';
import { RankListsState } from "@/state/ranklists";
import { useRecoilValue } from "recoil";
import { blue } from '@mui/material/colors';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import first from '../trophy/first.svg'
import second from '../trophy/second.svg'
import third from '../trophy/third.svg'
const RankList = () => {
    const ranklists = useRecoilValue(RankListsState);
    return (
        <Grid container spacing={1} justifyContent="center" rowSpacing={0.5} component="div">
            {ranklists.filter((player, index) => index < 3).map((player, index) => (
                <List key={player.id} sx={{ boxShadow: 3, width: '100%', maxWidth: 800, bgcolor: 'background.paper' }} component="div" >
                    <ListItem disablePadding alignItems="flex-start" component="span" >
                        <Grid container >
                            &nbsp;&nbsp;
                            <ListItemAvatar>
                                <Avatar alt={player.id} src={"/api/user/" + player.id + "/avatar"}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                    }} />
                            </ListItemAvatar>
                            &nbsp;&nbsp;
                            <ListItemText
                                key={player.id}
                                primary={<p sx={{ fontSize: 100 }}><strong><i>{player.name == "" ? 'null' : player.name} </i></strong></p>}
                                secondary={
                                    <span>

                                        <strong>积分:{player.rating}</strong>
                                        <br />
                                        <strong>邮箱:{player.email}</strong>
                                    </span>
                                }
                            />
                            {/* "../src/Pages/Rank/Component/trophy/" + (index == 0 ? "first" : index == 1 ? "second" : "third") + ".svg" */}
                            <Avatar alt={player.id} src={(index == 0 ? first : index == 1 ? second : third)}
                                sx={{
                                    width: 120,
                                    height: 120,
                                }} />

                        </Grid>
                    </ListItem>

                </List>
            )
            )}
            {
                ranklists.filter((player, index) => index >= 3).map((player, index) => (
                    <List key={player.id} sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', boxShadow: 3 }}>
                        <ListItem alignItems="flex-start" key={player.id}>
                            <ListItemAvatar>
                                <Avatar variant="square"
                                    sx={{ bgcolor: 'background.paper', width: 80, height: 30 }}>
                                    <span style={{ color: 'black', fontSize: 30 }}>
                                        <strong>{index + 4}
                                            {index[-1] + 4 == '1' ? 'st' : index[-1] + 4 == '2' ? 'nd' : index[-1] + 4 == '3' ? 'rd' : 'th'}
                                        </strong>
                                    </span>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                key={player.id}
                                secondary={
                                    <span>

                                        <PersonIcon sx={{ color: blue[500], fontSize: 20 }} />
                                        <strong><i>{player.name}</i></strong>

                                    </span>
                                }
                            />
                            <ListItemAvatar>
                                <Avatar variant="square"
                                    sx={{ bgcolor: 'background.paper', width: 100, height: 30 }}>
                                    <span style={{ color: 'black', fontSize: 30 }}>
                                        {player.rating}
                                    </span>
                                </Avatar>
                            </ListItemAvatar>
                        </ListItem>
                    </List>))
            }

        </Grid >
    );

}
export default RankList;
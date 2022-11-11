import * as React from 'react';
import { Grid, Divider, Typography, ListItemAvatar, ListItemText, ListItem, List, Avatar } from '@mui/material';
const playlists = [{ 'rank': '1', 'name': 'chenyuhao', 'rating': '100' },
{ 'rank': '2', 'name': 'chenhaoyu', 'rating': '90' },
{ 'rank': '3', 'name': 'yuhaochen', 'rating': '80' },
{ 'rank': '4', 'name': 'chen', 'rating': '80' },
{ 'rank': '5', 'name': 'yu', 'rating': '80' },
{ 'rank': '6', 'name': 'hao', 'rating': '80' },
{ 'rank': '7', 'name': 'ccc', 'rating': '80' },
]
/*没有传入的数据信息，就暂时先随便生成测试了，灰色的图片*/
const RankList = () => {
    return (
        <Grid container spacing={1} justifyContent="center" rowSpacing={0.5}>
            <Grid container spacing={1} justifyContent="center" rowSpacing={0.5}>
                {playlists.filter(playlist => playlist.rank <= 3).map((playlist) => (
                    <List key={playlist.rank} sx={{ width: '100%', maxWidth: 650, bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start" key={playlist.rank}>
                            <ListItemAvatar>
                                <Avatar alt={playlist.rank} src={`src/logo/logo.png`}
                                    sx={{
                                        width: 100,
                                        height: 100,

                                    }} />
                            </ListItemAvatar>
                            <ListItemText
                                key={playlist.rank}
                                primary={playlist.rank + (playlist.rank == '1' ? 'st' : playlist.rank == '2' ? 'nd' : 'rd')}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            name: {playlist.name}
                                            <br />
                                            Rating :{playlist.rating}
                                        </Typography>
                                        <br />
                                        introduction:xxxx
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </List>))
                }
            </Grid>
            <Grid container spacing={1} justifyContent="center" rowSpacing={0.5}>
                {playlists.filter(playlist => playlist.rank > 3).map((playlist) => (
                    <List key={playlist.rank} sx={{ width: '100%', maxWidth: 650, bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start" key={playlist.rank}>
                            <ListItemAvatar>
                                <Avatar variant="square"
                                    sx={{ bgcolor: 'background.paper', width: 100, height: 30 }}>
                                    <span style={{ color: 'black', fontSize: 30 }}>
                                        {playlist.rank}
                                        {playlist.rank.substr(-1) == '1' ? 'st' : playlist.rank.substr(-1) == '2' ? 'nd' : playlist.rank.substr(-1) == '3' ? 'rd' : 'th'}
                                    </span>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                key={playlist.rank}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline', align: 'center' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {playlist.name}
                                        </Typography>
                                        <div align='right'>{playlist.rating}</div>

                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </List>))
                }
            </Grid>
        </Grid >
    );
}
export default RankList;
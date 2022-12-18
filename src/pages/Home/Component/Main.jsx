import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import Link from '@mui/material/Link';
function Main(props) {
    const { title, archives } = props;

    return (
        <Grid
            item
            xs={12}
            md={8}
            sx={{
                '& .markdown': {
                    py: 3,
                },
            }}
        >
            <Typography variant="h5" gutterBottom>
                <strong>{title}</strong>
            </Typography>
            <Divider />
            {archives.map((archive) => (
                <i>{archive.title}</i>
                // <Link display="block" variant="body1" href={archive.url} key={archive.title}>
                //     {archive.title}
                // </Link>
            ))}

        </Grid>
    );
}


export default Main;
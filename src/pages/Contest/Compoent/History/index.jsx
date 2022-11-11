import * as React from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
const History = () => {
    const navigate = useNavigate();
    return (
        <Grid >
            <Box sx={{ height: 300, width: 800 }}>
                <h2>History contest</h2>
                <DataGrid
                    rows={rows2}
                    columns={columns2}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Box>
        </Grid>
    );
}
export default History;
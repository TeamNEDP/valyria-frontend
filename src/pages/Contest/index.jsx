import * as React from 'react';
import { Grid, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
const columns = [
    { field: 'id', headerName: 'Constest ID', type: 'number', width: 100 },
    { field: 'name', headerName: 'Constest Name', sortable: false, width: 150 },
    { field: 'StartTime', headerName: 'Start Time', width: 130 },
    { field: 'LeftTime', headerName: 'Left Time', width: 150 },
    {
        field: 'Description',
        headerName: 'Description',
        description: 'This column is simple description',
        sortable: false,
        width: 160,
    },
];
const columns2 = [
    { field: 'id', headerName: 'Constest ID', type: 'number', width: 100 },
    { field: 'name', headerName: 'Constest Name', sortable: false, width: 150 },
    { field: 'StartTime', headerName: 'Start Time', width: 130 },
    { field: 'Winner', headerName: 'Winner', sortable: false, width: 150 },
    {
        field: 'Description',
        headerName: 'Description',
        description: 'This column is simple description',
        sortable: false,
        width: 160,
    },
];
const rows1 = [
    { id: 1, name: 'Game1', StartTime: '20200101', LeftTime: '10th May 2003', Description: "123" },
    { id: 2, name: 'Game2', StartTime: '11th May 2003', LeftTime: '10th May 2003', Description: null },
    { id: 3, name: 'Game3', StartTime: '10th July 2003', LeftTime: '10th May 2003', Description: null },
    { id: 4, name: 'Game4', StartTime: '10th May 2003', LeftTime: '10th May 2003', Description: null },
    { id: 5, name: 'Game5', StartTime: '10th May 2003', LeftTime: '10th May 2003', Description: null },
    { id: 6, name: 'Game6', StartTime: '10th May 2003', LeftTime: '10th May 2003', Description: null },
    { id: 7, name: 'Game7', StartTime: '10th May 2003', LeftTime: '10th May 2003', Description: null },
    { id: 8, name: 'Game8', StartTime: '10th May 2003', LeftTime: '10th May 2003', Description: null },
    { id: 9, name: 'Game9', StartTime: '10th May 2003', LeftTime: '10th May 2003', Description: null },
];
const rows2 = [
    { id: 1, name: 'Game1', StartTime: '20200101', Winner: 'chenyuhao', Description: "123" },
    { id: 2, name: 'Game2', StartTime: '11th May 2003', Winner: 'chenyuhao', Description: null },
    { id: 3, name: 'Game3', StartTime: '10th July 2003', Winner: 'chenyuhao', Description: null },
    { id: 4, name: 'Game4', StartTime: '10th May 2003', Winner: 'chenyuhao', Description: null },
    { id: 5, name: 'Game5', StartTime: '10th May 2003', Winner: 'chenyuhao', Description: null },
    { id: 6, name: 'Game6', StartTime: '10th May 2003', Winner: 'chenyuhao', Description: null },
    { id: 7, name: 'Game7', StartTime: '10th May 2003', Winner: 'chenyuhao', Description: null },
    { id: 8, name: 'Game8', StartTime: '10th May 2003', Winner: 'chenyuhao', Description: null },
    { id: 9, name: 'Game9', StartTime: '10th May 2003', Winner: 'chenyuhao', Description: null },
];
const Contest = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} justifyContent="center" rowSpacing={5}>
                <Grid item xs={12}> </Grid>

                <Grid >
                    <Box sx={{ height: 300, width: 800 }}>
                        <h2>Running context</h2>
                        <DataGrid
                            rows={rows1}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}> </Grid>
                <Grid >
                    <Box sx={{ height: 300, width: 800 }}>
                        <h2>Pending contest</h2>
                        <DataGrid
                            rows={rows1}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} > </Grid>
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
            </Grid>
        </Box >

    );
}
export default Contest;
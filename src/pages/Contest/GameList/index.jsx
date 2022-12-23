import * as React from "react";
import { useCallback, useState } from "react";
import {
  Grid,
  Box,
  Button,
  TextField,
  Collapse,
  IconButton,
} from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { get_game_list } from "@/api/game_api";
import { GameListsState } from "@/state/gamelists";
import {
  Typography,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple, blueGrey } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import TableFooter from "@mui/material/TableFooter";
import { useEffect, useMemo } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from 'moment';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import { generate_game } from "@/api/script_api";
import Select from '@mui/material/Select';
import { ScriptsState } from "@/state/user";
import useMessage from "@/hooks/useMessage";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fontFamily, letterSpacing } from "@mui/system";
import blueicon from '@/pages/Contest/blue.svg'
import redicon from '@/pages/Contest/red.svg'
import greyicon from '@/pages/Contest/grey.svg'
import { Toolbar, } from "@mui/material";
function Row(props) {
  //列表子项
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <React.Fragment >

      <TableRow sx={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.9,
        backgroundImage:
          row.result == null ? `url(${greyicon})` :
            row.official ?
              row.result.winner == row.role ? `url(${blueicon})` :
                row.result.winner == 'D' ? `url(${greyicon})` : `url(${redicon})` :
              row.result.winner == 'B' ? `url(${blueicon})` : row.result.winner == 'R' ?
                `url(${redicon})` : `url(${greyicon})`
      }}>
        <TableCell >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="justify">
          <Chip icon={<AccessTimeIcon />} sx={{ 'fontWeight': 'bolder', 'backgroundColor': 'white' }} variant="outlined" label={moment(row.date * 1000).format("YYYY-MM-DD HH:mm:ss")} />{""}
        </TableCell>

        <TableCell >
          {row.result == null ? <></> : row.official ?
            row.result.winner == row.role ? <i><h1 >Victory</h1></i> :
              row.result.winner == 'D' ? <i><h1 >Draw</h1></i> : <i><h1>Defeat</h1></i> :
            row.result.winner == 'B' ? <i><h1 >Blue Wins</h1></i> : row.result.winner == 'R' ?
              <i><h1>Red Wins</h1></i> : <i><h1 >Draw</h1></i>

          }

        </TableCell>
        <TableCell align="center">
          <Chip
            label={
              row.status == "finished"
                ? "已完成"
                : row.status == "queue"
                  ? "等待中"
                  : "进行中"
            }
            variant="outlined"
            color={
              row.status == "finished"
                ? "secondary"
                : row.status == "queue"
                  ? "primary"
                  : "warning"
            }
          />
        </TableCell>
        <TableCell align="center">
          {/* {row.official ? <CheckIcon /> : <ClearIcon />} */}
          {row.official ?
            <h3>排位赛</h3>
            : <h3>自定义比赛</h3>}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5} >
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ margin: 1 }}>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <strong>回合数</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>移动格数</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>总士兵</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>总击杀</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>总占领格数</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={"row.id"}>
                    <TableCell component="th" scope="row" align="center">
                      {row.result == null ? " " : row.role == 'R' ? row.result.r_stat.rounds : row.result.b_stat.rounds}
                    </TableCell>
                    <TableCell align="center">
                      {row.result == null ? " " : row.role == 'R' ? row.result.r_stat.moves : row.result.b_stat.moves}
                    </TableCell>
                    <TableCell align="center">
                      {row.result == null ? " " : row.role == 'R' ? row.result.r_stat.soldiers_total : row.result.b_stat.soldiers_total}
                    </TableCell>
                    <TableCell align="center">
                      {row.result == null ? " " : row.role == 'R' ? row.result.r_stat.soldiers_killed : row.result.b_stat.soldiers_killed}
                    </TableCell>
                    <TableCell align="center">
                      {row.result == null ? " " : row.role == 'R' ? row.result.r_stat.grids_taken : row.result.b_stat.grids_taken}
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
              <Grid container spacing={2}>
                <Grid item xs={10.8}>
                  {" "}
                </Grid>

                <Grid item xs={1.2} >
                  {row.status == 'finished' ?
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={() => {

                        navigate("/battle?id=" + row.id + '&r_user_id=' + row.r_user_id + '&b_user_id=' + row.b_user_id);
                      }}
                    >
                      复盘
                    </Button> :
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={() => {

                        navigate("/battle?id=" + row.id + "&live=true" + '&r_user_id=' + row.r_user_id + '&b_user_id=' + row.b_user_id);
                      }}
                    >
                      直播
                    </Button>
                  }
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment >
  );
}
export default function GameList() {
  const gamelists = useRecoilValue(GameListsState);
  const setGameList = useSetRecoilState(GameListsState);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const scripts = useRecoilValue(ScriptsState);
  const [, { addMessage }] = useMessage();
  const nav = useNavigate();
  const handClick = useCallback(
    async () => {
      try {
        console.log(name1, name2)
        await generate_game(name1, name2);
        addMessage("success", "生成成功")
        nav("/contest");
        setOpen(false)
      } catch (e) {
        addMessage("error", "生成失败");
      } finally {
      }
    },
    [name1, name2]
  );
  const offset = useMemo(() => {
    return (currentPage - 1) * rowsPerPage;
  }, [rowsPerPage, currentPage]);

  useEffect(() => {
    (async () => {
      try {
        const [gamelist] = await Promise.all([
          get_game_list(rowsPerPage, offset),
        ]);
        setGameList(gamelist);
      } catch { }
    })();
  }, [offset, rowsPerPage]);

  const handleChangePageLeft = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPage(currentPage - 1);
      window.scrollTo(0, 0)
    }
  };
  const handleChangePageRight = () => {
    if (gamelists?.length == rowsPerPage) {
      setCurrentPage(currentPage + 1);
      setPage(currentPage + 1)
      window.scrollTo(0, 0)
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(row1);
    setCurrentPage(1);
    setPage(1)
  };
  const handleChangePage = (event) => {


    setCurrentPage(page)
    setRowsPerPage(rowsPerPage);

  };
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [row1, setRow] = useState(20);
  return (
    <Grid container>
      <Toolbar />
      <TableContainer component={Paper} sx={{ boxShadow: 10 }} >
        <Table  >
          <TableHead >
            <TableRow >
              <TableCell />
              <TableCell align="justify" >
                <h2><strong >游戏时间</strong></h2>
              </TableCell>
              <TableCell >
                <h2><strong>游戏结果</strong></h2>
              </TableCell>
              <TableCell align="center" >
                <h2><strong>游戏状态</strong></h2>
              </TableCell>
              <TableCell align="center" >
                <h2><strong>比赛类型</strong></h2>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {gamelists?.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1}> </TableCell>
              <TableCell colSpan={2}>
                <Typography variant="h5" component="h5">
                  每页行数:
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    value={row1}
                    sx={{ width: "5ch" }}
                    size="small"
                    onChange={(e) => { setRow(e.target.value) }}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        if (row1 === '') {
                          addMessage("error", "每页行数不能为空！ ");

                        }
                        handleChangeRowsPerPage()
                      }

                    }}
                  />
                </Typography>
              </TableCell>
              <TableCell colSpan={1}>
                <Typography variant="h5" component="h5">
                  页数:
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    sx={{ width: "5ch" }}
                    size="small"
                    value={page}
                    onChange={(e) => { setPage(e.target.value) }}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        if (page === '') {
                          addMessage("error", "页数不能为空！ ");
                        }
                        handleChangePage()
                      }

                    }}

                  />
                </Typography>
              </TableCell>
              <TableCell colSpan={1} align="right">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  onClick={handleChangePageLeft}
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  onClick={handleChangePageRight}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Fab
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        aria-label={'Add'}
        color='primary'
        onClick={() => { setOpen(true); }}>
        <AddIcon />
      </Fab>
      <Dialog open={open} fullWidth maxWidth={'xs'} onClose={(e) => { setOpen(false) }}>
        <DialogTitle>生成自定义对局</DialogTitle>
        <DialogContent>
          <DialogContentText>
            请选择自定义对战双方的脚本
          </DialogContentText>
        </DialogContent>
        <Grid container justifyContent="center" >
          <Grid item md={2}><h3>Role R:</h3></Grid>
          <Grid item md={9}>
            <Select
              displayEmpty
              id="Ascript"
              value={name1}

              sx={{ m: 1, minWidth: 280 }}
              onChange={(e) => { setName1(e.target.value) }}
            >{scripts.map((script) => (
              <MenuItem key={script.name} value={script.name}>
                {script.name}
              </MenuItem >
            ))}
            </Select>
          </Grid >
          <Grid item md={2}><h3>Role B:</h3></Grid>
          <Grid item md={9}>
            <Select
              displayEmpty
              id="Bscript"
              value={name2}
              sx={{ m: 1, minWidth: 280 }}
              onChange={(e) => { setName2(e.target.value) }}
            >{scripts.map((script) => (
              <MenuItem key={script.name} value={script.name}>
                {script.name}
              </MenuItem >
            ))}
            </Select>
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={(e) => { setOpen(false) }}>关闭</Button>
          <Button onClick={handClick}>生成</Button>
        </DialogActions>
      </Dialog>
    </Grid >

  );
}

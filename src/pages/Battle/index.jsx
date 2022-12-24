import { Stage, Layer, Rect, Text, Image, Group } from "react-konva";
import React, { Component, useState } from "react";
import useImage from "use-image";
import { useEffect } from "react";
import { get_games_details } from "../../api/battle_api";
import { useSearchParams } from "react-router-dom";
import { Container } from "@mui/material";
import "./index.css"
import { draw } from "./Components/blocks"
import logo from '@/logo/logo.svg';
import Paper from '@mui/material/Paper';
import { Toolbar } from "@mui/material";
import { Button, ButtonGroup } from '@mui/material';
import Rightbar from './Component/Rightbar';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import { Input } from "@mui/material";
function Board(param) {

  var offset = { x: Math.floor(param.width / 3.5), y: Math.floor(param.height / 2) };

  var blockLength = param.width / param.map.width > param.height / param.map.height ?
    Math.floor(param.height / param.map.height) : Math.floor(param.width / param.map.width);
  if (blockLength > 100) blockLength = 100;
  var backGround = { x: blockLength * param.map.width, y: blockLength * param.map.height };
  var startPoint = { x: offset.x - Math.floor(backGround.x / 2), y: offset.y - Math.floor(backGround.y / 2) };

  const drawit = (map) => {
    var res = [];
    for (let i = 0; i < map.width; i++) {
      for (let j = 0; j < map.height; j++) {
        res.push(
          draw(
            i,
            j,
            blockLength,
            map.grids[i * map.height + j].type,
            map.grids[i * map.height + j].soldiers,
            startPoint.x,
            startPoint.y,
          )
        );
      }
    }
    console.log("done");
    return res;
  };

  return <>
    <Rect
      x={startPoint.x}
      y={startPoint.y}
      width={backGround.x}
      height={backGround.y}
      fill="grey"
      stroke="grey"
      strokeWidth={0}
      shadowBlur={0}
    />
    <Group>
      {drawit(param.map)}
    </Group>

  </>
}

const Game = (param) => {
  useEffect(() => {
    if (param.tick.changes === undefined || param.tick.changes === null) {
      return;
    }
    for (const change of param.tick.changes) {
      param.map.grids[change.x * param.map.height + change.y].type = change.grid.type;
      param.map.grids[change.x * param.map.height + change.y].soldiers = change.grid.soldiers;
    }
  }, [param.tick]);

  return <></>;
}


const App = (param) => {
  const [tick, setTick] = useState(0);
  const [auto2, setAuto2] = useState(false);
  const [auto3, setAuto3] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [speed, setSpeed] = useState(1);
  const live = param.live;
  const [auto, setAuto] = useState(live);
  const r_user_id = param.r_user_id;
  const b_user_id = param.b_user_id;
  const handleSliderChange = (event, newValue) => {
    setTick(newValue);
    setAuto(false);
    setAuto2(true);
    // setAuto(true);
  };
  const handleInputChange = (event) => {
    setTick(event.target.value === '' ? '' : Number(event.target.value));
  };
  useEffect(() => {
    if (!live && tick + 1 >= param.ticks.length) {
      setAuto(false);
    }
  }, [tick, setAuto]);
  useEffect(() => {
    if (live) {
      setAuto(true);
    }
  }, [live, setAuto]);
  const handleBlur = () => {
    if (tick < 1) {
      setTick(1);
    } else if (tick + 1 >= param.ticks.length) {
      setTick(param.ticks.length);
    }
  };

  useEffect(() => {
    if (auto && tick + 1 < param.ticks.length) {
      setTimeout(() => {
        setTick(tick + 1);
      }, 100 / speed);
    } else if (auto && live) {
      setTimeout(() => {
        setTick(tick);
      }, 100 / speed);
    }
  }, [tick, setTick, auto]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (auto2 && auto3) {
        setAuto(true);
        setAuto2(false);
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  })
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>

      <Grid container >

        <Rightbar id={r_user_id} role={'R'}></Rightbar>



        <Grid container item md={7} xs={12} sm={12} justifyContent='center'>
          <Grid item md={12} xs={12} sx={{
            position: 'relative',
            mb: 4,
            backgroundSize: 'cover',
            opacity: 0.8,
            backgroundPosition: 'center',
            backgroundImage: `url(${logo})`,
          }}>

            <Stage width={windowSize.width / 12 * 7} height={windowSize.height - 128 - 24 * 2}>

              <Layer >
                <Board map={param.map} width={windowSize.width} height={windowSize.height - 128 - 24 * 2} />
                {(() => {
                  if (param.ticks.length >= 1) return <Game map={param.map} tick={param.ticks[tick]} />;
                  else return <></>;
                })()}
              </Layer>

            </Stage>


          </Grid>
          {live ? <></> : <Grid item md={12} xs={12} elevation={2} >
            <Grid container spacing={2}  >
              <Grid item md={1} xs={1}>
                <LabelOutlinedIcon color="primary" />
              </Grid>
              <Grid item md={9} xs={9}>
                <Slider
                  value={typeof tick === 'number' ? tick : 0}
                  step={1}
                  min={1}
                  max={param.ticks.length - 1}
                  onChange={handleSliderChange}
                // aria-label="Small"
                />
              </Grid>
              <Grid item md={2} xs={2}>
                <Input
                  value={tick}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: 1000,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>

            </Grid>
            <Grid container justifyContent="center" >
              <Grid item>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button onClick={() => { setSpeed(1), console.log(speed) }}>X1</Button>
                  <Button onClick={() => setSpeed(5)}>X5</Button>
                  <Button onClick={() => { setSpeed(10), console.log(speed) }}>X10</Button>
                  <Button variant="contained" onClick={() => { setAuto(!auto); setAuto3(!auto3) }}
                  >{auto ? "停止播放" : "开启播放"}</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>}

        </Grid>

        <Rightbar id={b_user_id} role={'B'}></Rightbar>

      </Grid>


    </>
  );
};

const Battle = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get("id");
  const r_user_id = searchParams.get("r_user_id");
  const b_user_id = searchParams.get("b_user_id");
  const isLive = searchParams.get("live");
  const [isLiveEnded, setLiveEnded] = useState(false);
  useEffect(() => {
    (async (cb) => {
      if (loading) {
        if (isLive === "true") {
          const socket = new WebSocket("ws://101.43.76.104:8000/api/games/" + contestId + "/live");

          socket.onopen = function (msg) {

          };

          socket.onmessage = function (msg) {
            // console.log(msg);
            const obj = JSON.parse(msg.data);
            if (obj.event === "intro") {
              data.map = obj.data.map;
              data.ticks = [];
              for (const e of obj.data.ticks) {
                for (const change of e.changes) {
                  data.map.grids[change.x * data.map.height + change.y].type = change.grid.type;
                  data.map.grids[change.x * data.map.height + change.y].soldiers = change.grid.soldiers;
                }
              }
              setLoading(false);
            } else if (obj.event === "update") {
              data.ticks.push(obj.data);
            } else if (obj.event === "end") {
              data.ticks.push({ changes: [] });
            }
          };

          socket.onclose = function (msg) {
            if (loading === false) {
              setLiveEnded(true);
              setLoading(true);
            }
          };

        } else {
          const ret = await get_games_details(contestId);
          cb(ret.data);
          ret.data.ticks.push({ changes: [] })
          console.log(ret.data);
          setData(ret.data);
          setLoading(false);
        }
      }
    })(setData);
  }, [contestId, get_games_details, setLoading]);

  // return <>{loading ? <p>加载中</p> : <App map={data.map} ticks={data.ticks} />}</>;

  if (isLiveEnded) {
    return <><Toolbar></Toolbar>直播已结束</>;
  } else if (loading) {
    return <><Toolbar></Toolbar><p>加载中</p></>;
  } else {
    return <><Toolbar></Toolbar><App map={data.map} ticks={data.ticks} live={isLive} r_user_id={r_user_id} b_user_id={b_user_id} /></>;
  }
};

export default Battle;

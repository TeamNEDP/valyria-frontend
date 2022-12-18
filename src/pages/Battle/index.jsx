import { Stage, Layer, Rect, Text, Image, Group } from "react-konva";
import React, { Component, useState } from "react";
import useImage from "use-image";
import { useEffect } from "react";
import { get_games_details } from "../../api/battle_api";
import { useSearchParams } from "react-router-dom";
import { Container } from "@mui/material";
import "./index.css"
import { draw } from "./Components/blocks"

function Board(param) {

  var offset = {x: Math.floor(param.width / 2), y: Math.floor(param.height / 2)};
  
  var blockLength = param.width / param.map.width > param.height / param.map.height ?
      Math.floor(param.height / param.map.height) : Math.floor(param.width / param.map.width);
  if(blockLength > 100) blockLength = 100;
  var backGround = {x: blockLength * param.map.width, y: blockLength * param.map.height};
  var startPoint = {x: offset.x - Math.floor(backGround.x / 2), y: offset.y - Math.floor(backGround.y / 2)};

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
  const [auto, setAuto] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const live = param.live;

  useEffect(() => {
    if(live && tick + 1 >= param.ticks.length) {
      setAuto(false);
    }
  }, [tick, setAuto]);

  useEffect(() => {
    if(auto && tick + 1 < param.ticks.length) {
      setTimeout(() => {
        setTick(tick + 1);
      }, 100);
    }else if(auto && live) {
      setTimeout(() => {
        setTick(tick);
      }, 100);
    }
  }, [tick, setTick, auto]);

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
      <div>
        <button
          onClick={() => {
            if (tick < param.ticks.length) setTick(tick);
          }}
        >
          第 {tick} 步
        </button>
        <button
          onClick={() => {
            setAuto(!auto);
          }}
        >
          {auto ? "关闭自动播放" : "开启自动播放"}
        </button>
      </div>
      
      <Stage width={windowSize.width} height={windowSize.height - 64 - 24 * 2}>
        <Layer>
          <Board map={param.map} width={windowSize.width} height={windowSize.height - 64 - 24 * 2}/>
          { (() => {
            console.log(tick);
            if(param.ticks.length >= 1) return <Game map={param.map} tick={param.ticks[tick]} />;
            else return <></>;
          })() }
        </Layer>
      </Stage>
    </>
  );
};

const Battle = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get("id");
  const isLive = searchParams.get("live");
  const [isLiveEnded, setLiveEnded] = useState(false);
  useEffect(() => {
    (async (cb) => {
      if(loading) {
        if(isLive === "true") {
          const socket = new WebSocket("ws://101.43.76.104:8000/api/games/" + contestId + "/live");
          
          socket.onopen = function(msg) {};

          socket.onmessage = function(msg) {
            const obj = JSON.parse(msg.data);
            if(obj.event === "intro") {
              data.map = obj.data.map;
              data.ticks = [];
              for(const e of obj.data.ticks) {
                for(const change of e.changes) {
                  data.map.grids[change.x * data.map.height + change.y].type = change.grid.type;
                  data.map.grids[change.x * data.map.height + change.y].soldiers = change.grid.soldiers;
                }
              }
              setLoading(false);
            }else if(obj.event === "update") {
              data.ticks.push(obj.data);
            }else if(obj.event === "end") {
              data.ticks.push({changes: []});
            }
          };
          
          socket.onclose = function(msg) {
            if(loading === false) {
              setLiveEnded(true);
              setLoading(true);
            }
          };
          
        }else {
          const ret = await get_games_details(contestId);
          cb(ret.data);
          ret.data.ticks.push({changes: []})
          console.log(ret.data);
          setData(ret.data);
          setLoading(false);
        }
      }
    })(setData);
  }, [contestId, get_games_details, setLoading]);
  
  // return <>{loading ? <p>加载中</p> : <App map={data.map} ticks={data.ticks} />}</>;
  
  if(isLiveEnded) {
    return <>直播已结束</>;
  }else if(loading) {
    return <p>加载中</p>;
  }else {
    return <App map={data.map} ticks={data.ticks} live={isLive} />;
  }
};

export default Battle;

import { Stage, Layer, Rect, Text, Image, Group } from "react-konva";
import React, { Component, useState } from "react";
import useImage from "use-image";
import { useEffect } from "react";
import { get_games_details } from "../../api/battle_api";
import { useSearchParams } from "react-router-dom";
import {draw} from "@/components/GameFunctions"


let Data;
let map;
let ticks;
const Gx = window.innerWidth / 10;
const Gy = window.innerHeight / 10;
let timer= undefined;


const Judge = (props) => {
  let tick = props.tick;

  useEffect(() => {
    if (tick == null || tick < 0) return;
    if (tick.changes === undefined || tick.changes === null) {
      return;
    }
    for (const change of tick.changes) {
      //更新地图指定格的状态
      console.log(tick.changes.length);
      map.grids[change.x * map.width + change.y].type = change.grid.type;
      map.grids[change.x * map.width + change.y].soldiers =
      change.grid.soldiers;
    }
  }, [props.tick]);

  return <></>;
};

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 50,
      width: map.width * 50,
      height: map.height * 50,
      str: [],
    };
  }
  renderdraw() {
    for (let i = 0; i < map.width; i++) {
      for (let j = 0; j < map.height; j++) {
        this.state.str.push(
          draw(
            i,
            j,
            this.state.size,
            map.grids[i * map.width + j].type,
            map.grids[i * map.width + j].soldiers
          )
        );
      }
    }
    return this.state.str;
  }
  render() {
    return (
      <>
        <Rect
          x={Gx}
          y={Gy}
          width={this.state.width}
          height={this.state.height}
          fill="grey"
          stroke="grey"
          strokeWidth={2}
          shadowBlur={10}
        />
        <Group>{this.renderdraw()}</Group>
      </>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Judge tick={ticks[this.props.tick]} />
      </>
    );
  }
}

const App = () => {
  const [tick, setTick] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (tick >= ticks.length) {
      setAuto(false);
    }
  }, [tick, setAuto]);

  useEffect(() => {
    if (auto) {
      setTimeout(() => {
        setTick(tick + 1);
      }, 100);
    }
  }, [tick, setTick, auto]);

  return (
    <>
      <div>
        <button
          onClick={() => {
            if (tick <= ticks.length) setTick(tick + 1);
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
      <Stage width={1238} height={window.innerHeight}>
        <Layer>
          <Board />
          <Game tick={tick} />
        </Layer>
      </Stage>
    </>
  );
};

const Battle = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get("id");

  // 调用延时(setState)

  useEffect(() => {
    (async () => {
      let data = await get_games_details(contestId);
      console.log(data);
      Data=data;
      map = data.data.map;
      ticks = data.data.ticks;
      setLoading(false);
    })();
  }, [contestId, get_games_details, setLoading]);

  return <>{loading ? <p>加载中</p> : <App />}</>;
};

export default Battle;

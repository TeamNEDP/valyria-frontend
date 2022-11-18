import { draw } from "@/components/GameFunctions"
import { Stage, Layer, Rect, Text, Image, Group } from "react-konva";
import React, { Component, useCallback, useState } from "react";
import useImage from "use-image";
import { useEffect } from "react";
import { get_stream_websocket } from "../../api/battle_api";
import { useSearchParams } from "react-router-dom";

let map;
let ticks;
let tick;
const Gx = window.innerWidth / 10;
const Gy = window.innerHeight / 10;

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

const App = () => {
  if (evn === "end")
    return;
  else {
    return (
      <>
        <Stage width={1238} height={window.innerHeight}>
          <Layer>
            <Board />
          </Layer>
        </Stage>
      </>
    );
  }

};

function BattleStream() {
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get("id");
  const [loading, setLoading] = useState(true);

  const handleIntro = useCallback((evt) => {
    evn = evt.data.event;
    map = evt.data.map;
    ticks = evt.data.ticks;
    for (const tick of ticks) {
      for (const change of tick.changes) {
        //更新地图指定格的状态
        console.log(tick.changes.length);
        map.grids[change.x * map.width + change.y].type = change.grid.type;
        map.grids[change.x * map.width + change.y].soldiers = change.grid.soldiers;
      }
    }
    setLoading(false);
  }, [setLoading]);

  const handleUpdate = useCallback((evt) => {
    evn = evt.data.event;
    tick = evt.data.tick;
    for (const change of tick.changes) {
      //更新地图指定格的状态
      console.log(tick.changes.length);
      map.grids[change.x * map.width + change.y].type = change.grid.type;
      map.grids[change.x * map.width + change.y].soldiers =
        change.grid.soldiers;
    }
  })
  useEffect(() => {
    (async () => {
      const ws = get_stream_websocket(contestId);
      ws.onmessage = function (evt) {
        if (evt.data.event === "intro") {
          handleIntro(evt);
        }
        else if (evt.data.event === "update") {
          handleUpdate(evt);
        }
        else if (evt.data.event === "end") {
          evn = evt.data.event;
        }
      }
    })();
  }, [contestId, handleIntro, handleUpdate, get_stream_websocket]);

  return <>{loading ? <p>加载中</p> : <App />}</>;
};

export default BattleStream;

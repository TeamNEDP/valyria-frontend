import { Stage, Layer, Rect, Shape, Text, Image, Group } from "react-konva";
import React, { Component, useState } from "react";
import useImage from "use-image";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { rendering_id } from "@/state/rendering";
import { get_games_details } from "../../api/battle_api";
import { useSearchParams } from "react-router-dom";

let Data;
let map;
let ticks;
const Gx = window.innerWidth / 10;
const Gy = window.innerHeight / 10;
let timer= undefined;

function draw(i, j, size, type, soldiers) {
  switch (type) {
    case "M":
      return <ShanImage x={i} y={j} size={size} />;
    case "C":
      return <ChenbaoImage x={i} y={j} size={size} num={soldiers} />;
    case "R":
      return <WangguanImage_red x={i} y={j} size={size} num={soldiers} />;
    case "B":
      return <WangguanImage_blue x={i} y={j} size={size} num={soldiers} />;
    case "CR":
      return <ChenbaoImage_red x={i} y={j} size={size} num={soldiers} />;
    case "CB":
      return <ChenbaoImage_blue x={i} y={j} size={size} num={soldiers} />;
    case "LR":
      return <Plaid_red x={i} y={j} size={size} num={soldiers} />;
    case "LB":
      return <Plaid_blue x={i} y={j} size={size} num={soldiers} />;
  }
}

const Judge = (props) => {
  const tick = props.tick;
  console.log(tick);

  useEffect(() => {
    if (tick >= ticks.length || tick < 0) return;
    if (ticks[tick].changes === undefined || ticks[tick].changes === null) {
      return;
    }
    for (const change of ticks[tick].changes) {
      //更新地图指定格的状态
      console.log(ticks[tick].changes.length);
      map.grids[change.x * map.width + change.y].type = change.grid.type;
      map.grids[change.x * map.width + change.y].soldiers =
        change.grid.soldiers;
    }
  }, [props.tick]);

  return <></>;
};

const ShanImage = (param) => {
  const xx = param.x;
  const yy = param.y;
  const size = param.size;
  const [image] = useImage("http://www.yvmu.top/img/neutrality/mountain.png");
  return (
    <>
      <Image
        image={image}
        x={Gx + xx * size}
        y={Gy + yy * size}
        width={size}
        height={size}
      />
    </>
  );
};

const WangguanImage_red = (param) => {
  const xx = param.x;
  const yy = param.y;
  const size = param.size;
  const num = param.num;
  const [image] = useImage("http://www.yvmu.top/img/red/Crown.png");
  return (
    <>
      <Image
        image={image}
        x={Gx + xx * size}
        y={Gy + yy * size}
        width={size}
        height={size}
      />
      <Text
        x={Gx + xx * size + size / 4}
        y={Gy + yy * size + size / 4}
        text={num}
        fontSize={size / 2}
        fontFamily="serif"
        fill="white"
      />
    </>
  );
};

const WangguanImage_blue = (param) => {
  const xx = param.x;
  const yy = param.y;
  const size = param.size;
  const num = param.num;
  const [image] = useImage("http://www.yvmu.top/img/blue/crown.png");
  return (
    <>
      <Image
        image={image}
        x={Gx + xx * size}
        y={Gy + yy * size}
        width={size}
        height={size}
      />
      <Text
        x={Gx + xx * size + size / 4}
        y={Gy + yy * size + size / 4}
        text={num}
        fontSize={size / 2}
        fontFamily="serif"
        fill="white"
      />
    </>
  );
};

const ChenbaoImage_red = (param) => {
  const xx = param.x;
  const yy = param.y;
  const size = param.size;
  const num = param.num;
  const [image] = useImage("http://www.yvmu.top/img/red/castle.png");
  return (
    <>
      <Image
        image={image}
        x={Gx + xx * size}
        y={Gy + yy * size}
        width={size}
        height={size}
      />
      <Text
        x={Gx + xx * size + size / 4}
        y={Gy + yy * size + size / 4}
        text={num}
        fontSize={size / 2}
        fontFamily="serif"
        fill="white"
      />
    </>
  );
};

const ChenbaoImage_blue = (param) => {
  const xx = param.x;
  const yy = param.y;
  const size = param.size;
  const num = param.num;
  const [image] = useImage("http://www.yvmu.top/img/blue/castle.png");
  return (
    <>
      <Image
        image={image}
        x={Gx + xx * size}
        y={Gy + yy * size}
        width={size}
        height={size}
      />
      <Text
        x={Gx + xx * size + size / 4}
        y={Gy + yy * size + size / 4}
        text={num}
        fontSize={size / 2}
        fontFamily="serif"
        fill="white"
      />
    </>
  );
};

const ChenbaoImage = (param) => {
  const xx = param.x;
  const yy = param.y;
  const size = param.size;
  const num = param.num;
  const [image] = useImage("http://www.yvmu.top/img/neutrality/Castle.png");
  return (
    <>
      <Image
        image={image}
        x={Gx + xx * size}
        y={Gy + yy * size}
        width={size}
        height={size}
      />
      <Text
        x={Gx + xx * size + size / 4}
        y={Gy + yy * size + size / 4}
        text={num}
        fontSize={size / 2}
        fontFamily="serif"
        fill="white"
      />
    </>
  );
};

const Plaid_red = (param) => {
  const xx = param.x;
  const yy = param.y;
  const size = param.size;
  const num = param.num;
  return (
    <>
      <Rect
        x={Gx + xx * size}
        y={Gy + yy * size}
        width={size}
        height={size}
        fill="red"
        stroke="black"
        strokeWidth={0.5}
      />
      <Text
        x={Gx + xx * size + size / 4}
        y={Gy + yy * size + size / 4}
        text={num}
        fontSize={size / 2}
        fontFamily="serif"
        fill="white"
      />
    </>
  );
};

const Plaid_blue = (param) => {
  const xx = param.x;
  const yy = param.y;
  const size = param.size;
  const num = param.num;
  return (
    <>
      <Rect
        x={Gx + xx * size}
        y={Gy + yy * size}
        width={size}
        height={size}
        fill="blue"
        stroke="black"
        strokeWidth={0.5}
      />
      <Text
        x={Gx + xx * size + size / 4}
        y={Gy + yy * size + size / 4}
        text={num}
        fontSize={size / 2}
        fontFamily="serif"
        fill="white"
      />
    </>
  );
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
        <Judge tick={this.props.tick} />
      </>
    );
  }
}

/* 延时函数(length, setState) {
  for(var i = 0; i < length; ++i) {
    setState(i);

    wait(200);
  }
  setState(i)
} */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tick: -1,
      secondsElapsed: 0
    };
  }
  record = () => {
    this.setState({
      tick: this.state.tick+1
    })
    console.log("timer");
  }
  timerStart= () => {
    timer = setInterval(() => this.record(), 100);
  }
  timerStop= () => {
    clearInterval(timer);
  }

  render() {
    var isEnded = false;
    if(this.state.tick < ticks.length - 1) {
      
    }else {
      this.timerStop();
      isEnded = true;
    }

    return (
      <>
        <div>
        <button onClick={this.timerStart}>timerStart</button>
        <button onClick={this.timerStop}>timerStop</button>
        {isEnded ? Data.data.result.winner+"胜利" : ""}
        </div>
        <Stage width={1238} height={window.innerHeight}>
          <Layer>
            <Board />
            <Game tick={this.state.tick} />
          </Layer>
        </Stage>
      </>
    );
  }
}

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

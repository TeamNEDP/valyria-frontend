// import * from "@/components/GameFunctions"
import { Stage, Layer, Rect, Text, Image, Group } from "react-konva";
import useImage from "use-image";


const Gx = window.innerWidth / 10;
const Gy = window.innerHeight / 10;

export function draw(i, j, size, type, soldiers) {
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
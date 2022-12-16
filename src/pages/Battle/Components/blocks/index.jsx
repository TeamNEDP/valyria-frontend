import { Rect, Text, Image } from "react-konva";
import useImage from "use-image";
import CaB from "../../img/CaB.png"
import CaR from "../../img/CaR.png"
import CaN from "../../img/CaN.png"
import CrB from "../../img/CrB.png"
import CrR from "../../img/CrR.png"
import Mot from "../../img/Mot.png"

export function draw(i, j, size, type, soldiers, Stx, Sty) {

  switch (type) {
    case "M":
      return <Mountain x={i} y={j} size={size} Stx={Stx} Sty={Sty}/>;
    case "C":
      return <CastleNone x={i} y={j} size={size} num={soldiers} Stx={Stx} Sty={Sty} />;
    case "R":
      return <CrownRed x={i} y={j} size={size} num={soldiers} Stx={Stx} Sty={Sty} />;
    case "B":
      return <CrownBlue x={i} y={j} size={size} num={soldiers} Stx={Stx} Sty={Sty} />;
    case "CR":
      return <CastleRed x={i} y={j} size={size} num={soldiers} Stx={Stx} Sty={Sty} />;
    case "CB":
      return <CastleBlue x={i} y={j} size={size} num={soldiers} Stx={Stx} Sty={Sty} />;
    case "LR":
      return <PlainRed x={i} y={j} size={size} num={soldiers} Stx={Stx} Sty={Sty} />;
    case "LB":
      return <PlainBlue x={i} y={j} size={size} num={soldiers} Stx={Stx} Sty={Sty} />;
  }
}

const Mountain = (param) => {
  const xx = param.x;
  const yy = param.y;
  const Gx = param.Stx;
  const Gy = param.Sty;
  const size = param.size;
  const [image] = useImage(Mot);
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

const CrownRed = (param) => {
  const xx = param.x;
  const yy = param.y;
  const Gx = param.Stx;
  const Gy = param.Sty;
  const size = param.size;
  const num = param.num;
  const [image] = useImage(CrR);
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

const CrownBlue = (param) => {
  const xx = param.x;
  const yy = param.y;
  const Gx = param.Stx;
  const Gy = param.Sty;
  const size = param.size;
  const num = param.num;
  const [image] = useImage(CrB);
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

const CastleRed = (param) => {
  const xx = param.x;
  const yy = param.y;
  const Gx = param.Stx;
  const Gy = param.Sty;
  const size = param.size;
  const num = param.num;
  const [image] = useImage(CaR);
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

const CastleBlue = (param) => {
  const xx = param.x;
  const yy = param.y;
  const Gx = param.Stx;
  const Gy = param.Sty;
  const size = param.size;
  const num = param.num;
  const [image] = useImage(CaB);
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

const CastleNone = (param) => {
  const xx = param.x;
  const yy = param.y;
  const Gx = param.Stx;
  const Gy = param.Sty;
  const size = param.size;
  const num = param.num;
  const [image] = useImage(CaN);
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

const PlainRed = (param) => {
  const xx = param.x;
  const yy = param.y;
  const Gx = param.Stx;
  const Gy = param.Sty;
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

const PlainBlue = (param) => {
  const xx = param.x;
  const yy = param.y;
  const Gx = param.Stx;
  const Gy = param.Sty;
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

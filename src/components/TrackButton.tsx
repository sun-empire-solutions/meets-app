import { MouseEventHandler, useState } from "react";

const TrackButton = ({ type, isActive, handlerClick }: IProps) => {
  return (
    <button type="submit" className="buttons" onClick={handlerClick}></button>
  );
};

type IProps = {
  type: IType;
  isActive: boolean;
  handlerClick: () => void;
};

export type IType = "micro" | "camara";

export { TrackButton };

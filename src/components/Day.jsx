import { useSize } from "ahooks";
import { Tooltip } from "antd";
import { useRef, useState } from "preact/hooks";
import React, { memo } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
  display: grid;
  min-width: 200px;
  min-height: 36px;
  grid-template-columns: repeat(48, auto);
  .item {
    height: 100%;
    width: 100%;
    border-top: 1px solid #a0a4a8;
    border-bottom: 1px solid #a0a4a8;
    :nth-child(odd) {
      border-right: 1px dashed #ddd;
    }
    :nth-child(even) {
      border-right: 1px solid #ddd;
    }
    .item-active {
      background-color: blue;
    }
  }
  .left,
  .right {
    position: absolute;
    width: 3px;
    height: 36px;
    background-color: red;
    top: 1px;
    cursor: w-resize;
  }
  .left {
    left: 0px;
  }
  .right {
    right: 0px;
  }
`;
const RANGE_DAY = 48;

export const Day = memo((props) => {
  const { value = [{ from: 0, to: 8, width: 200 }] } = props;
  const dayRef = useRef();
  const size = useSize(dayRef);
  const [isResizing, setIsResizing] = useState(null);
  const [startX, setStartX] = useState(0);
  const [vals, setVals] = useState([{ from: 0, to: 8, width: 200 }]);
  const days = [];
  for (let index = 0; index < RANGE_DAY; index++) {
    days.push(<div className={`item`}> </div>);
  }
  const handleMouseDownLeft = (e) => {
    setIsResizing("left");
    setStartX(e.clientX);
  };
  const handleMouseDownRight = (e) => {
    setIsResizing("right");
    setStartX(e.clientX);
  };
  const handleMouseMove = (e) => {
    if (!isResizing) return;
    switch (isResizing) {
      case "left":
        const rangeChange = (e.clientX - startX)*100/size?.width
        const newS = [...vals]
        newS[0].from =rangeChange
        setVals(newS)
      
        break;

      default:
        break;
    }
  };

  const handleMouseUp = () => {
    setIsResizing(null);
  };

  return (
    <div
      ref={dayRef}
      style={{
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "row",
      }}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Wrap>
        {days}
        {vals?.map((time, index) => {
          const start = (time.from * 100) / 48;
          const width = ((time.to - time.from) * size?.width) / 48;
          return (
            <Tooltip placement="bottom" title={`TATA`}>
              <div
                key={index.toString()}
                style={{
                  position: "absolute",
                  left: `${start}%`,
                  height: 36,
                  background: "#7EBBFC",
                  borderRadius: 4,
                  opacity: 0.8,
                  cursor: "pointer",
                  width: width,
                }}
              >
                <div className="left" onMouseDown={handleMouseDownLeft}></div>
                <div className="right" onMouseDown={undefined}></div>
              </div>
            </Tooltip>
          );
        })}
      </Wrap>
    </div>
  );
});

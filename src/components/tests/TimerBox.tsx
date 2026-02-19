import React, { useState, useEffect } from "react";
import styled from "styled-components";

type TimerBoxProps = {
  durationSec: number;
  finished?: boolean;
  onFinish: () => void;
  spentSec?: number;
  onTick?: (timeLeft: number) => void;
};

const Box = styled.aside<{
  danger: boolean;
  finished: boolean;
}>`
  height: 120px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  background: #fff;
  border: 2px solid
    ${({ finished, danger }) =>
      finished ? "#e5e7eb" : danger ? "#ffb3b3" : "#cfe0ff"};
  color: ${({ finished, danger }) =>
    finished ? "#475569" : danger ? "#e00000" : "#1b5de0"};

  .label {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.8;
  }

  .time {
    font-size: 42px;
    font-weight: 800;
    line-height: 1;
  }
`;

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

export default function TimerBox({
  durationSec,
  finished = false,
  onFinish,
  spentSec,
  onTick,
}: TimerBoxProps) {
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const danger = !finished && timeLeft < 60;

  useEffect(() => {
    if (finished || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [finished, timeLeft, onFinish]);

  useEffect(() => {
    if (!finished) {
      onTick?.(timeLeft);
    }
  }, [timeLeft, finished, onTick]);

  return (
    <Box danger={danger} finished={finished}>
      <div className="label">
        {finished ? "Время выполнения:" : "Осталось времени:"}
      </div>
      <div className="time">
        {finished
          ? formatTime(spentSec ?? durationSec - timeLeft)
          : formatTime(timeLeft)}
      </div>
    </Box>
  );
}

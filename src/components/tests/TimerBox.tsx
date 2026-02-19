type TimerBoxProps = {
// остальной код
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
export default function TimerBox({
  durationSec,
  finished = false,
  onFinish,
  spentSec,
  onTick,
}: TimerBoxProps) {
  
useEffect(() => {
  if (finished) return;
  onTick?.(timeLeft);
}, [timeLeft, finished, onTick]);

return (
  <Box danger={danger} finished={finished}>
    <div className="label">
      {finished ? "Время выполнения:" : "Осталось времени:"}
    </div>

    <div className="time">
      {finished
        ? formatTime(spentSec ?? durationSec - timeLeft)
        : formattedTime}
    </div>
  </Box>
);

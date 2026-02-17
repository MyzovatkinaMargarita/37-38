/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import StudentHeader from "../../components/student/StudentHeader";
import TimerBox from "../../components/tests/TimerBox";
import ResultScore from "../../components/tests/ResultScore";

type ResultScoreProps = {
  earned: number;
  max: number;
};

const Box = styled.div`
  background: #ecfdf3;
  border-radius: 14px;
  padding: 25px 16px;
  text-align: center;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #16a34a;
  margin-bottom: 4px;
`;

const Value = styled.div`
  font-size: 40px;
  font-weight: 800;
  line-height: 1;
  color: #16a34a;
`;
export default function ResultScore({ earned, max }: ResultScoreProps) {
  return (
    <Box>
      <Label>Баллы</Label>
      <Value>
        {earned}/{max}
      </Value>
    </Box>
  );
}
const { id } = useParams();
const navigate = useNavigate();
const location = useLocation();

/**
 * ВРЕМЕННО получаем данные из state
 * Потом здесь будет загрузка результата с API
 */
const state = location.state as
  | {
      earned: number;
      max: number;
      timeSec: number;
      attemptsLeft?: number;
    }
  | undefined;

if (!state) {
  navigate("/student/tests", { replace: true });
  return null;
}

const { earned, max, timeSec, attemptsLeft } = state;

const Layout = styled.section`
  margin: 24px 0;
  display: grid;
  gap: 24px;
`;
const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  max-width: 760px;
`;
const AttemptsBox = styled.div`
`;
const AttemptsLabel = styled.div`
`;
const AttemptsValue = styled.div`
`;
const Actions = styled.div`
`;
const RetryButton = styled.button`
`;

<CardsRow>
  <ResultScore earned={earned} max={max} />

  <TimerBox
    durationSec={timeSec}
    spentSec={timeSec}
    finished
  />

  {typeof attemptsLeft === "number" && (
    <AttemptsBox>
      <AttemptsLabel>Осталось попыток</AttemptsLabel>
      <AttemptsValue>{attemptsLeft}</AttemptsValue>
    </AttemptsBox>
  )}
</CardsRow>

{attemptsLeft !== 0 && (
  <Actions>
    <RetryButton
      onClick={() =>
        navigate(`/student/test/${id}`, { replace: true })
      }
    >
      Пройти заново
    </RetryButton>
  </Actions>
)}




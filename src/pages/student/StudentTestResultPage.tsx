/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import StudentHeader from "../../components/student/StudentHeader";
import { TimerBox } from "../../components/tests/TimerBox";
import ResultScore from "../../components/tests/ResultScore/ResultScore";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AttemptsBlock = styled.div`
  background-color: #ffffff;
  border: 1px solid #e9edf5;
  border-radius: 14px;
  padding: 18px 16px;
  text-align: center;
`;

const AttemptsLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 4px;
`;

const AttemptsValue = styled.div`
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
  color: #475569;
`;

// Зона действий
const ActionZone = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;

const RetryButton = styled.button`
  appearance: none;
  border: none;
  border-radius: 10px;
  padding: 12px 18px;
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const BackButton = styled.button`
  background: transparent;
  color: #64748b;
  border: none;
  margin-top: 12px;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;

export default function StudentTestResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as
    | {
        earned: number;
        max: number;
        timeSec: number;
        attemptsLeft?: number;
      }
    | undefined;

  if (!state) {
    return <Navigate to="/student/tests" replace />;
  }

  return (
    <>
      <StudentHeader />
      <Container>
        <ResultScore earned={state.earned} max={state.max} />
        
        <TimerBox 
          durationSec={state.timeSec} 
          finished={true} 
        />

     
        <AttemptsBlock>
          <AttemptsLabel>Осталось попыток</AttemptsLabel>
          <AttemptsValue>{state.attemptsLeft ?? 0}</AttemptsValue>
        </AttemptsBlock>

       
        <ActionZone>
          <RetryButton onClick={() => navigate(`/student/tests/${id}/run`)}>
            Пройти тест еще раз
          </RetryButton>
          
          <BackButton onClick={() => navigate("/student/tests")}>
            Вернуться к списку тестов
          </BackButton>
        </ActionZone>
      </Container>
    </>
  );
}

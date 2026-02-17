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

const ActionButton = styled.button`
  background: #1b5de0;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #164bb5;
  }
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

        <ActionButton onClick={() => navigate("/student/tests")}>
          Вернуться к списку тестов
        </ActionButton>
      </Container>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResultScore from "../../components/tests/ResultScore";
import TimerBox from "../../components/tests/TimerBox";

type TestMeta = {
  id: number;
  durationSec: number;
  attemptsAllowed: number;
  allowRetry: boolean;
  passScore: number;
};

const StudentRunTests: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const [testMeta, setTestMeta] = useState<TestMeta | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [maxScore, setMaxScore] = useState(100);

  const durationSec = testMeta?.durationSec ?? 600;
  const [timeLeftSec, setTimeLeftSec] = useState(durationSec);

  useEffect(() => {
    fetch("/data/tests.json")
      .then((r) => r.json())
      .then((tests: TestMeta[]) => {
        const found = tests.find((t) => t.id === Number(testId));
        setTestMeta(found ?? null);
      });
  }, [testId]);

  useEffect(() => {
    if (testMeta) {
      setTimeLeftSec(testMeta.durationSec);
    }
  }, [testMeta]);

  function handleSubmit() {
    if (!testMeta) return;

    const spentSec = durationSec - timeLeftSec;

    if (testMeta.attemptsAllowed > 1 && testMeta.allowRetry) {
      navigate(`/student/test/${testId}/result`, {
        replace: true,
        state: {
          earned: totalScore,
          max: maxScore,
          timeSec: spentSec,
          attemptsLeft: testMeta.attemptsAllowed - 1,
        },
      });
      return;
    }

    setShowResult(true);
  }

  return (
    <div style={{ display: "flex", gap: 30 }}>
      {/* Основной контент теста */}
      <div style={{ flex: 1 }}>
        {/* Здесь логика вопросов */}
      </div>

      {/* Правая колонка */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 300 }}>
        {showResult && (
          <ResultScore earned={totalScore} max={maxScore} />
        )}
        
        <TimerBox
          durationSec={durationSec}
          finished={showResult}
          onTick={setTimeLeftSec}
          onFinish={() => {
            if (!showResult) handleSubmit();
          }}
        />
      </div>
    </div>
  );
};

export default StudentRunTests;

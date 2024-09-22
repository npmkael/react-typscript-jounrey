type Props = {
  index: number;
  numQuestion: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
};

const Progress = ({
  index,
  numQuestion,
  points,
  maxPossiblePoints,
  answer,
}: Props) => {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestion}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
};

export default Progress;

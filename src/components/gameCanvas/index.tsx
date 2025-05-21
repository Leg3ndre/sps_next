import styles from './index.module.css';
type Props = {
  setPlayerLife: (life: number) => void;
  setScore: (score: number) => void;
}

const GameCanvas = ({ setPlayerLife, setScore }: Props) => {

  return (
    <>
      <canvas id="game" width={640} height={480} className={styles.gameCanvas} />
    </>
  );
}

export default GameCanvas;

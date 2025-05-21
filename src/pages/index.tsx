import styles from './index.module.css';
import GameDesc from '@/components/gameDesc';

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>Second Person Shooting</h1>
      <div className={styles.scores}>
        <span id="pl-score" className={styles.plScore}>PLAYER&apos;S LIFE: 5</span>
        <span id="en-score" className={styles.enScore}>ENEMY&apos;S LIFE: 5</span>
      </div>
      <canvas id="game" className={styles.gameCanvas} width="640" height="480"></canvas>
      <a href="#">Retry</a>
      <GameDesc />
    </>
  );
}

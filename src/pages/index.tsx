import styles from './index.module.css';
import { useState } from 'react';
import * as CONST from '@/constants/game';
import GameDesc from '@/components/gameDesc';
import GameCanvas from '@/components/gameCanvas';

export default function Home() {
  const [playerLife, setPlayerLine] = useState(CONST.INITIAL_LIFE);
  const [enemyLife, setEnemyLife] = useState(CONST.INITIAL_LIFE);

  return (
    <>
      <h1 className={styles.title}>Second Person Shooting</h1>
      <div className={styles.scores}>
        <span id="pl-life" className={styles.plLife}>PLAYER&apos;S LIFE: {playerLife}</span>
        <span id="en-life" className={styles.enLife}>ENEMY&apos;S LIFE: {enemyLife}</span>
      </div>
      <GameCanvas
        setPlayerLife={setPlayerLine}
        setScore={setEnemyLife}
      />
      <a href="#">Retry</a>
      <GameDesc />
    </>
  );
}

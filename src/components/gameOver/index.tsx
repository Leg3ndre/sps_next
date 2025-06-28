import styles from './index.module.css';
import { useEffect } from 'react';

type Props = {
  playerLife: number;
  enemyLife: number;
}

const GameOver = ({ playerLife, enemyLife }: Props) => {
  useEffect(() => {
    if (playerLife > 0 && enemyLife > 0) return;

    const elm = document.getElementById('gameOver')!;
    elm.style.display = "block";
  }, [playerLife, enemyLife]);

  return (
    <div id="gameOver" className={styles.gameOver}>
      <div className={styles.gameOverHeader}>{ playerLife <= 0 ? 'You Lose...' : 'You win!!' }</div>
    </div>
  );
}

export default GameOver;

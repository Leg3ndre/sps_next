import { useEffect, useRef } from 'react';
import styles from './index.module.css';
import * as CONST from '@/constants/game';
import GameOver from '@/components/gameOver';
import useAnimateEffect from '@/hooks/animate';
import useKeyboardEffect from '@/hooks/keyboard';
import Field from '@/gameLogic/field';
import Player from '@/gameLogic/player';
import Enemy from '@/gameLogic/enemy';

type Props = {
  setPlayerLife: (playerLife: number) => void;
  setEnemyLife: (enemyLife: number) => void;
}

const GameCanvas = ({ setPlayerLife, setEnemyLife }: Props) => {
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const keysPressed = useKeyboardEffect();
  const field = useRef(new Field);
  const player = useRef<Player | null>(null);
  const enemy = useRef(new Enemy);
  const isGameOver = useRef(false);

  useEffect(() => {
    // 上下キーでスクロールが発生しないように
    document.body.addEventListener("keydown", (e) => e.preventDefault());
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    if (!canvas || !canvas.getContext) return;

    ctx.current = canvas.getContext('2d');
  }, []);

  useEffect(() => {
    player.current = new Player;
  }, []);

  const checkGameOver = () => {
    if (player.current && player.current.life <= 0) return true;
    if (enemy.current.life <= 0) return true;

    return false;
  }

  const animateCallback = () => {
    if (ctx.current == null) {
      console.log("Cannot find canvas context!!");
      return;
    }
    if (player.current == null) {
      console.log("Cannot create player object!!");
      return;
    }

    ctx.current.clearRect(0, 0, 640, 480);
    field.current.draw(ctx.current, enemy.current.position);
    player.current.draw(ctx.current, enemy.current.position);
    enemy.current.draw(ctx.current);

    player.current.tick(keysPressed, enemy.current.shotList);
    if (!isGameOver.current) setPlayerLife(player.current.life);
    enemy.current.tick(player.current.position, player.current.shotList);
    if (!isGameOver.current) setEnemyLife(enemy.current.life);
    isGameOver.current = checkGameOver();
  };

  useAnimateEffect(animateCallback);

  const playerLife = player.current ? player.current.life : CONST.INITIAL_LIFE;
  return (
    <div className={styles.gameContainer}>
      <canvas id="game" width={640} height={480} className={styles.gameCanvas} />
      <GameOver playerLife={playerLife} enemyLife={enemy.current.life} />
    </div>
  );
}

export default GameCanvas;

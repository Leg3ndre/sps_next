import { useEffect, useRef } from 'react';
import styles from './index.module.css';
import useAnimateEffect from '@/hooks/animate';
import useKeyboardEffect from '@/hooks/keyboard';
import Field from '@/gameLogic/field';
import Player from '@/gameLogic/player';
import Enemy from '@/gameLogic/enemy';

type Props = {
  setPlayerLife: (life: number) => void;
  setScore: (score: number) => void;
}

const GameCanvas = ({ setPlayerLife, setScore }: Props) => {
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const keysPressed = useKeyboardEffect();
  const field = useRef(new Field);
  const player = useRef<Player | null>(null);
  const enemy = useRef(new Enemy);

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

    player.current.tick(ctx.current, keysPressed, enemy.current.position, enemy.current.shotList);
    setPlayerLife(player.current.life);
    enemy.current.tick(ctx.current, player.current.position);
  };

  useAnimateEffect(animateCallback);

  return (
    <>
      <canvas id="game" width={640} height={480} className={styles.gameCanvas} />
    </>
  );
}

export default GameCanvas;

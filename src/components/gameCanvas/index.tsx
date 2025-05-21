import { useEffect, useRef } from 'react';
import styles from './index.module.css';
import useAnimateEffect from '@/hooks/animate';
import Field from '@/gameLogic/field';

type Props = {
  setPlayerLife: (life: number) => void;
  setScore: (score: number) => void;
}

const GameCanvas = ({ setPlayerLife, setScore }: Props) => {
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const field = useRef(new Field);

  useEffect(() => {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    if (!canvas || !canvas.getContext) return;

    ctx.current = canvas.getContext('2d');
  }, []);

  const animateCallback = () => {
    if (ctx.current == null) {
      console.log("Cannot find canvas context!!");
      return;
    }

    ctx.current.clearRect(0, 0, 640, 480);
    field.current.draw(ctx.current, 0.0);
  };

  useAnimateEffect(animateCallback);

  return (
    <>
      <canvas id="game" width={640} height={480} className={styles.gameCanvas} />
    </>
  );
}

export default GameCanvas;

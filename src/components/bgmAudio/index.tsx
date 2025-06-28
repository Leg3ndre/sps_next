import { useEffect } from 'react';
import styles from './index.module.css';

const BgmAudio = () => {
  const INITIAL_VOLUME = 0.1;

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      !(e.key == 'a' || e.key == 'd' || e.key == 'ArrowLeft' || e.key == 'ArrowRight')
    ) return;

    const audioElm = document.getElementById('bgm') as HTMLAudioElement;
    audioElm.volume = INITIAL_VOLUME;
    audioElm.play();
  }

  const title = 'Look at me!!';
  const composer = 'Mr.O';

  return(
    <div className={styles.bgm}>
      <audio id="bgm" src="./bgm.mp3" controls autoPlay loop>
        <p>お使いのブラウザでは再生できません</p>
      </audio>
      <span className={styles.bgmDesc}>
        BGM: <b>{title}</b> - <span className={styles.composer}>by {composer}</span>
      </span>
    </div>
  );
}

export default BgmAudio;

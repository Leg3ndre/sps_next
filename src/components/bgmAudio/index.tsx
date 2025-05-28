import styles from './index.module.css';

const BgmAudio = () => {
  return(
    <div className={styles.bgm}>
      <audio src="/bgm.mp3" controls autoPlay loop></audio>
      <span className={styles.bgmDesc}>
        BGM: <b>Look at me!!</b> - <span className={styles.composer}>by Mr.O</span>
      </span>
    </div>
  );
}

export default BgmAudio;

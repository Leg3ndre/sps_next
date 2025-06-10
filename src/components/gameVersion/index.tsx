import styles from './index.module.css';

const GameVersion = () => {
  const VERSION = 'v1.0.6';

  return (
    <div className={styles.version}>
      <code className={styles.currentVersion}>{VERSION}</code>
    </div>
  );
}

export default GameVersion;

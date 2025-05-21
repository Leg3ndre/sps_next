import styles from './index.module.css';

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
      <div className={styles.desc}>
        <p className={styles.abstract}>
          FPS（一人称視点）、TPS（三人称視点）に支配された現代のシューティングゲーム界隈に一石を投じる
          <strong>二人称視点のシューティングゲーム</strong>
          です。
        </p>
        <ul className={styles.playManual}>
          <li>ゲームは<strong>敵視点</strong>で進行します</li>
          <li>プレイヤーが操作するのは画面奥の黄色いキャラクター（Mr.K）です</li>
          <li>三角形の物体が弾です（赤: 自分の弾、緑: 敵の弾）。弾は同時に5発までしか撃てません</li>
          <li>敵の弾を避け、自分の弾を敵にうまく当ててください</li>
          <li>※ 現状では敵のライフを0にしてもゲームは終了しません</li>
          <li>操作方法
            <ul>
              <li>→ or D: 右へ移動</li>
              <li>← or A: 左へ移動</li>
              <li>↑ or W: 弾を発射</li>
              <li>R: リトライ</li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

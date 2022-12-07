import * as React from "react";
import styles from "./card.module.scss";
const Card = ({ Icon, title, count }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardText}>
        <p>{title}</p>
        <h1>{count}</h1>
      </div>
      <div className={styles.cardIcon}>
        <div className={styles.circle}>{Icon && <Icon />}</div>
      </div>
    </div>
  );
};

export default Card;

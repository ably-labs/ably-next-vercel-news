import React, { useState } from "react";
import { usePresence } from "@ably-labs/react-hooks";
import styles from "../styles/Home.module.css";

const AblyPresence = (props) => {
  const [presenceData] = usePresence("news-list");

  const presenceList = presenceData.map((member, index) => {
    const isItMe = member.clientId === props.clientId ? "(me)" : "";
    return (
      <li key={index}>
        <span className={styles.participant}>{member.clientId}</span>{" "}
        <span className={styles.me}>{isItMe}</span>
      </li>
    );
  });

  return <div>{presenceList}</div>;
};

export default AblyPresence;

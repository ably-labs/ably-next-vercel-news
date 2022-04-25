import React from "react";
import { usePresence } from "@ably-labs/react-hooks";
import styles from "../styles/Home.module.css";

/* Retrieves the Presence set from the "news-list" channel and lists
the members using their client Id */
const AblyPresence = (props) => {
  const [presenceData] = usePresence("news-list");

  const presenceList = presenceData.map((member, index) => {
    /* Is this member of the Presence set the current user? If so,
    mark it as "(me)" */
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

import React from "react";
import { usePresence } from "@ably-labs/react-hooks";
import styles from "../styles/Home.module.css";

/* Retrieves the Presence set from the "news-list" channel and lists
the members using their client Id */
const AblyPresence = (props) => {
  const [presenceData] = usePresence("news-list");

  const presenceList = presenceData.map((member, index) => {
    return (
      <li key={index}>
        <span className={styles.participant}>{member.clientId}</span>{" "}
      </li>
    );
  });

  return <div>{presenceList}</div>;
};

export default AblyPresence;

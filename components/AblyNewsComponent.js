import React from "react";
import { configureAbly } from "@ably-labs/react-hooks";
import styles from "../styles/Home.module.css";
import { generateRandomName } from "../lib/randomNames";
import AblyPubSub from "./AblyPubSub";
import AblyPresence from "./AblyPresence";

const clientId = generateRandomName();

const AblyNewsComponent = (props) => {
  configureAbly({ key: props.apiKey, clientId: clientId });
  return (
    <div className={styles.chatHolder}>
      <h3>Participants</h3>
      <AblyPresence clientId={clientId} />
      <h3>Headlines</h3>
      <AblyPubSub />
    </div>
  );
};

export default AblyNewsComponent;

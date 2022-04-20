import React from "react";
import { configureAbly } from "@ably-labs/react-hooks";
import styles from "../styles/Home.module.css";
import { generateRandomName } from "../lib/randomNames";
import AblyPubSubComponent from "./AblyPubSubComponent";
import AblyPresenceComponent from "./AblyPresenceComponent";

const clientId = generateRandomName();

const AblyNewsComponent = (props) => {
  configureAbly({ key: props.apiKey, clientId: clientId });
  return (
    <div className={styles.chatHolder}>
      <h3>Participants</h3>
      <AblyPresenceComponent clientId={clientId} />
      <h3>Headlines</h3>
      <AblyPubSubComponent />
    </div>
  );
};

export default AblyNewsComponent;

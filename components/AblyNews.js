import React from "react";
import { configureAbly } from "@ably-labs/react-hooks";
import { generateRandomName } from "../lib/randomNames";
import AblyPubSub from "./AblyPubSub";
import AblyPresence from "./AblyPresence";

const clientId = generateRandomName();

/* Parent component that configures an instance of the Ably client
and makes it available to the child components */
const AblyNews = (props) => {
  configureAbly({ key: props.apiKey, clientId: clientId });
  return (
    <div>
      <h3>Participants</h3>
      <AblyPresence clientId={clientId} />
      <h3>Headlines</h3>
      <AblyPubSub />
    </div>
  );
};

export default AblyNews;

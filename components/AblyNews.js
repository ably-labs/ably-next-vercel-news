import React from "react";
import AblyPubSub from "./AblyPubSub";
import AblyPresence from "./AblyPresence";
import { configureAbly } from "@ably-labs/react-hooks";

const ably = configureAbly({ authUrl: "/api/auth" });

/* Parent component that configures an instance of the Ably client
and makes it available to the child components */
const AblyNews = () => {
  return (
    <div>
      <h3>Participants</h3>
      <AblyPresence />
      <h3>Headlines</h3>
      <AblyPubSub />
    </div>
  );
};

export default AblyNews;

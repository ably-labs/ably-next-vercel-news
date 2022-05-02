import React from "react";
import { configureAbly } from "@ably-labs/react-hooks";
import AblyPubSub from "./AblyPubSub";
import AblyPresence from "./AblyPresence";

/* Parent component that configures an instance of the Ably client
and makes it available to the child components */

const AblyNews = (props) => {
  const ably = configureAbly({
    authUrl: "/api/auth",
  });
  return (
    <div>
      <h3>Participants</h3>
      <AblyPresence user={ably.auth} />
      <h3>Headlines</h3>
      <AblyPubSub history={props.history} />
    </div>
  );
};

export default AblyNews;

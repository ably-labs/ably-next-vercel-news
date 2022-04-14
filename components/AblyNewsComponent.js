import React, { useState } from "react";
import { configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";
import styles from "../styles/AblyNewsComponent.module.css";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import date from "date-and-time";

const randomName = uniqueNamesGenerator({
  dictionaries: [adjectives, animals, colors],
  length: 2,
});

const AblyNewsComponent = (props) => {
  configureAbly({ key: props.apiKey, clientId: randomName });
  let inputBox = null;
  let messageEnd = null;

  const [headlineText, setHeadlineText] = useState("");
  const [headlines, updateHeadlines] = useState([]);
  const headlineTextIsEmpty = headlineText.trim().length === 0;

  const [channel, ably] = useChannel("[?rewind=10]news-list", (message) => {
    updateHeadlines((prev) => [...prev, message]);
  });

  const [presenceData] = usePresence("news-list");

  const headlinePreviews = headlines.map((headline, index) => {
    const timestamp = new Date(headline.timestamp);
    const formattedDate = "";
    if (timestamp.getDate() === new Date().getDate()) {
      formattedDate = `Today ${date.format(timestamp, "HH:mm:ss")}`;
    } else {
      formattedDate = date.format(timestamp, "ddd HH:mm:ss");
    }
    const author =
      headline.clientId === ably.auth.clientId ? "(me)" : headline.clientId;
    return (
      <li key={index}>
        {headline.data}
        {"     "}
        <span className={styles.timestamp}>{formattedDate}</span>{" "}
        <span className={styles.author}>{author}</span>
      </li>
    );
  });

  const presenceList = presenceData.map((member, index) => {
    const isItMe = member.clientId === ably.auth.clientId ? "(me)" : "";
    return (
      <li key={index}>
        <span className={styles.participant}>{member.clientId}</span>{" "}
        <span className={styles.me}>{isItMe}</span>
      </li>
    );
  });

  const sendNewHeadlineMessage = (headlineText) => {
    channel.publish({ name: "news-list", data: headlineText });
    setHeadlineText("");
    inputBox.focus();
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendNewHeadlineMessage(headlineText);
  };

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || headlineTextIsEmpty) {
      return;
    }
    sendNewHeadlineMessage(messageText);
    event.preventDefault();
  };

  return (
    <div className={styles.chatHolder}>
      <h3>Participants</h3>
      {presenceList}
      <div className={styles.chatText}>
        <h3>Headlines</h3>
        {headlinePreviews}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
      </div>
      <form onSubmit={handleFormSubmission} className={styles.form}>
        <input
          type="text"
          ref={(element) => {
            inputBox = element;
          }}
          value={headlineText}
          placeholder="Type your headline..."
          onChange={(event) => setHeadlineText(event.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.inputbox}
        ></input>
        <button
          type="submit"
          className={styles.button}
          disabled={headlineTextIsEmpty}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AblyNewsComponent;

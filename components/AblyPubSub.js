import React, { useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import styles from "../styles/Home.module.css";
import date from "date-and-time";

/* Subscribes to headline messages from the "news-list" channel
and provides a form to enter new headlines which it publishes to 
the same channel */
const AblyPubSub = () => {
  let inputBox = null;
  let messageEnd = null;

  const [headlineText, setHeadlineText] = useState("");
  const [headlines, updateHeadlines] = useState([]);
  const headlineTextIsEmpty = headlineText.trim().length === 0;

  /* Set the `rewind` parameter to retrieve up to ten historical 
  messages from the channel, if available */
  const [channel, ably] = useChannel("[?rewind=10]news-list", (message) => {
    updateHeadlines((prev) => [...prev, message]);
  });

  /* Process each message to retrieve the timestamp and author (client Id) */
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

  const sendNewHeadlineMessage = (headlineText) => {
    channel.publish({ data: headlineText });
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
    sendNewHeadlineMessage(headlineText);
    event.preventDefault();
  };

  return (
    <div>
      <div>{headlinePreviews}</div>

      <div
        ref={(element) => {
          messageEnd = element;
        }}
      ></div>
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
        />
        <button
          type="submit"
          className={styles.submitbutton}
          disabled={headlineTextIsEmpty}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AblyPubSub;

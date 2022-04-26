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

  const formatDate = (timestamp) => {
    const dateToFormat = new Date(timestamp);
    const formattedDate = "";
    if (dateToFormat.getDate() === new Date().getDate()) {
      formattedDate = `Today ${date.format(dateToFormat, "HH:mm:ss")}`;
    } else {
      formattedDate = date.format(dateToFormat, "ddd HH:mm:ss");
    }
    return formattedDate
  }

  /* Process each message to retrieve the timestamp and author (client Id) */
  const HeadlinePreviews = ({items}) => {
    const previews = items.map((headline, index) => {
      const author =
        headline.clientId === ably.auth.clientId ? "(me)" : headline.clientId;
      return (
        <li key={index}>
          {headline.data}
          {"     "}
          <span className={styles.timestamp}>{formatDate(headline.timestamp)}</span>{" "}
          <span className={styles.author}>{author}</span>
        </li>
      );
    });

    return <ul>{previews}</ul>;
  };

  const sendNewHeadlineMessage = async (headlineText) => {
    /* submit news to the server to verify and then publish */
    await fetch('/api/submit-news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({headline: headlineText})
    });

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
      <div>
        <HeadlinePreviews items={headlines} />
      </div>

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

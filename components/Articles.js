import React, { useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import ArticlePreview from "./ArticlePreview";
import styles from "../styles/Home.module.css";

/* 
clearHistoryState:
  - When true, historical messages are retrieved and rendered statically from the History API.
  - When false, historical messages are retrieved using channel rewind to prevent a race condition
    where new messages are arriving on the channel while history is still being retrieved.
*/
let clearHistoryState = true;

export default function Articles(props) {
  let inputBox = null;

  const [headlineText, setHeadlineText] = useState("");
  const [headlines, updateHeadlines] = useState(props.history);
  const [_, ably] = useChannel("[?rewind=5]headlines", (headline) => {
    if (clearHistoryState) {
      resetHeadlines();
      clearHistoryState = false;
    }

    updateHeadlines((prev) => [headline, ...prev]);
  });

  const resetHeadlines = () => {
    updateHeadlines([]);
  };
  const headlineTextIsEmpty = headlineText.trim().length === 0;

  const processedHeadlines = headlines.map((headline) =>
    processMessage(headline, ably.auth.clientId)
  );
  const articles = processedHeadlines.map((headline, index) => (
    <ArticlePreview key={index} headline={headline} />
  ));

  const handleFormSubmission = async (event) => {
    const nonEnterKeyPress = event.charCode && event.charCode !== 13;
    if (nonEnterKeyPress || headlineTextIsEmpty) {
      return;
    }

    event.preventDefault();

    await fetch("/api/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: headlineText, author: ably.auth.clientId }),
    });

    setHeadlineText("");
    inputBox?.focus();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmission} className={styles.form}>
        <input
          type="text"
          ref={(element) => {
            inputBox = element;
          }}
          value={headlineText}
          placeholder="News article url"
          onChange={(event) => setHeadlineText(event.target.value)}
          onKeyPress={handleFormSubmission}
          className={styles.input}
        />
        <button
          type="submit"
          className={styles.submit}
          disabled={headlineTextIsEmpty}
        >
          Submit
        </button>
      </form>
      <div>{articles}</div>
    </div>
  );
}

function processMessage(headline, currentClientId) {
  headline.data.author =
    headline.data.author === currentClientId ? "me" : headline.data.author;
  headline.data.timestamp =
    "timestamp" in headline ? formatDate(headline.timestamp) : "earlier";
  headline.data.url = headline?.data?.url || "http://example.com";
  headline.data.image =
    headline?.data?.image || "http://placekitten.com/g/200/300";
  return headline;
}

function formatDate(date) {
  const regex = /(?:[^T]+)T([0-9:]+)/gm;
  const dateToFormat = new Date(date).toISOString();
  const match = regex.exec(dateToFormat);
  return match[1];
}

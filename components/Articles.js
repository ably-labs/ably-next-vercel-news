import React, { useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import { formatDate } from "../lib/dates";
import ArticlePreview from "./ArticlePreview";
import styles from "../styles/Home.module.css";

export default function Articles(props) {
  let inputBox = null;
  const defaultMessages = props.history || [];

  const [headlineText, setHeadlineText] = useState("");
  const [headlines, updateHeadlines] = useState(defaultMessages);
  const [_, ably] = useChannel("[?rewind=3]headlines", (headline) => {
    updateHeadlines((prev) => [...prev, headline]);
  });

  const headlineTextIsEmpty = headlineText.trim().length === 0;
  const processedHeadlines = headlines.map((headline) => processMessage(headline, ably.auth.clientId));
  const articles = processedHeadlines.map((headline, index) => <ArticlePreview key={index} headline={headline} />);
  
  const handleFormSubmission = async (event) => {    
    const nonEnterKeyPress = (event.charCode && event.charCode !== 13);
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
          ref={(element) => { inputBox = element; }}
          value={headlineText}
          placeholder="News article url"
          onChange={(event) => setHeadlineText(event.target.value)}
          onKeyPress={handleFormSubmission}
          className={styles.input}
        />
        <button type="submit" className={styles.submit} disabled={headlineTextIsEmpty}>Submit</button>
      </form>

      {articles}
    </div>
  );
}

function processMessage(headline, currentClientId) {    
  headline.data.author = headline.data.author === currentClientId ? "me" : headline.data.author;
  headline.data.timestamp = "timestamp" in headline ? formatDate(headline.timestamp) : "earlier";
  headline.data.url = headline?.data?.url || "http://example.com";
  headline.data.image = headline?.data?.image || "http://placekitten.com/g/200/300";
  return headline;
}

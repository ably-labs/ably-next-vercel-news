import React, { useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { formatDate } from "../lib/dates";

/* Subscribes to headline messages from the "news-list" channel
and provides a form to enter new headlines which it publishes to 
the same channel */
export default function Headlines(props) {
  let inputBox = null;
  let messageEnd = null;

  const [headlineText, setHeadlineText] = useState("");
  const [headlines, updateHeadlines] = useState(props.history);
  const headlineTextIsEmpty = headlineText.trim().length === 0;

  const [channel, ably] = useChannel("headlines", (headline) => {
    updateHeadlines((prev) => [...prev, headline]);
  });

  /* Process each message to retrieve the timestamp and author (client Id) */
  const HeadlinePreviews = ({ items }) => {
    const previews = items.map((headline, index) => {
      let author = "";
      const isMe = headline.data.author === ably.auth.clientId;
      isMe ? (author = "me") : (author = headline.data.author);

      const timestamp =
        "timestamp" in headline ? formatDate(headline.timestamp) : "earlier";

      // while history still full of old messages without urls
      if (!headline.data.url) {
        headline.data.url = "https://example.com";
      }
      if (!headline.data.image) {
        headline.data.image = "http://placekitten.com/g/200/300";
      }

      const imgUrl = `https://res.cloudinary.com/mark-ably/image/fetch/w_200,h_200,c_fill/${headline.data.image}`;

      return (
        <div key={index} className={styles.card}>
          <div className={styles.pic}>
            <Image
              src={imgUrl}
              alt={headline.data.title}
              width={200}
              height={200}
              objectFit="cover"
              quality={80}
            ></Image>
          </div>

          <div>
            <a href={headline.data.url} className={styles.articleLink}>
              {headline.data.title}
            </a>
            {"    "}
            <div className={styles.postDetails}>
              {"   "}({headline.data.site} - shared {timestamp} by {author})
            </div>

            {"    "}
            <p>{headline.data.desc}</p>
          </div>
        </div>
      );
    });

    return <div>{previews}</div>;
  };

  const sendNewHeadlineMessage = async () => {
    /* submit news to the server to verify and then publish */
    await fetch("/api/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: headlineText,
        author: ably.auth.clientId,
      }),
    });

    setHeadlineText("");
    inputBox.focus();
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendNewHeadlineMessage();
  };

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || headlineTextIsEmpty) {
      return;
    }
    sendNewHeadlineMessage();
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmission}>
        <input
          type="text"
          ref={(element) => {
            inputBox = element;
          }}
          value={headlineText}
          placeholder="Enter the URL for the news item you want to share..."
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
      <HeadlinePreviews items={headlines} />

      <div
        ref={(element) => {
          messageEnd = element;
        }}
      ></div>
    </div>
  );
}

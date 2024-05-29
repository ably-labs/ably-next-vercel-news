import React from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

export default function ArticlePreview({ index, headline }) {
  return (
    <article key={index} className={styles.card}>
      <Image
        className={styles.pic}
        src={`https://res.cloudinary.com/mark-ably/image/fetch/w_200,h_200,c_fill/${headline.data.image}`}
        alt={headline.data.title}
        width={200}
        height={200}
        objectFit="cover"
        quality={80}
      ></Image>

      <div className={styles.info}>
        <h1 className={styles.title}>
          <a href={headline.data.url} className={styles.link}>
            {headline.data.title}
          </a>
        </h1>
        <div className={styles.details}>
          {headline.data.site} - shared {headline.data.timestamp} by {headline.data.author}
        </div>
        <p>{headline.data.desc}</p>
      </div>
    </article>
  );
}

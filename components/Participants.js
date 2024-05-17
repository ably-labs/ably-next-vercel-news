import React from 'react';
import { usePresence, usePresenceListener, useAbly } from 'ably/react';
import styles from '../styles/Home.module.css';

export default function Participants(props) {
  const ably = useAbly();
  usePresence('headlines');
  const { presenceData } = usePresenceListener('headlines');

  const presenceList = presenceData.map((member, index) => {
    const isItMe = member.clientId === ably.auth.clientId ? '(me)' : '';

    return (
      <li key={index} className={styles.participant}>
        <span className={styles.name}>{member.clientId}</span>
        <span className={styles.me}>{isItMe}</span>
      </li>
    );
  });

  return <ul>{presenceList}</ul>;
}

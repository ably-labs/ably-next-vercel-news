import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>Powered by</span>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      <span>and</span>
      <Image src="/ably-logo.svg" alt="Ably Logo" width={72} height={20} />
    </footer>
  );
};
export default Footer;

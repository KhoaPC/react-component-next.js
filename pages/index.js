import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.container_home}>
      <h1 className={styles.title_page}>Preview Demo Page</h1>
      <div className={styles.container_product}>
        <div className={styles.product}>
          <Link href="/otp">
            <Image
              className={styles.img_product}
              src="/otp_home.png"
              width={300}
              height={300}
            />
             <div className={styles.title}>OTP input</div>
          </Link>
        </div>
        <div className={styles.product}>
          <Link href="/zoom-img">
            <Image
              className={styles.img_product}
              src="/zoom.jpg"
              width={300}
              height={300}
            />
             <div className={styles.title}>Zoom images</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

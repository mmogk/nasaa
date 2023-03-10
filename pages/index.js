import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState();

  const apiKey = process.env.NEXT_PUBLIC_KEY;
  const url = `https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`


  const getTechTransferData = async () => {
    const res = await axios.get(url);
    const info = await res.data;
    console.log(info);
    setData(info);
  }

  useEffect(() => {
    getTechTransferData();
    }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@100&display=swap" rel="stylesheet"></link>
      </Head>

      <main className={styles.main1}>
        <Link href="/polychromatic">
          <h1>- Polychromatic</h1>
          </Link>
        {
          data && data.results.map((tech, index) => {
            return(
              <div key={index}>
                {
                  tech && tech.map((t, ind) => {
                    if (ind === 10){
                    return(
                      <Image src={t} alt={t} key={ind} width={200} height={200}/>
                    )
                  }
                })
              }
              </div>
            )
          })
        }
      </main>
    </div>
  )
}

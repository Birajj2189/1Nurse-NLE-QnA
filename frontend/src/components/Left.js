import React from 'react'
import styles from '@/app/styles/Left.module.css'
import Link from "next/link";
import Image from "next/image";


function Left() {
    const spaces = [
        {
            id: 'space-1',
            name: 'Technology',
            posts: [
            ]
        },
        {
            id: 'space-2',
            name: 'Science',
            posts: [
            ]
        },    {
            id: 'space-3',
            name: 'Engineering',
            posts: [
            ]
        },
        {
            id: 'space-4',
            name: 'Medical',
            posts: [
            ]
        },    {
            id: 'space-5',
            name: 'BioTechnogoly',
            posts: [
            ]
        }
    ];

    return (
        <div className={`d-lg-block col-xl-3 col-lg-4 col-0 ${styles.leftMain}`}>
            <div className={styles.leftSection}>
                <div className={styles.spaceTitle}>Spaces</div>
                <div className={styles.spaceContainer}>
                    {
                    spaces.map( space => (
                        <li key={space.id} className={styles.linkList}>
                        <Link  className={styles.spaceElement} href={`/spaces/${space.name}`}><Image width={100} height={100} src="/spaceimg.jpg" className={`img-fluid ${styles.spaceImg}`} alt="..."/>{space.name}</Link>
                        </li>
                    ))
                    }

                </div>
                <div className={styles.selfContainer}>
                    <div className={styles.selfTitle}>
                        1Nurse on the go!
                    </div>
                    <div className={styles.selfImage}>
                        <Image className={styles.feedImg} src={'/feed-download-app.png'} width={50} height={50} alt={'...'}/>
                    </div>
                    <div className={styles.socialLink}>
                        <Link href={"/"}><Image src={'/google-play-store.png'} width={90} height={80} alt={'...'}/></Link>
                        <Link href={"/"}><Image src={'/apple-app-store.png'} width={90} height={80} alt={'...'}/></Link>
                    </div>

                </div>
            </div>
        </div>
    );
}


export default Left;



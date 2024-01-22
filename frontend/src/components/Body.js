"use client"

import React, {useEffect} from 'react'
import { useRouter } from 'next/router';
import styles from '@/app/styles/Body.module.css'
import Left from './Left'
import Right from './Right'
import Middle from "./Middle";

const Body = ( ) => {


    return (
        <div className={`${styles.mainScreen}`}>
        <div className={`container ${styles.mainContainer}`}>
            <div className={`g-0 justify-content row`}>
                <div className={`col-12`}>
                    <div className='row gx-0 '>
                        <Left/>
                        <Middle />
                        <Right/>
                    </div>
                </div>
            </div>
        </div>
        </div>


            )

}

export const getServerSideProps = async ({ req }) => {
    // Pass the `req` parameter to the component to handle server-side authentication
    return {
        props: { req },
    };
};
export default Body
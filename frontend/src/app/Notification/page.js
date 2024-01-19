import React from 'react'
import styles from '../styles/Body.module.css'
import Left from '@/components/Left'
import Right from '@/components/Right'

import NotificationMiddle from "@/components/NotificationMiddle";

const Body = ({ spaces }) => {
    return (
        <div className={`${styles.mainScreen}`}>
            <div className={`container ${styles.mainContainer}`}>
                <div className={`g-0 justify-content row`}>
                    <div className={`col-12`}>
                        <div className='row gx-0 '>
                            <Left/>
                            <NotificationMiddle/>
                            <Right/>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default Body
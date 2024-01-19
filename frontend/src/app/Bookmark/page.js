import React from 'react'
import styles from '@/app/styles/Body.module.css'
import Left from '@/components/Left'
import Right from '@/components/Right'
import BookMarkMiddle from "@/components/BookMarkMiddle";

const Page = ({ spaces }) => {
    return (
        <div className={`${styles.mainScreen}`}>
            <div className={`container ${styles.mainContainer}`}>
                <div className={`g-0 justify-content row`}>
                    <div className={`col-12`}>
                        <div className='row gx-0 '>
                            <Left spaces={spaces}/>
                            <BookMarkMiddle/>
                            <Right/>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default Page
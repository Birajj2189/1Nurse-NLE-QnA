import React from 'react'
import styles from '@/app/styles/NotificationMiddle.module.css'
import Image from 'next/image'

function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
}

function NotificationMiddle() {
  return (
    <div className={`${styles.middleSection} col-xl-6 col-lg-8 col-md-12 col-sm-12`}>
        <div className={styles.middleSubsection}>
            <div className={styles.notificationDiv}>
                <div className={styles.notifications}>Notifications:</div>
                <div className={styles.notificationRight}>
                    <div className={styles.markAll}>Mark All As Read</div>
                    <div className={styles.settings}>Settings</div>
                </div>
            </div>
            <div className={`shadow-sm ${styles.quesContainer}`}>
                                <div className={styles.questionHeader}>
                                    <div className={styles.questionUserImage}>
                                        <Image src="/logo.jpg" alt={"null"} width="60" height="60"/>
                                    </div>
                                    <div className={styles.questionUserContent}>
                                        <div className="user">
                                            <div className={styles.questionUser}>
                                                <div className={styles.questionUserName}>1Nurse Education</div>
                                                <div>
                                                    <button type="button" className={styles.button}>1Nurse&nbsp;<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button>
                                                </div>
                                            </div>
                                            <div className={styles.questionUserDescription}>
                                                <div className={styles.questionUserDesignation}>Conservative Trader & Investor</div>
                                                <div className={styles.globeTime}>
                                                    <div className={styles.questionUserTimestamp}>4h</div>
                                                    <div className={styles.globe}><Image src="/globe.jpg" width="10" height="10"/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.questionContainer}>
                                    <div className={styles.question}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore iure commodi vero accusamus quis impedit?
                                    </div>
                                    <div className={styles.questionSubPart}>
                                    {truncateText(
                                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore iure commodi vero accusamus quis impedit? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut amet animi natus similique quibusdam assumenda aut qui, totam repellendus temporibus commodi reiciendis praesentium quo in voluptas consequatur facilis earum saepe deleniti, quaerat nesciunt. Distinctio dolorem esse consequatur veritatis vero laboriosam sit officia facilis quisquam, perspiciatis dolore nam quod excepturi? Rem nihil voluptatum perferendis impedit itaque aut cum asperiores, saepe aperiam eveniet voluptatem tempore necessitatibus eaque omnis reprehenderit cupiditate nobis culpa sequi? Illo soluta deserunt, reiciendis necessitatibus ipsam, quibusdam quasi a culpa laboriosam sunt labore dolor quisquam similique consequatur impedit ex unde, animi autem aliquid porro reprehenderit totam. Itaque, delectus repellat.',
                                        12
                                    )}
                                    </div>
                                </div>
            </div>

            <div className={`shadow-sm ${styles.quesContainer}`}>
                                <div className={styles.questionHeader}>
                                    <div className={styles.questionUserImage}>
                                        <Image src="/logo.jpg" alt={"null"} width="60" height="60"/>
                                    </div>
                                    <div className={styles.questionUserContent}>
                                        <div className="user">
                                            <div className={styles.questionUser}>
                                                <div className={styles.questionUserName}>1Nurse Education</div>
                                                <div>
                                                    <button type="button" className={styles.button}>1Nurse&nbsp;<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button>
                                                </div>
                                            </div>
                                            <div className={styles.questionUserDescription}>
                                                <div className={styles.questionUserDesignation}>Conservative Trader & Investor</div>
                                                <div className={styles.globeTime}>
                                                    <div className={styles.questionUserTimestamp}>4h</div>
                                                    <div className={styles.globe}><Image src="/globe.jpg" width="10" height="10"/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.questionContainer}>
                                    <div className={styles.question}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore iure commodi vero accusamus quis impedit?
                                    </div>
                                </div>
            </div>
        </div>
    </div>
  )
}

export default NotificationMiddle

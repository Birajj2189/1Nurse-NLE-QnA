import React from 'react';
import styles from '@/app/styles/spacePage.module.css'
function AboutTopic({topicDetails}) {
    return (
        <div className={`shadow-sm ${styles.aboutContainer}`}>
            <div className={styles.heading}>
                Description : <span className={styles.content}>{topicDetails.description}</span>
            </div>
            <div className={styles.heading}>
                Total views : <span className={styles.content}>{topicDetails.views}</span>
            </div>
            <div className={styles.heading}>
                Total followers : <span className={styles.content}>{topicDetails.following_count}</span>
            </div>

        </div>
    );
}

export default AboutTopic;
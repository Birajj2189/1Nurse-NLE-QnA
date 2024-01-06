import React from 'react';
import styles from "@/app/styles/spacePage.module.css";

const SpaceMiddle = ({spaceName}) => (
    <div className={`${styles.spaceContainer} col-xl-6 col-lg-8 col-md-12 col-sm-12`}>
        <div className={`${styles.spaceSubsection}`}>
            <div className={`container text-center shadow-sm ${styles.spaceSubContainer}`}>
                <div className="g-0 z-0 justify-content-center row">
                    <div className="col-12 ">
                        <div className={styles.bannerBg}>
                            <div className="row ">
                                <div className="col-12">
                                    <div className={styles.bannerProfileContainer}>
                                        <div className={styles.bannerProfilePic}>
                                            <div className={styles.bannerCamera}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     viewBox="0 0 24 24" fill="none" stroke="#C4C4C4" strokeWidth="2"
                                                     strokeLinecap="round" strokeLinejoin="round">
                                                    <path
                                                        d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                                    <circle cx="12" cy="13" r="4"></circle>
                                                </svg>
                                            </div>
                                            <img src="/images/defaults/default-photo.png" alt="Preview"/></div>
                                        <div className={`${styles.bannerProfilename} d-none d-md-block`}>
                                            <div className={styles.bannerFullName}><h3>{spaceName}</h3><span
                                                className={`${styles.bannerAccountType} badge bg-primary`}></span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className={`${styles.bannerProfilenameMobile} d-block d-md-none`}>
                                        <div className={styles.bannerFullName}><h3>{spaceName}</h3><span
                                            className={`${styles.bannerAccountType} badge bg-primary`}></span></div>
                                    </div>
                                    <div className={`${styles.bannerTabContainer} d-none d-md-flex`}>
                                        <div className={styles.bannerNav}><span
                                            className={styles.bannerActive}>Questions</span></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
);

export default SpaceMiddle;
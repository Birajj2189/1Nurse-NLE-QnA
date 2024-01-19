import React from 'react'
import styles from '@/app/styles/BookMarkMiddle.module.css'
import Image from 'next/image'

function BookMarkMiddle() {
  return (
    <div className={`${styles.middleSection} col-xl-6 col-lg-8 col-md-12 col-sm-12`}>
        <div className={styles.middleSubsection}>
             {/* Question */}
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
                            <div className={styles.buttonContainer}>
                                <div className={styles.buttonSubContainer}>
                                    <div><button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="1.5" fill="none" fillRule="evenodd"><path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z" className="icon_svg-stroke" stroke="#666" strokeLinecap="round" strokeLinejoin="round"></path><path className="icon_svg-fill_as_stroke" fill="#666" d="m4.429 19.571 2.652-.884-1.768-1.768z"></path><path d="M14.5 19.5h5v-5m-10-10h-5v5" className="icon_svg-stroke" stroke="#666" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>Answer</button></div>
                                    <div><button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round"><path d="M14.5 19c0-5.663-3.337-9-9-9m14 9c0-8.81-5.19-14-14-14"></path><circle cx="7.5" cy="17" r="2" className="icon_svg-fill"></circle></g></svg>Follow</button></div>
                                    <div><button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd"><path d="M20 20.5a5 5 0 0 0-10 0m5-7.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" className="icon_svg-fill"></path><path d="m6 10 2.5 3L6 16m-3-2.976h5.495" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>Request</button></div>
                                </div>
                                <div className={styles.buttonSubContainer2}>
                                    <div><button type="button"  className={`btn btn-light ${styles.btn}`} data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample1"><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z" className="icon_svg-stroke icon_svg-fill" stroke="#666" strokeWidth="1.5" fill="none"></path></svg></button></div>
                                    <div><button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill="none" strokeWidth="1.5" strokeLinejoin="round"></path></svg></button></div>
                                    <div><button type="button" className={`btn btn-light ${styles.btn}`}>...</button></div>
                                </div>
                            </div>
                            <div className="collapse" id="collapseExample1">
                            <div className={`card card-body ${styles.cardBody}`}>
                                <div className={styles.commentUserImage}>
                                    <Image src="/user.jpg" alt={"null"} width="40" height="40"/>
                                </div>
                                <div className={styles.commentInput}><input type="text" className={styles.input} placeholder="Enter your comment!"/></div>
                                <div className="commentButton"><button type="button" className={`btn btn-sm ${styles.addCommentButton}`}>Add Comment</button></div>
                            </div>
                            <div className={styles.commentMain}>
                                <div className={styles.commentHeader}>
                                    <div className={styles.commentUserImage}>
                                        <Image src="/user.jpg" width="40" height="40"/>
                                    </div>
                                    <div className={styles.commentUserContent}>
                                        <div className="user">
                                            <div className={styles.commentUser}>
                                                <div className={styles.commentUserName}>Simar Sarma</div>
                                                <div>
                                                    <button type="button" className={styles.followButton}>Follow</button>
                                                </div>
                                                </div>
                                                <div className={styles.commentUserDescription}>
                                                    <div className={styles.commentUserDesignation}>Assam University Student</div>
                                                    <div className={styles.globeTime}>
                                                        <div className={styles.commentUserTimestamp}>5h</div>
                                                        <div className={styles.globe}><Image src="/globe.jpg" width="10" height="10"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className={styles.commentContainer}>
                                    <div className={styles.comment}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore iure commodi vero accusamus quis impedit sdfdgh arstdyf aerty eawrtyj aesrdgjb dgfhgn. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi quas odio quod iusto fugiat vitae esse cumque atque, voluptatem neque doloribus similique voluptas, odit, natus laboriosam ut cum earum.
                                    </div>
                                </div>
                                <div className={styles.buttonContainer}>
                                    <div className={styles.buttonSubContainer}>
                                        <div className={styles.upDown}>
                                            <button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4 3 15h6v5h6v-5h6z" className="icon_svg-stroke icon_svg-fill" strokeWidth="1.5" stroke="#666" fill="none" strokeLinejoin="round"></path></svg>Upvote</button>
                                            <button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill="none" strokeWidth="1.5" strokeLinejoin="round"></path></svg></button>
                                        </div>
                                        <div><button type="button" className={`btn btn-light ${styles.btn}`} data-bs-toggle="collapse" href="#collapseExample1-1" role="button" aria-expanded="false" aria-controls="collapseExample1-1">Reply</button></div>
                                    </div>
                                    <div className={styles.ansButtonSubContainer2}>
                                        <div><button type="button" className={`btn btn-light ${styles.btn}`}>...</button></div>
                                    </div>
                                </div>
                                <div className={styles.replyDiv}>
                                    <div className={`collapse ${styles.replyBox}`} id="collapseExample1-1">
                                        <div className={`card card-body ${styles.replyCardBody}`}>
                                            <div className={styles.replyUserImage}>
                                                <Image src="/user.jpg" width="40" height="40"/>
                                            </div>
                                            <div className={styles.replyInput}><input type="text" className={styles.input2} placeholder="Enter your reply!"/></div>
                                            <div className="replyButton"><button type="button" className={`btn btn-success btn-lgs ${styles.addReplyButton}`}>Add Reply</button></div>
                                        </div>
                                        <div className={styles.replies}>
                                            <div className={styles.replyHeader}>
                                                <div className={styles.replyUserImage}>
                                                    <Image src="/user.jpg" width="40" height="40"/>
                                                </div>
                                                <div className={styles.replyUserContent}>
                                                <div className="user">
                                                    <div className={styles.replyUser}>
                                                        <div className={styles.replyUserName}>Anuja Sarma</div>
                                                        <div>
                                                            <button type="button" className={styles.followButton}>Follow</button>
                                                        </div>
                                                        </div>
                                                        <div className={styles.replyUserDescription}>
                                                            <div className={styles.replyUserDesignation}>Assam University Student</div>
                                                            <div className={styles.globeTime}>
                                                                <div className={styles.replyUserTimestamp}>7h</div>
                                                                <div className={styles.globe}><Image src="/globe.jpg" width="10" height="10"/></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.replyContainer}>
                                                <div className={styles.reply}>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.replies}>
                                            <div className={styles.replyHeader}>
                                                <div className={styles.replyUserImage}>
                                                    <Image src="/user.jpg" width="40" height="40"/>
                                                </div>
                                                <div className={styles.replyUserContent}>
                                                <div className="user">
                                                    <div className={styles.replyUser}>
                                                        <div className={styles.replyUserName}>Biraj Sarma</div>
                                                        <div>
                                                            <button type="button" className={styles.followButton}>Follow</button>
                                                        </div>
                                                        </div>
                                                        <div className={styles.replyUserDescription}>
                                                            <div className={styles.replyUserDesignation}>Assam University Student</div>
                                                            <div className={styles.globeTime}>
                                                                <div className={styles.replyUserTimestamp}>7h</div>
                                                                <div className={styles.globe}><Image src="/globe.jpg" width="10" height="10"/></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.replyContainer}>
                                                <div className={styles.reply}>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.commentMain}>
                                <div className={styles.commentHeader}>
                                    <div className={styles.commentUserImage}>
                                        <Image src="/user.jpg" width="40" height="40"/>
                                    </div>
                                    <div className={styles.commentUserContent}>
                                        <div className="user">
                                            <div className={styles.commentUser}>
                                                <div className={styles.commentUserName}>Sarad Sarma</div>
                                                <div>
                                                    <button type="button" className={styles.followButton}>Follow</button>
                                                </div>
                                                </div>
                                                <div className={styles.commentUserDescription}>
                                                    <div className={styles.commentUserDesignation}>Assam University Student</div>
                                                    <div className={styles.globeTime}>
                                                        <div className={styles.commentUserTimestamp}>5h</div>
                                                        <div className={styles.globe}><Image src="/globe.jpg" width="10" height="10"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className={styles.commentContainer}>
                                    <div className={styles.comment}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore iure commodi vero accusamus quis impedit sdfdgh arstdyf aerty eawrtyj aesrdgjb dgfhgn. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi quas odio quod iusto fugiat vitae esse cumque atque, voluptatem neque doloribus similique voluptas, odit, natus laboriosam ut cum earum.
                                    </div>
                                </div>
                                <div className={styles.buttonContainer}>
                                    <div className={styles.buttonSubContainer}>
                                        <div className={styles.upDown}>
                                            <button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4 3 15h6v5h6v-5h6z" className="icon_svg-stroke icon_svg-fill" strokeWidth="1.5" stroke="#666" fill="none" strokeLinejoin="round"></path></svg>Upvote</button>
                                            <button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill="none" strokeWidth="1.5" strokeLinejoin="round"></path></svg></button>
                                        </div>
                                        <div><button type="button" className={`btn btn-light ${styles.btn}`} data-bs-toggle="collapse" href="#collapseExample1-2" role="button" aria-expanded="false" aria-controls="collapseExample1-2">Reply</button></div>
                                    </div>
                                    <div className={styles.ansButtonSubContainer2}>
                                        <div><button type="button" className={`btn btn-light ${styles.btn}`}>...</button></div>
                                    </div>
                                </div>
                                <div className={styles.replyDiv}>
                                    <div className={`collapse ${styles.replyBox}`} id="collapseExample1-2">
                                        <div className={`card card-body ${styles.replyCardBody}`}>
                                            <div className={styles.replyUserImage}>
                                                <Image src="/user.jpg" width="40" height="40"/>
                                            </div>
                                            <div className={styles.replyInput}><input type="text" className={styles.input2} placeholder="Enter your reply!"/></div>
                                            <div className="replyButton"><button type="button" className={`btn btn-success btn-lgs ${styles.addReplyButton}`}>Add Reply</button></div>
                                        </div>
                                        <div className={styles.replies}>
                                            <div className={styles.replyHeader}>
                                                <div className={styles.replyUserImage}>
                                                    <Image src="/user.jpg" width="40" height="40"/>
                                                </div>
                                                <div className={styles.replyUserContent}>
                                                <div className="user">
                                                    <div className={styles.replyUser}>
                                                        <div className={styles.replyUserName}>Kiran Sarma</div>
                                                        <div>
                                                            <button type="button" className={styles.followButton}>Follow</button>
                                                        </div>
                                                        </div>
                                                        <div className={styles.replyUserDescription}>
                                                            <div className={styles.replyUserDesignation}>Assam University Student</div>
                                                            <div className={styles.globeTime}>
                                                                <div className={styles.replyUserTimestamp}>7h</div>
                                                                <div className={styles.globe}><Image src="/globe.jpg" width="10" height="10"/></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.replyContainer}>
                                                <div className={styles.reply}>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.replies}>
                                            <div className={styles.replyHeader}>
                                                <div className={styles.replyUserImage}>
                                                    <Image src="/user.jpg" width="40" height="40"/>
                                                </div>
                                                <div className={styles.replyUserContent}>
                                                <div className="user">
                                                    <div className={styles.replyUser}>
                                                        <div className={styles.replyUserName}>A Sarma</div>
                                                        <div>
                                                            <button type="button" className={styles.followButton}>Follow</button>
                                                        </div>
                                                        </div>
                                                        <div className={styles.replyUserDescription}>
                                                            <div className={styles.replyUserDesignation}>Assam University Student</div>
                                                            <div className={styles.globeTime}>
                                                                <div className={styles.replyUserTimestamp}>7h</div>
                                                                <div className={styles.globe}><Image src="/globe.jpg" width="10" height="10"/></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.replyContainer}>
                                                <div className={styles.reply}>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            </div>
            </div>
        </div>
    </div>
  )
}

export default BookMarkMiddle

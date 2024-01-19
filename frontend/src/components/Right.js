import React from 'react'
import styles from '@/app/styles/Right.module.css'
import Image from "next/image";
import { BiLogoInstagram , BiLogoFacebook , BiLogoLinkedin , BiLogoYoutube , BiLogoTwitter } from 'react-icons/bi';
import Link from "next/link";

function Right() {
    return (
        <div className={`${styles.rightSection} col col-lg-3  justify-content-end`}>
            <div className={styles.rightContaienr}>
                <div className={`shadow-sm ${styles.adBox}`}>
                    <div className={styles.adTitle}>
                        Advertisement
                    </div>
                    <div>
                        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="10000">
                                    <Image src="/spaceimg.jpg" width={24} height={200} className="d-block w-100"
                                           alt="..."/>
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <Image src="/spaceimg2.jpg" width={24} height={200} className="d-block w-100"
                                           alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <Image src="/spaceimg3.jpg" width={24} height={200} className="d-block w-100"
                                           alt="..."/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button"
                                    data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button"
                                    data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>      <div className={`shadow-sm ${styles.adBox}`}>
                    <div className={styles.adTitle}>
                        Advertisement
                    </div>
                    <div>
                        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="10000">
                                    <Image src="/spaceimg.jpg" width={24} height={200} className="d-block w-100"
                                           alt="..."/>
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <Image src="/spaceimg2.jpg" width={24} height={200} className="d-block w-100"
                                           alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <Image src="/spaceimg3.jpg" width={24} height={200} className="d-block w-100"
                                           alt="..."/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button"
                                    data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button"
                                    data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>      <div className={`shadow-sm ${styles.adBox}`}>
                    <div className={styles.adTitle}>
                        Advertisement
                    </div>
                    <div>
                        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="10000">
                                    <Image src="/spaceimg.jpg" width={24} height={200} className="d-block w-100"
                                           alt="..."/>
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <Image src="/spaceimg2.jpg" width={24} height={200} className="d-block w-100"
                                           alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <Image src="/spaceimg3.jpg" width={24} height={200} className="d-block w-100"
                                           alt="..."/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button"
                                    data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button"
                                    data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`shadow-sm ${styles.adBox}`}>
                    <div className={styles.adTitle}>
                        Advertisement
                    </div>
                    <div>
                        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="10000">
                                    <Image src="/spaceimg.jpg" width={24} height={200} className="d-block w-100"
                                           alt="..."/>
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <Image src="/spaceimg2.jpg" width={24} height={200} className="d-block w-100"
                                           alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <Image src="/spaceimg3.jpg" width={24} height={200} className="d-block w-100"
                                           alt="..."/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button"
                                    data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button"
                                    data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>


                <div className={styles.socialContainer}>
                    <div className={styles.socialSubcontainer}>
                        <div className={styles.socialDiv}>
                            <BiLogoFacebook className={styles.socialIcon}/>
                        </div>
                        <div className={styles.socialDiv}>
                            <BiLogoInstagram className={styles.socialIcon}/>
                        </div>
                        <div className={styles.socialDiv}>
                            <BiLogoLinkedin className={styles.socialIcon}/>
                        </div>
                        <div className={styles.socialDiv}>
                            <BiLogoYoutube className={styles.socialIcon}/>
                        </div>
                        <div className={styles.socialDiv}>
                            <BiLogoTwitter className={styles.socialIcon}/>
                        </div>
                    </div>
                    <div className={styles.copyright}>©2023 by <span>1NURSE.COM PTE.LTD.</span></div>
                    <div className={styles.terms}><Link  className={styles.terms} href={"/"}>Terms of Service</Link> | <Link className={styles.terms}  href={"/"}>Privacy Policy</Link></div>
                </div>
            </div>
        </div>
    );
}

export default Right
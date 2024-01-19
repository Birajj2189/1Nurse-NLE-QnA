"use client"
import React, {useState,useEffect} from 'react'
import styles from '@/app/styles/Left.module.css'
import Link from "next/link";
import Image from "next/image";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";



function Left() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [spaces, setSpaces] = useState([])
    const [spaceData, setSpaceData] = useState(
        {
            "topic_id":"sample_topic_id" ,
            "cover_img":"",
            "name":"" ,
            "description":"" ,
            "following_count": 0 ,
            "topic_type" : 0,
            "parent_topic_id":""
        }
    )

    const handleSpaceChange = (event) => {
        console.log(spaceData)
        setSpaceData({ ...spaceData, [event.target.name]: event.target.value });
    };
    const handleSpaceSubmit = async (event) => {
        event.preventDefault();
        console.log("click")
        // Generate a unique question_id using uuid
        const uniqueQuestionId = `t-${uuidv4()}`;

        try {
            const response = await axios.post(`${backendUrl}/api/topics/`, {
                ...spaceData,
                topic_id: uniqueQuestionId,
            });
            console.log("submitted", response)
            // Handle successful response
            window.location.reload();
        } catch (error) {
            console.error(error); // Handle errors
        }
    };

    useEffect(() => {

        const fetchTopics = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/topics/parent/`);
                setSpaces(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTopics();

    }, [backendUrl]);

    return (
        <div className={`d-lg-block col-xl-3 col-lg-4 col-0 ${styles.leftMain}`}>
            <div className={styles.leftSection}>
                <div className={styles.spaceTitle}>Topics</div>
                <div className={styles.spaceContainer}>
                    {
                        spaces.map(space => (
                            <li  key={space.topic_id} className={styles.linkList}>
                                <Link className={styles.spaceElement} href={`/spaces/${space.name}`}><Image width={100}
                                                                                                            height={100}
                                                                                                            src="/spaceimg.jpg"
                                                                                                            className={`img-fluid ${styles.spaceImg}`}
                                                                                                            alt="..."/>{space.name}
                                </Link>
                            </li>
                        ))
                    }
                    <li className={styles.linkList}>
                        <button className={styles.spaceElement} data-bs-toggle="modal" data-bs-target="#createSpaceModal"><PlusCircleIcon
                            className={styles.spaceCreateIcon}/> Create Topic
                        </button>

                        {/*    Create space Modal */}
                        <div className="modal fade" id="createSpaceModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Create Topic</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form method={`POST`}>
                                            <div className="mb-3">
                                                <label htmlFor="name"
                                                       className="col-form-label">Topic Name:</label>
                                                <input type="text" className="form-control" name={`name`} id="recipient-name" value={spaceData.name} onChange={handleSpaceChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="description"
                                                       className="col-form-label">Topic Description:</label>
                                                <textarea className="form-control" name={`description`} id="message-text" value={spaceData.description} onChange={handleSpaceChange} ></textarea>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">Close
                                        </button>
                                        <button type="button" onClick={handleSpaceSubmit} className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </li>
                </div>
                <div className={styles.selfContainer}>
                    <div className={styles.selfTitle}>
                        1Nurse on the go!
                    </div>
                    <div className={styles.selfImage}>
                        <Image className={styles.feedImg} src={'/feed-download-app.png'} width={50} height={50}
                               alt={'...'}/>
                    </div>
                    <div className={styles.socialLink}>
                        <Link href={"/"}><Image src={'/google-play-store.png'} width={90} height={80}
                                                alt={'...'}/></Link>
                        <Link href={"/"}><Image src={'/apple-app-store.png'} width={90} height={80} alt={'...'}/></Link>
                    </div>

                </div>
            </div>
        </div>
    );
}


export default Left;



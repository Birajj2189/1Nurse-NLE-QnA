"use client"

import React, {useEffect, useState} from 'react';
import styles from "@/app/styles/spacePage.module.css";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import AboutTopic from "@/components/AboutTopic";
import Subtopics from "@/components/Subtopics";
import TopicQuestion from "@/components/TopicQuestion";

const SpaceMiddle = ({spaceName}) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    let formattedName = spaceName.replace(/\s+/g, '-');
    let originalName = spaceName.replace(/%20/g, ' ');
    const [topicDetail, setTopicDetail] = useState([])
    const [activeComponent, setActiveComponent] = useState(1);
    const [follow, setFollow] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleFollow = ()=>{
        if(!loading){
            setLoading(true)
        }else{
            setLoading(false)
        }
    }

    const handleDeleteTopic = async (commentId) => {
        try {
            setLoading(true)
            await axios.delete(`${backendUrl}/api/topics/delete/${topicDetail.topic_id}`);
            window.location.href = "/";
            setLoading(false)
        } catch (error) {
            console.error(error.message);
        }
    };

    const [spaceData, setSpaceData] = useState(
        {
            "topic_id":"sample_topic_id" ,
            "cover_img":"",
            "name":"" ,
            "description":"" ,
            "following_count": 0 ,
            "topic_type" : 1,
            "parent_topic_id": "",
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
        const uniqueQuestionId = `st-${uuidv4()}`;
        console.log(spaceData)
        try {
            setLoading(true)
            const response = await axios.post(`${backendUrl}/api/topics/`, {
                ...spaceData,
                topic_id: uniqueQuestionId,
                parent_topic_id : topicDetail.topic_id
            });
            console.log("submitted", response)
            // Handle successful response
            window.location.reload();
            setLoading(false)
        } catch (error) {
            console.error(error); // Handle errors
        }
    };

    const handleActiveClick = (componentNumber) => {
        setActiveComponent(componentNumber);
    };

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${backendUrl}/api/topics/get-topic-id/${formattedName}`);
                setTopicDetail(response.data);
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        };
        fetchTopics();
    }, [backendUrl, formattedName]);



    return (
        <div className={`${styles.spaceContainer} col-xl-6 col-lg-8 col-md-12 col-sm-12`}>

            {/*modal*/}
            <div className="modal fade" id="createSubtopicModal" tabIndex="-1"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create
                                Topic</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method={`POST`}>
                                <div className="mb-3">
                                    <label htmlFor="name"
                                           className="col-form-label fs-5">Topic Name:</label>
                                    <input type="text" className="form-control" name={`name`}
                                           id="recipient-name" value={spaceData.name}
                                           onChange={handleSpaceChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description"
                                           className="col-form-label fs-5">Topic Description:</label>
                                    <textarea className="form-control" name={`description`}
                                              id="message-text" value={spaceData.description}
                                              onChange={handleSpaceChange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-bs-dismiss="modal">Close
                            </button>
                            <button type="button" onClick={handleSpaceSubmit}
                                    className="btn btn-primary">Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>


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
                                                         viewBox="0 0 24 24" fill="none" stroke="#C4C4C4"
                                                         strokeWidth="2"
                                                         strokeLinecap="round" strokeLinejoin="round">
                                                        <path
                                                            d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                                        <circle cx="12" cy="13" r="4"></circle>
                                                    </svg>
                                                </div>
                                                <img src="/images/defaults/default-photo.png" alt="Preview"/></div>
                                            <div className={`${styles.bannerProfilename} d-none d-md-block`}>
                                                <div className={styles.bannerFullName}>
                                                    <h3>{originalName}
                                                        <button className={`btn btn-sm btn-light m-2`} onClick={handleFollow}>{loading ? 'Follow' : 'Unfollow'}</button>
                                                    </h3>

                                                    <span
                                                        className={`${styles.bannerAccountType} badge bg-primary`}>

                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-12">
                                        <div className={`${styles.bannerProfilenameMobile} d-block d-md-none`}>
                                            <div className={styles.bannerFullName}><h3>{spaceName}</h3><span
                                                className={`${styles.bannerAccountType} badge bg-primary`}></span></div>
                                        </div>
                                        <div className={`${styles.bannerTabContainer} d-none d-md-flex`}>
                                            <div className={styles.bannerNav}>
                                                        <span
                                                            onClick={() => handleActiveClick(1)}
                                                            className={activeComponent === 1 ? styles.bannerActive : styles.bannerInactive}
                                                        >
                                                            About
                                                        </span>

                                                <span
                                                    onClick={() => handleActiveClick(2)}
                                                    className={activeComponent === 2 ? styles.bannerActive : styles.bannerInactive}
                                                >
                                                          Subtopics
                                                        </span>

                                                <span
                                                    onClick={() => handleActiveClick(3)}
                                                    className={activeComponent === 3 ? styles.bannerActive : styles.bannerInactive}
                                                >
                                                            Questions
                                                        </span>
                                            </div>

                                            <div tabIndex="0" className={`btn-group ${styles.moreOption}`}>
                                                <button type="button" className="btn"
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <circle
                                                            cx="12" cy="12" r="1"></circle>
                                                        <circle cx="19" cy="12"
                                                                r="1"></circle>
                                                        <circle cx="5"
                                                                cy="12"
                                                                r="1"></circle>
                                                    </svg>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <button className="dropdown-item" type="button"
                                                                    onClick={handleDeleteTopic}>Delete topic
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className="dropdown-item" data-bs-toggle="modal"
                                                                    data-bs-target="#createSubtopicModal">Create
                                                                subtopic
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className="dropdown-item"
                                                                    type="button">Something else here
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {activeComponent === 1 && <AboutTopic topicDetails={topicDetail}/>}
                {activeComponent === 2 && <Subtopics topicDetails={topicDetail}/>}
                {activeComponent === 3 && <TopicQuestion topicDetails={topicDetail}/>}

            </div>

        </div>
    );
}
export default SpaceMiddle;
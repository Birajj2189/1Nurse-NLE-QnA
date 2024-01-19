import React, {useEffect, useState} from 'react';
import styles from "@/app/styles/spacePage.module.css";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

function Subtopics({topicDetails}) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [loading, setLoading] = useState(false)
    const [subtopic, setSubtopic] = useState([])

    useEffect(() => {
        const fetchSubTopics = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${backendUrl}/api/topics/by-parent/${topicDetails.topic_id}/`);
                setSubtopic(response.data);
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        };
        fetchSubTopics();
    }, [backendUrl,topicDetails]);
    return (
        <div className={`shadow-sm ${styles.aboutContainer}`}>
            <div>Subtopics</div>
            {
                subtopic.map(space => (
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
        </div>
    );
}

export default Subtopics;
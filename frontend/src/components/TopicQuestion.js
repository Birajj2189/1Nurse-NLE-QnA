import React, {useEffect, useState} from 'react';
import styles from "@/app/styles/Middle.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
const Comment = dynamic(() => import("@/components/Comment"))


function TopicQuestion({topicDetails}) {
    const [questions, setQuestions] = useState([])
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleDeleteQuestion = async (questionId) => {
        console.log('Deleting question with ID:', questionId);

        try {
            setLoading(true);
            await axios.delete(`${backendUrl}/api/questions/delete/${questionId}`);
            setLoading(false);
            // Fetch questions again to update the questionData state
            fetchQuestions(); // Replace with your actual function to fetch questions
            console.log('Delete successful');
        } catch (error) {
            console.error(error.message);
            setLoading(false);
            console.log('Delete failed');
        }
    };

    const handleDeleteQuestionConfirmation = () => {
        if (questionToDelete) {
            handleDeleteQuestion(questionToDelete);
            setQuestionToDelete(null); // Reset the questionToDelete state after deletion
        }
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/questions/list/${topicDetails.topic_id}`);
                setQuestions(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuestions();
    }, [backendUrl]);
    return (
        <div className={`p-0 m-0 w-100 h-100`}>
            {questions.map((question, index) => (

                <div key={question.question_id} className={`shadow-sm ${styles.quesContainer}`}>
                    <div className={styles.questionHeader}>
                        <div className={styles.questionUserImage}>
                            <Image src="/logo.png" alt={"null"} width="60" height="60"/>
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
                                        <div className={styles.globe}><Image src="/globe.png" width="10" height="10"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.questionContainer}>

                        <Link href={`/question/${question.question_id}`} className={styles.question}>
                            {question.title}
                        </Link>
                        <div className={styles.questionSubPart}>
                            {question.body}
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.buttonSubContainer}>
                            <div><button type="button" className={`btn btn-light ${styles.btn}`} data-bs-toggle="modal" data-bs-target="#ModalAnswer" data-bs-whatever="@mdo"><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="1.5" fill="none" fillRule="evenodd"><path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z" className="icon_svg-stroke" stroke="#666" strokeLinecap="round" strokeLinejoin="round"></path><path className="icon_svg-fill_as_stroke" fill="#666" d="m4.429 19.571 2.652-.884-1.768-1.768z"></path><path d="M14.5 19.5h5v-5m-10-10h-5v5" className="icon_svg-stroke" stroke="#666" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>Answer</button></div>
                            <div><button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round"><path d="M14.5 19c0-5.663-3.337-9-9-9m14 9c0-8.81-5.19-14-14-14"></path><circle cx="7.5" cy="17" r="2" className="icon_svg-fill"></circle></g></svg>Follow</button></div>
                            <div><button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd"><path d="M20 20.5a5 5 0 0 0-10 0m5-7.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" className="icon_svg-fill"></path><path d="m6 10 2.5 3L6 16m-3-2.976h5.495" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>Request</button></div>
                        </div>
                        <div className={styles.buttonSubContainer2}>
                            <div><button type="button"  className={`btn btn-light ${styles.btn}`} data-bs-toggle="collapse" href={`#collapseExample${question.question_id}`} role="button" aria-expanded="false" aria-controls="collapseExample1"><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z" className="icon_svg-stroke icon_svg-fill" stroke="#666" strokeWidth="1.5" fill="none"></path></svg></button></div>
                            <div><button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill="none" strokeWidth="1.5" strokeLinejoin="round"></path></svg></button></div>
                            <div>
                                <button type="button" className={`btn btn-light ${styles.btn}`} data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                                <ul className="dropdown-menu">
                                    <li className={styles.dropdownItem}><button className={`btn btn-light  ${styles.btnDrop}`} >Edit</button></li>
                                    <li className={styles.dropdownItem}><button className={`btn btn-light  ${styles.btnDrop}`}  data-bs-toggle="modal" data-bs-target="#exampleModalQuestion"
                                                                                onClick={() => setQuestionToDelete(question.question_id)}>Delete</button></li>
                                    <li className={styles.dropdownItem}><button  className={`btn btn-light  ${styles.btnDrop}`}>Bookmark</button></li>
                                    <li className={styles.dropdownItem}><button  className={`btn btn-light  ${styles.btnDrop}`}>Copy URL</button></li>
                                </ul>

                                <div className="modal fade" id="exampleModalQuestion" tabindex="-1" aria-labelledby="exampleModalLabelQuestion" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">WARNING!!</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className={`modal-body ${styles.confirmDeleteModal}`}>
                                                Do you want to delete the question??
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >No</button>
                                                <button type="button" className={`btn btn-light  ${styles.btnYes}`} data-bs-dismiss="modal" onClick={handleDeleteQuestionConfirmation}>Yes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*Question comments dropdown*/}
                    <Comment questionId={question.question_id}/>



                </div>
            ))}
        </div>
    );
}

export default TopicQuestion;
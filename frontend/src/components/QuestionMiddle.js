"use client"
import React , { useState, useEffect } from 'react'
import styles from '@/app/styles/Middle.module.css'
import Image from 'next/image'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic'
import Link from "next/link";
const Comment = dynamic(() => import("@/components/Comment"))
const Commentans = dynamic(() => import("@/components/Commentans"))
function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
}




const QuestionMiddle = ({questionId}) => {
    console.log(questionId);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


// AUTHENTICATION or DUMMY LOGIN
const [user, setUser] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/`);
      const foundUser = response.data.find(
      user => user.username === 'BIPUL'
      &&
      user.password === 'admin'
      );

      if (foundUser) {
        setUser(foundUser);
      } else {
        console.warn('User not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchUser();
}, [backendUrl]);


//
// Answers INput
const [selectedQuestionId, setSelectedQuestionId] = useState(null);
 const [answerFormData, setAnswerFormData] = useState({
        "body": "",
        "image_url": "",
        "user_id": "",
        "question_id": ""

      });

      const handleAnswerChange = (event) => {
          if (event.target.type === "file") {
            const file = event.target.files[0];
            setAnswerFormData({ ...answerFormData, [event.target.name]: file });
          } else {
            // Handle the hidden field separately
            if (event.target.name === "question_id") {
              setSelectedQuestionId(event.target.value);
            } else {
              setAnswerFormData({ ...answerFormData, [event.target.name]: event.target.value });
            }
          }
        };


      const handleAnswerSubmit = async (event) => {
  if (user) {
    event.preventDefault();

    try {
      const formData = new FormData();

      for (const key in answerFormData) {
        formData.append(key, answerFormData[key]);
        formData.append("user_id", user && user.user_id);
        if (selectedQuestionId) {
        formData.append("question_id", selectedQuestionId);
      }

      }
      const response = await axios.post(`${backendUrl}/api/answers/create/`, formData);

      console.log(response.data); // Handle successful response
      window.location.reload();
    } catch (error) {
      console.error(error); // Handle errors
      console.log("submit failed");
    }
  }
};


// Answer display

const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/answers/`);
        setAnswers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnswers();
  }, [backendUrl]);

// Question

    const [question, setQuestion] = useState([]);
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/questions/${questionId}`);
                setQuestion(response.data); // Assuming the API returns an array of questions
                console.log(response)
            } catch (error) {
                console.error(error); // Handle errors
            }
        };

        fetchQuestion();
    }, [questionId]);


// User info

 const [users, setUsers] = useState([]);
    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/`);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [backendUrl]);
// Answers


    return (
        <div className={`${styles.middleSection} col-xl-6 col-lg-8 col-md-12 col-sm-12`}>
            <div className={styles.middleSubsection}>
                    <div className={`shadow-sm ${styles.quesContainer}`}>
                        <div className={styles.questionHeader}>
                            <div className={styles.questionUserImage}>
                                <Image src="/logo.png" alt={"null"} width="60" height="60"/>
                            </div>
                            <div className={styles.questionUserContent}>
                                <div className="user">
                                    <div className={styles.questionUser}>
                                        <div className={styles.questionUserName}>{users.filter(user => user.user_id ==question.user_id).map(user => user.username)}</div>
                                        <div>
                                            <button type="button" className={styles.button}>1Nurse&nbsp;<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button>
                                        </div>
                                    </div>
                                    <div className={styles.questionUserDescription}>
                                        <div className={styles.questionUserDesignation}>{users.filter(user => user.user_id ==question.user_id).map(user => user.bio)}</div>
                                        <div className={styles.globeTime}>
                                            <div className={styles.questionUserTimestamp}>4h</div>
                                            <div className={styles.globe}><Image src="/globe.png" width="10" height="10"/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.questionContainer}>
                            <Link href={`/${question.question_id}`} className={styles.question}>
                                {question.title}
                            </Link>
                            <div className={styles.questionSubPart}>
                                {question.body}
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <div className={styles.buttonSubContainer}>
                                <div><button type="button" className={`btn btn-light ${styles.btn}`}  onClick={() => setSelectedQuestionId(question.question_id)} data-bs-toggle="modal" data-bs-target={`#ModalAnswer-${question.question_id}`} data-bs-whatever="@mdo"><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="1.5" fill="none" fillRule="evenodd"><path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z" className="icon_svg-stroke" stroke="#666" strokeLinecap="round" strokeLinejoin="round"></path><path className="icon_svg-fill_as_stroke" fill="#666" d="m4.429 19.571 2.652-.884-1.768-1.768z"></path><path d="M14.5 19.5h5v-5m-10-10h-5v5" className="icon_svg-stroke" stroke="#666" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>Answer</button></div>
                                <div><button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round"><path d="M14.5 19c0-5.663-3.337-9-9-9m14 9c0-8.81-5.19-14-14-14"></path><circle cx="7.5" cy="17" r="2" className="icon_svg-fill"></circle></g></svg>Follow</button></div>
                                <div><button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd"><path d="M20 20.5a5 5 0 0 0-10 0m5-7.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" className="icon_svg-fill"></path><path d="m6 10 2.5 3L6 16m-3-2.976h5.495" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>Request</button></div>
                            </div>
                            <div className={styles.buttonSubContainer2}>
                                <div><button type="button"  className={`btn btn-light ${styles.btn}`} data-bs-toggle="collapse" href={`#collapseExample${question.question_id}`} role="button" aria-expanded="false" aria-controls="collapseExample1"><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z" className="icon_svg-stroke icon_svg-fill" stroke="#666" strokeWidth="1.5" fill="none"></path></svg></button></div>
                                <div><button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill="none" strokeWidth="1.5" strokeLinejoin="round"></path></svg></button></div>
                                <div><button type="button" className={`btn btn-light ${styles.btn}`}>...</button></div>
                            </div>
                        </div>
                       <Comment questionId={question.question_id} user_id={user && user.user_id} />
                        {/*Question comments dropdown*/}

                    </div>


                     {/* Answer */}
                        <div className="modal fade"  id={`ModalAnswer-${question.question_id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Post Your Answer</b></h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                <form action="" method="post">
                                    <div className="mb-3">
                                        <div className={styles.AnswerInputQuestion}>{question.title}</div>
                                        {/* Hidden field for question_id */}
                                         <input type="hidden" className="form-control" name="question_id" value={question.question_id} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="message-text" className="col-form-label">Answer Content:</label>
                                        <textarea className="form-control" name="body" id="body" value={answerFormData.body} onChange={handleAnswerChange}></textarea>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="file" className="form-control" id="image_url" name="image_url" onChange={handleAnswerChange} accept="main/*" />

                                        <label className="input-group-text">Upload</label>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" onClick={handleAnswerSubmit} className={`btn btn-light ${styles.modalButton}`}>Submit</button>
                                    </div>
                                </form>
                            </div>

                                </div>
                            </div>
                        </div>



                {/* Answers with photos*/}
                {answers.map((answer, index) => (
                answer.question_id === question.question_id && (
                  <div key={index} className={styles.repliesContainer}>

                    <div className={styles.ansHeader}>
                        <div className={styles.ansUserImage}>
                            <Image src="/user.png" width="50" height="50"/>
                        </div>
                        <div className={styles.ansUserContent}>
                            <div className="user">
                                <div className={styles.ansUser}>
                                    <div className={styles.ansUserName}>{users.filter(user => user.user_id ==answer.user_id).map(user => user.username)}</div>
                                    <div>
                                        <button type="button" className={styles.followButton}>Follow</button>
                                    </div>
                                </div>
                                <div className={styles.ansUserDescription}>
                                    <div className={styles.ansUserDesignation}>{users.filter(user => user.user_id ==answer.user_id).map(user => user.bio)}</div>
                                    <div className={styles.globeTime}>
                                        <div className={styles.ansUserTimestamp}>4h</div>
                                        <div className={styles.globe}><Image src="/globe.png" width="10" height="10"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ansContainer}>
                        <div className={styles.ans}>
                           {answer.body}

                        </div>
                    </div>
                    <div className={styles.photoContainer}>

                      <div className={styles.photo}>
                          <img src={answer.image_url} width="500"  className="img-fluid" />
                      </div>

                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.buttonSubContainer}>
                            <div className={styles.upDown}>
                                <button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4 3 15h6v5h6v-5h6z" className="icon_svg-stroke icon_svg-fill" strokeWidth="1.5" stroke="#666" fill="none" strokeLinejoin="round"></path></svg>Upvote</button>
                                <button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill="none" strokeWidth="1.5" strokeLinejoin="round"></path></svg></button>
                            </div>
                            <div><button type="button"  className={`btn btn-light ${styles.btn}`} data-bs-toggle="collapse" href={`#collapseExample${answer.answer_id}`} role="button" aria-expanded="false" aria-controls="collapseExample1"><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z" className="icon_svg-stroke icon_svg-fill" stroke="#666" strokeWidth="1.5" fill="none"></path></svg></button></div>
                                <div><button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round"><path d="M19.748 10a8.003 8.003 0 0 0-15.496.002m.001 4.003a8.003 8.003 0 0 0 15.494 0"></path><path d="m2.5 7.697 1.197 3.289 3.289-1.197m14.5 6.5L20.289 13 17 14.197"></path></g></svg>Share</button></div>
                        </div>
                        <div className={styles.ansButtonSubContainer2}>
                            <div><button type="button" className={`btn btn-light ${styles.btn}`}>...</button></div>
                        </div>
                    </div>

                    {/*Question comments dropdown*/}
                     <Commentans questionId={answer.answer_id} user_id={user && user.user_id} />

                </div>
)))}



            </div>

        </div>


    )
}

export default QuestionMiddle
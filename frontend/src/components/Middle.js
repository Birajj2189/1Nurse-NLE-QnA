"use client"
import React , { useState, useEffect } from 'react'
import styles from '@/app/styles/Middle.module.css'
import Image from 'next/image'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic'
import Link from "next/link";
const Comment = dynamic(() => import("@/components/Comment"))

function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  }


const Body = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [formData, setFormData] = useState({
        "question_id": "",
        "title": "",
        "body": "",
        "topic": "",
        "image_url":"",
        "user": ""
      });
 const [answerFormData, setAnswerFormData] = useState({
        "body": "",
        "image_url": ""
      });

      const handleAnswerChange = (event) => {
      if (event.target.type === "file") {
        const file = event.target.files[0];
        setAnswerFormData({ ...answerFormData, [event.target.name]: file });
      } else {
        setAnswerFormData({ ...answerFormData, [event.target.name]: event.target.value });
      }
      };

      const handleAnswerSubmit = async (event) => {
        event.preventDefault();
        console.log("clicked submit");


    try {
        const formData = new FormData();
        formData.append('body', answerFormData.body);
        formData.append('image_url', answerFormData.image_url);
          const response = await axios.post(`${backendUrl}/api/answers/create/`, formData);
          console.log(response.data); // Handle successful response
          window.location.reload();
        } catch (error) {
          console.error(error); // Handle errors
          console.log("submit failed");
        }
      };
//
    const [postsformData, setpostsFormData] = useState({
        "description": "",
        "content": "",
        "image_url":""
      });

    const handlePostsChange = (event) => {
     if (event.target.type === "file") {
        const file = event.target.files[0];
        setpostsFormData({ ...postsformData, [event.target.name]: file });
      } else {
        setpostsFormData({ ...postsformData, [event.target.name]: event.target.value });
      }
      };

    const handlePostsSubmit = async (event) => {
        event.preventDefault();
        console.log("clicked submit");


    try {
        const formData = new FormData();
        formData.append('description', postsformData.description);
        formData.append('content', postsformData.content);
        formData.append('image_url', postsformData.image_url);
          const response = await axios.post(`${backendUrl}/api/posts/create/`, formData);
          console.log(response.data); // Handle successful response
          window.location.reload();
        } catch (error) {
          console.error(error); // Handle errors
          console.log("submit failed");
        }
      };

    const fetchQuestions = async () => {
        try {
          const response = await axios.get(`${backendUrl}/api/questions/`);
          setQuestions(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchQuestions();
      }, [backendUrl]);

    const [loading, setLoading] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);
    // handle functions
    const handleQuestionChange = (event) => {

        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const handleQuestionSubmit = async (event) => {
        event.preventDefault();

        // Generate a unique question_id using uuid
        const uniqueQuestionId = `q-${uuidv4()}`;

        try {
            const response = await axios.post(`${backendUrl}/api/questions/create/`, {
                ...formData,
                question_id: uniqueQuestionId
            });

 // Handle successful response
            window.location.reload();
        } catch (error) {
            console.error(error); // Handle errors
        }
    };

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



//



    const [questions, setQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/questions/`);
        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, [backendUrl]);

  const QuestionList = ({ questions }) => {


    useEffect(() => {
      const filtered = questions.filter((question) => {
        const searchTerms = searchQuery.toLowerCase();
        const titleMatch = question.title.toLowerCase().includes(searchTerms);
        const bodyMatch = question.body.toLowerCase().includes(searchTerms);

        return titleMatch || bodyMatch;
      });

      setFilteredQuestions(filtered);
    }, [searchQuery, questions]);
    };
//
    return (
                <div className={`${styles.middleSection} col-xl-6 col-lg-8 col-md-12 col-sm-12`}>
                    <div className={styles.middleSubsection}>
                    <QuestionList questions={questions} />
                        <div className={`shadow-sm ${styles.askingContainer}`}>
                            <div className={`card card-body ${styles.askingBody}`}>
                                <div className={styles.askingUserImage}>
                                    <Image src="/user.png" alt={"null"} width="40" height="40"/>
                                </div>
                                <div className={styles.askingInput}><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-control" placeholder="Ask your question!"/></div>
                                {/* <div className="askButton"><button type="button" className={`btn btn-sm ${styles.askButton}`}>Ask Question</button></div> */}
                            </div>
                            <div className={styles.askButtonContainer}>
                                <div className={styles.askButtonSubContainer}>
                                    <div><button type="button" className={`btn btn-light ${styles.askBtn}`} data-bs-toggle="modal" data-bs-target="#ModalQuestion" data-bs-whatever="@mdo"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd"><g transform="translate(9 7)"><path d="M3 6v-.5A2.5 2.5 0 1 0 .5 3" strokeLinecap="round" strokeLinejoin="round"></path><circle className="icon_svg-fill_as_stroke" fill="#666" cx="3" cy="8.5" r="1" stroke="none"></circle></g><path d="M7.5 4h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3L9 22v-3H7.5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" strokeLinejoin="round"></path></g></svg>Ask</button></div>
                                    <div><button type="button" className={`btn btn-light ${styles.askBtn}`} data-bs-toggle="modal" data-bs-target="#ModalAnswer" data-bs-whatever="@mdo"><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="1.5" fill="none" fillRule="evenodd"><path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z" className="icon_svg-stroke" stroke="#666" strokeLinecap="round" strokeLinejoin="round"></path><path className="icon_svg-fill_as_stroke" fill="#666" d="m4.429 19.571 2.652-.884-1.768-1.768z"></path><path d="M14.5 19.5h5v-5m-10-10h-5v5" className="icon_svg-stroke" stroke="#666" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>Answer</button></div>
                                    <div><button type="button" className={`btn btn-light ${styles.askBtn}`} data-bs-toggle="modal" data-bs-target="#ModalPost" data-bs-whatever="@mdo"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9a2 2 0 0 1 2.828 0Z" className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path className="icon_svg-fill_as_stroke" fill="#666" d="m4.429 19.571 2.652-.884-1.768-1.768z"></path></g></svg>Post</button></div>
                                </div>
                            </div>
                        </div>

                        {/* Ask */}
                        <div className="modal fade" id="ModalQuestion" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5 " id="exampleModalLabel"><b>Ask your Question</b></h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">




                                    <form action="" method="post">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="col-form-label">Question:</label>
                                            <input type="text" className="form-control" name='title' id="title" value={formData.title} onChange={handleQuestionChange}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="body" className="col-form-label">Question Content:</label>
                                            <textarea className="form-control" name="body" id="body" value={formData.body} onChange={handleQuestionChange}></textarea>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" onClick={handleQuestionSubmit}  className={`btn btn-light ${styles.modalButton}`}>Ask Question</button>
                                        </div>
                                    </form>



                                </div>

                                </div>
                            </div>
                        </div>

                        {/* Answer */}
                        <div className="modal fade" id="ModalAnswer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Post Your Answer</b></h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <form>
                                    <div className="mb-3">
                                        <div className={styles.AnswerInputQuestion}>
                                        Answer test .
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label for="message-text" className="col-form-label">Answer Content:</label>
                                        <textarea className="form-control" name="body" id="body" value={answerFormData.body} onChange={handleAnswerChange}></textarea>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="file" className="form-control" id="image_url" name="image_url" onChange={handleAnswerChange}/>
                                        <label className="input-group-text" name="image_url" id="image_url" value={answerFormData.image_url} onChange={handleAnswerChange} for="image_url">Upload</label>
                                    </div>
                                    </form>


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handleAnswerSubmit} type="submit" className={`btn btn-light ${styles.modalButton}`}>Submit</button>
                                </div>

                                </div>
                            </div>
                        </div>

                        {/* Post */}
                        <div className="modal fade" id="ModalPost" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Create Your Post</b></h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <form>
                                    <div className="mb-3">
                                        <label for="recipient-name" className="col-form-label">Post Heading:</label>
                                        <input type="text" className="form-control" name='content' id="content" value={postsformData.content} onChange={handlePostsChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="message-text" className="col-form-label">Post Content:</label>
                                        <textarea className="form-control" name='description' id="description" value={postsformData.description} onChange={handlePostsChange}></textarea>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="file" className="form-control" id="image_url" name="image_url" onChange={handlePostsChange}/>
                                        <label className="input-group-text" name="image_url" id="image_url" value={postsformData.image_url} onChange={handlePostsChange} for="image_url">Upload</label>
                                    </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handlePostsSubmit} type="submit" className={`btn btn-light ${styles.modalButton}`}>Create Post</button>
                                </div>
                                </div>
                            </div>
                        </div>

                        {/* Question */}
                        {filteredQuestions.map((question, index) => (
                        <div className={`shadow-sm ${styles.quesContainer}`}>
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
                             <QuestionList questions={questions} searchQuery={searchQuery} />
                                <Link href={`/question/${question.question_id}`} className={styles.question}>
                                    {searchQuery ? (
                                          <span dangerouslySetInnerHTML={{ __html: question.title.replace(new RegExp(searchQuery, 'gi'), (match) => `<mark>${match}</mark>`) }} />
                                        ) : (
                                          question.title
                                        )}
                                </Link>
                                <div className={styles.questionSubPart}>
                                    {searchQuery ? (
                                          <span dangerouslySetInnerHTML={{ __html: question.body.replace(new RegExp(searchQuery, 'gi'), (match) => `<mark>${match}</mark>`) }} />
                                        ) : (
                                          question.body
                                        )}
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


                        {/* Answers with photos*/}
                    <div className={styles.repliesContainer}>
                      <div className={styles.ansHeader}>
                          <div className={styles.ansUserImage}>
                              <Image src="/user.png" width="50" height="50"/>
                          </div>
                          <div className={styles.ansUserContent}>
                            <div className="user">
                              <div className={styles.ansUser}>
                                <div className={styles.ansUserName}>Puja Chandra</div>
                                <div>
                                  <button type="button" className={styles.followButton}>Follow</button>
                                </div>
                              </div>
                              <div className={styles.ansUserDescription}>
                                <div className={styles.ansUserDesignation}>Conservative Trader & Investor</div>
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
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore iure commodi vero accusamus quis impedit sdfdgh arstdyf aerty eawrtyj aesrdgjb dgfhgn. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi quas odio quod iusto fugiat vitae esse cumque atque, voluptatem neque doloribus similique voluptas, odit, natus laboriosam ut cum earum.
                        </div>
                      </div>
                      <div className={styles.photoContainer}>
                        <div className={styles.photo}>
                            <Image src="/IT.png" width="500" height="500" className={`img-fluid ${styles.photoImage}`} />
                        </div>
                    </div>
                      <div className={styles.buttonContainer}>
                        <div className={styles.buttonSubContainer}>
                          <div className={styles.upDown}>
                            <button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4 3 15h6v5h6v-5h6z" className="icon_svg-stroke icon_svg-fill" strokeWidth="1.5" stroke="#666" fill="none" strokeLinejoin="round"></path></svg>Upvote</button>
                            <button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill="none" strokeWidth="1.5" strokeLinejoin="round"></path></svg></button>
                          </div>
                          <div><button type="button" className={`btn btn-light ${styles.btn}`} data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample3"><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z" className="icon_svg-stroke icon_svg-fill" stroke="#666" strokeWidth="1.5" fill="none"></path></svg>Comment</button></div>
                          <div><button type="button" className={`btn btn-light ${styles.btn}`}><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round"><path d="M19.748 10a8.003 8.003 0 0 0-15.496.002m.001 4.003a8.003 8.003 0 0 0 15.494 0"></path><path d="m2.5 7.697 1.197 3.289 3.289-1.197m14.5 6.5L20.289 13 17 14.197"></path></g></svg>Share</button></div>
                        </div>
                        <div className={styles.ansButtonSubContainer2}>
                          <div><button type="button" className={`btn btn-light ${styles.btn}`}>...</button></div>
                        </div>
                    </div>
                    <div className="collapse" id="collapseExample3">
                        <div className={`card card-body ${styles.cardBody}`}>
                            <div className={styles.commentUserImage}>
                                <Image src="/user.png" alt={"null"} width="40" height="40"/>
                            </div>
                            <div className={styles.commentInput}><input type="text" className={styles.input} placeholder="Enter your comment!"/></div>
                            <div className="commentButton"><button type="button" className={`btn btn-sm ${styles.addCommentButton}`}>Add Comment</button></div>
                        </div>
                        <div className={styles.commentMain}>
                            <div className={styles.commentHeader}>
                                <div className={styles.commentUserImage}>
                                    <Image src="/user.png" width="40" height="40"/>
                                </div>
                                <div className={styles.commentUserContent}>
                                    <div className="user">
                                        <div className={styles.commentUser}>
                                            <div className={styles.commentUserName}>Tama Sarma</div>
                                            <div>
                                                <button type="button" className={styles.followButton}>Follow</button>
                                            </div>
                                            </div>
                                            <div className={styles.commentUserDescription}>
                                                <div className={styles.commentUserDesignation}>Assam University Student</div>
                                                <div className={styles.globeTime}>
                                                    <div className={styles.commentUserTimestamp}>5h</div>
                                                    <div className={styles.globe}><Image src="/globe.png" width="10" height="10"/></div>
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
                                    <div><button type="button" className={`btn btn-light ${styles.btn}`} data-bs-toggle="collapse" href="#collapseExample3-1" role="button" aria-expanded="false" aria-controls="collapseExample3-1">Reply</button></div>
                                </div>
                                <div className={styles.ansButtonSubContainer2}>
                                    <div><button type="button" className={`btn btn-light ${styles.btn}`}>...</button></div>
                                </div>
                            </div>
                            <div className={styles.replyDiv}>
                                <div className={`collapse ${styles.replyBox}`} id="collapseExample3-1">
                                    <div className={`card card-body ${styles.replyCardBody}`}>
                                        <div className={styles.replyUserImage}>
                                            <Image src="/user.png" width="40" height="40"/>
                                        </div>
                                        <div className={styles.replyInput}><input type="text" className={styles.input2} placeholder="Enter your reply!"/></div>
                                        <div className="replyButton"><button type="button" className={`btn btn-success btn-lgs ${styles.addReplyButton}`}>Add Reply</button></div>
                                    </div>
                                    <div className={styles.replies}>
                                        <div className={styles.replyHeader}>
                                            <div className={styles.replyUserImage}>
                                                <Image src="/user.png" width="40" height="40"/>
                                            </div>
                                            <div className={styles.replyUserContent}>
                                            <div className="user">
                                                <div className={styles.replyUser}>
                                                    <div className={styles.replyUserName}>Tama-3 Sarma</div>
                                                    <div>
                                                        <button type="button" className={styles.followButton}>Follow</button>
                                                    </div>
                                                    </div>
                                                    <div className={styles.replyUserDescription}>
                                                        <div className={styles.replyUserDesignation}>Assam University Student</div>
                                                        <div className={styles.globeTime}>
                                                            <div className={styles.replyUserTimestamp}>7h</div>
                                                            <div className={styles.globe}><Image src="/globe.png" width="10" height="10"/></div>
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
                                                <Image src="/user.png" width="40" height="40"/>
                                            </div>
                                            <div className={styles.replyUserContent}>
                                            <div className="user">
                                                <div className={styles.replyUser}>
                                                    <div className={styles.replyUserName}>Tama 33 Sarma</div>
                                                    <div>
                                                        <button type="button" className={styles.followButton}>Follow</button>
                                                    </div>
                                                    </div>
                                                    <div className={styles.replyUserDescription}>
                                                        <div className={styles.replyUserDesignation}>Assam University Student</div>
                                                        <div className={styles.globeTime}>
                                                            <div className={styles.replyUserTimestamp}>7h</div>
                                                            <div className={styles.globe}><Image src="/globe.png" width="10" height="10"/></div>
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
                                    <Image src="/user.png" width="40" height="40"/>
                                </div>
                                <div className={styles.commentUserContent}>
                                    <div className="user">
                                        <div className={styles.commentUser}>
                                            <div className={styles.commentUserName}>Harshita Sarma</div>
                                            <div>
                                                <button type="button" className={styles.followButton}>Follow</button>
                                            </div>
                                            </div>
                                            <div className={styles.commentUserDescription}>
                                                <div className={styles.commentUserDesignation}>Assam University Student</div>
                                                <div className={styles.globeTime}>
                                                    <div className={styles.commentUserTimestamp}>5h</div>
                                                    <div className={styles.globe}><Image src="/globe.png" width="10" height="10"/></div>
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
                                    <div><button type="button" className={`btn btn-light ${styles.btn}`} data-bs-toggle="collapse" href="#collapseExample3-2" role="button" aria-expanded="false" aria-controls="collapseExample3-2">Reply</button></div>
                                </div>
                                <div className={styles.ansButtonSubContainer2}>
                                    <div><button type="button" className={`btn btn-light ${styles.btn}`}>...</button></div>
                                </div>
                            </div>
                            <div className={styles.replyDiv}>
                                <div className={`collapse ${styles.replyBox}`} id="collapseExample3-2">
                                    <div className={`card card-body ${styles.replyCardBody}`}>
                                        <div className={styles.replyUserImage}>
                                            <Image src="/user.png" width="40" height="40"/>
                                        </div>
                                        <div className={styles.replyInput}><input type="text" className={styles.input2} placeholder="Enter your reply!"/></div>
                                        <div className="replyButton"><button type="button" className={`btn btn-success btn-lgs ${styles.addReplyButton}`}>Add Reply</button></div>
                                    </div>
                                    <div className={styles.replies}>
                                        <div className={styles.replyHeader}>
                                            <div className={styles.replyUserImage}>
                                                <Image src="/user.png" width="40" height="40"/>
                                            </div>
                                            <div className={styles.replyUserContent}>
                                            <div className="user">
                                                <div className={styles.replyUser}>
                                                    <div className={styles.replyUserName}>Reply3 Sarma</div>
                                                    <div>
                                                        <button type="button" className={styles.followButton}>Follow</button>
                                                    </div>
                                                    </div>
                                                    <div className={styles.replyUserDescription}>
                                                        <div className={styles.replyUserDesignation}>Assam University Student</div>
                                                        <div className={styles.globeTime}>
                                                            <div className={styles.replyUserTimestamp}>7h</div>
                                                            <div className={styles.globe}><Image src="/globe.png" width="10" height="10"/></div>
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
                                                <Image src="/user.png" width="40" height="40"/>
                                            </div>
                                            <div className={styles.replyUserContent}>
                                            <div className="user">
                                                <div className={styles.replyUser}>
                                                    <div className={styles.replyUserName}>Reply333 Sarma</div>
                                                    <div>
                                                        <button type="button" className={styles.followButton}>Follow</button>
                                                    </div>
                                                    </div>
                                                    <div className={styles.replyUserDescription}>
                                                        <div className={styles.replyUserDesignation}>Assam University Student</div>
                                                        <div className={styles.globeTime}>
                                                            <div className={styles.replyUserTimestamp}>7h</div>
                                                            <div className={styles.globe}><Image src="/globe.png" width="10" height="10"/></div>
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

export default Body
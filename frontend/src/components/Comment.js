import React,{ useState, useEffect } from 'react';
import styles from '@/app/styles/Middle.module.css'
import Image from "next/image";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {useAuth} from "@/components/authContext";

const Comment = ({ questionId }) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { isLoggedIn, userId, userName, login, logout } = useAuth();
    const [comformData, setcomFormData] = useState({
      comment_id: '',
      body: '',
      commentable_id: '',
      parent_comment_id: '',
      user_id: ''
    });
    const [commentData, setCommentData] = useState({});
    const [loading, setLoading] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
  
    const handleComChange = (event) => {
      setcomFormData({ ...comformData, [event.target.name]: event.target.value });
    };
  
    const handleComSubmit = async (event) => {
      event.preventDefault();

      if (!comformData.body.trim()) {
        console.log('Comment body is empty');
        return;
      }

      const uniqueCommentId = `c-${uuidv4()}`;
        // setcomFormData({
        //     ...comformData,
        //     commentable_id: questionId,
        //     user_id: userId,
        // });

      try {
        setLoading(true);
        const response = await axios.post(`${backendUrl}/api/comments/create/${questionId}`, {
          ...comformData,
            user_id: userId,
            comment_id: uniqueCommentId,

        });
        setcomFormData(response.data);
        setLoading(false);
        setcomFormData({
          body: '',
        });
      } catch (error) {
        console.error(error.message);
        setLoading(false);
        console.log('Submit failed');
      }
    };

    const handleDelete = async (commentId) => {
    
        try {
          setLoading(true);
          await axios.delete(`${backendUrl}/api/comments/delete/${commentId}`);
          setLoading(false);
          // Fetch comments again to update the commentData state
          fetchComments();
          console.log('Delete successful');
        } catch (error) {
          console.error(error.message);
          setLoading(false);
          console.log('Delete failed');
        }
      };
    
      const handleDeleteConfirmation = () => {
        if (commentToDelete) {
          handleDelete(commentToDelete);
          setCommentToDelete(null); // Reset the commentToDelete state after deletion
        }
      };
  
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/comments/create/${questionId}`);
                setCommentData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        // Fetch comments only if a new comment has been posted (loading is false)
        if (!loading) {
            fetchComments();
        }
    }, [questionId, userId, loading]);


    return (
        <div className="collapse" id={`collapseExample${questionId}`}>
            <div className={`card card-body ${styles.cardBody}`}>
                <div className={styles.commentUserImage}>
                    <Image src="/user.png" alt={"null"} width="40" height="40"/>
                </div>

                <form action="" method="post" className={styles.commentForm}>
                    <div className={styles.commentDiv}>
                        <div className={styles.commentInput}>
                            <input type="text" name='body' id="body" value={comformData.body}
                                onChange={handleComChange} className={styles.input}
                                placeholder="Enter your comment!"/>
                        </div>
                        <div className="commentButton">
                            {!loading ? <button onClick={handleComSubmit}
                                            type="submit"
                                            className={`btn btn-sm pt-2 ${styles.addCommentButton}`}>

                                Add Comment
                            </button> : <button onClick={handleComSubmit}
                                                type="submit"
                                                className={`btn btn-sm ${styles.addCommentButton}`}>

                                <div className="spinner-border text-light spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </button>}
                        </div>
                    </div>
                </form>
            </div>

            {Array.isArray(commentData) && commentData.map((comment) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className={styles.commentMain}>
                            <div className={styles.commentHeader}>
                                <div className={styles.commentUserImage}>
                                    <Image src="/user.png" width="40" height="40" alt={"..."}/>
                                </div>
                                <div className={styles.commentUserContent}>
                                    <div className="user">
                                        <div className={styles.commentUser}>
                                            <div className={styles.commentUserName}>{userName}</div>
                                            <div>
                                                <button type="button"
                                                        className={styles.followButton}>Follow
                                                </button>
                                            </div>
                                        </div>
                                        <div className={styles.commentUserDescription}>

                                            <div className={styles.commentUserDesignation}>{userId}
                                            </div>
                                            <div className={styles.globeTime}>
                                                <div className={styles.commentUserTimestamp}>5h</div>
                                                <div className={styles.globe}><Image src="/globe.png"
                                                                                     width="10"
                                                                                     height="10" alt={"..."}/></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.btnContainer}><button type="button" className={`btn btn-light  ${styles.btn}`} data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-start">
                                        <li className={styles.dropdownItem}><button className={`btn btn-light  ${styles.btnDrop}`} >Edit</button></li>
                                        <li className={styles.dropdownItem}><button  className={`btn btn-light  ${styles.btnDrop}`} data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            onClick={() => setCommentToDelete(comment.comment_id)}>Delete</button></li>
                                    </ul>

                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">WARNING!!</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className={`modal-body ${styles.confirmDeleteModal}`}>
                                                Do you want to delete the comment??
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >No</button>
                                                    <button type="button" className={`btn btn-light  ${styles.btnYes}`} data-bs-dismiss="modal" onClick={handleDeleteConfirmation}>Yes</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            <div className={styles.commentContainer}>
                                <div className={styles.comment}>
                                    {comment.body}
                                </div>
                            </div>
                            <div className={styles.buttonContainer}>
                                <div className={styles.buttonSubContainer}>
                                    <div className={styles.upDown}>
                                        <button type="button" className={`btn btn-light ${styles.btn}`}>
                                            <svg width="18" height="18" viewBox="0 0 24 24"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4 3 15h6v5h6v-5h6z"
                                                      className="icon_svg-stroke icon_svg-fill"
                                                      strokeWidth="1.5" stroke="#666" fill="none"
                                                      strokeLinejoin="round"></path>
                                            </svg>
                                            Upvote
                                        </button>
                                        <button type="button" className={`btn btn-light ${styles.btn}`}>
                                            <svg width="18" height="18" viewBox="0 0 24 24"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="m12 20 9-11h-6V4H9v5H3z"
                                                      className="icon_svg-stroke icon_svg-fill"
                                                      stroke="#666" fill="none" strokeWidth="1.5"
                                                      strokeLinejoin="round"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" className={`btn btn-light ${styles.btn}`}
                                                data-bs-toggle="collapse" href="#collapseExample1-2"
                                                role="button" aria-expanded="false"
                                                aria-controls="collapseExample1-2">Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.replyDiv}>
                                <div className={`collapse ${styles.replyBox}`} id="collapseExample1-2">
                                    <div className={`card card-body ${styles.replyCardBody}`}>
                                        <div className={styles.replyUserImage}>
                                            <Image src="/user.png" width="40" height="40"/>
                                        </div>
                                        <div className={styles.replyInput}><input type="text" className={styles.input2} placeholder="Enter your reply!"/>
                                        </div>
                                        <div className="replyButton">
                                            <button type="button"
                                                    className={`btn btn-success btn-lgs ${styles.addReplyButton}`}>Add
                                                Reply
                                            </button>
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
                                                        <div className={styles.replyUserName}>Kiran Sarma
                                                        </div>
                                                        <div>
                                                            <button type="button"
                                                                    className={styles.followButton}>Follow
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className={styles.replyUserDescription}>
                                                        <div className={styles.replyUserDesignation}>Assam
                                                            University Student
                                                        </div>
                                                        <div className={styles.globeTime}>
                                                            <div className={styles.replyUserTimestamp}>7h
                                                            </div>
                                                            <div className={styles.globe}><Image
                                                                src="/globe.png" width="10" height="10"/>
                                                            </div>
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
                                                        <div className={styles.replyUserName}>A Sarma</div>
                                                        <div>
                                                            <button type="button"
                                                                    className={styles.followButton}>Follow
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className={styles.replyUserDescription}>
                                                        <div className={styles.replyUserDesignation}>Assam
                                                            University Student
                                                        </div>
                                                        <div className={styles.globeTime}>
                                                            <div className={styles.replyUserTimestamp}>7h
                                                            </div>
                                                            <div className={styles.globe}><Image
                                                                src="/globe.png" width="10" height="10"/>
                                                            </div>
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
                    )
                )
            }


        </div>

        

    );
}


export default Comment;
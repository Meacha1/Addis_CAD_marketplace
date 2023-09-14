import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../styles/FileDetail.css';
import BuyFile from './BuyFile';
import { getUserInfoById } from '../utils/getUserInfo';
import StarRating from './StarRating';
import axios from 'axios';

const PublicFileDetail = ({ files }) => {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);
  const [isVip, setIsVip] = useState(false);
  const [is_premium, setIsPremium] = useState(false);
  const [review, setReview] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0); // Track the current file index
  const navigate = useNavigate();
  const [reviewerNames, setReviewerNames] = useState({});
  const [associatedFiles, setAssociatedFiles] = useState([]); // State for associated files

  const location = useLocation();
  let { currentUserId } = location.state;
  currentUserId = currentUserId.userId;
  const { isAdmin } = location.state;

  useEffect(() => {
    getReview();
    fetchAssociatedFiles(); // Fetch associated files when the component loads
  }, []);


  const getReview = async () => {
    try {
      const response = await fetch(`/api/GetReview/${fileId}/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      });
      const data = await response.json();
      setReview(data.reviews);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`/api/FileDetail/${fileId}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        });
        const data = await response.json();
        setFile(data);
        setIsPremium(data.is_premium);
      } catch (error) {
        console.error(error);
        setFile(null);
      }
    };

    fetchFile();
  }, [fileId]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfoById(currentUserId);
        if (userInfo) {
          setIsVip(userInfo?.is_vip);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUserId) {
      fetchUserInfo();
    }
  }, [currentUserId]);

  useEffect(() => {
    const fetchReviewerNames = async () => {
      if (Array.isArray(review)) {
        const names = {};
        for (const reviewItem of review) {
          const userName = await getUserNameById(reviewItem.user);
          names[reviewItem.id] = userName;
        }
        setReviewerNames(names);
      }
    };

    fetchReviewerNames();
  }, [review]);

  const getUserNameById = async (userId) => {
    try {
      const userInfo = await getUserInfoById(userId);
      return userInfo?.first_name || '';
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const handleDownload = async () => {
    if (!isVip && is_premium) {
      navigate('/be_vip');
      return;
    }

    if (file) {
      try {
        const response = await fetch(file.file);
        const fileData = await response.blob();
        const url = URL.createObjectURL(fileData);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.title;
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading the file:', error);
      }
    }
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    const hasSubmittedReview = review.some((reviewItem) => reviewItem.user === currentUserId);

    if (currentUserId === file.owner) {
      alert('You cannot review your own file.');
      return;
    }

    if (hasSubmittedReview) {
      alert('You have already submitted a review for this file.');
      return;
    }

    const reviewData = {
      rating: reviewRating,
      comment: reviewComment,
      user: currentUserId,
      fileId: fileId,
    };

    try {
      const response = await fetch('/api/Review/', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (response.status === 201) {
        // Review was successfully created
        // You can update the UI or show a success message here
        window.location.reload();
      } else {
        console.error('Failed to create review:', response.status);
      }
    } catch (error) {
      console.error('Failed to submit review', error);
    }
  };


  const fetchAssociatedFiles = () => {
    const parentFileId = fileId; // Replace with the actual parent file ID

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/attached-files/${parentFileId}/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      })
      .then((response) => {
        const associatedFilesData = response.data;
        setAssociatedFiles(associatedFilesData); // Set associated files data in the state
        console.log(`associatedFiles: ${associatedFilesData.length}`);
      })
      .catch((error) => {
        console.error('Error fetching associated files:', error);
      });
  };


  if (!file) {
    return <div className='file-details'>File not found</div>;
  }

  return (
    <div className='file-details'>
      <img src={`${file.file}`} alt={`${file.title}`} state={currentUserId} className='file-img' />
      <h2>{file.title}</h2>
      <p>{file.description}</p>
      <p>Price: {file.price}</p>
      <p>Category: {file.category}</p>
      {file.id && (
        <div className='star-rating-container'>
          <StarRating rating={file.average_rating} />
        </div>
      )}
      <div className='button-container'>
        {isAdmin && <button className='download-button' onClick={handleDownload}>Download File</button>}
        {!isAdmin && <BuyFile fileId={fileId} />}
      </div>
      {associatedFiles.length > 0 && (
        <div className='associated-files'>
          <h3>Associated Files</h3>
          <ul>
            {associatedFiles.map((associatedFile, index) => (
              <li key={index}>
                <img src={associatedFile.attached_file} ></img>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className='review-list'>
        <h3>Reviews</h3>
        {Array.isArray(review) && review.map((reviewItem) => (
          <div key={reviewItem.id} className='review-item'>
            <div className='review-info'>
              <p className='review-comment'>{reviewItem.comment}</p>
              {file.id && (
                <div className='star-rating-container'>
                  <StarRating rating={reviewItem.rating} />
                </div>
              )}
            </div>
            <div className='review-user'>
              <p className='review-user-name'>By: {reviewerNames[reviewItem.id]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='review-section'>
        <h3>Write a Review</h3>
        <div>
          <textarea
            placeholder='Write your review here'
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
        </div>
        <div>
          <label>Rating:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= reviewRating ? 'star-filled' : 'star-empty'}
              onClick={() => setReviewRating(star)}
            >
              &#9733;
            </span>
          ))}
        </div>
        <button className='submit-review-button' onClick={handleSubmitReview}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default PublicFileDetail;

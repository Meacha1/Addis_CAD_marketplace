import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../styles/FileDetail.css';
import BuyFile from './BuyFile';
import { getUserInfoById } from '../utils/getUserInfo';
import StarRating from './StarRating';

const PublicFileDetail = ({ files }) => {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);
  const [isVip, setIsVip] = useState(false);
  const [is_premium, setIsPremium] = useState(false);
  const [review, setReview] = useState([]);
  const navigate = useNavigate();
  const [reviewerNames, setReviewerNames] = useState({});

  const location = useLocation();
  let { currentUserId } = location.state;
  currentUserId = currentUserId.userId;
  const { isAdmin } = location.state;

  useEffect(() => {
    getReview();
  }, []);

  const getReview = async () => {
    try {
      const response = await fetch(`/api/GetReview/${fileId}/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      });
      const data = await response.json();
      setReview(data.reviews); // Update reviews state with fetched data
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
          console.log(userInfo);
          console.log(userInfo?.is_vip);
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
    // Fetch reviewer names when the component mounts
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
      return userInfo?.username || '';
    } catch (error) {
      console.error(error);
      return ''; // Return an empty string if user info is not available
    }
  };

  const handleDownload = async () => {
    if (!isVip && is_premium) {
      // Redirect non-VIP users to the "be_vip" page
      navigate('/be_vip');
      return;
    }

    if (file) {
      try {
        const response = await fetch(file.file);
        const fileData = await response.blob();

        // Create a blob URL for the file data
        const url = URL.createObjectURL(fileData);

        // Create a temporary anchor element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = file.title; // Set the desired filename
        a.style.display = 'none';

        // Append the anchor element to the document and click it
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading the file:', error);
      }
    }
  };

  // Function to handle submitting the review
  const handleSubmitReview = async (event) => {
    event.preventDefault();

    // Check if the user has already submitted a review for this file
    const hasSubmittedReview = review.some((reviewItem) => reviewItem.user === currentUserId);

    if (hasSubmittedReview) {
      // Prevent users from submitting multiple reviews
      alert('You have already submitted a review for this file.');
      return;
    }

    // Create a review object with the necessary data
    const reviewData = {
      rating: reviewRating, // Use the selected rating
      comment: reviewComment, // Use the review comment
      user: currentUserId, // Include the user ID
      fileId: fileId, // Include the file ID
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
        window.location.reload();
        // Review was successfully created
        // You can update the UI or show a success message here
      } else {
        // Handle other response statuses (e.g., validation errors)
        console.error('Failed to create review:', response.status);
      }
    } catch (error) {
      console.error('Failed to submit review', error);
    }
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
      {/* Review list section */}
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
      {/* Review section */}
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

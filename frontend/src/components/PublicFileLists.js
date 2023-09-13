import React, { useState, useEffect } from 'react';
import '../styles/FileList.css';
import { Link, useParams } from 'react-router-dom';
import { getUserInfoById } from '../utils/getUserInfo';
import { connect } from 'react-redux';
import StarRating from './StarRating';
import axios from 'axios';

function PublicFileLists({ searchQuery, selectedCategory, isAuthenticated }) {
  const [files, setFiles] = useState([]);
  const [isAdmin, setIsAdmin] = useState({});
  const [user, setUser] = useState({}); // To store user info
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const filesPerPage = 4; // Number of files to display per page
  const [review, setReview] = useState([]);
  const [data, setData] = useState([]); // To store the list of files

  const currentUserId = useParams();

  useEffect(() => {
    getFiles();
  }, [currentPage, searchQuery, selectedCategory]);


  const getReview = async (id) => {
    try {
      const response = await fetch(`/api/GetReview/${id}/`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setReview((prevReview) => ({
        ...prevReview,
        [id]: data, // Store the review object with the file ID as the key
      }));
    } catch (error) {
      console.error('Error fetching review:', error);
    }
  };
  


  const getFiles = async () => {
    // Create a query string for searchQuery and selectedCategory
    const queryParams = new URLSearchParams();
    if (searchQuery) {
      queryParams.append('query', searchQuery);
    }
    if (selectedCategory) {
      queryParams.append('category', selectedCategory);
    }
   
    const response = await axios.get(`/api/FileList/`, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('access')}`,
      },'Content-Type': 'application/json',
    }
    );
    const data = response.data;
    setData(data
    );

    if (data.length > 0) {  
      // Filter files based on searchQuery and selectedCategory
      const filteredFiles = data.filter((file) => {
        if (selectedCategory === 'owner') {
          // Handle the "Owner" category case by checking owner name
          const ownerName = user && user[file.owner];
          return ownerName && ownerName.toLowerCase().includes(searchQuery.toLowerCase());
        } else {
          // For other categories, use the original logic
          return selectedCategory === '' || (file[selectedCategory] && file[selectedCategory].toLowerCase().includes(searchQuery.toLowerCase()));
        }
      });
      
    
      setFiles(filteredFiles);
    
      if (filteredFiles.length > 0) {
        filteredFiles.forEach((file) => {
          fetchUserInfo(file?.owner);
          getReview(file?.id);
        });
      }
    };
  };

  const fetchUserInfo = async (id) => {
    try {
      const userInfo = await getUserInfoById(id);
      setUser((prevUser) => ({
        ...prevUser,
        [id]: userInfo?.first_name,
      }));
      setIsAdmin((prevIsAdmin) => ({
        ...prevIsAdmin,
        [id]: userInfo?.user_type === 'admin',
      }));
    } catch (error) {
      console.log('noooo');
    }
  };

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  const totalPages = Math.ceil(files.length / filesPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <div className='files_list'>
        <div className='card-group'>
        {currentFiles.map((file) => (
          <div key={file.id} className='card-item'>
            <div className='card-image'>
              {isAdmin[file.owner] && file.is_premium && <div className='premium-tag'></div>}
              {isAdmin[file.owner] && !file.is_premium && <div className='free-tag'></div>}
              <Link to={`/user_file/${file.id}`} state={{ currentUserId: currentUserId, isAdmin: isAdmin[file.owner] }} className='file-link'>
                <img src={`${file.file}`} alt={`${file.title}`} className='card-img' />
              </Link>
            </div>
            <div className='card-body'>
              <div className='info1'>
                <h4 className='card-title'>{file.title}</h4>
                <p className='card-text'>{file.description}</p>
                <p className="card-text">
                  Owner: {user && (
                    <Link to={`/owners_profile_for_public/${file.owner}`} state={{ currentUserId: currentUserId, isAdmin: isAdmin[file.owner] }}>{user[file.owner]}</Link>
                  )}
                </p>
                {review[file.id] && (
                  <div className='star-rating-container'>
                    <StarRating rating={review[file.id].average_rating} />
                  </div>
                )}
                {/*<p className='card-text'>isAdmin: {isAdmin[file.owner] ? 'Yes' : 'No'}</p>*/}
              </div>
              <div className='info2'>
                <p className='card-text'>Price: {file.price}</p>
                <div className='category'>
                  <p className='card-text'>{file.category}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
      <div className='pagination'>
        <ul className='pagination-list'>
          <li className='pagination-item'>
            <button
              onClick={() => paginate(currentPage - 1)}
              className={`pagination-link ${currentPage === 1 ? 'disabled' : ''}`}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index} className='pagination-item'>
              <button
                onClick={() => paginate(index + 1)}
                className={`pagination-link ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className='pagination-item'>
            <button
              onClick={() => paginate(currentPage + 1)}
              className={`pagination-link ${currentPage === totalPages ? 'disabled' : ''}`}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PublicFileLists);
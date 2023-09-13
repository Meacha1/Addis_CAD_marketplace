import React, { useState, useEffect } from 'react';
import '../styles/UserFileLists.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import StarRating from './StarRating';
import axios from 'axios';

export default function OwnerFileListForPublic({ owner }) {
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const ownerId = owner;
  const { currentUserId } = location.state;
  console.log(`currentUserId: ${currentUserId}`);

  useEffect(() => {
    if (ownerId) {
      getFiles();
    }
  }, [ownerId]);

  const getFiles = async () => {
    try {
      const response = await axios.get(`/api/UserFileList/${ownerId}/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      });
      const data = response.data;
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  return (
    <div>
      {files.length !==0 && <p>File List</p>}
      <div className='files_list'>
        <div className='card-group'>
          {files.length > 0 &&
            files.map((file) => (
              <div key={file.id} className='card-item'>
                <div className='card-image'>
                  <Link to={`/file/${file.id}`} className='file-link'>
                    <img src={`${file.file}`} alt={`${file.title}`} className='card-img' />
                  </Link>
                </div>
                <div className='card-body'>
                  <div className='info1'>
                    <h4 className='card-title'>{file.title}</h4>
                    <p className='card-text'>{file.description}</p>
                    <div className='star-rating-container'>
                        <StarRating rating={file.average_rating} />
                    </div>
         
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
      {/* Pagination controls */}
      <div className='pagination'>
        {/* Add your pagination controls here */}
      </div>
    </div>
  );
}

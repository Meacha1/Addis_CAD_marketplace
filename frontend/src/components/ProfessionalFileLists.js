import React, { useState, useEffect } from 'react';
import '../styles/UserFileLists.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProfessionalFileLists({ owner, onFilesCountChange, onAverage_rating, ...props }) {
  const [files, setFiles] = useState([]);
  const ownerId = owner;

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

      // Calculate average rating and update it via the callback
      if (data.length === 0) {
        onAverage_rating(0);
      } else {
        const average_rating = data.reduce((total, file) => total + file.average_rating, 0) / data.length;
        // Make it 2 decimal places
        const roundedRating = average_rating.toFixed(2);
        onAverage_rating(roundedRating);
      }

      // Update files count via the callback
      onFilesCountChange(data.length);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  return (
    <div>
      {files.length !==0 && <p>Your file List</p>}
      {files.length === 0 && <p>You haven't uploaded any files yet. Click the 'Upload File' button to get started</p>}
      <div className='files_list'>
        <div className='card-group'>
          {files.length > 0 &&
            files.map((file) => (
              <div key={file.id} className='card-item'>
                <div className='card-image'>
                  <Link to={`/file/${file.id}`} className='file-link'>
                    <img src={`${file.thumbnail}`} alt={`${file.title}`} className='card-img' />
                  </Link>
                </div>
                <div className='card-body'>
                  <div className='info1'>
                    <h4 className='card-title'>{file.title}</h4>
                    <p className='card-text'>{file.description}</p>
                  </div>
                  <div className='info2'>
                    <p className='card-text'>Price: {file.price}</p>
                    <div className='category'>
                      <p className='card-text'>{file.category}</p>
                    </div>
                  </div>
                </div>
                <div className='update'>
                  <button className='update-button'>
                    <Link to={{ pathname: `/file/${file.id}/update`}}>
                      Update
                    </Link>
                  </button>
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

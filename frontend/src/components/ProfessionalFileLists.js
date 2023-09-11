import React, { useState, useEffect } from 'react';
import '../styles/UserFileLists.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProfessionalFileLists({ owner }) {
  const [files, setFiles] = useState([]);
  const ownerId = owner;

  const pagenation = (data, page, perPage) => {
    const offset = (page - 1) * perPage;
    const paginatedItems = data.slice(offset, offset + perPage);
    const totalPages = Math.ceil(data.length / perPage);
    return {
      page,
      perPage,
      prePage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      total: data.length,
      totalPages,
      data: paginatedItems,
    };
  };

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
      <p>File List</p>
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
                    <Link to={{ pathname: `/file/${file.id}/update`, state: { is_active: true } }}>
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

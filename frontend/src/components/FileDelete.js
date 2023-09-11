import React from 'react';
import axios from 'axios';
import '../styles/FileDelete.css';

const FileDelete = ({ fileId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/FileDetail/${fileId}/`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        }
      );
      console.log('File deleted:', response.data);
      window.history.back();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <button className='delete-button' onClick={handleDelete}>
      Delete File
    </button>
  );
};

export default FileDelete;

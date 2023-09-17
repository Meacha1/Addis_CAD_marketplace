import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/FileDetail.css';
import FileDelete from './FileDelete';
import axios from 'axios';

const ProfessionalFileDetail = ({ files }) => {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    getFile();
  }, [fileId]);

  const getFile = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/FileDetail/${fileId}/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json', // Corrected placement
        },
      });
      const data = response.data; // Use response.data directly
      setFile(data);
    } catch (error) {
      console.error(error);
      setFile(null);
    }
  };

  const handleDownload = async () => {
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

  if (!file) {
    return <div className='file-details'>File not found</div>;
  }

  return (
    <div className='file-details'>
      <img src={`${file.thumbnail}`} alt={`${file.title}`} className='file-img' />
      <h2>{file.title}</h2>
      <p>{file.description}</p>
      <p>Price: {file.price}</p>
      <p>Category: {file.category}</p>
      <div className='button-container'>
        <button className='download-button' onClick={handleDownload}>Download File</button>
        <FileDelete className='delete-button' fileId={fileId} />
      </div>
    </div>
  );
};

export default ProfessionalFileDetail;

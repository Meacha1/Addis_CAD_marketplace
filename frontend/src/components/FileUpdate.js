import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../styles/UploadFile.css';
import axios from 'axios';

function FileUpdate() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: 0,
    file: null,
    thumbnail: null,
    attachedFiles: [],
  });
  const [thumbnailChanged, setThumbnailChanged] = useState(false);
  const [attachedFilesChanged, setAttachedFilesChanged] = useState(false);
  const [fileChanged, setFileChanged] = useState(false);

  const navigate = useNavigate();
  const fileId = useParams().fileId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/FileDetail/${fileId}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        });
        const fileData = response.data;
        setFormData({
          title: fileData.title,
          description: fileData.description,
          category: fileData.category,
          price: fileData.price,
        });
      } catch (error) {
        console.error('AxiosError:', error);
      }
    };
  
    fetchData();
  }, [fileId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData, 
      file: e.target.files[0]
    });
    
    setFileChanged(true);
  };

  const handleThumbnailChange = (e) => {
    setFormData({
      ...formData, 
      thumbnail: e.target.files[0]
    });
    setThumbnailChanged(true);
    // Handle thumbnail change and update state

  };

  const handleAttachedFilesChange = (e) => {
    const attachedFiles = Array.from(e.target.files);
    setFormData({
      ...formData,
      attachedFiles: attachedFiles,
    });
    setAttachedFilesChanged(true);
    // Handle attached files change and update state
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();

    if(fileChanged) {
      formPayload.append('file', formData.file);
    }
  
    if(thumbnailChanged) {
      formPayload.append('thumbnail', formData.thumbnail);
    }
  
    if(attachedFilesChanged) {
      formData.attachedFiles.forEach((file) => {
        formPayload.append('attached_files', file);
      });
    }

    // Only include fields that have been changed
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formPayload.append('category', formData.category);
    formPayload.append('price', formData.price);

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/FileDetail/${fileId}/`, formPayload, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      });
      console.log('Response Data:', response.data);
      window.history.back();
    } catch (error) {
      console.log(error)
    }

    navigate(`/profile/${formData?.owner}`);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        ></textarea>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="CAD">CAD</option>
          <option value="Image">Image</option>
        </select>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <h4>Thumbnail:</h4>
        <input
          type="file"
          name="thumbnail"
          onChange={handleThumbnailChange}
        />
        <h4>The main file:</h4>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        <h4>Attached Files:</h4>
        <input
          type="file"
          name="attached_files"
          onChange={handleAttachedFilesChange}
          multiple
        />
        {formData.attachedFiles.length > 0 && (
          <div className="attached-files">
            <h4>Attached Files:</h4>
            <ul>
              {formData.attachedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit">Upload File</button>
      </form>
    </div>
  );
}

export default FileUpdate;

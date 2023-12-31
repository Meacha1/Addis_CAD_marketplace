import { getUserInfoById } from '../utils/getUserInfo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProfessionalFileLists from '../components/ProfessionalFileLists';
import '../styles/UserProfile.css';
import { Link } from 'react-router-dom';
import defaultAvatar from '../assets/images/user.png';
import axios from 'axios';


const UserProfilePage = ({isAuthenticated, ...props}) => {
  const id= props.user.id;
  const [avatarURL, setAvatarURL] = useState(defaultAvatar);
  const [user, setUser] = useState(null);
  const [numberOfFilesUploaded, setNumberOfFilesUploaded] = useState(0);
  const [average_rating, setAverage_rating] = useState(0);

  const updateNumberOfFilesUploaded = (count) => {
    setNumberOfFilesUploaded(count);
  };

  const updateAverage_rating = (rating) => {
    setAverage_rating(rating);
  };

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userInfo = await getUserInfoById(id);
        setUser(userInfo);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserInfo();
  }, [id]);

  const owner = user?.id; // Define the owner variable

  useEffect(() => {
    if (user && user.avatar) {
      setAvatarURL(user.avatar);
    }
  }, [user]);

  const handleAvatarChange = async (e) => {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/uploadAvatar/${owner}/`,
        formData,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'multipart/form-data', // Make sure to set Content-Type as multipart/form-data for file uploads
          },
        }
      );
    
      if (response.status === 200) {
        const data = response.data;
        setAvatarURL(data.avatar);
      } else {
        console.error('Failed to upload avatar');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  const sale_count = user?.sale_count
  const sale_amount = user?.sale_amount

  return (
    <>
      <Header is_active={true} owner={owner} />
      <Navigation userId={id} />
      <div className="user-profile"> 
        <div className="user-profile-content">
          <div className='profile_container'>
              <h2>My Profile</h2>
              <div className="avatar-container">
                <img src={avatarURL} alt="avatar" className="avatar" />
                <div className="file-input-container">
                  <input type="file" onChange={handleAvatarChange} />
                  <label htmlFor="avatar-upload" className="btn_upload">
                    Change Avatar
                  </label>
                </div>
              </div>
              <h3>Hello, {user?.first_name}</h3>
              <div className="general-ingo">
                <p>Number of files uploaded: <span>{numberOfFilesUploaded}</span> </p>
                <p>Average rating: <span>{average_rating}</span> </p>
                <p>Number of files sold: <span>{sale_count}</span> </p>
                <p>Total amount of money earned: <span>{sale_amount}</span> Birr </p>
              </div>
              <button className="upload">
                <Link
                  to={{ pathname: `/uploadFile/${owner}`, state: { is_active: true } }}
                  className="btn_upload"
                >
                  Upload file
                </Link>
              </button>
            </div>
            <div className="file-list">
              <ProfessionalFileLists owner={owner} onFilesCountChange={updateNumberOfFilesUploaded} onAverage_rating={updateAverage_rating}/>
            </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserProfilePage);
import { getUserInfoById } from '../utils/getUserInfo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProfessionalFileLists from '../components/ProfessionalFileLists';
import UserInfo from '../components/UserInfo';
import '../styles/UserProfile.css';
import { Link } from 'react-router-dom';
import defaultAvatar from '../assets/images/user.png';


const UserProfilePage = () => {
  const { id } = useParams();
  const [avatarURL, setAvatarURL] = useState(defaultAvatar);
  const [user, setUser] = useState(null);

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
      const response = await fetch(`/users/uploadAvatar/${owner}/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAvatarURL(data.avatar);
      } else {
        console.error('Failed to upload avatar');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
    <>
      <Header username={user?.username} is_active={true} owner={owner} />
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
              <ProfessionalFileLists owner={owner} />
            </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserProfilePage;
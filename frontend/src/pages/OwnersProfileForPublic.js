import { getUserInfoById } from '../utils/getUserInfo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OwnerFileListForPublic from '../components/OwnerFileListForPublic';
import '../styles/UserProfile.css';
import defaultAvatar from '../assets/images/user.png';


const UserProfilePage = () => {
  const { ownerId } = useParams();
  const [avatarURL, setAvatarURL] = useState(defaultAvatar);
  const [user, setUser] = useState(null);

  console.log(`ownerId: ${ownerId}`)


  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userInfo = await getUserInfoById(ownerId);
        setUser(userInfo);
        setAvatarURL(userInfo.avatar)
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserInfo();
  }, [ownerId]);

  const owner = ownerId; // Define the owner variable
  const ownerName = user?.first_name;


  return (
    <>
      <Header username={user?.username} is_active={true} owner={owner} />
      <Navigation />
      <div className="user-profile"> 
        <div className="user-profile-content">
          <div className='profile_container'>
              <h2>{ownerName}'s Profile</h2>
              <div className="avatar-container">
                <img src={avatarURL} alt="avatar" className="avatar" />
              </div>
            </div>
            <div className="file-list">
              <OwnerFileListForPublic owner={owner} />
            </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserProfilePage;
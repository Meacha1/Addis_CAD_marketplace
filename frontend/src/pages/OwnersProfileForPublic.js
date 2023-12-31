import { getUserInfoById } from '../utils/getUserInfo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OwnerFileListForPublic from '../components/OwnerFileListForPublic';
import '../styles/UserProfile.css';
import defaultAvatar from '../assets/images/user.png';


const UserProfilePage = () => {
  const { ownerId } = useParams();
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
        if (ownerId) { // Check if ownerId is defined
          const userInfo = await getUserInfoById(ownerId);
          setUser(userInfo);
          setAvatarURL(userInfo.avatar);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserInfo();
  }, [ownerId]);

  const owner = ownerId; // Define the owner variable
  const ownerName = user?.first_name;
  const sale_count = user?.sale_count;
  const sale_amount = user?.sale_amount;


  return (
    <>
      <Header is_active={true}/>
      <div className="user-profile"> 
        <div className="user-profile-content">
          <div className='profile_container'>
              <h2>{ownerName}'s Profile</h2>
              <div className="avatar-container">
                <img src={avatarURL} alt="avatar" className="avatar" />
              </div>
              <div className="general-ingo">
                <p>Number of files uploaded: <span>{numberOfFilesUploaded}</span> </p>
                <p>Average rating: <span>{average_rating}</span> </p>
                <p>Number of files sold: <span>{sale_count}</span> </p>
                <p>Total amount of money earned: <span>{sale_amount}</span> Birr </p>

              </div>
            </div>
            <div className="file-list">
              <OwnerFileListForPublic owner={owner} onFilesCountChange={updateNumberOfFilesUploaded} onAverage_rating={updateAverage_rating}/>
            </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserProfilePage;
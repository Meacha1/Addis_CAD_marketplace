import { getUserInfoById } from '../utils/getUserInfo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProfessionalFileLists from '../components/ProfessionalFileLists';
import UserInfo from '../components/UserInfo';
import '../styles/UserProfile.css';

const UserProfilePage = () => {
  const { id } = useParams();
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

  return (
    <>
      <Header username={user?.username} is_active={true} owner={owner} />
      <Navigation userId={id} />
      <div className="user-profile"> 
        <div className="user-profile-content">
          <div className="user-info">
            <UserInfo user={user} owner={owner} />
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
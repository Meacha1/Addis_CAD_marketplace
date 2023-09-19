import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadFilePage from './pages/UploadFilePage';
import FilePage from './pages/FilePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import FileUpdatePage from './pages/FileUpdatePage';
import UserProfilePage from './pages/UserProfilePage';
import UserFilePage from './pages/UserFilePage';
import UserPage from './pages/UserPage';
import BeVipPage from './pages/BeVipPage'
import BuyFilePage from './pages/BuyFilePage';
import ResetPasseordConfirm from './pages/ResetPasseordConfirmPage';
import OwnersProfileForPublic from './pages/OwnersProfileForPublic';
import ResetPassword from './pages/ResetPasswordPage';
import Activate from './pages/ActivatePage';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoutes from './utils/privatRoutes'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' exact element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} /> 
            <Route path='/activate/:uid/:token' element={<Activate />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasseordConfirm />} />
            <Route path='/uploadFile/:userId' element={<UploadFilePage />} />
            <Route path="/file/:fileId/update" element={<FileUpdatePage />} />
            <Route path="/profile/:id" element={<UserProfilePage />} />
            <Route path='/file/:fileId' element={<FilePage />} />
            <Route path='/user/:userId' element={<UserPage />} />
            <Route path='/user_file/:fileId' element={<UserFilePage />} />
            <Route path='/be_vip' element={<BeVipPage />} />
            <Route path='/buy/:fileId' element={<BuyFilePage />} />
            <Route path='/owners_profile_for_public/:ownerId' element={<OwnersProfileForPublic />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
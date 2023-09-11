import React, { useState, useEffect } from 'react';
import '../styles/UserPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PublicFileLists from '../components/PublicFileLists';
import Navigation from '../components/Navigation';
import { useParams } from 'react-router-dom';
import { getUserInfoById } from '../utils/getUserInfo';

export default function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userInfo = await getUserInfoById(userId);
        setUser(userInfo);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserInfo();
  }, [userId]);

  return (
    <>
      <Header is_active={true} />
      <div className="nav-container">
        <span>Hello {user?.first_name}!</span>
        <Navigation userId={userId} />
      </div>
      <div className="home-container">
        <main className="main-content">
          <section className="description">
            <h1>Welcome to Addis CAD Marketplace</h1>
          </section>
          <div className="search-bar">
            <div className="search-category">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="description">Description</option>
                <option value="title">Title</option>
                <option value="category">Category</option>
                <option value="owner">Owner</option>
                {/* Add more category options */}
              </select>
            </div>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search for CAD models"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <button
                className="search-button"
                onClick={() => {
                  console.log('clicked');
                }}
              >
                Search
              </button>
            </div>
          </div>
        </main>
      </div>
      <PublicFileLists searchQuery={searchQuery} selectedCategory={selectedCategory} />
      <Footer />
    </>
  );
}

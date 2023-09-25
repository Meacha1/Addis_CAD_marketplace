import React from 'react';
import '../styles/AboutUs.css';
import elphazImage from '../assets/images/elphaz.jpg';
import myImage from '../assets/images/My_pic.jpg';

const AboutUs = () => {
  return (
    <div id='aboutUs' className='aboutUs'>
      <h1>ABOUT US</h1>
      <p>This project is dedicated to creating a revolutionary web-based CAD (DWG) and construction drawings marketplace. As civil engineers and consulting office professionals, we've amassed an abundance of valuable resources that are crucial for builders, newcomers in the field, students, and even seasoned experts working on various projects.</p>
      <p>Our platform serves as a hub where anyone can access these indispensable resources at an affordable price point, enabling efficient and cost-effective project planning and execution.</p>
      <p>With a keen understanding of the challenges professionals face in obtaining high-quality CAD drawings and related model files, we've taken it upon ourselves to simplify the process. Our platform offers a wide array of resources, including CAD files, construction drawings, and 3D models, all accessible in one place.</p>
      <p>Throughout the development journey, we've encountered and overcome various obstacles, enriching our technical skills while deepening our insights into the intricate realm of construction and engineering. Our collaborative efforts, fueled by diverse backgrounds and expertise, culminate in the delivery of a robust and user-friendly marketplace tailored to the needs of industry professionals.</p>
      <p>This project represents a significant milestone in our journey as software engineers and civil engineering enthusiasts. It underscores our unwavering dedication and underscores our commitment to provide a platform that empowers professionals across the construction spectrum.</p>
      <p>For more information about our project and other works, please visit our <a href="https://github.com/Meacha1/portfolio-project">Holberton School Portfolio</a>.</p>
      <div className="cards">
        <div className="profile-card">
          <img src={myImage} alt="Person 1" />
          <h2>Meacha Tafa</h2>
          <h3>Backend Developer</h3>
          <h4>Skills:</h4>
          <ul>
            <li>node.js</li>
            <li>Django</li>
            <li>JavaScript</li>
            <li>SQL</li>
            <li>HTML</li>
            <li>CSS</li> 
          </ul>
          <h4>Tasks Covered:</h4>
          <ul>
            <li>Project management</li>
            <li>User authentication</li>
            <li>Database management</li>
            <li>ORM management</li>
            <li>API development</li>
            <li>Frontend development</li>
          </ul>
        </div>
        <div className="profile-card">
        <img src={elphazImage} alt="Person 1" />
          <h2>Elphaz Bekele</h2>
          <h3>Backend Developer</h3>
          <h4>Skills:</h4>
          <ul>
            <li>node.js</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>SQL</li>
            <li>HTML</li>
            <li>CSS</li>   
          </ul>
          <h4>Tasks Covered:</h4>
          <ul>
            <li>Frontend development</li>
            <li>user authentication</li>
            <li>Database management</li>
            <li>ORM management</li>
            <li>API development</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

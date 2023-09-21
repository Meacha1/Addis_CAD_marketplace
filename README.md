# Addis CAD Marketplace

Welcome to **Addis CAD Marketplace**, your one-stop destination for CAD models and designs. This platform allows users to browse, upload, and purchase CAD files for various applications. Whether you're an engineer, architect, or hobbyist, you'll find a wide range of CAD models to meet your needs.

![Addis CAD Marketplace Screenshot](screenshot.png)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **User Authentication**: Users can register, log in, and manage their profiles.
- **Upload CAD Models**: Users can upload their CAD models, complete with descriptions and pricing.
- **Search and Browse**: Users can search for CAD models by category, title, owner, and more.
- **Purchase and Download**: Secure payment system for users to buy and download CAD models.
- **User Profiles**: Detailed user profiles with model listings and reviews.
- **Notifications**: Users receive email notifications for account activation and model purchases.

## Getting Started

Follow these instructions to set up and run the Addis CAD Marketplace locally on your machine.

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [Python](https://www.python.org/) - Python programming language
- [Django](https://www.djangoproject.com/) - Python web framework
- [MySQL](https://www.mysql.com/) - Relational database management system
- [Git](https://git-scm.com/) - Version control system (optional)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/addis-cad-marketplace.git
   cd addis-cad-marketplace
Frontend Setup

bash
Copy code
cd frontend
npm install
Backend Setup

bash
Copy code
cd backend
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install -r requirements.txt
Database Configuration

Create a MySQL database and update your Django settings in backend/addis_cad_marketplace/settings.py to use your database configuration.

Migrate Database

bash
Copy code
python manage.py makemigrations
python manage.py migrate
Start the Development Servers

Frontend:

bash
Copy code
cd frontend
npm start
Backend:

bash
Copy code
cd backend
python manage.py runserver
Access the Application

Open your web browser and navigate to http://localhost:3000 to access the Addis CAD Marketplace.

Usage
Register as a new user or log in if you already have an account.
Browse and search for CAD models based on your requirements.
Upload your own CAD models to share with the community.
Purchase and download CAD models securely.
Explore user profiles to see their listings and reviews.
Activate your account through the email confirmation link.
Contributing
We welcome contributions from the community! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name.
3. Commit your changes with clear and concise messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

License
This project is licensed under the MIT License.

Acknowledgments
. Special thanks to our instructors and mentors for their guidance and support.
. We appreciate the open-source community for inspiring and providing valuable resources.
Thank you for choosing Addis CAD Marketplace!
# Jobby App

Welcome to **Jobby App**, a front-end job search platform where authenticated users can search for jobs, view job details, and apply filters such as employment type and salary range to refine their search. This app communicates with external APIs to fetch job data, ensuring a seamless experience for job seekers.

## User Credentials
- **Username:** rahul
- **Password:** rahul@2021

You can use these credentials to log in to the app.

## Features

### Login Route
- Users can log in using the provided **username** (`rahul`) and **password** (`rahul@2021`).
- Invalid credentials will show an error message.
- Users without authentication will be redirected to the Login Route when attempting to access protected routes like Home, Jobs, and Job Item Details.
- After successful login, users will be redirected to the Home Route.

### Home Route
- Authenticated users can navigate to the Jobs Route by clicking the "Find Jobs" button.

### Jobs Route
- Users can view jobs by making an HTTP GET request to the **Jobs API**.
- Filters such as Employment Type, Salary Range, and Search are available.
- The page shows a loader while fetching data and retries on failure.
- Jobs are displayed after successful data retrieval.
- When no jobs are found, a "No Jobs View" is displayed.

### Job Item Details Route
- Users can view job details by clicking a job listing.
- The page fetches job details from the **Job Details API**.
- Similar jobs are displayed below the job details.
- The "Visit" button allows users to visit the company's website.


## Technologies Used
- **Frontend:**
  - **React.js** for building the user interface.
  - **React Router** for managing page navigation.
  - **React Icons** for adding icon components.

- **APIs Used:**
  - **Login API**: For user authentication.
  - **Profile API**: To fetch user profile data.
  - **Jobs API**: To fetch job listings with various filters (search, employment type, salary range).
  - **Job Details API**: To fetch detailed information about a specific job.
  

## Installation

Installation

Clone the repository: git clone https://github.com/svineethk/Jobby-App

Install dependencies: If you're using npm: npm install Or, if you're using yarn: yarn install

Start the development server: If you're using npm: npm start Or, if you're using yarn: yarn start

This will start the application in development mode, and you can view it by navigating to http://localhost:3000.

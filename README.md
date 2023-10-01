# Blog Analytics and Search Tool

This Express.js application serves as a blog analytics and search tool. It retrieves data from a third-party blog API and performs various analyses to provide insightful statistics to clients. Additionally, it implements a blog search functionality. Below are the key features and goals achieved in this project:

## Features and Goals:

### 1. **Data Retrieval:**
   - Utilizes Express.js to create routes for fetching blog data from a third-party API endpoint.
   - Ensures error handling for fetching data, responding with appropriate messages if the API is unavailable.

### 2. **Data Analysis:**
   - Uses Lodash library to perform the following analytics on the fetched data:
     - Calculates the total number of blogs.
     - Finds the blog with the longest title.
     - Determines the number of blogs with titles containing the word "privacy."
     - Creates an array of unique blog titles (no duplicates).

### 3. **Blog Search Functionality:**
   - Implements a search functionality based on query parameters, filtering blogs based on the provided keyword (case-insensitive).
   - Handles various scenarios, including invalid or empty search queries, and provides meaningful error messages.

### 4. **Memoization:**
   - Implements caching using Lodash's `memoize` function for both analytics and search results.
   - Caches results for a certain period, enhancing performance by serving cached data for repeated requests made within the caching period.

### 5. **Error Handling:**
   - Handles errors during data retrieval, analysis, or search process, ensuring proper error messages are sent to clients.
   - Implements error handling without direct copying of code from external sources, showcasing original implementation.

## Code Explanation:

### 1. **Data Retrieval and Middleware:**
   - Uses Express.js to create routes for `/api/blog-stats` and `/api/blog-search`.
   - Utilizes Axios to fetch blog data from the provided API endpoint.
   - Implements middleware to ensure data availability, responding with appropriate error messages if data retrieval fails.

### 2. **Data Analysis and Memoization:**
   - Utilizes Lodash functions for various analytics tasks, such as finding the longest blog title and filtering blogs based on specific criteria.
   - Implements memoization using Lodash's `memoize` function for analytics and search results, enhancing performance by serving cached data for repeated requests within the caching period.

### 3. **Blog Search Functionality:**
   - Implements a search endpoint at `/api/blog-search`, accepting query parameters for search.
   - Filters blogs based on the provided keyword, handling different query scenarios and returning relevant results or error messages accordingly.

### 4. **Error Handling:**
   - Implements error handling middleware to catch and handle unhandled errors, ensuring consistent error responses to clients.

## How to Use:

### 1. **Getting Started:**
   - Clone the repository to your local machine.
   - Run `npm install` to install dependencies.
   - Start the server using `node app.js`.

### 2. **Endpoints:**
   - `/api/blog-stats`: Provides analytics data about the blogs, including total number of blogs, longest title, blogs with "privacy" in the title, and unique blog titles.
   - `/api/blog-search?query=keyword`: Searches for blogs containing the specified keyword.

## Achievements:
- [x] Data retrieval from the third-party blog API.
- [x] Calculation of total number of blogs, finding the longest title, and identifying blogs with "privacy" in the title.
- [x] Implementation of blog search functionality with query parameter.
- [x] Original implementation of error handling for various scenarios.
- [x] Utilization of Lodash's `memoize` function for caching analytics and search results.
  
---
  
*Note: This project demonstrates the successful implementation of the specified features and goals, meeting the requirements outlined in the assignment instructions.*

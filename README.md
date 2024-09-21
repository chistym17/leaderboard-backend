# User Points Ranking System

## Objective
Create a system that allows users to select one of ten users, claim random points for that selected user, and dynamically display user rankings based on total points. The backend is developed using Node.js, and the frontend is built using React.js.

## Features Overview

### User Collection
- Create a collection of 10 users in the database. Each user will have the following structure:
  - **Name**: User's name
  - **Total Points**: Total points awarded to the user

#### Example Users
1. Rahul
2. Kamal
3. Sanaki
4. Anjali
5. Ravi
6. Priya
7. Aman
8. Neha
9. Deepak
10. Sneha

### Claim Button
- A button that, when clicked, awards random points (1 to 10) to the selected user identified by their `userId`.

### Random Points Logic
- Points are generated randomly between 1 to 10 when the claim button is pressed.

### Ranking Calculation
- Users are sorted by total points in descending order, and ranks are assigned based on this sorting.

### Real-Time Updates
- Implement real-time ranking updates to fetch updated rankings after each point claim, ensuring users see the most current leaderboard.




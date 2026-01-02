🏨 StaySmart — Hostel Management System

A full-stack Hostel Management System built with the MERN stack, featuring separate Admin and Student roles, room allocation, request handling, complaints, and fee management.
​

Live Demo: https://stay-smart-hostel-management-system.vercel.app/

Admin Email: email-kumarsumit48338@gmail.com

Admin Password: sumit123
​

✨ Features
👨‍💼 Admin
Add, update, and view rooms with image upload support and automatic capacity updates.
​

View all room allocation requests and accept or reject them in one place.
​

Manage student complaints and track fee payments efficiently.
​

👨‍🎓 Student
View all currently available rooms along with details and photos.
​

Apply for a room once and track the assigned room in the My Room section.
​

Raise and manage complaints through an in-app complaint system.
​

🛠 Tech Stack
Frontend: Next.js, React, Tailwind CSS.
​

Backend: Node.js, Express.js with REST APIs.
​

Database: MongoDB using Mongoose ODM.
​

Authentication: JWT-based auth with role handling for Admin and Student.
​

File Uploads: Handled using Multer for room images.
​

📸 Screenshots
Place UI screenshots in a screenshots/ folder and reference them in the README:
![Home](./screenshots/home.png)
![Login](./screenshots/login.png)
![Admin Rooms](./screenshots/rooms.png)
![Admin Rooms](./screenshots/request.png)
![Admin Rooms](./screenshots/dashboard.png)
![Admin Rooms](./screenshots/complain.png)


⚙️ Environment Setup
Create a .env file in the backend directory:

text
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

EMAIL_USER=your_email
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin_email
ADMIN_MASTER_OTP=1234
Never commit or push the .env file to GitHub.
​

▶️ Run Locally
Backend
bash
cd server
npm install
npm run dev
Frontend
bash
cd client
npm install
npm run dev
✅ Project Status
✔ Fully working end-to-end.

✔ Complete Admin and Student flows.

✔ Ready for deployment on platforms like Vercel and Render.
​

👤 Author
Sumit Kumar
MERN Stack Developer.
​

Feel free to tell the desired style (thoda casual / zyada professional / interview-focused), then this README can be tweaked even more to match that.

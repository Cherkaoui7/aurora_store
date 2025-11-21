# ✨ AURORA | Premium MERN Stack E-Commerce

![Aurora Banner](https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop)

> **Live Demo:** [https://aurora-ecommerce.vercel.app](https://aurora-ecommerce.vercel.app) *(Replace with your link)*

## 👋 Hi, I'm Abdessamad.
Welcome to **AURORA**. This isn't just another e-commerce template—it's a fully functional, full-stack application I built from scratch to push the limits of the MERN stack.

My goal was to create a shopping experience that feels **"premium" and "tactile."** I moved away from standard, boring tables and built a fluid, animated interface where every interaction—from hovering over a card to adding an item to the cart—feels satisfying.

## 🛠️ The Tech Stack
I chose the **MERN Stack** for its scalability and unified JavaScript ecosystem.

- **Frontend:** React.js (Vite), React Router, Context API.
- **Styling:** CSS Modules (Scoped), Framer Motion (for complex physics-based animations).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Atlas), Mongoose.
- **Storage:** Multer (Local/Server-side image handling).
- **Admin Panel:** A dedicated React Dashboard for inventory management.

---

## 🚀 Key Features

### 🛍️ The Storefront (Customer Experience)
I wanted the user to feel like they were using a high-end mobile app, even on the web.
- **"Emoji-Style" UI:** Rounded corners, soft shadows, and "bouncy" spring animations on interaction.
- **Smart Search:** Real-time filtering that instantly finds products as you type.
- **Dynamic Cart:** A persistent shopping cart that calculates totals and shipping logic on the fly.
- **Wishlist:** Ability to "heart" items and save them for later (Local State).
- **Optimized Performance:** Images are lazy-loaded, and components use `useMemo` to prevent unnecessary re-renders.

### 🛡️ The Admin Dashboard (My Command Center)
The frontend is nothing without data. I built a separate React application just to manage the business.
- **Product Uploads:** I can upload real product images, set prices, and categorize items (Men, Women, Accessories).
- **Order Management:** When a customer places an order, it appears here instantly.
- **Status Tracking:** I can update an order from "Placed" → "Shipped" → "Delivered".
- **Inventory Control:** Delete old items or update stock with a click.

---

## 📸 Screenshots

| **The Hero Section** | **The Shopping Cart** |
|:---:|:---:|
| ![Hero](https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=500&auto=format&fit=crop) | ![Cart](https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=500&auto=format&fit=crop) |

| **Admin Dashboard** | **Product Details** |
|:---:|:---:|
| *(Add your Admin screenshot here)* | *(Add your Product screenshot here)* |

---

## 💻 How to Run Locally

Want to see the code in action? Here is how to boot up the entire ecosystem (Frontend + Backend + Admin).

### 1. Clone the Repo
```bash
git clone [https://github.com/Cherkaoui7/Aurora.git](https://github.com/Cherkaoui7/Aurora.git)
cd aurora-ecommerce
2. Wake up the Server (The Brain)
Bash

cd backend
npm install
Create a .env file in /backend and add your MongoDB URI:

Extrait de code

PORT=4000
MONGODB_URI=your_mongodb_connection_string
Run it:

Bash

npm run server
3. Start the Admin Panel (The Boss)
Open a new terminal:

Bash

cd admin
npm install
npm run dev
4. Start the Storefront (The Shop)
Open a new terminal:

Bash

# Return to root if needed
npm install
npm start
🔮 What's Next?
I am currently working on:

[ ] Integrating Stripe Payment Gateway for real credit card processing.

[ ] Adding User Authentication (JWT) for customer login/signup history.

[ ] Deploying the Backend to Render/Railway.

👨‍💻 Author
Abdessamad Cherkaoui Full-Stack MERN Developer If you have questions about the architecture or want to discuss the project, feel free to reach out!
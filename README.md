# Cancer Herbalist - Clinic Website

A professional, mobile-responsive React.js website for an herbal cancer treatment clinic. Built with React, Vite, Framer Motion, and EmailJS for seamless appointment booking.

## 🛠️ Tech Stack
- **Frontend:** React (Vite)
- **Styling:** Custom CSS, Pastel Green & White Aesthetic
- **Animations:** Framer Motion, AOS (Animate On Scroll)
- **Icons:** React Icons (`react-icons/fa`)
- **Email Service:** EmailJS (Client-side form submission)

---

## 🚀 Local Development Setup

### 1. Prerequisites
Make sure you have Node.js installed. If not, download it from [nodejs.org](https://nodejs.org/).

### 2. Install Dependencies
Open your terminal, navigate to the project folder, and run:
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
The website will usually be available at `http://localhost:5173`.

---

## 📧 EmailJS Setup Guide (For Contact & Booking Forms)

To make the appointment booking form work, you need to connect it to your own EmailJS account. Follow these steps:

### Step 1: Create an EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account.

### Step 2: Add an Email Service
1. In your EmailJS dashboard, navigate to **Email Services** (on the left menu).
2. Click **Add New Service** and select your preferred email provider (e.g., Gmail).
3. Connect your email account and hit **Create Service**.
4. Copy the **Service ID** (e.g., `service_abc123`).

### Step 3: Create an Email Template
1. Go to **Email Templates** on the left menu and click **Create New Template**.
2. This is the email that the clinic will receive when a patient books an appointment. Design the body of the email however you like, but you **must** use the exact variables defined in your code. 

Here is a recommended template body:
```text
New Appointment Request:

Patient Name: {{patient_name}}
Phone Number: {{patient_phone}}
Email: {{patient_email}}
Treatment: {{treatment_type}}
Stage: {{cancer_stage}}

Requested Date: {{appointment_day}}
Requested Time: {{appointment_slot}}

Message:
{{patient_message}}
```

3. In the template settings, set the **Reply To** field to `{{reply_to}}` so you can click "reply" in your email client and reply directly to the patient.
4. Save the template and copy the **Template ID** (e.g., `template_xyz456`).

### Step 4: Get Your Public Key
1. Go to the **Account** tab (top right corner or left menu).
2. Under the "General" section, copy your **Public Key** (e.g., `A1b2C3d4E5f6G7h8`).

### Step 5: Update the Code
Open `src/pages/Contact.jsx` in your code editor. Around line 13, find the EmailJS configuration variables and paste your keys:

```javascript
// ─────────────────────────────────────────────────────────
// ✅ EMAILJS CONFIG
// ─────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz456'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'A1b2C3d4E5f6G7h8'
```

Save the file. Your contact form is now fully functional and will send booking requests directly to your email!

---

## 📂 Project Structure

```text
src/
├── assets/          # Images, logos, and static assets
├── components/      # Reusable React components (Navbar, Footer, Forms, etc.)
├── pages/           # Main application pages (Home, About, Services, Contact)
├── App.jsx          # Main application routing
├── index.css        # Global CSS variables and utility classes
└── main.jsx         # React entry point
```

<img src="https://i.ibb.co.com/7NrtB6Vv/image.png" />

# Forkathon 2026: *KontaKar* by KUET_NextCoders

> Built for ForkedArch Freshers Hackathon 2026

## 👥 Team

| Name     | Roll     | Department | GitHub    |
| -------- | -------- | ---------- | --------- |
| Tasif Abdullah | 2K2507025 | CSE        | @tasifabd |
| Raghib Iqbal | 2K2507026 | CSE        | @Raghib-Iqbal |
| Amanat Aziz Khan | 2K2507052 | CSE        | @amanat11-codes |
| Musarratul Abedin Mahim | 2K2507053| CSE        | @musarratul2004 |

---

## ❔ Problem

### Problem Statement.  

The Mystery of the Missing Things  
  
Every campus has a strange little ecosystem of lost belongings. A calculator disappears before a lab exam. Someone finds an umbrella outside the cafeteria but has no idea whose it is. A student leaves their ID card somewhere and discovers it three days later in a completely different building. Usually, these objects aren't truly lost—they're simply disconnected from the person looking for them.  
  
A calculator disappears right before a class. Someone finds an umbrella outside the cafeteria but has no idea who owns it. Another student finds an ID card on the ground and wants to return it. Every day, students lose things that are often found by someone else—but the two people rarely know how to find each other.  
  
The Problem probably needs a digital solution.  
  
  
Brainstorming twist:  
Don't limit yourself to simply matching identical names or descriptions. Think about how the system could intelligently determine that two seemingly different reports might refer to the same object.

### KUET_NextCoder's Understanding

It was the admission season—the examinees were waiting in queue for the gate to open. Just as Amanat was about to enter the exam hall, he started to panic.

It was an engineering admission test, and he couldn't find his calculator in his bag.

Earlier that day, while Amanat was enjoying a cup of coffee and revising his notes in the cafeteria, a tough problem had caught his eye. He thought it was very likely to appear on the exam that day. So, he brought out his calculator and double-checked whether he could solve it correctly. A few minutes passed, and voila—he successfully solved the problem. He placed the calculator on the side of the table and took a relaxing sip of coffee.

He finished his cup of coffee, paid the bill, and got up to join the queue.

However, he had forgotten his calculator at the coffee table.

There was no time to go back and retrieve the calculator from the cafeteria. If only he could contact the person who sat at the table after he left to ask them to bring it to him!

Such incidents occur on a daily basis. Sometimes we lose a calculator, other times we lose our national ID cards, an umbrella, or perhaps the keychain our seniors gave us as a gift. Solving these issues is the goal of **KontaKar**, brought to you by **KUET_NextCoders**.

**KontaKar** features an intelligent matching, verification, and reporting system. Users can quickly report missing items to reach the entire **KontaKar** network. Simultaneously, owners can browse reports posted by finders and respond to the listing that matches their situation. To prevent fraudulent claims, the cross-checking system utilizes secret verification questions that only the rightful owner can answer. This intelligent, secure process guarantees that lost items safely reunite with their true owners.

---

## Our Solution

### Overview

**Key System Features**

**Dual Operational Modes**
- Lost Item Reporting: Users who lose an item can submit a detailed report specifying key attributes, distinguishing features, and the precise location where it was lost.

- Found Item Search & Response: Finders can browse active queries in the database and directly respond to reports matching the item in their possession.

**Intelligent Verification & Fraud Prevention**
An automated cross-verification system safeguards items by prompting claimants with custom secret questions established by the finder. Because only the true owner possesses these unique answers, the system effectively prevents fraudulent claims and guarantees secure returns.

**Privacy-First Architecture**
User privacy is built into the core design. Personal contact information remains entirely hidden while browsing the database. Contact details are securely exchanged between both parties only after a successful verification match.

**Roadmap & Future Developments**
Audit & Accountability Logging: A tracking system that logs successfully matched interactions to detect, flag, and penalize fraudulent entries or improper usage.

### How It Works

**User Authentication:** The user logs in securely using their Student ID and contact information. Invalid / non-existent credentials are not allowed to log in.

**Action Selection & Report Submission:**

- Owner Path: If an item is missing, the user browses the item feed and selects the report that matches their lost item, then answers a secret verification question to confirm ownership.

- Finder Path: If an item is found, the user submits a found item report containing details and custom verification parameters, which updates the central database.

**Database Search & Match Selection:** The system queries the database based on the user's input parameters and displays relevant matching results. The owner then selects the entry that aligns with their missing item.

**Intelligent Cross-Verification:** To establish ownership, the verification system prompts the claimant with secret questions set by the finder regarding non-obvious details of the item.

**Algorithmic Trust Scoring:** The system evaluates the provided answers. If the answers are correct the match is deemed successful; otherwise, the attempt is rejected to prevent fraudulent claims.

**Secure Data Release:** Upon a successful match, the system releases the contact details of both parties to facilitate a direct and safe exchange.

---

## Technology Stack  

- 🖥️ **Frontend: HTML, CSS, and Vanilla JavaScript**  
  We use 🧱 HTML for the structure, 🎨 CSS for styling, and ⚡ Vanilla JavaScript for functionality and user interaction.  

- 🔧 **Backend/API: JSON Server**  
  JSON Server acts as a lightweight backend and provides 🌐 RESTful API endpoints for handling data and CRUD operations (➕ Create, 👀 Read, ✏️ Update, 🗑️ Delete).  

- 🔌 **API Connection: JavaScript Fetch API**  
  JavaScript communicates with the JSON Server using the 📡 Fetch API to send requests and receive data.  

- 🗄️ **Database/Data Storage: JSON File ("db.json")**  
  The data is stored in a 📂 JSON file, which JSON Server uses as a simple data store. JSON itself is a data format, not a full database system.  

---

## System Overview
Here we try to develop a SaaS-type web application. 
- Users log in and credentials are checked. 
- If someone finds something and reports it, we make a POST request to store the data in the JSON Server item list. 
- Reported items are tracked in a separate list. 
- If someone claims an item, they provide details. 
- We match the claim and provide the contact number of the reporter.

---

## Program Flow

```mermaid
flowchart TD
    Start([Start]) --> Login[Login]
    Login --> Auth{Valid credentials?}
    Auth -->|No| Login
    Auth -->|Yes| Type{User type?}

    Type -->|Found item| ReportForm[Report Found Item]
    ReportForm --> SaveItem[Save item to database]
    SaveItem --> Feed

    Type -->|Lost item| Feed[Browse Item Feed]

    Feed --> Action{User type?}
    Action -->|Lost user| Claim[Verify secret features]
    Claim -->|Match| Reveal[Reveal finder's contact]
    Claim -->|No match| Feed

    Action -->|Found user| Respond[View claimer's details<br/>+ contact info]
```

## Architecture
``` mermaid
flowchart TD
    User[👤 User]
    Frontend["🖥️ Frontend<br/>(index.html, class.js, style.css)"]
    APIConnection["🔌 API Connection<br/>(app.js)"]
    Backend["⚙️ Backend<br/>(JSON Server)"]
    Database[("🗄️ Database<br/>(db.json)")]

    User --> Frontend
    Frontend --> APIConnection
    APIConnection --> Backend
    Backend --> Database
```

---

## Installation and Setup

### JSON Server Setup
1. Download Node.js

Download and install Node.js from the official website:

https://nodejs.org/en/download

2. Check Node.js Installation

Open the VS Code Terminal (or Command Prompt) and run:

``` 
node --version
```

You can also check the npm version:

```
npm --version
```

If a version number is displayed, Node.js and npm have been installed successfully.

3. Install JSON Server

Install JSON Server globally using:

npm install -g json-server

4. Start JSON Server

Make sure your terminal is opened in the folder containing your JSON file, then run:

json-server db.json


**Note:** Replace db.json with the name of your JSON file if it has a different name.

For example, if your file is named data.json:

json-server data.json

Website will be accessible via "http://localhost:3000/" on local machine.

---

## AI Usage
We used AI tools to assist in writing parts of the codebase. The AI primarily handled the labor‑intensive tasks such as generating boilerplate code, repetitive structures, and syntax details.

However, our team’s contribution was not diminished — we focused on the core logic, architecture, and ideas that shaped the application. The AI acted as a supportive tool, while we made the key design decisions, implemented the workflow, and ensured the system aligned with our vision.

In other words, AI was like an engineering assistant: it helped with the heavy lifting, but the problem‑solving, creativity, and decision‑making came from us. This balance allowed us to move faster while still maintaining ownership of the project’s logic and innovation.

---
## Testing / Quality Assurance
The system was individually tested across multiple devices to ensure compatibility and consistent performance. Local servers were set up to validate the database collection and retrieval components, ensuring that data flows correctly between the frontend and backend. Overall, a thorough quality check was carried out on the project and its codebase to minimize unexpected issues and ensure reliability.

---
## Future Improvements
Looking ahead, several enhancements are planned to make the system more robust and user‑friendly:

Inquiry‑based feed system: Users will only see items relevant to their search, improving efficiency and personalization.

Image support for lost objects: The ability to upload and display images of reported items is currently in development.

AI‑powered object detection and feature extraction: An intelligent system will automatically identify key attributes of an object (e.g., type, color, material) from uploaded images, making reporting and matching more accurate.

---
## Presentation Video

https://drive.google.com/drive/folders/1bxa11IyOy7xJXMPnanaGw2oEVghK-3QC?usp=sharing

---

<b>Forkathon: Freshers Hackathon 2026 presented by ForkedArch powered by XtendArena</b>

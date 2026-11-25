# Student Attendance Management System

**Course:** CSD0111 – Project Studio-I  
**Academic Session:** July–December 2026  
**Project Topic:** 4. Student Attendance System  

## Student Details
- **Name:** [Ayush Singh Sikarwar]
- **Roll Number:** [BETN1CS26203]
- **College/University:** [ITMU]

## Project Description
The **Student Attendance Management System** is an integrated mini-project designed to simplify tracking student attendance, calculating percentages automatically, and identifying students with attendance shortages (<75%). It combines a functional web application built with HTML, CSS, and JavaScript alongside analytical reporting in MS Excel, documentation in MS Word, and a presentation in MS PowerPoint.

## Key Features
- **Live Summary Dashboard:** Tracks total students, eligible students (≥75%), and defaulters (<75%).
- **Form Validation:** Prevents duplicate Roll Number + Subject records and ensures attended classes do not exceed total classes.
- **Automated Percentage & Status:** Calculates attendance percentages to 2 decimal places and assigns `Eligible` or `Low Attendance` badges.
- **Quick Attendance Marking:** One-click `+P` (Present) and `+A` (Absent) buttons for instant updates.
- **Search & Filter:** Filter records by eligibility status or search by student name/roll number.
- **LocalStorage Persistence:** Saves data locally in the browser across page reloads.

- ## Folder Structure
```text
CSD0111_Mini_Project/
├── 01_Word_Documentation/
│   ├── Project_Report.docx
│   └── Project_Report.pdf
├── 02_Excel_Workbook/
│   └── Project_Data.xlsx
├── 03_PowerPoint/
│   └── Project_Presentation.pptx
├── 04_Website/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── 05_Screenshots/
│   └── Project_Screenshots/
└── README.md
```

## How to Run the Website
1. Navigate to the `04_Website/` folder.
2. Double-click `index.html` to open it in any modern web browser (Chrome, Edge, Firefox).
3. Add new student attendance records using the form, test the `+P`/`+A` buttons, and try the search/filter bar.

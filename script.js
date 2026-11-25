// Initialize records from LocalStorage or load default sample records
let attendanceRecords = JSON.parse(localStorage.getItem('studentAttendance')) || [
    { id: 1, rollNo: 'CS101', name: 'Aarav Sharma', subject: 'Web Technologies', total: 40, attended: 36 },
    { id: 2, rollNo: 'CS102', name: 'Priya Verma', subject: 'Data Structures', total: 40, attended: 26 },
    { id: 3, rollNo: 'CS103', name: 'Rohan Gupta', subject: 'Database Systems', total: 35, attended: 30 }
];

const form = document.getElementById('attendanceForm');
const errorMsg = document.getElementById('errorMsg');
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');

// Save to LocalStorage
function saveRecords() {
    localStorage.setItem('studentAttendance', JSON.stringify(attendanceRecords));
}

// Functionality 1: Form Validation & Adding New Student Record
form.addEventListener('submit', function(e) {
    e.preventDefault();
    errorMsg.textContent = '';

    const rollNo = document.getElementById('rollNo').value.trim().toUpperCase();
    const name = document.getElementById('studentName').value.trim();
    const subject = document.getElementById('subject').value;
    const total = parseInt(document.getElementById('totalClasses').value);
    const attended = parseInt(document.getElementById('attendedClasses').value);

    // Validation checks
    if (attended > total) {
        errorMsg.textContent = 'Error: Classes attended cannot be greater than total classes held!';
        return;
    }

    const isDuplicate = attendanceRecords.some(rec => rec.rollNo === rollNo && rec.subject === subject);
    if (isDuplicate) {
        errorMsg.textContent = 'Error: Record for this Roll Number and Subject already exists!';
        return;
    }

    const newRecord = {
        id: Date.now(),
        rollNo,
        name,
        subject,
        total,
        attended
    };

    attendanceRecords.push(newRecord);
    saveRecords();
    form.reset();
    renderTable();
});

// Functionality 2: Mark Quick Present (+1) or Absent (+0)
function markAttendance(id, isPresent) {
    const record = attendanceRecords.find(rec => rec.id === id);
    if (record) {
        record.total += 1;
        if (isPresent) {
            record.attended += 1;
        }
        saveRecords();
        renderTable();
    }
}

// Functionality 3: Delete a Student Record
function deleteRecord(id) {
    if (confirm('Are you sure you want to delete this attendance record?')) {
        attendanceRecords = attendanceRecords.filter(rec => rec.id !== id);
        saveRecords();
        renderTable();
    }
}

// Functionality 4: Calculate Percentage, Update Summary Cards & Filter Table
function renderTable() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = statusFilter.value;

    tableBody.innerHTML = '';
    let eligibleCount = 0;
    let defaulterCount = 0;

    attendanceRecords.forEach(rec => {
        const percentage = ((rec.attended / rec.total) * 100).toFixed(2);
        const isEligible = percentage >= 75;

        if (isEligible) eligibleCount++;
        else defaulterCount++;

        // Apply Search and Filter
        const matchesSearch = rec.name.toLowerCase().includes(searchTerm) || rec.rollNo.toLowerCase().includes(searchTerm);
        const matchesFilter = filterValue === 'all' || 
                              (filterValue === 'eligible' && isEligible) || 
                              (filterValue === 'shortage' && !isEligible);

        if (matchesSearch && matchesFilter) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${rec.rollNo}</strong></td>
                <td>${rec.name}</td>
                <td>${rec.subject}</td>
                <td>${rec.attended} / ${rec.total}</td>
                <td><strong>${percentage}%</strong></td>
                <td>
                    <span class="badge ${isEligible ? 'badge-eligible' : 'badge-shortage'}">
                        ${isEligible ? 'Eligible' : 'Low Attendance'}
                    </span>
                </td>
                <td>
                    <button class="btn-action btn-present" onclick="markAttendance(${rec.id}, true)" title="Mark Present">+P</button>
                    <button class="btn-action btn-absent" onclick="markAttendance(${rec.id}, false)" title="Mark Absent">+A</button>
                    <button class="btn-action btn-delete" onclick="deleteRecord(${rec.id})" title="Delete">Del</button>
                </td>
            `;
            tableBody.appendChild(row);
        }
    });

    // Update Dashboard Summary
    document.getElementById('totalStudents').textContent = attendanceRecords.length;
    document.getElementById('eligibleCount').textContent = eligibleCount;
    document.getElementById('defaulterCount').textContent = defaulterCount;
}

// Event Listeners for Live Search & Filter
searchInput.addEventListener('input', renderTable);
statusFilter.addEventListener('change', renderTable);

// Initial Render
renderTable();

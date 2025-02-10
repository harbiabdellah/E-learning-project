// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkqGCjX0aVZkbF_sh7cMSzjei62jp7xhU",
    authDomain: "e-learning-project-98abd.firebaseapp.com",
    projectId: "e-learning-project-98abd",
    storageBucket: "e-learning-project-98abd.appspot.com",
    messagingSenderId: "640846153917",
    appId: "1:640846153917:web:351d64332de23dfd024fd4",
    measurementId: "G-B3FJWRYE9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
let title = document.getElementById('title');
let image = document.getElementById('image'); // Image URL input field
let category = document.getElementById('category');
let description = document.getElementById('description');
let price = document.getElementById('price');
let duration = document.getElementById('duration');
let submit = document.getElementById('submit');
let tbody = document.getElementById('tbody');

let mode = 'create';
let editId = null;

const approvalTbody = document.getElementById("approval-tbody");

// Create or Update Course
submit.onclick = async function () {
    let newCourse = {
        title: title.value,
        image: image.value, // Direct URL
        category: category.value,
        description: description.value,
        price: parseFloat(price.value),
        duration: duration.value
    };

    if (title.value !== '' && category.value !== '') {
        if (mode === 'create') {
            await addDoc(collection(db, "courses"), newCourse);
        } else {
            await updateDoc(doc(db, "courses", editId), newCourse);
            mode = 'create';
            submit.innerText = 'Create';
        }
        clearFields();
        displayCourses();
    }
};

// Clear Input Fields
function clearFields() {
    title.value = '';
    image.value = ''; // Clear image URL input
    category.value = '';
    description.value = '';
    price.value = '';
    duration.value = '';
}

// Display Courses from Firestore
async function displayCourses() {
    tbody.innerHTML = '';
    const snapshot = await getDocs(collection(db, "courses"));

    snapshot.forEach((docData) => {
        let course = docData.data();

        let row = `
            <tr>
                <td>${docData.id}</td>
                <td>${course.title}</td>
                <td>${course.category}</td>
                <td>${course.description}</td>
                <td>${course.price}</td>
                <td>${course.duration}</td>
                <td><button onclick="editCourse('${docData.id}', '${course.title}', '${course.image}', '${course.category}', '${course.description}', '${course.price}', '${course.duration}')">Edit</button></td>
                <td><button onclick="deleteCourse('${docData.id}')">Delete</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Edit Course - Attach to Window
window.editCourse = function (id, cTitle, cImage, cCategory, cDescription, cPrice, cDuration) {
    title.value = cTitle;
    image.value = cImage; // Fill image URL input
    category.value = cCategory;
    description.value = cDescription;
    price.value = cPrice;
    duration.value = cDuration;

    mode = 'update';
    editId = id;
    submit.innerText = 'Update';
}

// Delete Course - Attach to Window
window.deleteCourse = async function (id) {
    await deleteDoc(doc(db, "courses", id));
    displayCourses();
}

// Fetch enrollments where approved = false
async function fetchPendingEnrollments() {
    approvalTbody.innerHTML = ''; // Clear previous data
    const snapshot = await getDocs(collection(db, "enrollments"));

    snapshot.forEach((docData) => {
        let enrolment = docData.data();

        if (!enrolment.approved) {
            let row = `
                <tr>
                    <td>${enrolment.userId}</td>
                    <td>${enrolment.courseTitle}</td>
                    <td><button onclick="approveCourse('${docData.id}')">Approve</button></td>
                    <td><button onclick="ignoreCourse('${docData.id}')">Ignore</button></td>
                </tr>
            `;
            approvalTbody.innerHTML += row;
        }
    });
}

// Approve enrollment
window.approveCourse = async function (enrolmentId) {
    await updateDoc(doc(db, "enrollments", enrolmentId), { approved: true });
    fetchPendingEnrollments(); // Refresh the table
};

// Ignore enrollment (set approved to false explicitly)
window.ignoreCourse = async function (enrolmentId) {
    await updateDoc(doc(db, "enrollments", enrolmentId), { approved: false });
    fetchPendingEnrollments(); // Refresh the table
};


// Search Feature
window.searchData = async function (value) {
    tbody.innerHTML = '';
    const snapshot = await getDocs(collection(db, "courses"));
    snapshot.forEach((docData) => {
        let course = docData.data();
        if (course.title.toLowerCase().includes(value.toLowerCase())) {
            let row = `
                <tr>
                    <td>${docData.id}</td>
                    <td>${course.title}</td>
                    <td>${course.category}</td>
                    <td>${course.description}</td>
                    <td>${course.price}</td>
                    <td>${course.duration}</td>
                    <td><button onclick="deleteCourse('${docData.id}')">Delete</button></td>
                </tr>
            `;
            tbody.innerHTML += row;
        }
    });
}

// Load Courses on Start
displayCourses();
fetchPendingEnrollments();


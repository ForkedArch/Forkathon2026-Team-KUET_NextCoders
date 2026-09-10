import { Item, User } from "./class.js";

const API_URL = "http://localhost:3000";

let selectedItemId = null;
let currentUserType = "";
let allItems = [];


// =====================================================
// PAGE NAVIGATION
// =====================================================

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.style.display = "none";
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.style.display = "flex";
    }

    if (pageId === "feedPage") {
        loadFeed();
    }
}


// =====================================================
// LOGIN
// =====================================================
async function handleLogin(type) {
    const studentId = document.getElementById("studentId").value.trim();
    const password = document.getElementById("password").value.trim();

    if (studentId === "" || password === "") {
        alert("Please enter Student ID and Password");
        return;
    }

    try {
        // Get all users
        const response = await fetch(`${API_URL}/users`);

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        // Check login manually
        const user = users.find(
            u => String(u.roll).trim() === studentId &&
                 String(u.password).trim() === password
        );

        if (!user) {
            alert("Invalid Student ID or Password");
            return;
        }

        // Login successful
        localStorage.setItem("studentId", studentId);
        currentUserType = type;

        if (type === "found") {
            showPage("foundItemPage");
        } else {
            showPage("feedPage");
        }

    } catch (err) {
        console.error(err);
        alert("Could not reach the server. Make sure json-server is running on port 3000.");
    }
}

// =====================================================
// INITIAL PAGE
// =====================================================

showPage("loginPage");


// =====================================================
// SUBMIT FOUND ITEM
// =====================================================

async function submitFoundItem() {

    const itemName = document
        .getElementById("foundItemName")
        .value
        .trim();

    const location = document
        .getElementById("foundLocation")
        .value
        .trim();

    const contact = document
        .getElementById("foundContact")
        .value
        .trim();


    if (
        itemName === "" ||
        location === "" ||
        contact === ""
    ) {

        alert(
            "Please fill Item Name, Location and Contact Number"
        );

        return;
    }


    const roll = localStorage.getItem("studentId");


    if (!roll) {

        alert("Please login first");
        showPage("loginPage");

        return;
    }


    const item = new Item(

        roll,
        contact,
        itemName,
        location,

        document.getElementById("feature1Name").value,
        document.getElementById("feature1Value").value.trim(),

        document.getElementById("feature2Name").value,
        document.getElementById("feature2Value").value.trim(),

        document.getElementById("feature3Name").value,
        document.getElementById("feature3Value").value.trim()
    );


    try {

        const response = await fetch(`${API_URL}/items`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(item)

        });


        if (!response.ok) {
            throw new Error("Failed to save item");
        }


        alert("Found item added successfully!");


        // Clear form
        document.getElementById("foundItemName").value = "";
        document.getElementById("foundLocation").value = "";
        document.getElementById("foundContact").value = "";

        document.getElementById("feature1Name").value = "";
        document.getElementById("feature1Value").value = "";

        document.getElementById("feature2Name").value = "";
        document.getElementById("feature2Value").value = "";

        document.getElementById("feature3Name").value = "";
        document.getElementById("feature3Value").value = "";


        currentUserType = "found";

        showPage("feedPage");


    } catch (err) {

        console.error(err);

        alert(
            "Could not save the item. Make sure json-server is running on port 3000."
        );
    }
}


// =====================================================
// LOAD FEED
// =====================================================

async function loadFeed() {

    const heading = document.getElementById("feedHeading");

    const list = document.getElementById("itemList");


    if (currentUserType === "lost") {

        heading.textContent = "Found Items Feed";

    } else {

        heading.textContent = "Lost Items Feed";
    }


    list.innerHTML = "<p>Loading items...</p>";


    try {

        const response = await fetch(`${API_URL}/items`);


        if (!response.ok) {
            throw new Error("Failed to load items");
        }


        allItems = await response.json();

        renderFeed();


    } catch (err) {

        console.error(err);

        list.innerHTML =
            "<p>Could not load items. Make sure json-server is running on port 3000.</p>";
    }
}


// =====================================================
// RENDER FEED
// =====================================================

function renderFeed() {

    const list = document.getElementById("itemList");

    list.innerHTML = "";


    if (allItems.length === 0) {

        list.innerHTML = "<p>No items reported yet.</p>";

        return;
    }


    allItems.forEach(item => {

        const li = document.createElement("li");

        li.className = "item-card";


        const featuresHtml = getFeaturePairs(item)
            .map(feature => {

                return `
                    <li>
                        <strong>${escapeHTML(feature.key)}:</strong>
                        ${escapeHTML(feature.value)}
                    </li>
                `;

            })
            .join("");


        li.innerHTML = `

            <h2>${escapeHTML(item.itemName)}</h2>

            <p>
                <strong>Location:</strong>
                ${escapeHTML(item.location)}
            </p>

            <button
                class="action-btn"
                onclick="handleItemAction('${item.id}')"
            >
                ${currentUserType === "lost"
                    ? "Claim"
                    : "Respond"}
            </button>

            <div
                id="itemDetails${item.id}"
                class="item-details"
            >
                <ul>
                    ${featuresHtml}
                </ul>
            </div>

        `;


        list.appendChild(li);
    });
}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value ?? "";

    return div.innerHTML;
}


// =====================================================
// GET FEATURES
// =====================================================

function getFeaturePairs(item) {

    const pairs = [];


    [1, 2, 3].forEach(number => {

        const key = item[`fkey${number}`];

        const value = item[`fvalue${number}`];


        if (
            key &&
            key.trim() !== "" &&
            value &&
            value.trim() !== ""
        ) {

            pairs.push({
                key: key,
                value: value
            });
        }

    });


    return pairs;
}


// =====================================================
// ITEM ACTION
// =====================================================

function handleItemAction(itemId) {

    if (currentUserType === "lost") {

        openClaimPopup(itemId);

    } else if (currentUserType === "found") {

        openRespondPopup(itemId);
    }
}


// =====================================================
// FIND ITEM
// =====================================================

function findItem(itemId) {

    return allItems.find(
        item => String(item.id) === String(itemId)
    );
}


// =====================================================
// CLAIM POPUP
// =====================================================

function openClaimPopup(itemId) {

    selectedItemId = itemId;


    const item = findItem(itemId);

    if (!item) {
        return;
    }


    document.getElementById("claimPopup").style.display = "flex";


    document.getElementById("claimItemName").value =
        item.itemName;


    document.getElementById("claimLocation").value =
        item.location;


    const featureBox =
        document.getElementById("featureQuestions");


    featureBox.innerHTML = "";


    getFeaturePairs(item).forEach((feature, index) => {

        const div = document.createElement("div");

        div.className = "input-group";


        div.innerHTML = `

            <label>
                ${escapeHTML(feature.key)}
            </label>

            <input
                type="text"
                id="answer${index}"
                placeholder="Enter ${escapeHTML(feature.key)}"
            >

        `;


        featureBox.appendChild(div);
    });
}


// =====================================================
// CLOSE CLAIM POPUP
// =====================================================

function closeClaimPopup() {

    document.getElementById("claimPopup").style.display =
        "none";
}


// =====================================================
// RESPOND POPUP
// =====================================================

function openRespondPopup(itemId) {

    const item = findItem(itemId);

    if (!item) {
        return;
    }


    document.getElementById("respondPopup").style.display =
        "flex";


    document.getElementById("respondItemName").value =
        item.itemName;


    document.getElementById("respondLocation").value =
        item.location;


    const featureList =
        document.getElementById("respondFeatureList");


    featureList.innerHTML = "";


    getFeaturePairs(item).forEach(feature => {

        const li = document.createElement("li");

        li.textContent =
            `${feature.key}: ${feature.value}`;

        featureList.appendChild(li);
    });


    document.getElementById("respondContactNumber")
        .textContent = item.contact;
}


// =====================================================
// CLOSE RESPOND POPUP
// =====================================================

function closeRespondPopup() {

    document.getElementById("respondPopup").style.display =
        "none";
}


// =====================================================
// VERIFY CLAIM
// =====================================================

function verifyClaim() {

    const item = findItem(selectedItemId);


    if (!item) {
        return;
    }


    const pairs = getFeaturePairs(item);


    let correct = true;


    pairs.forEach((feature, index) => {

        const input =
            document.getElementById(`answer${index}`);


        if (!input) {

            correct = false;

            return;
        }


        const userAnswer =
            input.value
                .trim()
                .toLowerCase();


        const correctAnswer =
            feature.value
                .trim()
                .toLowerCase();


        if (userAnswer !== correctAnswer) {

            correct = false;
        }

    });


    const featureQuestions =
        document.getElementById("featureQuestions");


    if (correct) {

        featureQuestions.innerHTML = `

            <div class="success-message">

                <h3>
                    Verification Successful
                </h3>

                <p>
                    The item belongs to you.
                </p>

                <p>
                    Contact Found Person:
                    <strong>
                        ${escapeHTML(item.contact)}
                    </strong>
                </p>

            </div>

        `;

    } else {

        featureQuestions.innerHTML = `

            <div class="error-message">

                <h3>
                    Verification Failed
                </h3>

                <p>
                    The provided details do not match.
                </p>

            </div>

        `;
    }
}


// =====================================================
// GLOBAL FUNCTIONS
// =====================================================

window.handleLogin = handleLogin;

window.submitFoundItem = submitFoundItem;

window.handleItemAction = handleItemAction;

window.closeClaimPopup = closeClaimPopup;

window.closeRespondPopup = closeRespondPopup;

window.verifyClaim = verifyClaim;

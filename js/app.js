// Page Navigation

let selectedItemId = null;
let currentUserType = "";

function showPage(pageId){

    document.querySelectorAll(".page").forEach(page=>{
        page.style.display = "none";
    });

    document.getElementById(pageId).style.display = "flex";

    if(pageId === "feedPage"){
        updateFeedButtons();
    }
}


// Login Handler

function handleLogin(type) {

    const studentId = document.getElementById("studentId").value.trim();
    const phoneNumber = document.getElementById("contactNumber").value.trim();

    if(studentId === "" || phoneNumber === ""){
        alert("Please enter Student ID and Phone Number");
        return;
    }

    localStorage.setItem("studentId", studentId);
    localStorage.setItem("phoneNumber", phoneNumber);


    if(type === "found"){

        currentUserType = "found";
        showPage("foundItemPage");

    }

    else if(type === "lost"){

        currentUserType = "lost";
        showPage("feedPage");

    }

}


// Initial Page

showPage("loginPage");


// Submit Found Item

function submitFoundItem(){

    const itemName = document.getElementById("foundItemName").value;
    const location = document.getElementById("foundLocation").value;


    if(itemName === "" || location === ""){
        alert("Please fill Item Name and Location");
        return;
    }


    const foundItem = {

        name: itemName,

        location: location,


        submittedBy:{

            studentId: localStorage.getItem("studentId"),

            phoneNumber: localStorage.getItem("phoneNumber")

        },


        features:[

            {
                property: document.getElementById("feature1Name").value,
                value: document.getElementById("feature1Value").value
            },

            {
                property: document.getElementById("feature2Name").value,
                value: document.getElementById("feature2Value").value
            },

            {
                property: document.getElementById("feature3Name").value,
                value: document.getElementById("feature3Value").value
            }

        ]

    };


    console.log(foundItem);

    alert("Added to database");

    currentUserType = "found";

    showPage("feedPage");

}



// Feed Item Action

function handleItemAction(itemId){

    if(currentUserType === "lost"){

        openClaimPopup(itemId);

    }

    else if(currentUserType === "found"){

        openRespondPopup(itemId);

    }

}



// Change button text according to user

function updateFeedButtons(){

    const heading = document.getElementById("feedHeading");

    if(currentUserType === "lost"){

        heading.textContent = "Found Items Feed";

    }

    else if(currentUserType === "found"){

        heading.textContent = "Lost Items Feed";

    }


    document.querySelectorAll(".action-btn").forEach(button=>{

        if(currentUserType === "lost"){

            button.innerHTML = "Claim";

        }

        else if(currentUserType === "found"){

            button.innerHTML = "Respond";

        }

    });

}



// Dummy database entries

const items = {

    1:{
        name:"Black Wallet",
        location:"Cafeteria",

        features:[
            {name:"Color", answer:"Black"},
            {name:"Company", answer:"LeatherCraft"},
            {name:"Logo", answer:"Silver"}
        ],

        submittedBy:{
            phoneNumber:"017XXXXXXXX"
        },

        reportedLostBy:{
            phoneNumber:"015XXXXXXXX"
        }

    },


    2:{
        name:"Blue Backpack",
        location:"Library Building",

        features:[
            {name:"Color", answer:"Blue"},
            {name:"Brand", answer:"American Tourister"},
            {name:"Size", answer:"Large"}
        ],

        submittedBy:{
            phoneNumber:"018XXXXXXXX"
        },

        reportedLostBy:{
            phoneNumber:"016XXXXXXXX"
        }

    },


    3:{
        name:"Samsung Phone",
        location:"Engineering Lab",

        features:[
            {name:"Color", answer:"Black"},
            {name:"Model", answer:"Galaxy S Series"},
            {name:"Storage", answer:"128GB"}
        ],

        submittedBy:{
            phoneNumber:"019XXXXXXXX"
        }

        // No "reportedLostBy" yet — demonstrates the case where
        // nobody has reported losing this item so far.

    }

};



// Claim Popup

function openClaimPopup(itemId){

    selectedItemId = itemId;

    let item = items[itemId];

    document.getElementById("claimPopup").style.display = "flex";


    document.getElementById("claimItemName").value = item.name;

    document.getElementById("claimLocation").value = item.location;


    let featureBox = document.getElementById("featureQuestions");

    featureBox.innerHTML = "";


    item.features.forEach((feature,index)=>{

        featureBox.innerHTML += `

        <div class="input-group">

            <label>${feature.name}</label>

            <input 
                type="text"
                id="answer${index}"
                placeholder="Enter ${feature.name}"
            >

        </div>

        `;

    });

}



// Close Popup

function closeClaimPopup(){

    document.getElementById("claimPopup").style.display = "none";

}



// Respond Popup (Found flow)

function openRespondPopup(itemId){

    let item = items[itemId];

    document.getElementById("respondPopup").style.display = "flex";


    document.getElementById("respondItemName").value = item.name;

    document.getElementById("respondLocation").value = item.location;


    let featureList = document.getElementById("respondFeatureList");

    featureList.innerHTML = "";

    item.features.forEach(feature=>{

        featureList.innerHTML += `<li>${feature.name}: ${feature.answer}</li>`;

    });


    let contactEl = document.getElementById("respondContactNumber");

    if(item.reportedLostBy && item.reportedLostBy.phoneNumber){

        contactEl.textContent = item.reportedLostBy.phoneNumber;

    }

    else{

        contactEl.textContent = "No one has reported losing this item yet.";

    }

}



// Close Respond Popup

function closeRespondPopup(){

    document.getElementById("respondPopup").style.display = "none";

}



// Verification

function verifyClaim(){

    let item = items[selectedItemId];

    let correct = true;


    item.features.forEach((feature,index)=>{

        let userAnswer =
        document.getElementById("answer"+index)
        .value
        .trim()
        .toLowerCase();


        if(userAnswer !== feature.answer.toLowerCase()){

            correct = false;

        }

    });



    if(correct){

        document.getElementById("featureQuestions").innerHTML = `

        <div class="success-message">

            <h3>Verification Successful</h3>

            <p>The item belongs to you.</p>

            <p>
            Contact Found Person:
            <strong>${item.submittedBy.phoneNumber}</strong>
            </p>

        </div>

        `;

    }

    else{

        document.getElementById("featureQuestions").innerHTML = `

        <div class="error-message">

            <h3>Verification Failed</h3>

            <p>
            The provided details do not match.
            </p>

        </div>

        `;

    }

}
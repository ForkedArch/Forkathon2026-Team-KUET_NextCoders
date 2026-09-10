// Page Navigation
let selectedItemId = null;
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.style.display = "none";
    });

    document.getElementById(pageId).style.display = "flex";
}


// Login Handler

function handleLogin(type) {

    const studentId = document.getElementById("studentId").value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();

    if(studentId === "" || contactNumber === "") {
        alert("Please enter Student ID and Contact Number");
        return;
    }

    localStorage.setItem("studentId", studentId);
    localStorage.setItem("contactNumber", contactNumber);


    if(type === "found") {
        showPage("foundItemPage");
    }

    else if(type==="lost"){
    alert("Lost item page coming soon");
}
}

// Initial Page

showPage("loginPage");

function submitFoundItem() {

    const itemName = document.getElementById("foundItemName").value;
    const location = document.getElementById("foundLocation").value;

    if(itemName === "" || location === "") {
        alert("Please fill Item Name and Location");
        return;
    }


    const foundItem = {
        name: itemName,
        location: location,

        features: [
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

showPage("feedPage");




}

function showItemDetails(id) {

    const details = document.getElementById("itemDetails" + id);

    if(details.style.display === "block") {
        details.style.display = "none";
    }

    else {
        details.style.display = "block";
    }

}

// Dummy database response

const items = {

    1:{
        name:"Black Wallet",
        location:"Cafeteria",

        features:[
            {
                name:"Color",
                answer:"Black"
            },
            {
                name:"Company",
                answer:"LeatherCraft"
            },
            {
                name:"Logo",
                answer:"Silver"
            }
        ],

        ownerContact:"017XXXXXXXX"
    },


    2:{
        name:"Blue Backpack",
        location:"Library Building",

        features:[
            {
                name:"Color",
                answer:"Blue"
            },
            {
                name:"Brand",
                answer:"American Tourister"
            },
            {
                name:"Size",
                answer:"Large"
            }
        ],

        ownerContact:"018XXXXXXXX"
    },


    3:{
        name:"Samsung Phone",
        location:"Engineering Lab",

        features:[
            {
                name:"Color",
                answer:"Black"
            },
            {
                name:"Model",
                answer:"Galaxy S Series"
            },
            {
                name:"Storage",
                answer:"128GB"
            }
        ],

        ownerContact:"019XXXXXXXX"
    }

};



// Open Claim Popup

function openClaimPopup(itemId){

    selectedItemId = itemId;

    let item = items[itemId];


    document.getElementById("claimPopup").style.display="flex";


    document.getElementById("claimItemName").value =
        item.name;


    document.getElementById("claimLocation").value =
        item.location;



    let featureBox =
        document.getElementById("featureQuestions");


    featureBox.innerHTML="";



    item.features.forEach((feature,index)=>{


        featureBox.innerHTML += `

        <div class="input-group">

            <label>
                ${feature.name}
            </label>


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

    document.getElementById("claimPopup")
    .style.display="none";

}



// Verify Button
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


        document.getElementById("featureQuestions")
        .innerHTML = `

        <div class="success-message">

            <h3>Verification Successful</h3>

            <p>
            The item belongs to you.
            </p>


            <p>
            Contact Found Person:
            <strong>
            ${item.ownerContact}
            </strong>
            </p>

        </div>

        `;


    }


    else{


        document.getElementById("featureQuestions")
        .innerHTML = `

        <div class="error-message">

            <h3>Verification Failed</h3>

            <p>
            The provided details do not match.
            Please check your answers.
            </p>

        </div>

        `;


    }

}
// Page Navigation

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

    else if(type === "lost") {
        showPage("lostItemPage");
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


function showItemDetails(id) {

    const details = document.getElementById("itemDetails" + id);

    if(details.style.display === "block") {
        details.style.display = "none";
    }

    else {
        details.style.display = "block";
    }

}

}
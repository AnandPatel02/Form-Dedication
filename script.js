function addNewForm() {
    var container = document.getElementById("container");
    var lastForm = container.lastElementChild;
    var clonedForm = lastForm.cloneNode(true);

    var inputFields = clonedForm.getElementsByTagName("input");
    for (var i = 0; i < inputFields.length; i++) {
        inputFields[i].value = "";
    }

    container.appendChild(clonedForm);
}

function generateUsername(input) {
    var firstName = input.parentNode.children[0].value;
    var lastName = input.parentNode.children[1].value;
    var username = (firstName + lastName).replace(/\s+/g, "").toLowerCase();
    input.parentNode.children[3].value = username;
}

function saveData() {
    var forms = document.getElementsByClassName("form-container");
    var data = [];

    for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        var inputs = form.getElementsByTagName("input");
        var firstName = inputs[0].value;
        var lastName = inputs[1].value;
        var mobile = inputs[2].value;
        var username = inputs[3].value;

        if (firstName && lastName && mobile && username) {
            data.push({
                firstName: firstName,
                lastName: lastName,
                mobile: mobile,
                username: username
            });

            var mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(mobile)) {
                alert("Invalid mobile number! Please enter a 10-digit number.");
                return;
            }

            for (var j = 0; j < inputs.length; j++) {
                inputs[j].value = "";
            }
        }
    }

    localStorage.setItem("formData", JSON.stringify(data));
    displayData();
}

function displayData() {
    var savedData = JSON.parse(localStorage.getItem("formData"));
    var tableBody = document.getElementById("data-table");

    if (savedData) {
        for (var i = 0; i <= savedData.length; i++) {
            var row = document.createElement("tr");
            var rowData = savedData[i];

            var firstName = document.createElement("td");
            firstName.textContent = rowData.firstName;
            row.appendChild(firstName);

            var lastName = document.createElement("td");
            lastName.textContent = rowData.lastName;
            row.appendChild(lastName);

            var mobile = document.createElement("td");
            mobile.textContent = rowData.mobile;
            row.appendChild(mobile);

            var username = document.createElement("td");
            username.textContent = rowData.username;
            row.appendChild(username);

            tableBody.appendChild(row);
        }
    }
}

window.addEventListener("DOMContentLoaded", displayData);
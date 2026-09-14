const form = document.querySelector(".form-index");

const nameInput = document.getElementById("f-name");
nameInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-ZñÑ\s.]/g,"");
});

["chairs", "tables", "tents"].forEach(function (id) {
    const input = document.getElementById(id);

    input.addEventListener("keydown", function (event) {
        const blockedKeys = ["e", "E", "+", "-", "."];
        if (blockedKeys.includes(event.key)) {
            event.preventDefault();
        }
    });


    input.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    });
});


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("f-name").value;
    const address = document.getElementById("address").value;

    const chairs = document.getElementById("chairs").value;
    const tables = document.getElementById("tables").value;
    const tents = document.getElementById("tents").value;

    const dateBorrowed = document.getElementById("dateBorrowed").value;
    const dateReturned = document.getElementById("dateReturned").value;

    const validIDFile = document.getElementById("validID").files[0];
    const agreeCheckbox = document.getElementById("agree");


    if (name.trim() === " ") {
        event.preventDefault();
        alert("Please fill in all required fields.");
        return;
    }

    if (address.trim() === " ") {
        event.preventDefault();
        alert("Please fill in all required fields.");
        return;
    }

    if (Number(chairs) === 0) {
        event.preventDefault();
        alert("Please select at least a minimum number of Chairs.");
        return;
    }

    if (Number(tables) === 0) {
        event.preventDefault();
        alert("Please select at least a minimum number of Tables.");
        return;
    }

    if (Number(tents) === 0) {
        event.preventDefault();
        alert("Please select at least a minimum number of Tents.");
        return;
    }
    if (!validIDFile) {
        event.preventDefault();
        alert("Please upload a valid ID with signature.");
        return;
    }

    if (new Date(dateReturned) <= new Date(dateBorrowed)) {
        event.preventDefault();
        alert("The return date must be later than the borrowed date.");
        return;
    }

    if (agreeCheckbox.checked === false) {
        event.preventDefault();
        alert("Please agree to the terms and conditions.");
        return;
    }

    const confirmSubmit = confirm(
        "Are you sure you want to submit your borrower slip?"
    );

    if (!confirmSubmit) {
        event.preventDefault();
        return;

    }
    alert("Your borrower slip has been submitted successfully.");

    localStorage.setItem("name", name);
    localStorage.setItem("address", address);

    localStorage.setItem("chairs", chairs);
    localStorage.setItem("tables", tables);
    localStorage.setItem("tents", tents);

    localStorage.setItem("dateBorrowed", dateBorrowed);
    localStorage.setItem("dateReturned", dateReturned);

    localStorage.setItem("validID", validIDFile.name);
    
    window.location.href = "home.html";
});

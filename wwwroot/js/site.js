// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function () {
    $('#nextStepButton').click(function (e) {
        var isValid = validateForm();

        if (!isValid) {
            e.preventDefault(); // Prevent default only if the form is invalid
        }
    });

    $('#nextStepButton02').click(function (e) {
        var isValid = validateForm02();

        if (!isValid) {
            e.preventDefault(); // Prevent default only if the form is invalid
        }
    });

});

function validateForm() {
    var inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var isValid = true;
    var alertmsg = "";
    var emptyFieldName = null;
    var x;

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];

        if (i == 1 ) {
            var isCheckboxSelected = false;
            for (var j = 0; j < checkboxes.length; j++) {
                if (checkboxes[j].checked) {
                    isCheckboxSelected = true;
                    x = j;
                    break;
                }
            }
            if (isCheckboxSelected && x == 5) {
                var llcValue = document.querySelector('input[name="ctl00$MainContent$txtTaxClassification"]').value.trim().toUpperCase();
                if (llcValue.length === 0 || (llcValue !== "C" && llcValue !== "S" && llcValue !== "P")) {
                    isValid = false;
                    alertmsg = "Please fill out the required field ";
                    emptyFieldName = "for limited liability company [C,S or P]";
                    break;
                }
            }
            if (isCheckboxSelected && x == 6) {
                var otherValue = document.querySelector('input[name="ctl00$MainContent$txtOther"]').value.trim();
                if (otherValue.length === 0) {
                    isValid = false;
                    alertmsg = "Please fill out the required field ";
                    emptyFieldName = "for other Tax Options";
                    break;
                }
            }
            if (!isCheckboxSelected) {
                isValid = false;
                alertmsg = "Please select at least one CHECKBOX ";
                emptyFieldName = "for Federal Tax Classification";
                break;
            }
        }
        //
        if (input.getAttribute('name') === 'ctl00$MainContent$txtSocialSecurityNumber') {
            var ssnRegex = /^\d{9}$/;
            if (!ssnRegex.test(input.value)) {
                isValid = false;
                alertmsg = "Invalid input in the required field: ";
                emptyFieldName = "Social Security Number [SSN should be exactly 9 digits long]";
                break;
            }
        } else if (input.hasAttribute('required') && input.value.trim() === '') { // main validation script
            isValid = false;
            alertmsg = "Please fill out the required field: ";
            emptyFieldName = input.name;
            break;
        }
    }

    switch (input.getAttribute('name')) {
        case 'ctl00$MainContent$txtSocialSecurityNumber':
            if (input.value === "") {
                isValid = false;
                alertmsg = "Please fill out the required field: ";
                emptyFieldName = "Social Security Number";
                break;
            }
            else if (input.value.length !== 9) {
                isValid = false;
                alertmsg = "Invalid input in the required field: ";
                emptyFieldName = "Social Security Number \n[SSN should be exactly 9 digits long]";
                break;
            }
            break;
        case 'ctl00$MainContent$txtName':
            emptyFieldName = "Name";
            break;
        case 'ctl00$MainContent$txtTaxClassification':
            emptyFieldName = "Tax Classification";
            break;
        case 'ctl00$MainContent$txtAddress':
            emptyFieldName = "Address";
            break;
        case 'ctl00$MainContent$txtCityStateZipCode':
            emptyFieldName = "City/State/Zip Code";
            break;
        default:
            break;
    }
    
    if (!isValid) {
        var y = document.querySelector('input[name="ctl00$MainContent$txtDate"]').value;
        alert(alertmsg + emptyFieldName + " " + y);
    }
    return isValid;
}

function validateForm02() {
    var inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], input[type="email"], input[type="tel"], select');
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var selectYN = document.querySelectorAll('select[required]');
    var isValid = true;
    var alertmsg = "";
    var emptyFieldName = null;
    var x;

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];

        if (input.type === 'date' && input.hasAttribute('required')) {
            var DateIn = input.value;
            if (isNaN(Date.parse(DateIn))) {
                isValid = false;
                alertmsg = "Please fill out the required field: ";
                emptyFieldName = "Date";
                break;
            }
        }
        if (input.type === 'email' && input.hasAttribute('required')) {
            var emailIn = input.value;
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailIn)) {
                isValid = false;
                alertmsg = "Please enter a valid email address in the required field: ";
                emptyFieldName = "Email";
                break;
            }
        }
        if (input.getAttribute('name') === 'ctl00$MainContent$txtLastVin') {
            var ssnRegex = /^\d{6}$/;
            if (input.value.trim() !== "" && !ssnRegex.test(input.value)) {
                isValid = false;
                alertmsg = "Invalid input in the required field: ";
                emptyFieldName = "Last 6 Vin Number [Section: CA-ARB]";
                break;
            }
        }
        if (input.hasAttribute('required') && input.value.trim() === '') { // main validation script
            isValid = false;
            alertmsg = "Please fill out the required field: ";
            emptyFieldName = input.name;
            break;
        }
    }

    switch (input.getAttribute('name')) {
        case 'ctl00$MainContent$txtCarrirName':
            emptyFieldName = "Carrier Name";
            break;
        case 'ctl00$MainContent$txtStreet':
            emptyFieldName = "Street";
            break;
        case 'ctl00$MainContent$txtCity':
            emptyFieldName = "City";
            break;
        case 'ctl00$MainContent$txtState':
            emptyFieldName = "State";
            break;
        case 'ctl00$MainContent$txtZipCode':
            emptyFieldName = "Zip Code";
            break;
        case 'ctl00$MainContent$txtFedId':
            emptyFieldName = "Fed Id";
            break;
        case 'ctl00$MainContent$txtMcNumber':
            emptyFieldName = "MC Number";
            break;
        case 'ctl00$MainContent$txtDotNumber':
            emptyFieldName = "DOT Number";
            break;
        case 'ctl00$MainContent$txtPhone':
            emptyFieldName = "Phone Number";
            break;
        case 'ctl00$MainContent$txtEmail':
            emptyFieldName = "Email";
            break;
        case 'ctl00$MainContent$txtMainPhone':
            emptyFieldName = "Main Phone/Telephone \n[Section: Contact Information]";
            break;
        case 'ctl00$MainContent$txtCellorNight':
            emptyFieldName = "After Hour Cell \n[Section: Contact Information]";
            break;
        case 'ctl00$MainContent$txtContactEmail':
            emptyFieldName = "Email \n[Section: Contact Information]";
            break;
        case 'ctl00$MainContent$txtOparationsManager':
            emptyFieldName = "Operation Manager \n[Section: Contact Information]";
            break;
        case 'ctl00$MainContent$txtContactPhone':
            emptyFieldName = "Phone \n[Section: Contact Information]";
            break;
        case 'ctl00$MainContent$txtEmailContact2':
            emptyFieldName = "2nd Email \n[Section: Contact Information]";
            break;
        case 'ctl00$MainContent$txtAccountPayableContact':
            emptyFieldName = "Account (payable: contact) \n[Section: Contact Information]";
            break;
        case 'ctl00$MainContent$txtPhoneContact2':
            emptyFieldName = "Account (payable: phone) \n[Section: Contact Information]";
            break;
        case 'ctl00$MainContent$txtEmailContact3':
            emptyFieldName = "Account (payable: Email) \n[Section: Contact Information]";
            break;
        case 'ctl00$MainContent$txtFactoringCompanyName':
            emptyFieldName = "Factory Company Name \n[Section: Factoring Company Information]";
            break;
        case 'ctl00$MainContent$txtPhoneFactoring':
            emptyFieldName = "Phone \n[Section: Factoring Company Information]";
            break;
        case 'ctl00$MainContent$txtRemittoAddress':
            emptyFieldName = "Remit to Factory Address \n[Section: Factoring Company Information]";
            break;
        case 'ctl00$MainContent$txtCityFactoring':
            emptyFieldName = "City \n[Section: Factoring Company Information]";
            break;
        case 'ctl00$MainContent$txtStateFactoring':
            emptyFieldName = "State \n[Section: Factoring Company Information]";
            break;
        case 'ctl00$MainContent$txtZipCodeFactoring':
            emptyFieldName = "Zip Code \n[Section: Factoring Company Information]";
            break;
        case 'ctl00$MainContent$txtContactFactoring':
            emptyFieldName = "Contact \n[Section: Factoring Company Information]";
            break;
        case 'ctl00$MainContent$txtPhoneFactoring2':
            emptyFieldName = "Phone \n[Section: Factoring Company Information]";
            break;
        case 'ctl00$MainContent$txtNumberofTractors':
            emptyFieldName = "Number of Tractors \n[Section: Equipment]";
            break;
        case 'ctl00$MainContent$cboEmailAvailableLoads':
            alertmsg = "Select Y/N option for: ";
            emptyFieldName = "Email Available Loads \n[Section: Traffic Lanes that your company services]";
            break;
        case 'ctl00$MainContent$cboLockingPolicy':
            alertmsg = "Select Y/N option for: ";
            emptyFieldName = "Locking Policy \n[Section: Traffic Lanes that your company services]";
            break;
        case 'ctl00$MainContent$cboTrailerDoorsLocked':
            alertmsg = "Select Y/N option for: ";
            emptyFieldName = "Door Lock Requirements \n[Section: Traffic Lanes that your company services]";
            break;
        case 'ctl00$MainContent$cboBackgroundChecks':
            alertmsg = "Select Y/N option for: ";
            emptyFieldName = "Background Check Requirements \n[Section: Traffic Lanes that your company services]";
            break;
        case 'ctl00$MainContent$txtSaferStatRating':
            alertmsg = "Select Y/N option for: ";
            emptyFieldName = "Safer Stat Rating \n[Section: Traffic Lanes that your company services]";
            break;
        case 'ctl00$MainContent$txtDateiflastComplianceAudit':
            alertmsg = "Select Y/N option for: ";
            emptyFieldName = "Date of last Compliance Audit \n[Section: Traffic Lanes that your company services]";
            break;
        case 'ctl00$MainContent$cboCABusiness':
            alertmsg = "Select Y/N option for: ";
            emptyFieldName = "Business in the state of CA \n[Section: CA-ARB]";
            break;
        case 'ctl00$MainContent$txtYear':
            emptyFieldName = "Year \n[Section: CA-ARB]";
            break;
        case 'ctl00$MainContent$txtMake':
            emptyFieldName = "Make \n[Section: CA-ARB]";
            break;
        case 'ctl00$MainContent$txtColor':
            emptyFieldName = "Color \n[Section: CA-ARB]";
            break;
        case 'ctl00$MainContent$txtPlate':
            emptyFieldName = "Plate Number \n[Section: CA-ARB]";
            break;
        case 'ctl00$MainContent$txtLastVin':
            emptyFieldName = "Last 6 Vin Number \n[Section: CA-ARB]";
            break;
        case 'ctl00$MainContent$txtCarrierAuthRepPrintName':
            emptyFieldName = "Carrier-Auth. Rep. (Print Name) \n[Section: CA-ARB]";
            break;
        case 'ctl00$MainContent$txtDateAcknowledgingAgreeingtoAboveTermsandRequest':
            emptyFieldName = "\nDate Acknowledging & Agreeing to Above Terms and Request \n[Section: CA-ARB]";
            break;
        default:
            break;
    }

    if (!isValid) {
        alert(alertmsg + emptyFieldName);
    }
    return isValid;
}
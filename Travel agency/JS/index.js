console.log("This is project 4");

const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
let validName = false;
let validEmail = false;
let validPhone = false;

// console.log(name, email, phone);
name.addEventListener('blur', () => {
    console.log("name is blurred");
    // Validating name
    let regex = /^[a-zA-Z][\sa-zA-Z]{2,20}$/;
    let str = name.value;
    console.log(regex, str);
    if(regex.test(str)){
        console.log("Your name is valid");
        name.classList.remove('is-invalid');
        validName = true;
    }
    else{
        console.log("Your name is invalid");
        name.classList.add('is-invalid');
        validName = false;
    }
});

email.addEventListener('blur', () => {
    console.log("email is blurred");
    // Validating email
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let str = email.value;
    console.log(regex, str);
    if(regex.test(str)){
        console.log("Your email is valid");
        email.classList.remove('is-invalid');
        validEmail = true;
    }
    else{
        console.log("Your email is invalid");
        email.classList.add('is-invalid');
        validEmail = false;
    }
});

phone.addEventListener('blur', () => {
    console.log("phone is blurred");
    // Validating phone
    let regex = /^([0-9]){10}$/;
    let str = phone.value;
    console.log(regex, str);
    if(regex.test(str)){
        console.log("Your phone number is valid");
        phone.classList.remove('is-invalid');
        validPhone = true;
    }
    else{
        console.log("Your phone number is invalid");
        phone.classList.add('is-invalid');
        validPhone = false;
    }
});

let submit = document.getElementById('submit');
submit.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log('You clicked on sumbit');
    console.log(validName, validEmail, validPhone);
    if(validName && validEmail && validPhone){
        console.log('Name, email and phone are valid. Submitting the form');
        let success = document.getElementById('success');
        // success.classList.add('show');
        // failure.classList.remove('show');
    }
    else{
        console.log('One of name, email and phone are not valid. Hence not submitting the form. Please correct the errors and try again.');
        let failure = document.getElementById('failure');
        // failure.classList.add('show');
        // success.classList.remove('show');
    }

})
console.log("This is my index.js file");

// Utility function:
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initialize number of parameters
let addedParamsCount = 0;

// Hide the parameter box initially
let parameterBox = document.getElementById('parametersBox');
parameterBox.style.display = 'none';

// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});

// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
});

// If the user clicks on + button, add more paramters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row" style="display: flex;">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                    <div class="col-md-4" style="margin: 4px;">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Key">
                    </div>
                    <div class="col-md-4" style="margin: 4px;">
                        <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam" style="margin: 4px;">-</button>
                </div>`;
    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    // console.log(paramElement);
    params.appendChild(paramElement);

    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }
    addedParamsCount++;
});

// If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";

    // Fetch all the values user has entered
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterKey' + (i + 1)).value;
                data[key] = value;
            }
            data = JSON.stringify(data);
        }
    } else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging
    console.log('URL is ', url);
    console.log('Request type is ', requestType);
    console.log('Content type is ', contentType);
    console.log('Data is ', data);

    // If the request type is get, invoke fetch api to create get request
    if (requestType == 'GET') {
        fetch(url, {
                method: 'GET'
            })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
            })
    }
    else{
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response => response.text())
        .then((text) => {
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }
});
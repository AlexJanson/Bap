const input = document.getElementById("input");
const holder = document.getElementById("holder");

input.addEventListener("keyup", () => {
    // holder.innerHTML = "";
    showList(input.value, 'list');
});

function showList(string, searchType) {
    if(string != "") {
        if(window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
        else xmlhttp = new ActiveXObject();
        let script = "getdata.php";
        let httpString = script + "?q=" + string + "&type=" + searchType;
        let httpsResponse = "";
        xmlhttp.open("GET", httpString, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                httpsResponse = xmlhttp.responseText;
                if(searchType == "list") {
                    let countryArray = JSON.parse(httpsResponse);
                    printArray(countryArray);
                }
                if(searchType == "answer") {
                    const jsoncode = JSON.parse(httpsResponse);
                    printDetails(jsoncode, string);
                }
                if(searchType == "capital") {
                    const jsoncode = JSON.parse(httpsResponse);
                    printCapital(jsoncode, string);
                }
            }
        }
    }
}

function printArray(array) {
    let name = "";
    array.forEach(element => {
        name += '<p id="' + element + '" onClick="showList(this.id,\'answer\')">' + element + '</p>';
    });
    holder.innerHTML = name;
}

function printDetails(array, string) {
    holder.innerHTML = "";
    input.value = "";
    holder.innerHTML += "<h1>" + string + "</h1>"
    for(var prop in array[0]) {
        if(array[0].hasOwnProperty(prop)) {
            holder.innerHTML += "<p>" + prop + " = " + array[0][prop] + "</p>";
        }
    }
    holder.innerHTML += '<p id="' + array[0].Capital + '" onClick="showList(this.id,\'capital\')">Capital Details</p>';
}

function printCapital(array, string) {
    holder.innerHTML += "<h1>Capitol </h1>";
    console.log(array[0], string);
    for(var prop in array[0]) {
        if(array[0].hasOwnProperty(prop)) {
            holder.innerHTML += "<p>" + prop + " = " + array[0][prop] + "</p>";
        }
    }
}
var addDiv = document.getElementById("add_div");
var addBtn = document.getElementById("addBtn");

var newNameInput = document.getElementById("new_name_input");
var newLinkInput = document.getElementById("new_link_input");
var validBtn = document.getElementById("validBtn");

addDiv.style.display = "none";

var urlList = [];
var lastUrl = "";

window.onload = function () {
    chrome.storage.sync.get('custum_url_list', function (data) {
        urlList = data.custum_url_list;
        console.log(urlList);
    });

    chrome.storage.sync.get('last_url', function (data) {
        lastUrl = data.last_url;
        console.log(lastUrl);
    });
};

function saveNewLink(nameStr, linkStr)
{
    var newLink = 
    {
        "name": nameStr,
        "link": linkStr
    }
    urlList.push(newLink);
    localSave();
}

function localSave()
{
    chrome.storage.sync.set(
        {
            'custum_url_list': urlList,
            'last_url': lastUrl
        },
        function() {
        if (chrome.runtime.error) {
          console.log("Runtime error.");
        }
    });
}

validBtn.addEventListener("click", function()
{
    var nameError = false;
    var linkError = false;

    newNameInput.classList.remove("is-invalid");
    newLinkInput.classList.remove("is-invalid");

    if(newNameInput.value == "")
        nameError = true;
    if(newLinkInput.value == "")
        linkError = true;
    
    if(nameError)
        newNameInput.classList.add("is-invalid");
    if(linkError)
        newLinkInput.classList.add("is-invalid");

    if(!nameError && !linkError)
        saveNewLink(newNameInput.value, newLinkInput.value);
});

addBtn.addEventListener("click", function()
{
    if(addDiv.style.display == "none")
    {
        addBtn.innerHTML = "<i class='bi bi-caret-up-fill'></i> Add";
        addDiv.style.display = "";
    }
    else
    {
        addBtn.innerHTML = "<i class='bi bi-plus-lg'></i> Add";
        addDiv.style.display = "none";
    }
});

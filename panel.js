const addDiv = document.getElementById("add_div");
const addBtn = document.getElementById("addBtn");
const frame = document.getElementById("frame");
const bookmarksList = document.getElementById("bookmarks_list");

// search
const searchBtn = document.getElementById("search_btn");
const searchInput = document.getElementById("search_input");

// add bookmark
const newNameInput = document.getElementById("new_name_input");
const newLinkInput = document.getElementById("new_link_input");
const validBtn = document.getElementById("validBtn");

addDiv.style.display = "none";

var urlList = [];
var lastUrl = "";

window.onload = async function () {
    loadData();
};

searchInput.addEventListener('input', ()=> setTarget(searchInput.value));

function clearList()
{
    for(var i=0;i<urlList.length;i++)
    {
        element.removeEventListener('click', ()=>setTarget(urlList[i].link));
        btn.removeEventListener('click', ()=>removeLink(i));
    }
};

function refreshList()
{
    for(var i=0;i<urlList.length;i++)
    {
        if(document.getElementById(`link${i}`) == null)
            bookmarksList.appendChild(generateNewLink(i));
    }
}

function generateNewLink(i)
{
    var element = document.createElement("a");    
    element.classList.add("list-group-item");
    element.classList.add("d-flex");
    element.classList.add("justify-content-between");
    element.classList.add("align-items-start");
    element.href = "#";
    element.id = `link${i}`;
    element.innerHTML = `${urlList[i].name}`;

    var btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("btn-danger");
    btn.classList.add("me-md-2");
    btn.type = "button";
    btn.id = `btn${i}`;
    btn.innerHTML = "remove";
    element.appendChild(btn);

    element.addEventListener('click', ()=>setTarget(urlList[i].link));
    btn.addEventListener('click', ()=>removeLink(i));

    return element;
}

function saveNewLink(nameStr, linkStr)
{
    var newLink = 
    {
        "name": nameStr,
        "link": linkStr
    }
    urlList.push(newLink);
    localSave();
    refreshList();
}

function removeLink(index)
{
    var element = document.getElementById(`link${index}`);
    var btn = document.getElementById(`btn${index}`);

    element.removeEventListener('click', ()=>setTarget(urlList[index].link));
    btn.removeEventListener('click', ()=>removeLink(index));

    element.remove();

    urlList.splice(index, 1);
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

function loadData()
{
    chrome.storage.sync.get('custum_url_list', function (data) {
        urlList = data.custum_url_list;
        refreshList();
    });

    chrome.storage.sync.get('last_url', function (data) {
        lastUrl = data.last_url;
        console.log(lastUrl);
        setTarget(lastUrl);
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
    {
        saveNewLink(newNameInput.value, newLinkInput.value);
        newNameInput.value = "";
        newLinkInput.value = "";
        displayAddLink(false);
    }
});

addBtn.addEventListener("click", function()
{
    if(addDiv.style.display == "none")
        displayAddLink(true);
    else
        displayAddLink(false);
});

function displayAddLink(bool)
{
    if(bool)
    {
        addBtn.innerHTML = "<i class='bi bi-caret-up-fill'></i> Add";
        addDiv.style.display = "";
    }
    else
    {
        addBtn.innerHTML = "<i class='bi bi-plus-lg'></i> Add";
        addDiv.style.display = "none";
    }
}

function setTarget(url)
{
    frame.src = url;
    lastUrl = url;
    localSave();
}

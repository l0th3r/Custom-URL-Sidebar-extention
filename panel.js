var addDiv = document.getElementById("add_div");
var addBtn = document.getElementById("addBtn");

var newNameInput = document.getElementById("new_name_input");
var newLinkInput = document.getElementById("new_link_input");
var validBtn = document.getElementById("validBtn");

addDiv.style.display = "none";

function saveNewLink(nameStr, linkStr)
{
    
}

addBtn.addEventListener("click", function() {
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

validBtn.addEventListener("click", function() {
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

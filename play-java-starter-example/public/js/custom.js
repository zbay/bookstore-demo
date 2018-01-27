if(document.getElementById("deleteButton")){
    document.getElementById("deleteButton").addEventListener("click", function(e){
        sendDeleteRequest(e.target.getAttribute("data-url"), e.target.getAttribute("data-redirect"));
    });
}
if(document.getElementById("updateButton")){
    document.getElementById("updateButton").addEventListener("click", function(e){
        console.log("Sending put?");
        sendPutRequest("bookUpdateForm", e.target.getAttribute("data-redirect"));
    });
}

function sendDeleteRequest(url, redirectURL){
    $.ajax({
        url: url,
        method: "DELETE",
        success: function(){
            window.location = redirectURL;
        },
        error: function(){
            window.location.reload();
        }
    });
}

function sendPutRequest(formID, redirectURL){
    let form = $("#" + formID);
    $.ajax({
        url: form.attr("action"),
        method: "PUT",
        data: form.serialize(),
        success: function(){
            console.log("Success");
            window.location = redirectURL;
        },
        error: function(){
            console.log("Failure");
            window.location.reload();
        }
    });
}

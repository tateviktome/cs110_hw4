'use strict'

const serverList = $("#OlId");

const CL = function(){
    serverList.html('');
}

const ML = function(inData){
    inData.forEach(function(items){
        const itemID = items.id;
        let li = $("<li>"+ items.message+ ' <button id=' + items.id+
            ' onclick="deleteItem(this.id)" class="todo_items">Delete</button><input type="checkbox" id="'+ items.id + '"' + "</li>");
        const chkBt = li.find('input');
        chkBt.prop('checked',items.checked);
        chkBt.on('change',function(event){
            let sndChk = !items.checked;
            let chkID = event.target.id;
            updateLi(sndChk,chkID);
        });
        serverList.append(li);
    })
};

const GL = function(){
    $.ajax({
        url: "/todo",
        type: "get",
        dataType: "json",
        success: function(inData){
            ML(inData);
        },
        error: function(){
            alert("Error occured");
        }
    })
};


const addItem = function(){

    let itemText = $("#saveText").val();

    $.ajax({
        url: "/todo",
        type: "post",
        dataType: "json",
        data: JSON.stringify({
            message: itemText
        }),
        success: function(data){
            CL();
            ML(data);
        },
        error: function(){
            alert("Error occured");
        }
    })
}


const deleteItem = function(elID){

    console.log(elID);

    $.ajax({
        url: "/todo",
        type: "delete",
        dataType: "json",
        data: JSON.stringify({
            id: elID
        }),
        success: function(data){
            CL();
            ML(data);
        },
        error: function(){
            alert("Error occured");
        }
    })
};

const updateLi = function(chkIn,ID){
    $.ajax({
        url: "/todo",
        type: "put",
        dataType: "json",
        data: JSON.stringify({
            checked: chkIn,
            id: ID
        }),
        success: function(data){
            CL();
            ML(data);
        },
        error: function(){
            alert("Error occured");
        }
    })
}


const searchItems = function(){

    let searchInfo = $("#searchText").val();
    console.log(searchInfo);

    $.ajax({
        url: "/todo",
        type: "get",
        dataType: "json",
        data:{
            searchText: searchInfo
        },
        success: function(data){
            CL();
            ML(data);
        },
        error: function(){
            alert("Error occured")
        }
    })

};

$("#addButton").on('click',function(){
    addItem();
});


$("#searchButton").on('click',function(){
    searchItems();
});

$('#searchText').keypress(function(e){
    if(e.keyCode===13)
        $("#searchButton").click();
})

$('#saveText').keypress(function(e){
    if(e.keyCode===13)
        $("#addButton").click();
})

GL();
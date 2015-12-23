function init(){

    $('#NewPostButton').click(function() {

        $('#NewPost').toggle();
    });

    getPosts();

}



function getPosts(){



    $('#NewPost').toggle();

    $.ajax({ url: "http://localhost:5000/api/getposts",
             type: "GET",
             crossDomain: true }).done( function(data){ 

        $('#oTable').html('<tr><th>Title</th><th>Summary</th><th>Date</th><th></th><th></th></tr>');

        for(var x = 0; x< data.length; x++){

            var title = data[x].Title.toString().replace(/%20/g,' ');

            var deleteButtonString =  '<input type = "button" id="deleteButton" class="btn btn-default" value="Delete" onclick="deletePost(' + '\'' + 
                            title + '\'' + ');" />'; 

            var editButtonString = '<input type = "button" id="editButton" class="btn btn-default" value="Edit" onclick="editPost(' + '\'' +
                            title + '\'' + ');" />'; 


            var appendString = '<tr><td>' + title + '</td><td>' + data[x].Summary + '</td><td>' + data[x].Date + '</td><td>' + 
                           editButtonString + '</td><td>' + deleteButtonString + '</td></tr>';

            $('#oTable').append(appendString);
        
        }
    });

}

function submit(){


    var title = $('#titleField').val().trim().replace(/ /g,'%20');
    var summaryField = $('#summaryField').val();
    var bodyField = $('#bodyField').val();

    var dateNow = new Date();
    var MonthNow = dateNow.getMonth();
    var Months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var sendDate = Months[MonthNow] + " " + dateNow.getDay() + ", " + dateNow.getFullYear();

    var send = { "Title" : title,
                 "Summary" : summaryField,
                 "Date": sendDate,
                 "Body" : bodyField};


    var sendJSON = JSON.stringify(send);

    $.ajax({ url: "http://localhost:5000/api/newpost",
             type: "POST",
             crossDomain: true,
             data: sendJSON}).done(function(){ 
             
             $('#titleField').val('');
             $('#summaryField').val('');
             $('#bodyField').val('');

             getPosts();
             });


}


function deletePost(title){

    title = title.replace(/ /g,'%20');

    $.ajax({ url: "http://localhost:5000/api/deletepost",
             type: "POST",
             crossDomain: true,
             data: JSON.stringify(title)}).done(function(){
        
             
             $('#NewPost').toggle();
             getPosts();
    
    
             });


}


function editPost(title){


    title = title.replace(/ /g,'%20');

    
    var postTitle;
    var postSummary;
    var postBody;
    $.ajax({ url: "http://localhost:5000/api/getpost",
             type: "POST",
             crossDomain: true,
             data: JSON.stringify(title)}).done( function(data){ 

        postTitle = data.Title;
        postSummary = data.Summary;
        postBody = data.Body;

        $('#titleField').val(postTitle);
        $('#summaryField').val(postSummary);
        $('#bodyField').val(postBody);
        $('#NewPost').toggle();
        
    });
    


}




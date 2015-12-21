function init(){


    getPosts();

}


function getPosts(){


    $.ajax({ url: "http://localhost:5000/api/getposts",
             type: "GET",
             crossDomain: true }).done( function(data){ 
    
        for(var x = 0; x< data.length; x++){

            var title = data[x].Title.toString().replace(/%20/g,'_');
            var title2 = data[x].Title.toString().replace(/%20/g,' ');
            var sum = data[x].Summary.toString();
            var appendString = '<a href="http://localhost:5000/' + title + '\">' + ' <div id= "post"><hr><h3>' + title2 + '</h3><p>' + sum + '</p><hr></div></a>';
            $('#bodyDiv').append(appendString);
        } 
    });


}

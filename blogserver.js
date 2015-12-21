var http = require('http');
var mongo = require('mongodb').MongoClient;
var url = require('url');
var dbUrl = "mongodb://localhost:27017/NOOBBLOG";
var fs = require('fs');

function getPosts(request, response)
{

    mongo.connect(dbUrl, function(err,db){
        if(err) throw err

        var collection = db.collection('posts');

        collection.find().toArray(function(err,documents){
            if(err) throw err

            response.writeHead(200,{'content-type' : 'application/json',
            "Access-Control-Allow-Origin" : "*"});
            response.write(JSON.stringify(documents));
            response.end();

            db.close();
            
        });

    });

}
function deletePost(request, response)
{


    var dataobject = {};

    request.on('data', function(chunk) {

        dataobject = JSON.parse(chunk);
    });

    request.on('end', function() {
        // empty 200 OK response for now
        response.writeHead(200, "OK", {'Content-Type': 'text/html',
        "Access-Control-Allow-Origin" : "*"});
        response.end();
    });

    mongo.connect(dbUrl, function(err,db){
        if(err) throw err

        var collection = db.collection('posts');
        collection.remove({Title:dataobject}, function(err,data){
            if(err) throw err

            db.close();
        });

    });
}

function newPost(request, response)
{

    var dataobject = {};

    request.on('data', function(chunk) {

        dataobject = JSON.parse(chunk);
    });

    request.on('end', function() {
        // empty 200 OK response for now
        response.writeHead(200, "OK", {'Content-Type': 'text/html',
        "Access-Control-Allow-Origin" : "*"});
        response.end();

        mongo.connect(dbUrl, function(err,db){
            if(err) throw err
            var collection = db.collection('posts');

            collection.insert(dataobject, function(err,data){
                if(err) throw err

                db.close();
            });

        });
    });
}

function postExist(urlMap,response){

    var postname = urlMap.slice(1);
    console.log(postname);
    mongo.connect(dbUrl, function(err,db){
        if(err) throw err
        var collection = db.collection('posts');
        

            
            collection.find({Title:postname}).toArray(function (err, docs){
            if(err) throw err
            
            if(docs.length === 0){

                response.writeHead(400,{'content-type' : 'text/html',
                "Access-Control-Allow-Origin" : "*"});
                response.write("Page not found");
                response.end();
                db.close();
                return;
            }
            

            var singlePost = docs[0];

            response.writeHead(200,{'content-type' : 'text/html',
            "Access-Control-Allow-Origin" : "*"});
            var htmlblob = '<!DOCTYPE HTML>' +
                            '<html>' + 
                                '<head>' +
                                    '<meta charset="UTF-8">' +
                                    '<title>NoobBlog</title>' +
                                    '<link rel="stylesheet" href="css/bootstrap.css">' +
                                    '<link rel="stylesheet" href="css/index.css">'+
                                    '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>'+
                                   // '<script src= js/index.js></script>' +
                                '</head>' +

                                '<body>'+
                                '<div id = "bHeader">' +
                                    '<div id = "innerHeader">' +
                                        '<span id ="name">Daniel DeFisher </span>' +
                                        '<a href="http://localhost:5000/index">' +
                                        '<span id ="bSpan">Blog </span>' +
                                        '</a>' +
                                        '<a href="http://localhost:5000/about">' +
                                        '<span id ="ASpan">About </span>'+
                                        '</a>' +
                                        '<a href="http://localhost:5000/admin">' +
                                            '<span id ="adminButton">Admin</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</div>' +

                                '<div id ="bodyDiv">' +
                                    '<div id= "singlePost" >' +
                                        '<hr>' +
                                        '<h1>' + singlePost.Title.replace(/%20/g,' ') + '</h1>' +
                                        '<p>' + singlePost.Body + '</p>' +
                                        '<hr>' +
                                    '</div>' +
                                '</div>' +

                                '</body>' +

                            '</html>';
            response.write(htmlblob);
            response.end();
            db.close();
            }); 

    });



}
function adminPage(request,response){

    fs.readFile('admin.html', function (err, html){
        if(err) throw err
        
        response.writeHeader(200,{'content-type' : 'text/html',
        "Access-Control-Allow-Origin" : "*"});
        response.write(html);
        response.end();
    }); 
}
function adminPageJs(request,response){

   fs.readFile('js/admin.js', function (err, js){
        if(err) throw err
        
        response.writeHeader(200,{'content-type' : 'application/javascript',
        "Access-Control-Allow-Origin" : "*"});
        response.write(js);
        response.end();
    });
}
function adminPageCss(request,response){

    fs.readFile('css/admin.css', function (err, css){
        if(err) throw err
        
        response.writeHeader(200,{'content-type' : 'text/css',
        "Access-Control-Allow-Origin" : "*"});
        response.write(css);
        response.end();
    });
}
function indexPage(request,response){

    fs.readFile('index.html', function (err, html){
        if(err) throw err
        
        response.writeHeader(200,{'content-type' : 'text/html',
        "Access-Control-Allow-Origin" : "*"});
        response.write(html);
        response.end();
    }); 
}
function aboutPage(request,response){

    fs.readFile('about.html', function (err, html){
        if(err) throw err
        
        response.writeHeader(200,{'content-type' : 'text/html',
        "Access-Control-Allow-Origin" : "*"});
        response.write(html);
        response.end();
    }); 
}
function indexPageJs(request,response){

   fs.readFile('js/index.js', function (err, js){
        if(err) throw err
        
        response.writeHeader(200,{'content-type' : 'application/javascript',
        "Access-Control-Allow-Origin" : "*"});
        response.write(js);
        response.end();
    });
}
function indexPageCss(request,response){

    fs.readFile('css/index.css', function (err, css){
        if(err) throw err
        
        response.writeHeader(200,{'content-type' : 'text/css',
        "Access-Control-Allow-Origin" : "*"});
        response.write(css);
        response.end();
    });
}
function adminBootCss(request,response){

    fs.readFile('css/bootstrap.css', function (err, css){
        if(err) throw err
        
        response.writeHeader(200,{'content-type' : 'text/css',
        "Access-Control-Allow-Origin" : "*"});
        response.write(css);
        response.end();
    });
}
var server = http.createServer(function(request,response){

    var urlMap = url.parse(request.url,true);

    if(urlMap.pathname === "/api/getposts"){

        getPosts(request, response);
    }
    else if(urlMap.pathname === "/api/deletepost"){
        
        deletePost(request, response);
    }
    else if(urlMap.pathname === "/api/newpost"){
        
        newPost(request, response);
    }
    else if(urlMap.pathname ==="/admin"){

        adminPage(request,response);
    }
    else if(urlMap.pathname ==="/js/admin.js"){

        adminPageJs(request,response);
    }
    else if(urlMap.pathname ==="/css/bootstrap.css"){

        adminBootCss(request,response);
    }
    else if(urlMap.pathname ==="/css/admin.css"){

        adminPageCss(request,response);
    }
    else if(urlMap.pathname ==="/index"){

        indexPage(request,response);
    }
    else if(urlMap.pathname ==="/about"){

        aboutPage(request,response);
    }
    else if(urlMap.pathname ==="/js/index.js"){

        indexPageJs(request,response);
    }
    else if(urlMap.pathname ==="/css/index.css"){

        indexPageCss(request,response);
    }
    else{
            var path = urlMap.pathname.toString().replace(/_/g,'%20');
            postExist(path,response);

    }
});

console.log("server up on port: 5000");
server.listen(5000);

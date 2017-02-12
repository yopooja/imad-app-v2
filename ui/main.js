var button = document.getElementById("counter");
button.onclick = function(){
    //create a request object
    var request = new XMLhttpRequest();
    
    //capture the response the and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState == XMLhttpRequest.DONE){
            //Take some action
            if(request.status == 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }//Not done 
    };
    request.open('GET','http://yopooja.imad.hasura-app.io/counter',true);
    request.send(null);
    //make  the variable  the correct spam
    
};
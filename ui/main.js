var button = document.getElementById('counter');
button.onclick = function(){
    //create a request object
    var request = new XMLHttpRequest();
    
    //capture the response the and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take some action
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }//Not done 
    };
    request.open('GET','http://yopooja.imad.hasura-app.io/counter',true);
    request.send(null);
    //make  the request
};


var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    
    var request = new XMLHttpRequest();
    
    //capture the response the and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take some action
            if(request.status === 200){
                var name=request.responseText;
                names=JSON.parse(names);
                var list = '';
                for (var i=0;i<names.length;i++){
                    list += '<li>'+names[i]+'<li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
    };
};
var nameInput = document.getElementById('name');
var name = nameInput.value;
request.open('GET','http://yopooja.imad.hasura-app.io/counter',true);
request.send(null);

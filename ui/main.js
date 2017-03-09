
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    
    var request = new XMLHttpRequest();
    
    //capture the response the and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take some action
            if(request.status === 200){
                alert('logged in successfully');
            }else if(request.status===403){
                alert('Username/password is incorrect');
            }else if(request.status===500){
                alert('Something went wrong');
            }
        }
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://yopooja.imad.hasura-app.io/login',true);
    request.setRequestHeader('Context-Type','application/json');
    request.send(JSON.stringify({username: username,password:password}));
};
var firebaseConfig = {
    apiKey: "AIzaSyBPwtwKaCkzI2hKbnQapWaFzu_jJrZ5-mA",
    authDomain: "delhihacks-dc2e6.firebaseapp.com",
    databaseURL: "https://delhihacks-dc2e6.firebaseio.com",
    projectId: "delhihacks-dc2e6",
    storageBucket: "delhihacks-dc2e6.appspot.com",
    messagingSenderId: "873737043035",
    appId: "1:873737043035:web:37cc575e15d5239270137e",
    measurementId: "G-Z77GZRK33E"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 $("#btn-logout").click(function () {
  alert("logged out");
  document.querySelector('#btn-logout').style.display='none';
  document.querySelector('#log').style.display='block';
  
  document.querySelector('#account').style.display='none';
  firebase.auth().signOut();
});


var users=firebase.database().ref().child("users");
$("#sign").click(function()
{
var email=$("#exampleInputEmail1").val();
var password=$("#exampleInputPassword1").val();
var name=$("#name").val();
var re_pass=$("#repeat-pass").val();
  //Create User with Email and Password
  if(password == re_pass)
  {
     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    window.alert("Message: "+ errorMessage);
    });
     var newuser=users.push();
    firebase.database().ref('users/'+newuser.key).set({
       username:email,
       password:password,
       name:name,
       post:{
        initial:"1",
       }
      //  mycart: {
      //   "pro1":"hello"
      //   },
    });
    alert("successful");
    
  }
  else{
    alert("passwords do not match");
  }
});


$("#btn-login").click(function()
{
var email=$("#exampleInputEmail").val();
var password=$("#exampleInputPassword").val();

if(email!=""&&password!=""){
    var result = firebase.auth().signInWithEmailAndPassword(email,password);
    result.catch(function(error)
    {
      var errorCode=error.code;
      var errorMessage=error.message;
      console.log(errorCode);
      console.log(errorMessage);
      window.alert("Message: "+ errorMessage);
    });
}
else{
  window.alert("Please fill out all fields.");
}
});


  $("#requirementBtn").click(function (){
 var name = document.getElementById('nameHelp').value;
var email = document.getElementById('emailHelp').value;
var contact = document.getElementById('contactNumber').value;
var problem = document.getElementById('problem').value;
var requirements = document.getElementById('requirements').value;
  firebase.auth().onAuthStateChanged(function(user){
     
      if(!user){
        alert("pls login");
      }
         else{
      if(name!=""&& email!="" &&contact!="" && problem!="" && requirements!=""){
          alert("Posted");
             var user = firebase.auth().currentUser;
            var useremail=user.email;
            var posts=firebase.database().ref().child("post");
            var newPost=posts.push();
            firebase.database().ref('posts/'+newPost.key).set({
                name:name,
                email:email,
                contact:contact,
                problem:problem,
                requirements:requirements
              });
          

            firebase.database().ref('users/' ).once("value",function(snapshot){
       
          snapshot.forEach(function(childsnap){
                
               if(useremail==childsnap.val().username){
                   
                   var requirement=firebase.database().ref('users/'+childsnap.key).child("requirement");
                
               
            var newRequire=requirement.push();
            firebase.database().ref('users/'+childsnap.key+'/requirement/'+newRequire.key).set({
                 name:name,
                email:email,
                  contact:contact,
                  problem:problem,
                 requirements:requirements,
                // requirements:requirements   
              });
               }

          })
        
  
        });
      }
        
        }
   });
});

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    
 document.querySelector('#btn-logout').style.display='block';
  document.querySelector('#log').style.display='none';
  
  document.querySelector('#account').style.display='block';
  }
})

var postRef=firebase.database().ref().child("posts");
   
  postRef.on("child_added",childSnap=>{
    // alert("hi");
    // snap.forEach(childSnap=>{
      var name=childSnap.child("name").val();
      var email=childSnap.child("email").val();
      var contact=childSnap.child("contact").val();
      var problem=childSnap.child("problem").val();
      var requirements=childSnap.child("requirements").val();
      $("#blog2").append(
        "<div class='col-md-4 mt-10' style='display:inline-block; margin-bottom:20px;'><div class='card shadow' style='height:400px; border-radius:20px;' ><div class='card-body'>"
         +"<h5 style='text-align:center;text-transform:uppercase;'>"+name+
             "</h5>"+"<p class='card-text' style='inline-block' >Phone: "+contact+"</p>"+"<p class='card-text' style='inline-block' >Email: "+email+"</p>"+"<p style='top:50%;'>Problem: <br>"+problem.substring(0,70)+"</p>"+"<p style='top:50%;'>Requirements/Solution: <br>"+requirements.substring(0,50)+"</p>"+"<button onclick=display('"+childSnap.key+"')  class='btn btn-primary'style='margin-bottom:30px;position: absolute; bottom:   5px;'>Read More"+"</button>"+"</div></div></div>");
 
   });

 function display(key){
    
     firebase.database().ref('posts/' + key).on('value', snapshot => {
            var name=snapshot.val().name;
            var email=snapshot.val().email;
            var problem=snapshot.val().problem;
            var contact=snapshot.val().contact;
            var requirements=snapshot.val().requirements;
            let requirement={
             name:name,
             email:email,
             problem:problem,
             contact:contact,
             requirements:requirements,
             key:key,
            }
            
            localStorage.setItem("query", JSON.stringify(requirement));
      });
      window.location.href="./readMore.html";
     
   }

let post2=localStorage.getItem("query");
post=JSON.parse(post2);
console.log(post2);
let postcontainer=document.querySelector('.well');
postcontainer.innerHTML='';
postcontainer.innerHTML+=` <h3>${post.name}</h3>


<hr>
<p>Contact: ${post.contact}</p>
<p>Email: ${post.email}</p>
<p>Problem: ${post.problem}</p>
<p>Requirements / Solution :${post.requirements}</p>
`
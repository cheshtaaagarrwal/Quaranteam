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


  $("#submitBtn").click(function (){
 var name = document.getElementById('nameEvent').value;
var email = document.getElementById('emailEvent').value;
var contact = document.getElementById('contactNumber').value;
var description = document.getElementById('description').value;
var other = document.getElementById('other').value;
var eventname = document.getElementById('Eventname').value;
  firebase.auth().onAuthStateChanged(function(user){
     
      if(!user){
        alert("pls login");
      }
         else{
      if(name!=""&& email!="" &&contact!="" && description!="" && other!=""){
          alert("Posted");
             var user = firebase.auth().currentUser;
            var useremail=user.email;
            var events=firebase.database().ref().child("events");
            var newEvent=events.push();
            firebase.database().ref('events/'+newEvent.key).set({
                name:name,
                email:email,
                contact:contact,
                description:description,
                other:other,
                eventname:eventname
              });
           
            firebase.database().ref('users/' ).once("value",function(snapshot){
       
          snapshot.forEach(function(childsnap){
                
               if(useremail==childsnap.val().username){

                   var eve=firebase.database().ref('users/'+childsnap.key).child("events");
                   var newEve=eve.push();
                  
                firebase.database().ref('users/'+childsnap.key+'/events/'+newEve.key).update({
                    description:description,
                    other:other,
                    email:email,
                    contact:contact,
                    eventname:eventname
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

var eventtRef=firebase.database().ref().child("events");
   
  eventtRef.on("child_added",childSnap=>{
    // alert("hi");
    // snap.forEach(childSnap=>{
      var name=childSnap.child("name").val();
      var email=childSnap.child("email").val();
      var contact=childSnap.child("contact").val();
      var description=childSnap.child("description").val();
      var other=childSnap.child("other").val();
       var eventname=childSnap.child("eventname").val();

      // $("#blog2").append(
      //   "<div class='col-md-4 mt-10' style='display:inline-block; margin-bottom:20px;'><div class='card shadow' style='height:400px; border-radius:20px;' ><div class='card-body'>"
      //    +"<h5 style='text-align:center;text-transform:uppercase;'>"+eventname+
      //        "</h5>"+"<p class='card-text' style='inline-block' >Organiser: "+name+"</p>"+"<p class='card-text' style='inline-block' >Phone: "+contact+"</p>"+"<p class='card-text' style='inline-block' >Email: "+email+"</p>"+"<p style='top:50%;'>Problem: <br>"+description.substring(0,70)+"</p>"+"<p style='top:50%;'>Requirements/Solution: <br>"+other.substring(0,50)+"</p>"+"<button class='btn btn-primary'style='margin-bottom:30px;position: absolute; bottom:   5px;'>Read More"+"</button>"+"</div></div></div>");
 $("#eventdisplay").append(
        "<div class='col-md-4 mt-10' style='display:inline-block; margin-bottom:20px;'><div class='card shadow' style='height:400px; border-radius:20px;' ><div class='card-body'>"
         +"<h5 style='text-align:center;text-transform:uppercase;'>"+eventname+
             "</h5>"+"<p style='top:50%;'>Organiser: "+name+"</p>"+"<p style='top:50%;'>Email:"+email+"</p>"+"<p style='top:50%;'>Contact:"+contact+"</p>"+"<p style='top:50%;'>"+description.substring(0,70)+"</p>"+"<p style='top:50%;'>"+other.substring(0,50)+"</p>"+"<button onclick=display('"+childSnap.key+"') class='btn btn-primary'style='margin-bottom:30px;position: absolute; bottom:   5px;'>Read More"+"</button>"+"</div></div></div>");
   });


  function display(key){
    
     firebase.database().ref('events/' + key).on('value', snapshot => {
            var name=snapshot.val().name;
            var email=snapshot.val().email;
            var contact=snapshot.val().contact;
var description=snapshot.val().name;
var other=snapshot.val().other;
var eventname=snapshot.val().eventname;

            let event={
            
              name:name,
              email:email,
              contact:contact,
              description:description,
              other:other,
              eventname:eventname,
             key:key,
             
            }
            
            localStorage.setItem("event", JSON.stringify(event));
           
      });
      window.location.href="./Read.html";
     
   }


let post2=localStorage.getItem("event");
post=JSON.parse(post2);
console.log(post2);
let postcontainer=document.querySelector('.well');
postcontainer.innerHTML='';
postcontainer.innerHTML+=` <h3>${post.eventname}</h3>


<hr>
<p>Oragniser: ${post.name}</p>
<p>Email: ${post.email}</p>
<p>Contact: ${post.contact}</p>
<p>description: ${post.description}</p>
<p>Other: ${post.other}</p><hr><hr>
`

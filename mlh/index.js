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
  
var name,gender,email,contact,occupation,company,description;
function ReadInput(){
  name=document.getElementById('name').value;
  email=document.getElementById('email').value;
  contact=document.getElementById('phone').value;
  occupation=document.getElementById('occupation').value;
  company=document.getElementById('Company').value;
  gender=document.getElementById('gender').value;
  description=document.getElementById('description').value;
}

 var heroes=firebase.database().ref().child("heroes");
$("#submit").click(function(){
  ReadInput();
  var newHero=heroes.push();
  firebase.database().ref('heroes/'+newHero.key).set({
  gender:gender,
  occupation:occupation,
  Company:company,
    name:name,
    email:name,
    contact:contact,
    description:description
  });
  document.querySelector('.alert').style.display='block';
  setTimeout(function(){
    document.querySelector('.alert').style.display='none';
  },3000);
});

var rootRef=firebase.database().ref().child("heroes");
   
  rootRef.on("child_added",childSnap=>{
    // alert("hi");
    // snap.forEach(childSnap=>{
      var name=childSnap.child("name").val();
      var gender=childSnap.child("gender").val();
      var occupation=childSnap.child("occupation").val();
       var description=childSnap.child("description").val();
          $("#heroes").append(
       "<div class='col-md-4 mt-10' style='display:inline-block; margin-bottom:20px;'><div class='card shadow' style='height:300px; border-radius:20px;' ><div class='card-body'>"
        +"<h5 style='text-align:center;text-transform:uppercase;'>"+name+
            "</h5>"+"<p class='card-text' style='inline-block' ><strong>Occupation: </strong> "+occupation+"</p>"+"<p style='top:50%;'>"+description+"</p>"+"</div></div></div>");

  });

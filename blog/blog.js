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
  document.querySelector('#account').style.display='none';
  document.querySelector('#log').style.display='block';
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


  $("#blogpost").click(function (){
   
 var title = document.getElementById('title').value;
var post = document.getElementById('post').value;
  firebase.auth().onAuthStateChanged(function(user){
      if(!user)
      {
        alert("please login");
      }
    else{
      if(post!=""&& title!=""){
          alert("published");
            
             var user = firebase.auth().currentUser;
             console.log(user);
            var useremail=user.email;
            console.log(useremail); 
            var blogs=firebase.database().ref().child("blogs");
            var newBlog=blogs.push();
            firebase.database().ref('blogs/'+newBlog.key).set({
                 title:title,
                 post:post
              });

            firebase.database().ref('users/' ).once("value",function(snapshot){
       
          snapshot.forEach(function(childsnap){
                
               if(useremail==childsnap.val().username){

                   var posts=firebase.database().ref('users/'+childsnap.key).child("post");
                   var newPost=posts.push();
                   alert(newPost.key);
                firebase.database().ref('users/'+childsnap.key+'/post/'+newPost.key).update({
                     title:title,
                     post:post,
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

var rootRef=firebase.database().ref().child("blogs");
   
  rootRef.on("child_added",childSnap=>{
    // alert("hi");
    // snap.forEach(childSnap=>{
      var title=childSnap.child("title").val();
      var post=childSnap.child("post").val();
      
      $("#blog2").append(
        "<div class='col-md-4 mt-10' style='display:inline-block; margin-bottom:20px;'><div class='card shadow' style='height:300px; border-radius:20px;' ><div class='card-body'>"
         +"<h5 style='text-align:center;text-transform:uppercase;'>"+title+
             "</h5>"+"<p style='top:50%;'>"+post.substring(0,200)+"</p>"+"<button onclick=display('"+childSnap.key+"') class='btn btn-primary'style='margin-bottom:30px;position: absolute; bottom:   5px;'>Read More"+"</button>"+"</div></div></div>");
 
   });
   function display(key){
    
     firebase.database().ref('blogs/' + key).on('value', snapshot => {
            var title=snapshot.val().title;
            var post=snapshot.val().post;
            let product={
            
              title:title,
              post:post,
             key:key,
             
            }
            
            localStorage.setItem("post", JSON.stringify(product));
           
      });
      window.location.href="./post.html";
     
   }

let post2=localStorage.getItem("post");
post=JSON.parse(post2);
console.log(post2);
let postcontainer=document.querySelector('.well');
postcontainer.innerHTML='';
postcontainer.innerHTML+=` <h3>${post.title}</h3>


<hr>
<p>${post.post}</p>
`

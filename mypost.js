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


   
var rkey;
    firebase.auth().onAuthStateChanged(function(user){
    if(!user)
    {
      alert("please login");
    }
    else{
        var user = firebase.auth().currentUser;
           
          var useremail=user.email;
       
        firebase.database().ref('users/' ).once("value",function(snapshot){
        snapshot.forEach(function(childSnap){
            var comment=childSnap.child("username").val();
                var name=childSnap.child("name").val();
             if(useremail==childSnap.val().username){
                rkey=childSnap.key;
                $("#mypost").append("<div><strong>Name: </strong> "+name+"<div><strong>Email: </strong>"+comment+"</div>"+"</div><hr>")
                 var rootRef=firebase.database().ref('users/'+childSnap.key).child('post');
                
                 rootRef.on("child_added",childSnap=>{
   
                    // alert("hi");
                    // snap.forEach(childSnap=>{
                      var title=childSnap.child("title").val();
                      var post=childSnap.child("post").val();
                     
                      $("#posts").append(
                        "<div class='col-md-4 mt-10' style='display:inline-block; margin-bottom:20px;'><div class='card shadow' style='height:300px; border-radius:20px;' ><div class='card-body'>"
                         +"<h5 style='text-align:center;text-transform:uppercase;'>"+title+
                             "</h5>"+"<p style='top:50%;'>"+post.substring(0,200)+"</p>"+"<button onclick=display('"+childSnap.key+"') class='btn btn-primary'style='margin-bottom:30px;position: absolute; bottom:   5px;'>Read More"+"</button>"+"</div></div></div>");
                 
                   });
              };
             })
            })
        }
    })
      
    function display(key){
    
      firebase.database().ref('users/' + rkey+'/post/'+key).on('value', snapshot => {
             var title=snapshot.val().title;
             var post=snapshot.val().post;
             let product={
             
               title:title,
               post:post,
              key:key,
              
             }
             
             localStorage.setItem("mypost", JSON.stringify(product));
            
       });
       window.location.href="./myreadpost.html";
      
    }
 
 let post2=localStorage.getItem("mypost");
 post=JSON.parse(post2);
 console.log(post2);
 let postcontainer=document.querySelector('.well');
 postcontainer.innerHTML='';
 postcontainer.innerHTML+=` <h3>${post.title}</h3>
 
 
 <hr>
 <p>${post.post}</p>
 `
   
 
   


  

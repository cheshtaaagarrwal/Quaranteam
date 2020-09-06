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
let post3=localStorage.getItem("post");
 post3=JSON.parse(post3);

var key=post3.key;

  $("#submitComment").click(function (){
      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var body = document.getElementById('comment').value;

      firebase.auth().onAuthStateChanged(function(user){
      if(!user)
      {
        alert("please login");
      }
      else{
          var user = firebase.auth().currentUser;
             
            var useremail=user.email;
         
          firebase.database().ref('users/' ).once("value",function(snapshot){
          snapshot.forEach(function(childsnap){
                
               if(useremail==childsnap.val().username){

                   var comments=firebase.database().ref('users/'+childsnap.key).child("comment");
                   var newComment=comments.push();
                   
                firebase.database().ref('users/'+childsnap.key+'/comment/'+newComment.key).update({
                    comment:body,
                    name:name,
                });
               }

          })
        

      });
                  
     
         var com=firebase.database().ref('blogs/'+key).child("comment");
         var newCom=com.push();
         
                firebase.database().ref('blogs/'+key+'/comment/'+newCom.key).update({
                    comment:body,
                    name:name,
                });
               
      }
    })
     
  })

  var commentRef=firebase.database().ref('blogs/'+key).child("comment");
   
  commentRef.on("child_added",childSnap=>{
    // alert("hi");
    // snap.forEach(childSnap=>{
      var comment=childSnap.child("comment").val();
      var name=childSnap.child("name").val();
      $("#commentSection").append("<div><strong>"+name+"</strong><div>"+comment+"</div>"+"</div><hr>")
      // $("#blog2").append(
      //   "<div class='col-md-4 mt-10' style='display:inline-block; margin-bottom:20px;'><div class='card shadow' style='height:300px; border-radius:20px;' ><div class='card-body'>"
      //    +"<h5 style='text-align:center;text-transform:uppercase;'>"+title+
      //        "</h5>"+"<p style='top:50%;'>"+post.substring(0,200)+"</p>"+"<button onclick=display('"+childSnap.key+"') class='btn btn-primary'style='margin-bottom:30px;position: absolute; bottom:   5px;'>Read More"+"</button>"+"</div></div></div>");
 
   });
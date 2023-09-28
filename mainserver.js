


const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var Account = require("./key.json");
const express = require('express');
const app = express();




initializeApp({
    credential: cert(Account)
  });

var fsdb = getFirestore();

app.get('/', function(rq, response){
    response.sendFile(__dirname+'/signin.html');
});
app.get('/log', function(rq, response){

    response.sendFile(__dirname+'/login.html');
})
app.get('/sigSub', 
function(rq, response){

  fsdb.collection("login").where("email","==",rq.query.email)
  .get().then((docs) =>{
    if (docs.size > 0){
      response.send("This account is already present.");
    }
  });



    fsdb.collection('login').add({
        email : rq.query.email,
        password : rq.query.password,}).then(() => {
        response.send("Your signin is success.")
    });    
})
app.get('/logSub', 
function(rq, response){
    fsdb.collection('login')
    .where('email', '==', rq.query.email)
    .where('password', '==', rq.query.password)
    .get()
    .then((ab) => {
        if(ab.size>0){
            response.send("success login");

        }else{
            response.send("Your Login is failed.")
        }
    })
})


app.listen(5000);






// var exp=require('express');
// var request=require("request");
// var e=exp();

// const { initializeApp, cert } = require('firebase-admin/app');
// const { getFirestore} = require('firebase-admin/firestore');
// var serviceAccount = require("./key.json");
// initializeApp({
//     credential: cert(serviceAccount)
//   });
//   const db = getFirestore();


// e.get("/",function(req,res){
//     res.sendFile("C:/Documents/fewd external lab 2-2/log.html");
// })

// e.get("/k",function(req,res){
//     res.sendFile("C:/Documents/fewd external lab 2-2/sig.html");
// })
// e.get("/sig",function(req,res){               
//     var a=req.query;
//     email=a.username;
//     password=a.password;
//     res.send("You Signed in Successfully with" + email);
//     db.collection('yesubabu').add({
//         Emailad : email ,
//         Passwordad :password
//     })
// })

// e.get('/log', function(req, res) {
//     var a = req.query;
//     var imail = a.user;
//     var iassword =a.pass;
//     var dataPresent = false; // Flag to track data presence

//     db.collection('yesubabu').get().then((docs) => {
//         docs.forEach((doc) => {
//             if (imail == doc.data().Emailad && iassword == doc.data().Passwordad) {
                
//                 dataPresent = true;
//             }
//         });

//         if (dataPresent) {
//             res.send("data present in Firebase");
//         } else {
//             res.send("data not present in Firebase, please login");
//         }
//     });
// });

// e.listen(10,function(){
//     console.log("Server started");
// })







// // Import the Firebase SDK and initialize Firestore
// // const firebase = require('firebase/app');
// // require('firebase/firestore');

// // Initialize your Firebase app
// var serviceAccount = require("./key.json");
// initializeApp({
//     credential: cert(serviceAccount)
//   });
// // firebase.initializeApp(firebaseConfig);

// // Get a reference to the Firestore database
// const db = firebase.firestore();

// // Reference to the collection
// const usersCollection = db.collection('login');

// // Create a new document with an auto-generated ID
// usersCollection.add({
//   name: 'John Doe',
//   age: 30,
//   email: 'john@example.com'
// })
// .then((docRef) => {
//   console.log('Document added with ID:', docRef.id);
// })
// .catch((error) => {
//   console.error('Error adding document:', error);
// });

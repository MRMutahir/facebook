// let number = document.getElementById('number');
// let emaildash = document.getElementById('email');
import { collection, getDocs, addDoc, db, getAuth, onAuthStateChanged, doc, getDoc, setDoc, onSnapshot } from "../forms/firebase.js";

let login_email = document.querySelector('.login_email');
let login_name = document.querySelector('.login_name');
let login_birthday = document.querySelector('.login_birthday');
let isloggedinuser;

const auth = getAuth();
onAuthStateChanged(auth, async(user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        displayuserData(uid);
        isloggedinuser = uid;
        // id(uid)
        // addpostdata(uid);
        // console.log(uid, '==>>user login hen ');
    } else {
        // User is signed out
        // ...
        console.log('cmat');
    }
});
// });
let displayuserData = async(usercurrentID) => {
    const docRef = doc(db, "usersigindata", usercurrentID)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const { name, email, date, month, years } = docSnap.data();
        login_name.innerHTML = name
        login_email.innerHTML = email
        login_birthday.innerHTML = `${date }  - ${month }- ${years }`
            // let cuurentname = name

    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

let postmenu = document.getElementById('postmenu');
let postBtn1 = document.getElementById('postBtn1');
let postMain = document.getElementById('postMain');

console.log(postmenu.value);

postBtn1.addEventListener('click', async () => {

   

    // let readData =  async() => {
    //     const querySnapshot = await getDocs(collection(db, "postcontent"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} =>` , doc.data());
   

    // });
    // }





    let divPost = document.createElement('div');
    

    const postcontent = `  <div class="post">
    <div class="item1">
        <img src="../Dasbord/dasbordimg/profile1.jpeg" height="50px" width="50px" style="border-radius: 50px;" alt="">
        <div>name <br> <span>12-3-9</span></div>
        <span id="icon" class="ml-3">Icon</span>
      </div>
      <div class="text"> ${postmenu.value}</div>
      <div class="imgpost"></div>
      <div class="like">
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
      </div>
     </div>`
        
    divPost.innerHTML = postcontent;
    postMain.appendChild(divPost);
    // const docRef = addDoc(collection(db, "postcontent"), {
    //     posttext: postmenu.value,
    //     date: new Date().toLocaleString()
    // });
    try {
        const docRef = await addDoc(collection(db, "postcontent"), {
            posttext: postmenu.value,
            date: new Date().toLocaleString(),
            userid: isloggedinuser
        });
      
        console.log("Document written with ID: ", docRef.id);
        console.log(isloggedinuser);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    // console.log("Document  ", docRef);
    // console.log("Document written with ID: ", docRef.id);
    // readData( docRef.id)
    displaypost();
});

displaypost()

async function displaypost(){
    const querySnapshot = await getDocs(collection(db, "postcontent"));
querySnapshot.forEach((doc) => {
    postMain.innerHTML += `  <div class="post">
    <div class="item1">
        <img src="../Dasbord/dasbordimg/profile1.jpeg" height="50px" width="50px" style="border-radius: 50px;" alt="">
        <div>name <br> <span>12-3-9</span></div>
        <span id="icon" class="ml-3">Icon</span>
      </div>
      <div class="text"> ${doc.data().posttext}</div>
      <div class="imgpost"></div>
      <div class="like">
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
      </div>
     </div>`
})
}
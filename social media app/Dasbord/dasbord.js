// let number = document.getElementById('number');
// let emaildash = document.getElementById('email');
import { collection, getDocs, addDoc, db, getAuth, onAuthStateChanged, doc, getDoc, setDoc, onSnapshot } from "../forms/firebase.js";

let login_email = document.querySelector('.login_email');
let login_name = document.querySelector('.login_name');
let login_birthday = document.querySelector('.login_birthday');
const auth = getAuth();
onAuthStateChanged(auth, async(user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        displayuserData(uid);
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

postBtn1.addEventListener('click', () => {

    // function id(a) {
    //     console.log(a);
    // }
    let divPost = document.createElement('div');
    // divPost.innerHTML = postmenu.value;

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
        // postMain.appendChild(divPost);
        // divPost.setAttribute('class', 'divpost');
        // console.log(postcontent);
    divPost.innerHTML = postcontent;
    postMain.appendChild(divPost);
    const docRef = addDoc(collection(db, "postcontent"), {
        posttext: postmenu.value,
        date: new Date()
    });
    console.log("Document  ", docRef);
    console.log("Document written with ID: ", docRef.id);
    readData()
});


let readData = () => {
    const unsub = onSnapshot(doc(db, "postcontent", "SF"), (doc) => {
        console.log("Current data: ", doc.data());
    });
}
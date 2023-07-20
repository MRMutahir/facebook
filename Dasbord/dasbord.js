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
        // console.log("Document data:", docSnap.data());
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

// console.log(postmenu.value);

postBtn1.addEventListener('click', async() => {
    postUiset();
    postdatasave();
});



async function postdatasave(params) {


    try {
        const docRef = doc(db, "usersigindata", isloggedinuser)
        const docSnap = await getDoc(docRef);
        // console.log(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            //
            const { name, email, } = docSnap.data();
            console.log(name, email);
            // console.log(name, email);
            try {
                const docRef = await addDoc(collection(db, "postcontent"), {
                    posttext: postmenu.value,
                    date: new Date().toLocaleString(),
                    userid: isloggedinuser,
                    namecurent: name,
                    emailcrent: email // currentUsername =
                });

                console.log("Document written with ID: ", docRef.id);
                // console.log(isloggedinuser);
            } catch (error) {
                console.error("Error adding document: ", error);
            }

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

    } catch (error) {
        console.log(error);
    }


};


async function postUiset() {
    let date = new Date().toLocaleString()
    let divPost = document.createElement('div');

    let username = []
    console.log(username);

    onAuthStateChanged(auth, async(user) => {
        if (user) {
            const uid = user.uid;
            displayuserData(uid);
            // isloggedinuser = uid;
            // console.log(uid, '==>>user login hen ');
            // let nameayaHen = namepush()
            // console.log(user.email);
            let a = user.email
            console.log(a);
            username.push(a)
                // console.log(user);
                // username = user.email
                // console.log(nameayaHen);
        } else {
            // User is signed out
            // ...
            console.log('cmat');
        }
    });

    const postcontent = `<div class="post">
<div class="item1">
    <img src="../Dasbord/dasbordimg/profile1.jpeg" height="50px" width="50px" style="border-radius: 50px;" alt="">
    <div> <br><span></span>  <span>${date}</span></div>
    <span id="icon" class="ml-3">Icon</span>
  </div>
  <div class="text">${postmenu.value} </div>
  <div class="imgpost"></div>
  <div class="like">
    <div>==>></div>
    <div>==>></div>
    <div>==>></div>
  </div>
 </div>`

    divPost.innerHTML = postcontent;
    postMain.appendChild(divPost);
}
displaypost()
async function displaypost(DATE) {

    // console.log();

    const querySnapshot = await getDocs(collection(db, "postcontent"));
    querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        // let { name, email } = doc.data();
        // console.log(name, email);
        postMain.innerHTML +=
            `<div class="post">
        <div class="item1">
            <img src="../Dasbord/dasbordimg/profile1.jpeg" height="50px" width="50px" style="border-radius: 50px;" alt="">
            <div><br><span>${doc.data().namecurent} ${doc.data().emailcrent}</span> <span>${doc.data().date}</span></div>
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



























































// displaypost()
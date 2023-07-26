// let number = document.getElementById('number');
// let emaildash = document.getElementById('email');
import { collection, getDocs, addDoc, db, getAuth, onAuthStateChanged, doc, getDoc, setDoc, onSnapshot,getDocFromCache,deleteDoc  } from "../forms/firebase.js";

let login_email = document.querySelector('.login_email');
let login_name = document.querySelector('.login_name');
let login_birthday = document.querySelector('.login_birthday');
let login_fname = document.querySelector('.login_fname');
// console.log(login_fname);
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

let displayuserData = async(usercurrentID) => {
    const docRef = doc(db, "usersigindata", usercurrentID)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    
        // console.log("Document data:", docSnap.data());
        const { name, email, date, month, years, fathername } = docSnap.data();
        login_name.innerHTML = name
        login_email.innerHTML = email
        login_fname.innerHTML = fathername
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



async function postdatasave() {


    try {
        const docRef = doc(db, "usersigindata", isloggedinuser)
        const docSnap = await getDoc(docRef);
        // console.log(docRef);

        if (docSnap.exists()) {
            try {
                // const docRef = await addDoc(collection(db, "postcontent"), {
                //     posttext: postmenu.value,
                //     date: new Date().toLocaleString(),
                //     userid: isloggedinuser,
                //     namecurent: name,
                //     emailcrent: email,
                //     fathername: fname
                // });

                console.log("Document written with ID: ye id post ki hen ", docRef.id);
                // console.log(isloggedinuser);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
            // console.log(docSnap.data());

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

 

    onAuthStateChanged(auth, async(user) => {
        if (user) {
            const uid = user.uid;
            displayuserData(uid);
        
        } else {
            // User is signed out
            // ...
            console.log('cmat');
        }
    });
  
    
  const docRef = doc(db, "usersigindata", isloggedinuser)
  const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
    
        // console.log("Document data:", docSnap.data());
        
        
    } else {
        
        console.log("No such document!");
    }
     const { name, email,} = docSnap.data();
   
   

 
 await setDoc(doc(db, "postcontent", isloggedinuser), {
     posttext: postmenu.value,
     id: isloggedinuser,
     Name: name,
     Email: email,
     date: new Date().toLocaleString()

 });

//  console.log(postcontent)
//  divPost.innerHTML = postcontent;
//  postMain.appendChild(divPost);

}


displaypost()


async function displaypost() {
    
   

  console.log('salam');

 

const querySnapshot = await getDocs(collection(db, "postcontent"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
    console.log(doc.data().posttext,doc.data().Email,doc.data().Name);
});



}




















// setTimeout(() => {
//     const docRef = doc(db, "postcontent", );
//     try {
//       const docSnap =  getDoc(docRef);
  
//       if (docSnap.exists()) {
//         // Document data is available in docSnap.data()
//         const data = docSnap.data();
//         console.log("Document data:", data);
//         const {Name,Email,date} = data
//         console.log(Name,Email,date);
//       } else {
//         console.log("No such document!");
//       }
//     } catch (error) {
//       console.log("Error getting document:", error);
//     }
// }, 1000);
   




























// displaypost()
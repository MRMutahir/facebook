// let name = document.getElementById('name');
// let number = document.getElementById('number');
// let emaildash = document.getElementById('email');
// let password = document.getElementById('password');
// let add = document.getElementById('add');
import { collection, getDocs, db, getAuth, onAuthStateChanged, doc, getDoc } from "../forms/firebase.js";

let login_email = document.querySelector('.login_email');
let login_name = document.querySelector('.login_name');
let login_birthday = document.querySelector('.login_birthday');
// console.log(lo);


// const q = query(collection(db, "usersigindata"), where("capital", "==", true));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//     const { name, email, date, month, years } = doc.data();
//     // console.log(name, email, birthday);
//     // console.log(birthday);
//     login_name.innerHTML = name
//     login_email.innerHTML = email
//     login_birthday.innerHTML = `${date }  - ${month }- ${years }`
// });

// const querySnapshot = await getDocs(collection(db, "usersigindata"));
// querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => `, doc.data());
//     // console.log(uid);
//     const { name, email, date, month, years } = doc.data();
//     // console.log(name, email, birthday);
//     // console.log(birthday);
//     login_name.innerHTML = name
//     login_email.innerHTML = email
//     login_birthday.innerHTML = `${date }  - ${month }- ${years }`
const auth = getAuth();
onAuthStateChanged(auth, async(user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        displayuserData(uid)

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

    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}






// console.log(login_birthday, login_email, login_name);
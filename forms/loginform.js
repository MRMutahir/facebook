import { auth, getAuth, signInWithEmailAndPassword, collection, getDocs, db } from './firebase.js'
let loginEmail = document.getElementById('f_name');
let loginPassword = document.getElementById('f_password');
let loginbtn = document.getElementById('login');
// console.log(loginEmail, loginbtn, loginPassword);

loginbtn.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)


    // .then(async(userCredential) => {
    //         // Signed in 
    //         const user = userCredential.user;
    //         // ...
    //         console.log(user);
    //         console.log(user.uid);
    //         const querySnapshot = await getDocs(collection(db, "usersigindata"));
    //         querySnapshot.forEach((doc) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " => ", doc.data());
    //         });


    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(errorCode, errorMessage);
    //     });
    .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user);
            console.log(user.uid);

            window.location.href = "../Dasbord/dasbord.html";
            loginEmail.innerHTML = '';
            loginPassword.innerHTML = ''

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
})




// import { collection, getDocs } from "firebase/firestore";
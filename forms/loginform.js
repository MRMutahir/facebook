import { auth, getAuth, signInWithEmailAndPassword, collection, getDocs, db } from './firebase.js'
let loginEmail = document.getElementById('f_name');
let loginPassword = document.getElementById('f_password');
let loginbtn = document.getElementById('login');
// console.log(loginEmail, loginbtn, loginPassword);

loginbtn.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            // console.log(user);
            // console.log(user.uid);
            Swal.fire('sucsusful Login');
            setTimeout(() => {
                window.location.href = "../Dasbord/dasbord.html";
            }, 2000);
          
            

          
            loginEmail.innerHTML = '';
            loginPassword.innerHTML = ''

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            alert( errorMessage);
        });
})




// import { collection, getDocs } from "firebase/firestore";
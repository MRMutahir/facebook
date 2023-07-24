import { auth, getAuth, createUserWithEmailAndPassword, db, doc, setDoc } from "./firebase.js";
let createName = document.getElementById('Newname');
let fatherName = document.getElementById('Fathername');
let createEmail = document.getElementById('number_email');
let createPaswoord = document.getElementById('newPassword');
let brith_date = document.getElementById('brith_date');
let brith_month = document.getElementById('brith_Month');
let brith_years = document.getElementById('brith_years');
// console.log(fatherName.value);


let singup = document.getElementById('Singup');

// const auth = getAuth(app);



singup.addEventListener('click', async() => {
    if (createName.value == "" || createEmail.value == '' || createPaswoord.value == '') {
        return alert('kxh twb lhik')

    } else {
        let userDATA = {
            name: createName.value,
            email: createEmail.value,
            fathername: fatherName.value,
            password: createPaswoord.value,
            date: brith_date.value,
            month: brith_month.value,
            years: brith_years.value,
        }

        createUserWithEmailAndPassword(auth, createEmail.value, createPaswoord.value)

        .then(async(userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                // console.log(user, '==>>user');
                // console.log(user.uid, '==>>user');
                try {
                    await setDoc(doc(db, "usersigindata", user.uid), {
                        ...userDATA

                    });
                    // window.location.href = '../Dasbord/dasbord.html'
                    console.log('sucsusful');
                    createName.value = ''
                    createEmail.value = ''
                    createPaswoord.value = ''
                    brith_date.value = ''
                    brith_month.value = ''
                    brith_years.value = ''
                    fatherName.value = ''
                    window.location.href = "../Dasbord/dasbord.html";

                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage, '==>>errorCode:errorMessage');
            });

        // console.log(userDATA, '==>>userDATA');
    }
})
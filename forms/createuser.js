Swal.fire('Well Come MR social web')

import { auth, getAuth, createUserWithEmailAndPassword, db, doc, setDoc ,getStorage, ref, uploadBytesResumable, getDownloadURL} from "./firebase.js";
let createName = document.getElementById('Newname');
let fatherName = document.getElementById('Fathername');
let createEmail = document.getElementById('number_email');
let createPaswoord = document.getElementById('newPassword');
let brith_date = document.getElementById('brith_date');
let brith_month = document.getElementById('brith_Month');
let brith_years = document.getElementById('brith_years');
let select = document.getElementById('select');
// console.log(selectprofile.src); 
// console.log(fatherName.value);createuserprofileImage
let singup = document.getElementById('Singup');
// const auth = getAuth(app);

singup.addEventListener('click', async() => {
    // select.addEventListener('click',()=>{

    if (createName.value == "" || createEmail.value == '' || createPaswoord.value == ''||select.files == "") {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'form is incorrect',
          
        })
        

    } else {
        let userDATA = {
            name: createName.value,
            email: createEmail.value,
            fathername: fatherName.value,
            password: createPaswoord.value,
            date: brith_date.value,
            month: brith_month.value,
            years: brith_years.value,
            Image:selectprofile.src
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
                    Swal.fire('sucsusful form submision')
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
                  
                   alert(error);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert( errorMessage, '==>>errorCode:errorMessage');
              
                console.log(errorCode, errorMessage, '==>>errorCode:errorMessage');
            });

        // console.log(userDATA, '==>>userDATA');
    }
})

function selects() {

    console.log('salam');
    let createuserprofileImage = document.getElementById('createuserprofileImage');
    // console.log(createuserprofileImage);
        // console.log(createuserprofileImage.files[0].name);
        let imag = createuserprofileImage.files[0]
    const storage = getStorage();
    
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'createformimages/' + imag.name);
    const uploadTask = uploadBytesResumable(storageRef, imag, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            let selectprofile = document.getElementById('selectprofile');
          selectprofile.src = downloadURL
        });
      }
    );
    
    
    }

window.selects = selects









// let number = document.getElementById('number');
// let emaildash = document.getElementById('email');
import { collection, getDocs, addDoc, db, getAuth, onAuthStateChanged, doc, getDoc, setDoc, onSnapshot,getDocFromCache,deleteDoc , getStorage ,ref, uploadBytesResumable, getDownloadURL ,signOut } from "../forms/firebase.js";

let login_email = document.querySelector('.login_email');
let login_name = document.querySelector('.login_name');
let login_birthday = document.querySelector('.login_birthday');
let login_fname = document.querySelector('.login_fname');
// console.log(login_fname);
let isloggedinuser;
const auth = getAuth();
const storage = getStorage();
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
        console.log('Login in your account');
        alert('Login in your account');
        window.location = '/Dasbord/forms/index.html'
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
let uploadImages = document.getElementById('uploadImages');
let postBtn1 = document.getElementById('postBtn1');
let postMain = document.getElementById('postMain');
let logout = document.getElementById('logout');
// console.log(logout);
logout.addEventListener('click',()=>{signOut(auth).then(() => {
  // Sign-out successful.
  console.log("Sign-out successful.");
  window.location = '/forms/index.html'

}).catch((error) => {
  // An error happened.
  console.log(error,'An error happened.');
});})

// console.log(uploadImages.files[0]);
// console.log(postmenu.value);

postBtn1.addEventListener('click', async() => {
    postUiset();
    // postdatasave();
});



// async function postdatasave() {

// };


let divPost = document.createElement('div');
async function postUiset() {
    let date = new Date().toLocaleString()

 

    onAuthStateChanged(auth, async(user) => {
        if (user) {
            const uid = user.uid;
            displayuserData(uid);
        
        } else {
            // User is signed out
            // ...
            console.log('login your account');
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
   
     let   realimage = uploadImages.files[0] || "dasbordimg/postimg.jpg"
     console.log(realimage);
     
     
     
     
     
     
     
     // Create the file metadata
     /** @type {any} */
     const metadata = {
       contentType: 'image/jpeg'
     };
     
     // Upload file and metadata to the object 'images/mountains.jpg'
     const storageRef = ref(storage, 'images/' + realimage.name );
     const uploadTask = uploadBytesResumable(storageRef, realimage, metadata);
     
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
          //  console.log('File available at downloadURL', downloadURL);
           // (downloadURL)
            addDoc(collection(db, "postcontent"), {
            posttext: postmenu.value,
                 id: isloggedinuser,
                 Name: name,
                 Email: email,
                 date: new Date().toLocaleString(),
                 image:downloadURL
          });
          let postcontent =` <div class="container">
          <div class="firstchild">
            <h3>Muhammad Mutahir <small id="smaal1">like this post</small></h3>
            <span id="first_child_space">
              <!-- <i class="fa-solid fa-ellipsis"></i> -->
              <select name="" id="" >
                <option value=""><option>
                <option value="">Delet</option>
                <option value="">Edit</option>
                <option value="">Lock</option>
              </select>
              <i class="fa-solid fa-xmark"></i>
            </span>
          </div>
          <!-- <br /> -->
          <hr id="line1" />
          <div class="secondchild">
            <div id="child1">
              <img
                id="imgprofilemain"
                src="./dasbordimg/profile1.jpeg"
                height="50px"
                width="50px"
                alt=""
              />
            </div>
            <div id="child2">
              <h1 id="font-size">${name}</h1>
              <h2 id="font-size">${email}</h2>
              <h3 id="font-size">${new Date().toLocaleString()}</h3>
            </div>
            <div id="child3">
              <button id="btn_1">
                <i class="fa-solid fa-list-ul"></i> Connect
              </button>
            </div>
          </div>
          <div class="thirdchild">
            <div class="postcontent">
             ${postmenu.value}
              <div class="video_img">
                <img
                  id="imgpost"
                  src= ${downloadURL}
                  height="200px"
                  width="100%"
                  alt=""
                />
              </div>
              <!-- <hr /> -->
              <div class="likes">
                <div class="like1"><i class="fa-regular fa-thumbs-up"></i></div>
                <div class="like2"><i class="fa-regular fa-comment"></i></div>
                <div class="like3"><i class="fa-solid fa-upload"></i></div>
                <div class="like4">
                  <i class="fa-solid fa-share"></i>
                </div>
              </div>
            </div>
          </div>
          </div>`
          divPost.innerHTML += postcontent;
          postMain.appendChild(divPost);
         
         });
        }
        );
        postmenu.value = '';
        realimage = ''

 
  // uploadImagesfoo(image)


//  console.log(postcontent)

}


displaypost()


async function displaypost() {
    
   

  console.log('salam');

 

const querySnapshot = await getDocs(collection(db, "postcontent"));
querySnapshot.forEach((doc) => { 
let postcontents=
  ` <div class="container">
  <div class="firstchild">
  <h3>Muhammad Mutahir <small id="smaal1">like this post</small></h3>
  <span id="first_child_space">
    <!-- <i class="fa-solid fa-ellipsis"></i> -->
    <select name="" id="" >
      <option value=""><option>
      <option value="">Delet</option>
      <option value="">Edit</option>
      <option value="">Lock</option>
    </select>
    <i class="fa-solid fa-xmark"></i>
  </span>
 </div>
 <!-- <br /> -->
 <hr id="line1" />
 <div class="secondchild">
  <div id="child1">
    <img
      id="imgprofilemain"
      src="./dasbordimg/profile1.jpeg"
      height="50px"
      width="50px"
      alt=""
    />
  </div>
  <div id="child2">
    <h1 id="font-size">${doc.data().Name}</h1>
    <h2 id="font-size">${doc.data().Email}</h2>
    <h3 id="font-size">${new Date().toLocaleString()}</h3>
  </div>
  <div id="child3">
    <button id="btn_1">
      <i class="fa-solid fa-list-ul"></i> Connect
    </button>
  </div>
</div>
<div class="thirdchild">
  <div class="postcontent">
  ${doc.data().posttext}
    <div class="video_img">
      <img
        id="imgpost"
       
        src=${doc.data().image|| './dasbordimg/profile1.jpeg'}
      
        height="200px"
        width="100%"
        alt=""
      />
    </div>
    <!-- <hr /> -->
    <div class="likes">
      <div class="like1"><i class="fa-regular fa-thumbs-up"></i></div>
      <div class="like2"><i class="fa-regular fa-comment"></i></div>
      <div class="like3"><i class="fa-solid fa-upload" onclick="uploadImages()" ></i></div>
      <div class="like4">
        <i class="fa-solid fa-share"></i>
      </div>
    </div>
  </div>
</div>
</div>`
divPost.innerHTML += postcontents;
postMain.appendChild(divPost)
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data());
 

    // console.log(doc.data().posttext,doc.data().Email,doc.data().Name,
    // doc.data().image);
   
});



}
// let fa_solid =  document.querySelector('.fa-solid');
// console.log(fa_solid);
// fa_solid.addEventListener('click',uploadImages)


// window.uploadImagesfoo = uploadImagesfoo


















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
   





























import {collection,getDocs,db} from "../../forms/firebase.js"

let body = document.querySelector('body');
console.log(body);

const querySnapshot = await getDocs(collection(db, "usersigindata"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  let {email,name,profileimage} = doc.data();
  console.log(email,name,profileimage);
  let div =  document.createElement('div');
//   div.setAttribute("class" ,'usersMain')

let userscontent = ` 
<div className="usersmain">
<div id="user">
  <h1>${name}</h1>
  <div class="userimage">
    <img
      src="../dasbordimg/profile1.jpeg"
      height="100px"
      width="100px"
      alt=""
    />
  </div>
  <h4>${email}</h4>
  <p id="userpara">
    <button id="btnusersame">Follow</button>
    <button id="btnusersame">profile</button>
  </p>
</div>
</div>`
div.innerHTML = userscontent;
body.appendChild(div) ;

});
let users;
let level = sessionStorage.getItem("Level"); 
if (level.includes('A') == false) {
    sessionStorage.setItem("Time", 0);
}
let time = sessionStorage.getItem("Time");
let step = 1000;
let timer = time;
console.log(time);
setTimeout(logout,time);

setInterval(function() {
    timer -= step;
    //console.log(timer);
},step)

window.onbeforeunload = function() {
    sessionStorage.setItem("Time",timer);
}

function logout() {
    sessionStorage.setItem("Level","");
    sessionStorage.setItem("Time", 0);
    window.location.replace("index.html");
    console.log("tamer off");
}

async function cout() {
    let UsersKey = Object.keys(users); //create array with key for use cycle
    console.log(UsersKey);
    console.log(users);

    let boxInner = new Array();// array for made cart of user
    let box = document.querySelector('#users');
    for (let i = 0; i < UsersKey.length; i++) {
        boxInner[i] = 
                    `
                    <div class="">
                        <div class="d-flex">
                            <h6 class='my-1'>
                                Username: ${users[UsersKey[i]].username}  
                                Password: ${users[UsersKey[i]].password}
                                Level: ${users[UsersKey[i]].accLevel}
                            </h6>
                            <button onclick="deleteUser(this)" id="button${i}" class="btn btn-primary delete">Delete</button>
                            
                        </div>
                    </div>
                    `
    }  
    box.innerHTML = boxInner.join('')
}

(async function loadFile() {
    users = await fetch('./assets/nameusers.txt');
    users = await users.json();
    cout();
})();

async function deleteUser(obj) {
    let id = obj.id;
    console.log(id);
    id = id.slice(-1);
    console.log(id);
    let UsersKey = Object.keys(users);
    delete users[UsersKey[id]];
    cout();
}

async function registration() {
    let username, password, rePassword, accLevel;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    rePassword = document.getElementById("rePassword").value;
    accLevel = document.getElementById("accessLevel").value;

    console.log(username,password,rePassword,accLevel);

    if (password == rePassword) {
        users[`${username}`] = {"username": username, "password": password, "accLevel": accLevel};
    }
 
    console.log(users);
    cout();
}

document.getElementById('todownload').onclick = function () {
    let txtUsers = JSON.stringify(users);
    let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(txtUsers);
    this.href = myData;
    this.download = 'nameusers.txt';
}
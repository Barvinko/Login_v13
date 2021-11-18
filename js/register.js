let users;

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
                                Password :${users[UsersKey[i]].password}
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
    //console.log(users);
    //console.log(Object.keys(users));
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
    let username, password, rePassword;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    rePassword = document.getElementById("rePassword").value;
    console.log(username,password,rePassword);
    //let bvn = 2233;
    //txtUsers = JSON.stringify({ x: 5, y: 6 });
    if (password == rePassword) {
        users[`${username}`] = {"username": username, "password": password};
    }
    //console.log(txtUsers);
    console.log(users);
    
    // txtUsers = await fetch('./assets/nameusers.txt');
    // txtUsers = await txtUsers.json();

    // let reader = new FileReader();
    // reader.onload = function () {
    //     console.log(reader.result);
    // }
    // if (txtUsers != "") {
        
    // }
    cout();
}

document.getElementById('todownload').onclick = function () {
    let txtUsers = JSON.stringify(users);
    let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(txtUsers);
    this.href = myData;
    this.download = 'nameusers.txt';
}
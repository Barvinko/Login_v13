let box = document.querySelector('#equation');
let x = (Math.random() * 25 + 1).toFixed(0);
box.innerHTML = `lg(4*${x})`;
console.log((Math.log10(4*x)).toFixed(2));

async function login() {
    let users;
    users = await fetch('./assets/nameusers.txt');
    users = await users.json();
    console.log(users);
    let username, password, resultUser;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    resultUser = +document.getElementById("quation").value;
    console.log(username,password,resultUser);

    let result = (Math.log10(4*x)).toFixed(2);
    console.log(result);

    if (users.hasOwnProperty(`${username}`) && users[`${username}`].password == password && resultUser == result) {
        console.log("us");
        window.location.replace("main.html");
    }else{
        console.log("no us");
    }
}
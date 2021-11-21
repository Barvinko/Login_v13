console.log("shshshshsh");
let n, p, q, e, d, fE, text, data, hash, hash2, s, sign, splitData, cryData;
let level = sessionStorage.getItem("Level");
//console.log(level.includes('E'));
//console.log(level.includes('R'));
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

console.log(level.includes('W'));

if (level.includes('W') == false) {
    console.log(document.getElementById("text").disabled = "true");
    console.log("can no writ")
}

let feetback = document.getElementById("feedback");

document.getElementById('downloadCripherText').onclick = function () {
    console.log(level,level.includes('E'));
    if(level.includes('E')){
        //console.log("download",data);
        let bits = 10;//14
        forge.prime.generateProbablePrime(bits, function(err, num) {
        p = BigInt(num.toString(10));
        //p = 727n;
        q = 0n;
        console.log("p",p);
        bits = 10;
            do{//cycle for chek p==q
            forge.prime.generateProbablePrime(bits, function(err, num) {
                q = BigInt(num.toString(10));
                //q = 907n;
                if (q == p) {
                    console.log("!!!!p=q!!!");
                }      
            });}while(p==q)

            console.log("q",q);
            console.log("p*q",p*q);
            fE = (p-1n) * (q - 1n);
            console.log(fE);
            bits = 8; //10
            let k = 1n;
            
            //generator e
            forge.prime.generateProbablePrime(bits, function(err, num) {
                console.log('random prime', num.toString(10));
                e = BigInt(num.toString(10));
                //e=151n;
                console.log("e",e);
                while (((k*fE)+1n)%e == 1n || p==q) {
                        console.log("%==1");
                        forge.prime.generateProbablePrime(bits, function(err, num) {
                            q = BigInt(num.toString(10));
                            fE = (p-1n) * (q - 1n);
                            console.log(q);
                            if (q == p) {
                                console.log("!!!!p=q!!!");
                            }      
                        });
                    }
                while((((k-1n)*fE)+1n)%e != 0){
                    d = ((k*fE)+1n)/e;
                    console.log("d",d,"k",k,"%",((k*fE)+1n)%e)
                    k++;
                }
            });           
        });
        n = p * q;
        
        text = document.getElementById("text").value;
        text = text.split('');// split number which need encryption
        console.log(text);
        //data = BigInt(data);// translate type of date from number to BigInt
        console.log("p=",p,"q=",q,"n=",n,"fE=",fE,"e=",e,"d=",d);

        if (e > 1 && e < fE) {
            if ((d*e)%fE == 1n) {

                data = new Array();
                for (let i = 0; i < text.length; i++) {
                    data[i] = BigInt(text[i].charCodeAt(0));
                    data[i] = (data[i]**e)%n;
                    data[i] = data[i].toString(12)
                    console.log(data);
                }
                data[data.length] = {"d": parseFloat(d), "n": parseFloat(n)};

                console.log("encryption: (data**e)%n=",data);
            }else{
                console.log("d не подходит");
            }
        }else{
            console.log("е не подходит");
        }
        //decryption();
        feetback.innerHTML = "Text encryption";
        localStorage.setItem("Level",level);
        let txtText = JSON.stringify(data);
        let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(txtText);
        this.href = myData;
        this.download = 'close.txt';
    }else{
        console.log("не доступа к выполнению");
        feetback.innerHTML = "You do not have access to this action";
    }
}

async function decryption() {
    if(level.includes('E') && level.includes('R')){
        feetback.innerHTML = "Expect decryption";
        cryData = await fetch('./assets/close.txt');
        cryData = await cryData.json();
        console.log("cryData=",cryData);
        d = BigInt(cryData[cryData.length-1].d);
        n = BigInt(cryData[cryData.length-1].n);
        if (cryData != undefined) {
            for (let i = 0; i < cryData.length-1; i++) {
                cryData[i] = parseInt(cryData[i],12);
                console.log(parseInt(cryData[i],12));
                cryData[i] = BigInt(cryData[i]);
                //console.log(cryData[i]);
                cryData[i] = parseFloat((cryData[i]**d)%n); 
                //console.log(cryData[i]);
                cryData[i] = String.fromCharCode(cryData[i]);
                //console.log(cryData[i]);
            }

            delete cryData[cryData.length-1];
            console.log(cryData.join('')); 
            feetback.innerHTML = "File decryption, You can download its";
        }
    }else if(level.includes('R')){
        console.log("не доступа к чтению");
        feetback.innerHTML = "You do not have access to this action";
    }else{
        console.log("не доступа к выполнению");
        feetback.innerHTML = "You do not have access to this action";
    }
}

document.getElementById('upload').onclick = async function () {
    if(level.includes('E')){
        let txtUsers = cryData.join('');
        let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(txtUsers);
        this.href = myData;
        this.download = 'out.txt';
    }else{
        console.log("не доступа к выполнению");
        feetback.innerHTML = "You do not have access to this action";
    }
}

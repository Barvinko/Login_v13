console.log("shshshshsh");
let n, p, q, e, d, fE, text, data, hash, hash2, s, sign, splitData;

// //var rsa = forge.pki.rsa; // Указываем в переменной что хотим пользоваться шифром RSA
// // var keypair = rsa.generateKeyPair({ bits: 1024, e: 55555559 });
// // console.log(keypair);
// // rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
// //     console.log(keypair.private.toString(10));
// //     console.log(keypair.public);
// //   });
// (async function () {
//   let bits = 10;//14
//   forge.prime.generateProbablePrime(bits, function(err, num) {
//     p = BigInt(num.toString(10));
//     q = 0n;
//     //p=17n;
//     console.log("p",p);
//     bits = 10;
//         do{
//         forge.prime.generateProbablePrime(bits, function(err, num) {
//             q = BigInt(num.toString(10));
//             if (q == p) {
//                 console.log("!!!!p=q!!!");
//             }
//             //q=19n;
//             // console.log("q",q);
//             // console.log("p*q",p*q);
//             // fE = (p-1n) * (q - 1n);
//             // console.log(fE);
//             // bits = 8; //10
//             // let k = 1n;
            
//             // forge.prime.generateProbablePrime(bits, function(err, num) {
//             //     console.log('random prime', num.toString(10));
//             //     e = BigInt(num.toString(10));
//             //     //e=5n;
//             //     console.log("e",e);
//             //     while((((k-1n)*fE)+1n)%e != 0){
//             //         d = ((k*fE)+1n)/e;
//             //         console.log("d",d,"k",k,"%",((k*fE)+1n)%e)
//             //         k++;
//             //     }
//             // });           
                
//         });}while(p==q)
//         console.log("q",q);
//         console.log("p*q",p*q);
//         fE = (p-1n) * (q - 1n);
//         console.log(fE);
//         bits = 8; //10
//         let k = 1n;
        
//         forge.prime.generateProbablePrime(bits, function(err, num) {
//             console.log('random prime', num.toString(10));
//             e = BigInt(num.toString(10));
//             //e=5n;
//             console.log("e",e);
//             while((((k-1n)*fE)+1n)%e != 0){
//                 d = ((k*fE)+1n)/e;
//                 console.log("d",d,"k",k,"%",((k*fE)+1n)%e)
//                 k++;
//             }
//         });           
//   });
    
// })();


//   createRsaKeys({bits: 1024}, function(err, keyPair) {
//       console.log(keyPair.private);
//       console.log(keyPair.public);
//   });

// while(Number.isInteger(d)){
//     let k = 1
//     d = (k)
// }

// var keyPair = forge.pki.rsa.generateKeyPair(4096);
// console.log("sdf");
// //at this point we have 2 primes p and q in the privateKey
// var p = keyPair.privateKey.p;
// var q = keyPair.privateKey.q;
// console.log(p,q);

// d = 0.1;
// console.log(Number.isInteger(d) == false);
// fE = (p-1n) * (q - 1n);

// while(Number.isInteger(d) == false){
//     let k = 1
//     forge.prime.generateProbablePrime(bits, function(err, num) {
//         console.log('random prime', num.toString(10));
//         e = BigInt(num.toString(10));
//         console.log("e",e);
//       });
//     d = (k*fE+1n)/e;
//     }

async function encryption() {
    let bits = 10;//14
    forge.prime.generateProbablePrime(bits, function(err, num) {
      //p = BigInt(num.toString(10));
      p = 727n;
      q = 0n;
      //p=17n;
      console.log("p",p);
      bits = 10;
          do{//cycle for chek p==q
          forge.prime.generateProbablePrime(bits, function(err, num) {
              //q = BigInt(num.toString(10));
              q = 907n;
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
              //e = BigInt(num.toString(10));
              e=151n;
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
    //data = "34dsfd678";
    text = text.split('');// split number which need encryption
    console.log(text);
    //data = BigInt(data);// translate type of date from number to BigInt
    console.log("p=",p,"q=",q,"n=",n,"fE=",fE,"e=",e,"d=",d);
    //hash = Math.random() * 10 + 1;//create random number for hash
    //hash = BigInt(hash.toFixed(0));
    //console.log("Random number for hashing has=",hash);
    if (e > 1 && e < fE) {
        if ((d*e)%fE == 1n) {
            // data = new Object();
            // for (let i = 0; i < text.length; i++) {
            //     data[`${i}`] = BigInt(text[i].charCodeAt(0));
            //     data[`${i}`] = (data[`${i}`]**e)%n;
            //     data[`${i}`] = parseFloat(data[`${i}`]);
            // }
            
            data = new Array();
            for (let i = 0; i < text.length; i++) {
                data[i] = BigInt(text[i].charCodeAt(0));
                data[i] = (data[i]**e)%n;
                data[i] = parseFloat(data[i]);
            }
            data[data.length] = {"d": parseFloat(d), "n": parseFloat(n)};

            console.log("encryption: (data**e)%n=",data);
            //document.getElementById("get_encryption").innerHTML = data;
            // for (let i = 0; i < splitData.length; i++) {
            //     splitData[i]= BigInt(splitData[i]);
            //     hash = ((splitData[i] + hash)**2n)%n;   
            //     console.log(`stage hashing: hash[${i}]=`,hash);             
            // }
            //s = (hash**d)%n;//encryption signature
            //console.log("hash=",hash,"s=",s);
        }else{
            console.log("d не подходит");
        }
    }else{
        console.log("е не подходит");
    }
    //decryption();
}

document.getElementById('downloadCripherText').onclick = function () {
    //console.log("download",data);
    let bits = 10;//14
    forge.prime.generateProbablePrime(bits, function(err, num) {
      //p = BigInt(num.toString(10));
      p = 727n;
      q = 0n;
      //p=17n;
      console.log("p",p);
      bits = 10;
          do{//cycle for chek p==q
          forge.prime.generateProbablePrime(bits, function(err, num) {
              //q = BigInt(num.toString(10));
              q = 907n;
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
              //e = BigInt(num.toString(10));
              e=151n;
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
    //data = "34dsfd678";
    text = text.split('');// split number which need encryption
    console.log(text);
    //data = BigInt(data);// translate type of date from number to BigInt
    console.log("p=",p,"q=",q,"n=",n,"fE=",fE,"e=",e,"d=",d);
    //hash = Math.random() * 10 + 1;//create random number for hash
    //hash = BigInt(hash.toFixed(0));
    //console.log("Random number for hashing has=",hash);
    if (e > 1 && e < fE) {
        if ((d*e)%fE == 1n) {
            // data = new Object();
            // for (let i = 0; i < text.length; i++) {
            //     data[`${i}`] = BigInt(text[i].charCodeAt(0));
            //     data[`${i}`] = (data[`${i}`]**e)%n;
            //     data[`${i}`] = parseFloat(data[`${i}`]);
            // }
            
            data = new Array();
            for (let i = 0; i < text.length; i++) {
                data[i] = BigInt(text[i].charCodeAt(0));
                data[i] = (data[i]**e)%n;
                data[i] = parseFloat(data[i]);
            }
            data[data.length] = {"d": parseFloat(d), "n": parseFloat(n)};

            console.log("encryption: (data**e)%n=",data);
            //document.getElementById("get_encryption").innerHTML = data;
            // for (let i = 0; i < splitData.length; i++) {
            //     splitData[i]= BigInt(splitData[i]);
            //     hash = ((splitData[i] + hash)**2n)%n;   
            //     console.log(`stage hashing: hash[${i}]=`,hash);             
            // }
            //s = (hash**d)%n;//encryption signature
            //console.log("hash=",hash,"s=",s);
        }else{
            console.log("d не подходит");
        }
    }else{
        console.log("е не подходит");
    }
    //decryption();
    let txtText = JSON.stringify(data);
    let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(txtText);
    this.href = myData;
    this.download = 'close.txt';
}

async function decryption() {
    //let cryData = BigInt(document.getElementById("get_encryption").innerHTML);
    let cryData = await fetch('./assets/close.txt');
    cryData = await cryData.json();
    console.log("cryData=",cryData);
    d = BigInt(cryData[cryData.length-1].d);
    n = BigInt(cryData[cryData.length-1].n);
    if (cryData != undefined) {
        for (let i = 0; i < cryData.length-1; i++) {
            cryData[i] = BigInt(cryData[i]);
            //console.log(cryData[i]);
            cryData[i] = parseFloat((cryData[i]**d)%n); 
            //console.log(cryData[i]);
            cryData[i] = String.fromCharCode(cryData[i]);
            //console.log(cryData[i]);
        }
        //document.getElementById("get_decryption").innerHTML = cryData;
        //cryData = String(cryData);
        delete cryData[cryData.length-1];
        console.log(cryData.join('')); 
        //console.log(typeof(splitCryData));
        // let splitCryData;
        // splitCryData = cryData.split('');
        // console.log(splitCryData); 
        // hash2 = ((s**e)%n); //decryption signature
        // console.log("hash2=",hash2);
        // if (hash == hash2) {
        //     document.getElementById("sign").innerHTML = "Подпись потверждена"
        // }else{
        //     console.log("Signature is not verified");
        // }
    }
}

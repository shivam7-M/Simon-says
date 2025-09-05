let gameSeq=[];
let userSeq=[];
let started=false;
let level=0;

let userLevels=[];


let btns=["red","yellow","green","purple"]

let h2=document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started==false){
        console.log("game start")
        started=true;
        
        levelUp();
    }
});


function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash")
    },300);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },300);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4)
    let randColor=btns[randIdx];
    console.log(randColor)
    gameSeq.push(randColor);
    console.log(`game seq=${gameSeq}`)
    let randBtn=document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
}

function checkAns(idx){
   
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000)
        }

    }
    else{
        

        reset();
    }
}

function btnPress(){
    // console.log(this)
   if(started==true){
     let btn=this
        gameFlash(btn);

    let userColor=btn.getAttribute("id")
    userSeq.push(userColor);
    console.log(`user seq=${userSeq}`)
    checkAns(userSeq.length-1);
   }
}

let allBtns=document.querySelectorAll(".btn")
for(btn of allBtns){
        btn.addEventListener("click",btnPress)             
}

function reset(){
    document.querySelector("body").style.backgroundColor="red"
    setTimeout( function(){
        document.querySelector("body").style.backgroundColor="white"},200 )
        userLevels.push(level);
        let max=Math.max(...userLevels)
    h2.innerHTML=`Game Over! <b>Your score was ${level}</b> <br/>Yor highest score was ${max} <br/>Press Any Key to Start`;
        started=false;
        level=0;
        gameSeq=[];
        userSeq=[];
}
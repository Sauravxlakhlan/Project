//method1

// let input1 =document.querySelector("#input1");
// let btn1 = document.querySelector("#btn1");
// let btn2 = document.querySelector("#btn2");
// let btn3 = document.querySelector("#btn3");
// let btn4 = document.querySelector("#btn4");
// let btn5 = document.querySelector("#btn5");
// let btn6 = document.querySelector("#btn6");
// let btn7 = document.querySelector("#btn7");
// let btn8 = document.querySelector("#btn8");
// let btn9 = document.querySelector("#btn9");
// let btn0 = document.querySelector("#btn0");

// btn1.addEventListener("click",function(){
//     input1.value=btn1.innerText;
// })

//method2
// let input1 = document.querySelector("#input1");
// let btn = document.querySelectorAll(".btn");
// console.log(btn);

// btn.forEach(function(item){
//     item.addEventListener("click",inputval);
// });
// function inputval(e){
//     input1.value = input1.value+e.target.innerText;
// }

//method3
let input1 = document.querySelector("#input1");
let div1 = document.querySelector(".div1");
let operand=null;
let operand1=null;
function createButton(){
    for(let i = 0; i<=9; i++){
        const btn = document.createElement("button");
        btn.innerText=i;
        btn.addEventListener("click", buttonHandler);
        div1.appendChild(btn);
    }
}

function createOperation(){
let arr = ["+", "-","*", "/"]
arr.forEach(function(item){
    const btn = document.createElement("button");
    btn.innerText=item;
    btn.addEventListener("click", operationHandler);
    div1.appendChild(btn);
})
}
function buttonHandler(e){
    if(input1.value=="0")
        input1.value="";
input1.value=input1.value + e.target.innerText;
}


const clearBtn=document.createElement("Button");
clearBtn.innerText="C";
clearBtn.addEventListener("click", clearHandler);
div1.appendChild(clearBtn);

const equalBtn = document.createElement("Button");
equalBtn.innerText = "=";
equalBtn.addEventListener("click", equalHandler);
div1.appendChild(equalBtn);

function operationHandler(e){
    operand1 = parseInt(input1.value);
    operator=e.target.innerText;
    input1.value="";

}

function clearHandler() {
    input1.value = "0";
    operand1 = null;
    operator = null;
}
function equalHandler(){
let operand2 = parseFloat(input1.value);
let result = 0;

if(operator=="+"){
    result = operand1 + operand2;
}

else if(operator=="-"){
    result = operand1 - operand2;
}
else if(operator=="*"){
    result = operand1 * operand2;
}
else if(operator=="/"){
    result = operand1 / operand2;
}
input1.value = result;
//operand1 = result;
}




createButton();
createOperation();

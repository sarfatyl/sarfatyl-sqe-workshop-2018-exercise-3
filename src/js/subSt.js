import * as esprima from 'esprima';

import {AnsArray} from './ParserCodes';


export {colorMap,subFuc,linesN,linesO};

let tSizeM=1;
let linesN=[];
let newCounter=1;
let typecolor=new Map();
let HMap=new Map();
let sizeM=0;
let oSizeM=0;
let newargs=new Map();
let op_Map=new Map();
let newMapping=[];
let linesO=[];
let colorMap=new Map();
let OpsMap=new Map();



function f() {
    let index=1;
    for(let i=1;i<AnsArray.length;i++) {
        newMapping[i]=i+index;
        newCounter++;
    }
    newCounter=0;
}


function subFuc(codeToParse,num) {
    let curr;
    start();
    f();
    AsMap();
    inMap();
    openArgs(num);
    curr=codeToParse.replace(new RegExp('}', 'g'),'}\n');
    linesO=curr.split('\n');
    f();
    syb(new Map());
}
function c2() {
    linesN=[];
    linesO=[];
    newMapping=[];
    sizeM=0;
    oSizeM=0;
    newCounter=1;
}
function v() {
    HMap=new Map();
    OpsMap=new Map();
    op_Map=new Map();
    typecolor=new Map();
    colorMap=new Map();
}
function start() {
    newargs=new Map();
    c2();
    tSizeM=1;
    v();
}
function in1() {
    HMap['else']=copyold;
    HMap['return statement']=returnS;
    HMap['assignment expression']=varAssi;
    HMap['while statment']=condition;
    HMap['variable declaration']=declar;
    HMap['ooo']=newCounter;



}
function in2() {
    HMap['if statment']=condition;
    HMap['else if statment']=condition;

    HMap['BinaryExpression']=binaryExType1;
    HMap['LogicalExpression']=binaryExType1;
    HMap['ArrayExpression']=arrEx1;
    OpsMap['+']=AddOp;
    OpsMap['-']=less;

}
function in3() {
    OpsMap['*']=multiEX;
    OpsMap['/']=divideEx;
    HMap['MemberExpression']=memEx;
    HMap['Identifier']=argument1;
    HMap['Literal']=lit1;
    HMap['UnaryExpression']=oneEX1;

}
function inMap() {
    HMap=new Map();
   in1();
   in2();
   in3();
}


function checkArray(arg) {
    if(arg.charAt(arg.length-1)==']' && arg.charAt(0)=='[')
        return true;
    else
        return false;
}

function openArgs(num) {
    let curr=0;
    num=num.replace(/\s/g, '');
    f();
    let vars=num.split(',');
    let j;
    for(j=1;j<AnsArray.length;j++) {
        if(AnsArray[j].line>1) return;
        if(vars[curr].charAt(0)=='[') {//check for array
            checkArray(vars[curr]);
            let newarr = [];
            let counter1 = 0;
            asFind(counter1,newarr,curr,vars,j);
        }
        else{
            newargs.set(AnsArray[j].name, trueV(vars[curr]));
            f();
        }
    }
}

function asFind(counter1,newarr,curr,vars,j) {
    counter1=findAllArr(curr,vars,newarr,counter1);
    f();
    curr+=counter1;
    newCounter++;
    newargs.set(AnsArray[j].name, newarr);
}


function trueV(arg) {
    if(arg=='false' || arg=='true')
        return JSON.parse(arg);
    else if(!strCheck(arg))
        return arg;
    else
        return arg.slice(1,-1);
}
function findAllArr(temp,vars,arr,index){
    if(checkArray(vars[temp]))
        arr[index]=trueV(vars[temp].slice(1,-1));
    else {
        index=holderC(temp,vars,arr,index);
    }
    return index;
}


function strCheck(var1){
    return (var1.charAt(0)=='\'' && var1.charAt(var1.length-1)=='\'') || (var1.charAt(0)=='"' && var1.charAt(var1.length-1)=='"');
}

function holderC(curr, args, arr, index) {
    f();
    while(curr<args.length){
        if((args[curr].charAt(0)=='[')){
            arr[index]=trueV(args[curr].substring(1));
            index++;
            curr++;
        } else if(args[curr].charAt(args[curr].length-1)==']'){
            arr[index]=trueV(args[curr].slice(0,-1));
            curr++;
            newCounter++;
            index++;
            f();
            return index;
        }
        else{
            arr[index]=trueV(args[curr]);
            f();
            curr++;
            index++;
        }
    }
}

function idents(curr,localVars) {
    if(!(curr.length)|| (curr=='{') || (curr=='}')  ){
        copyold(localVars);
        newCounter++;
        oSizeM++;
    }
    else{
        addHan(localVars);
        newCounter++;
    }
}
function sybolB(localVars,end) {
    while(oSizeM<=end) {
        let temp=linesO[oSizeM];
        temp=temp.replace(/\s/g, '');
        idents(temp,localVars);
        f();
        SubTrue(end,localVars);
    }
}

function SubTrue(end,localVars){
    if(oSizeM<=end && linesO[oSizeM].includes('{'))
    {
        syb(localVars);
        newCounter++;}
    else
        return;
}

function syb(localVars) {
    let newMapp;
    let currE;
    newCounter++;
    while(oSizeM<linesO.length){
        newMapp=new Map(localVars);
        currE=findE();
        sybolB(newMapp,currE);
    }
}
function GlobalsUpdates() {
    newMapping=new Map();
}

function findE() {
    let openCount=upCounter(0);
    GlobalsUpdates();
    if(openCount==0)
        return oSizeM;
    for(let i=oSizeM+1;i<linesO.length;i++){
        f();
        openCount=checkSoger(i,openCount);
        if(!(openCount==0))
            openCount=Aspotech(i,openCount);
        else
            return i;
    }
    return linesO.length-1;
}
function addHan(localVars) {
    if(tSizeM==1)
        copyold(localVars);
    else {
        let curr=linesAfter();
        hTable(curr,localVars);

    }
    oSizeM++;
    tSizeM++;
}
function upCounter(openCount){
    if(linesO[oSizeM].includes('}') && (linesO[oSizeM].indexOf('}'))>(linesO[oSizeM].indexOf('{')))
        openCount--;
    newCounter++;

    if(linesO[oSizeM].includes('{'))
        openCount++;

    f();

    return openCount;
}

function Aspotech(i,openCount) {
    if(linesO[i].includes('{'))
        openCount++;
    return openCount;
}
//check if have any open
function checkSoger(i,line1){
    if(linesO[i].includes('}'))
        line1--;
    return line1;
}



function linesCurr(currTableLines, i, localVars) {
    if(currTableLines[i].type=='update expression'){
        currTableLines[i].value=currTableLines[i].value.substring(0,currTableLines[i].value.length-1)+'1';
        return varAssi(currTableLines[i],localVars);
    }else{
        let func = HMap[currTableLines[i].type];
        return func.call(undefined, currTableLines[i],localVars);
    }}

function hTable(currTableLines,localVars) {
    for (let i=0;i<currTableLines.length;i++){
        let curr=linesCurr(currTableLines,i,localVars);
        if(currTableLines[i].type!='variable declaration' && curr!=undefined&& currTableLines[i].type!='assignment expression' ){
            linesN[sizeM]=curr;
            sizeM++;
        }
    }
}

function declar(currItem,localVars) {
    let newl = uplocals(currItem.value,localVars);
    f();
    localVars.set((currItem.name), newl);
}

function exvalue(localVars,Value) {
    let x = esprima.parseScript(Value+'');
    newCounter++;
    let boo = typecolor[(x.body)[0].expression.type];
    let ans= boo.call(undefined,localVars, (x.body)[0].expression);
    return ans;
}

function assig(x,localVars,newVal) {
    let newName=x.object.name;
    newCounter++;
    let boo = typecolor[x.property.type];//what king of expression
    let curr= boo.call(undefined,localVars, x.property);
    assi2(curr,newVal,localVars);
    if(!newargs.has(newName)){
        localVars.get(newName)[curr]= newVal;
    } else {
        newargs.get(newName)[curr]=newVal;
        linesN[sizeM] =  newName+' [ '+curr+' ] ' + '=' + newVal + ';';
        sizeM++;}
}
function assi2(curr,newVal,localVars){
    curr=uplocals(curr, localVars);
    f();
    curr=exvalue(localVars,curr);
    newVal=exvalue(localVars,newVal);
}
function varAssi(currItem,localVars) {
    let curr = uplocals(currItem.value, localVars);
    newCounter++;
    let num=esprima.parseScript(currItem.name+'').body[0].expression;//left
    if(num.type=='MemberExpression'){
        assig(num,localVars,curr);
    }
    else if (!newargs.has(currItem.name)) {
        localVars.set(currItem.name, curr);

    } else {
        newargs.set(currItem.name, exvalue(localVars,curr));
        linesN[sizeM] =  currItem.name + '=' + curr + ';';
        sizeM++;
    }
}

function condition(currItem,localVars) {
    let con = uplocals(currItem.condition,localVars);
    newCounter++;
    let oldLine=linesO[oSizeM];
    let newLine=oldLine.substring(0,oldLine.indexOf('(')+1)+con+oldLine.substring(oldLine.lastIndexOf(')'),oldLine.length);
    if(currItem.type=='else if statment'||currItem.type=='if statment'){
        colorF(localVars,con);
    }
    f();
    return newLine;

}

function returnS(value,localVars)
{
    newCounter++;
    return 'return ' + uplocals(value.value,localVars)+';';
}function divideEx(leftSide,rightSide,left,right) {
    if((left!=null && right!=null)&&!(isNaN(rightSide)&&isNaN(leftSide)))
        return leftSide/rightSide;
    else {
        return null;
        newCounter++;

    }
}

function twoOpd1(left,localVars) {
    let func = HMap[left.type];
    let temp= func.call(undefined,left,localVars);
    if(left.type==('BinaryExpression'))
        left=''+temp;
    else
        left=temp;
    return left;
}


function argument1(curr,localVars)
{
    if(localVars.has(curr.name)){
        f();
        return localVars.get(curr.name);}
    else
        return curr.name;
}


function uplocals(val,localVars) {
    let curr;
    let boo;
    if(val=='null(or nothing)')
        return;
    else {
        curr = esprima.parseScript(val+'');
        f();
        boo = HMap[(curr.body)[0].expression.type];
        return boo.call(undefined, (curr.body)[0].expression,localVars);
    }
}

function binaryExType1(exp1,localVars)
{
    let leftSide=exp1.left;
    let x=0;
    let rightSide=exp1.right;
    newCounter++;
    leftSide=twoOpd1(leftSide,localVars);
    rightSide=twoOpd1(rightSide,localVars);
    x=rightSide;
    let ans=calcEx(leftSide,rightSide,exp1.operator);
    if(ans==null) {
        if (exp1.operator == '*' || exp1.operator == '/')
            return '(' + leftSide + ') ' + exp1.operator + ' ' + rightSide;
        else
            return leftSide + ' ' + exp1.operator + ' ' + rightSide;
    }else
        return ans;
}

function calcEx(left1, right1, operator) {
    let leftSide=Number(left1);
    let y=left1;
    let rightSide=Number(right1);
    let func = OpsMap[operator];
    if (func!=undefined) {
        return func.call(undefined, leftSide, rightSide, left1, right1);
        y=rightSide;
    }
    else {
        return null;
        y=rightSide;
    }

}

function AddOp(leftSide,rightSide,left,right) {
    if(leftSide==0)
        return right;
    else if(rightSide==0)
        return left;
    else if((isNaN(leftSide) || isNaN(rightSide)))
        return null;
    else
        return leftSide+rightSide;
}
function less(leftSide,rightSide,left,right) {
    if(right!=null&&rightSide==0 )
        return left;
    else if(isNaN(rightSide)||(isNaN(leftSide)))
        return null;
    else
        return leftSide-rightSide;
}

function lit1(curr,localVars)
{
    if(localVars==null)
        return curr.raw;
    else
        return curr.raw;
}
function multiEX(leftSide,rightSide,left,right) {
    if(!(isNaN(leftSide)) && !(isNaN(rightSide)) &&(left!=null && right!=null))
        return leftSide*rightSide;
    else
        return null;
}

function oneEX1(curr,localVars)
{
    let func = HMap[curr.argument.type];
    f();
    let temp= func.call(undefined,curr.argument,localVars);
    newCounter++;
    return curr.operator+' '+temp;
}

function memEx(value,localVars)
{
    let func = HMap[value.property.type];
    let indexVal= func.call(undefined,value.property,localVars);
    if(indexVal=='length')
        return value.object.name+'.length';
    else if(newargs.has(indexVal))
        indexVal=newargs.get(indexVal);
    if(localVars.has(value.object.name))
        return localVars.get(value.object.name)[indexVal];
    else
        return value.object.name+' [ '+indexVal+' ] ';
}

function arrEx1(curr,localVars)
{
    let result=[];
    let x=0;
    newCounter++;
    for(let i=0;i<curr.elements.length;i++){
        let b = HMap[curr.elements[i].type];
        x++;
        result[i]= b.call(undefined,curr.elements[i],localVars);
    }
    return result;
}
function lit2(localVars,curr)
{
    return curr.value;
}

function oneEX2(localVars,temp)
{
    let curr = typecolor[temp.argument.type];
    newCounter++;
    f();
    let ne= curr.call(undefined,localVars,temp.argument);
    if(temp.operator=='!')
        return !ne;
    else
        return calcEx('0',ne,temp.operator);
}

function memEx2(localVars,temp)
{
    let curr = typecolor[temp.property.type];
    let coun=temp.property.name;
    if( !coun=='length'||coun==undefined )
        coun= curr.call(undefined,localVars,temp.property);
    if (coun == 'length')
        return (newargs.get(temp.object.name)).length;
    else
        return (newargs.get(temp.object.name))[coun];

}
function copyold(localVars) {
    let temp1=linesO[oSizeM];
    let r=0;
    if( localVars!=null&&!temp1.replace(/\s/g, '').length)
        return;
    else {
        linesN[sizeM]=linesO[oSizeM];
        sizeM++;
    }
r++;
}

function linesAfter() {
    let result=[];
    f();
    let j;
    for(j=0;j<AnsArray.length;j++)
    {
        if(AnsArray[j].line>tSizeM)
            return result;
        else {
            if(AnsArray[j].line==tSizeM)
                result.push(AnsArray[j]);}
    }
    return result;
}

function colorF(localVars,con) {
    let curr = esprima.parseScript(con+'');
    let temp = typecolor[(curr.body)[0].expression.type];
    let exp1=1;
    let res= temp.call(undefined,localVars, (curr.body)[0].expression);
    colorMap.set(sizeM,res);
    exp1=exp1+1;
}
function del() {
    typecolor['BinaryExpression']=binaryExType2;
    typecolor['UnaryExpression']=oneEX2;
    typecolor['MemberExpression']=memEx2;
    typecolor['LogicalExpression']=binaryExType2;
    typecolor['Identifier']=argument2;
    typecolor['Literal']=lit2;

}

function AsMap() {
    typecolor=new Map();
   del();
   f();
   del2();

}

function del2() {
    op_Map['<=']=smallthan2;
    op_Map['>=']=biggthan2;
    op_Map['==']=equalthan;
    op_Map['<']=smallthan1;
    op_Map['>']=biggthan1;
    op_Map['!=']=notEqualthan;
    op_Map['||']=or;
    op_Map['&&']=and;
}
function binaryExType2(localVars,exp)
{
    let num1=exp.left;
    let num2=exp.right;
    newCounter++;
    num1=twoOpd2(localVars,num1);
    num2=twoOpd2(localVars,num2);
    let res=calcEx(num1,num2,exp.operator);
    f();
    let func = op_Map[exp.operator];

    if(res==null && func!=undefined) {
        return func.call(undefined,num1,num2);}
    else
        return res;
}

function smallthan1(a,b) {
    return a<b;
}
function biggthan1(a,b) {
    return a>b;
}
function smallthan2(a,b) {
    return a<=b;
}
function biggthan2(a,b) {
    return a>=b;
}
function equalthan(a,b) {
    return a==b;
}
function notEqualthan(a,b) {
    return a!=b;
}
function or(a,b) {
    return a||b;
}
function and(a,b) {
    return a&&b;
}

function twoOpd2(localVars,b) {
    let curr = typecolor[b.type];
    let tem= curr.call(undefined,localVars,b);
    return tem;
}


function argument2(localVars,curr)
{
    if(localVars.has(curr.name))
        return localVars.get(curr.name);
    else
        return newargs.get(curr.name);
}


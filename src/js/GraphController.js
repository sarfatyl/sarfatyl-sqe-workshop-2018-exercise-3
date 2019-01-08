import * as esgraph from 'esgraph';

export {generateGraph};

import * as esprima from 'esprima';

var typeDictionary=[];
var indexG=1;
var newGraph=[];
var isEnd=false;
var finishN=null;
var newLineC;

function initVar() {
    typeDictionary=[];
    indexG=1;
    newGraph=[];
    newLineC='';
    isEnd=false;
    finishN=null;

}

function generateGraph(codeToParse,parsedCode) {
    initVar();
    initDic();
    let setGraph=esgraph(parsedCode.body[0].body);
    setGraph=esgraph.dot(setGraph,{counter:0,source:codeToParse});
    newGraph=setGraph.split('\n');
    while(!isEnd && indexG<newGraph.length ){
        let typeT=typeLine(newGraph[indexG]);
        let currFunc = typeDictionary[typeT];
        currFunc();
    }
    removeExceAndSE();
    addNum();
    let newfunc1='';
    for(let i=0;i<newGraph.length;i++){
        newfunc1+=newGraph[i]+'\n';
    }
    return newfunc1;
}

function removeExceAndSE() {
    let i=0;
    while(i<newGraph.length){
        let label=getAtr('label',newGraph[i]);
        if(label=='exception') {
            newGraph.splice(i, 1);
        }
        else if(isStart(i))
            newGraph.splice(i, 1);
        else
            i++;
    }


}

function isStart(index) {
    var res=false;
    if(newGraph[index].includes('-> n0') || newGraph[index].includes('-> '+finishN)||newGraph[index].indexOf(finishN)==0||newGraph[index].indexOf('n0 ')==0)
        res=true;
    return res;
}

function addNum() {
    var curr=false;
    var newLabel,newLine;
    for(let i=0;i<!curr&& newGraph.length ;i++){
        if(!newGraph[i].includes(' -> '))
        {
            newLine=newGraph[i];
            var temp=getAtr('label',newGraph[i]);
            newLabel='('+(i+1)+')\n'+temp;
            var indexLe=newLine.indexOf('label=')+7;
            var indexN=newLine.indexOf(',');
            newLine=newLine.substring(0,indexLe)+newLabel+'"'+newLine.substring(indexN);
            newGraph[i]=newLineC;
            newGraph[i]=newLine;
        }
        else {
            curr=true;
        }
    }
}

function initDic() {
    typeDictionary=
        {'regular':regState,
            'AssignmentExpression':regState,
            'While Statement':condState,
            'LogicalExpression':condState,
            'else statement':regState,
            'return':returnLine,
            'if statement':condState,
            'ifelse':condState,
            'var':regState,
            'condition':condState,
            'BinaryExpression':condState,
            'UpdateExpression':regState,
            'finish':exit,
            'variable declaration':regState
        };
}

function exit(){
    if(!isEnd)
        isEnd=true;
    var curr=newGraph[indexG];
    var index=newGraph[indexG].indexOf('[');
    finishN=curr.substring(0,index);
    newGraph.splice(indexG, 1);
    if(!finishN)
        return;
}
function changeShape(val, line) {
    var indexLine=line.substring(0,line.indexOf(']'));
    var newLine=indexLine+', '+'shape'+'="'+val+'"]';
    newGraph[indexG]=newLine;

}

function getAtr(attr, str) {
    let newLine;
    var part1=str.indexOf(attr+'=');
    var attSize=attr.length+2;
    var part2=str.substring(str.indexOf(attr+'=')+attSize).indexOf('"');
    newLine=str.substring(part1+attSize,part1+attSize+ part2);
    return newLine;
}





function typeLine(nextL){
    if(nextL.includes('return ')){
        return 'return';
    }else if(nextL.includes('let ')){
        return 'regular';
    }else if(nextL.includes('if ')){
        return 'regular';
    }else if(getAtr('label', nextL)=='exit')
    {
        return 'finish';
    }
    else{
        var v=getAtr('label', nextL);
        var curr=esprima.parseScript(v);
        return (curr.body)[0].expression.type;
    }

}

function regState() {
    var att=getAtr('label',newGraph[indexG]).substring(0,4);
    if (att == 'let ') {
        var before=getAtr('label',newGraph[indexG]);
        var after=getAtr('label',newGraph[indexG]).substring(4);
        newGraph[indexG] = newGraph[indexG].replace(before, after);
    }
    changeShape('box',newGraph[indexG]);
    indexG++ ;
    if(newGraph.size>0)
        return;

}

function condState() {
    changeShape('diamond',newGraph[indexG]);
    indexG++;
    if(!isEnd)
        return;
}

function returnLine() {
    changeShape('box',newGraph[indexG]);
    indexG++;

}
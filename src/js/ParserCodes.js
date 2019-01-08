let lineInCode;
var AnsArray=[];
var globalsMap=[];
//var globals=[];

export  {parseCodeFromJson,initiateLineInCode,globalsFun,globalsMap,getAnsArray,initiateArray,AnsArray};



// function globalsFun(codeToParse) {
//     let newL=codeToParse.split('\n');
//     globalsMap=[];
//     let coun=0;
//     let index=0;
//     //next();
//     while(coun<newL.length && !newL[coun].includes('(')) {
//         globalsMap[index]=newL[coun];
//         coun++;}
//     index++;
//     let j=newL.length-1;
//     while(j>=0 && !newL[j].includes('}')) {
//         globalsMap[index]=newL[j];
//         j--;}
//     index++;
//     return getFunctionOnly(newL, coun, j);
// }
// function getFunctionOnly(newL, coun, j){
//     let result='';
//     let i;
//     for(i=0;i<newL.length;i++){
//         if(i>=coun&&i<=j)
//             result+=newL[i]+'\n';
//     }
//     i++;
//     return result;
// }

function initiateLineInCode(line)
{
    lineInCode=line;
}
function getAnsArray()
{

    return AnsArray;
}
function initiateArray()
{
    AnsArray=[];
    globalsMap=[];
}
function parseCodeFromJson(parsedJsonCode)
{
    if (parsedJsonCode !=null)
    {
        if (parsedJsonCode.type == 'elseIf')
            return ElseIfParse(parsedJsonCode);
        if (parsedJsonCode.type == 'ForStatement')
            return ForStatementParse(parsedJsonCode);
        return FirstNextTypes(parsedJsonCode);
    }
    return null;
}
function FirstNextTypes(parsedJsonCode)
{
    if (parsedJsonCode.type=='UpdateExpression')
        return UpdateExpressionParse(parsedJsonCode);
    if (parsedJsonCode.type=='ExpressionStatement')
        return ExpressionStatementParse(parsedJsonCode);
    if (parsedJsonCode.type=='BlockStatement')
        return BlockStatementParse(parsedJsonCode);
    if (parsedJsonCode.type=='AssignmentExpression')
        return AssignmentExpressionParse(parsedJsonCode);
    return secondNextTypes(parsedJsonCode);
}
function secondNextTypes(parsedJsonCode)
{
    if (parsedJsonCode.type=='BinaryExpression')
        return parseCodeFromJson(parsedJsonCode.left)+parsedJsonCode.operator+parseCodeFromJson(parsedJsonCode.right);
    if (parsedJsonCode.type=='Identifier')
        return parsedJsonCode.name;
    if (parsedJsonCode.type=='Literal')
        return parsedJsonCode.value;
    if (parsedJsonCode.type=='ReturnStatement')
        return ReturnStatementParse(parsedJsonCode);
    return thirdNextTypes(parsedJsonCode);
}
function thirdNextTypes(parsedJsonCode)
{
    if (parsedJsonCode.type=='UnaryExpression')
        return parsedJsonCode.operator+parseCodeFromJson(parsedJsonCode.argument);
    if (parsedJsonCode.type=='VariableDeclaration')
        return VariableDeclarationParse(parsedJsonCode);
    if (parsedJsonCode.type=='Program')
        return ProgramParse(parsedJsonCode);
    if (parsedJsonCode.type=='IfStatement')
        return IfStatementParse(parsedJsonCode);
    return forthNextTypes(parsedJsonCode);
}
function forthNextTypes(parsedJsonCode)
{
    if (parsedJsonCode.type=='WhileStatement')
        return WhileStatementParse(parsedJsonCode);
    if (parsedJsonCode.type=='FunctionDeclaration')
        return FunctionDeclarationParse(parsedJsonCode);
    return parseCodeFromJson(parsedJsonCode.object) + '[' + parseCodeFromJson(parsedJsonCode.property) + ']';
}

function ProgramParse(parsedJsonCode) {
    let i=0;
    while ( i < parsedJsonCode.body.length) {
        parseCodeFromJson(parsedJsonCode.body[i]);
        i++;
    }
}
function addLine()
{
    lineInCode++;
}
function addValuesToTable(line, type, name, condition, value)
{
    var lineInTable=
        {
            line:line,
            type:type,
            name:name,
            condition:condition,
            value: value
        };
    return lineInTable;
}
function AssignmentExpressionParse(parsedJsonCode) {
    AnsArray[AnsArray.length]= addValuesToTable(lineInCode,'assignment expression',parseCodeFromJson(parsedJsonCode.left),'',parseCodeFromJson(parsedJsonCode.right));
}
function VariableDeclarationParse(parsedJsonCode) {
    let i=0;
    while (i < parsedJsonCode.declarations.length) {
        AnsArray[AnsArray.length]=addValuesToTable(lineInCode,'variable declaration',parseCodeFromJson(parsedJsonCode.declarations[i].id),'',parseCodeFromJson(parsedJsonCode.declarations[i].init));
        i++;
    }
    addLine();
}
function BlockStatementParse(parsedJsonCode) {
    let i=0;
    while (i < parsedJsonCode.body.length) {
        parseCodeFromJson(parsedJsonCode.body[i]);
        i++;
    }
}
function AddToMapFunctionDeclaration(parsedJsonCode) {
    let i=0;
    while (i < parsedJsonCode.params.length) {

        globalsMap[parsedJsonCode.params[i].name]=parsedJsonCode.params[i].name;

        i++;
    }
}

function FunctionDeclarationParse(parsedJsonCode) {
    AddToMapFunctionDeclaration(parsedJsonCode);

    AnsArray[AnsArray.length]= addValuesToTable(lineInCode,'function declaration', parseCodeFromJson(parsedJsonCode.id), '', '');
    let i=0;
    while (i < parsedJsonCode.params.length) {
        AnsArray[AnsArray.length]=addValuesToTable(lineInCode, 'variable declaration', parseCodeFromJson(parsedJsonCode.params[i]), '', '');
        i++;
    }
    addLine();
    parseCodeFromJson(parsedJsonCode.body);
}
function ExpressionStatementParse(parsedJsonCode) {
    parseCodeFromJson(parsedJsonCode.expression);
    addLine();
}

function WhileStatementParse(parsedJsonCode) {
    AnsArray[AnsArray.length]= addValuesToTable(lineInCode, 'while statment', '', parseCodeFromJson(parsedJsonCode.test), '');
    addLine();
    parseCodeFromJson(parsedJsonCode.body);
}
function ElseIfParse(parsedJsonCode) {
    AnsArray[AnsArray.length]=addValuesToTable(lineInCode,'else if statment', '', parseCodeFromJson(parsedJsonCode.test), '');
    addLine();
    parseCodeFromJson(parsedJsonCode.consequent);
    handleAlternate(parsedJsonCode);
}

function IfStatementParse(parsedJsonCode) {
    AnsArray[AnsArray.length]=addValuesToTable(lineInCode,'if statment', '', parseCodeFromJson(parsedJsonCode.test), '');
    addLine();
    parseCodeFromJson(parsedJsonCode.consequent);
    handleAlternate(parsedJsonCode);
}
function handleAlternate(parsedJsonCode)
{
    if (parsedJsonCode.alternate != null) {
        if (parsedJsonCode.alternate.type == 'IfStatement')
            parsedJsonCode.alternate.type = 'elseIf';
        else {
            AnsArray[AnsArray.length]= addValuesToTable(lineInCode, 'else', '', '', '');
            addLine();
        }
        parseCodeFromJson(parsedJsonCode.alternate);
    }
}
function ReturnStatementParse(parsedJsonCode) {
    AnsArray[AnsArray.length]=addValuesToTable(lineInCode, 'return statement', '', '', parseCodeFromJson(parsedJsonCode.argument));
    addLine();
}
function ForStatementParse(parsedJsonCode)
{
    AnsArray[AnsArray.length]=addValuesToTable(lineInCode, 'for statement', '', parseCodeFromJson(parsedJsonCode.test), '');
    parseCodeFromJson(parsedJsonCode.init);
    parseCodeFromJson(parsedJsonCode.update);
    addLine();
    parseCodeFromJson(parsedJsonCode.body);
}
function UpdateExpressionParse(parsedJsonCode)
{
    AnsArray[AnsArray.length]= addValuesToTable(lineInCode,'update expression',parseCodeFromJson(parsedJsonCode.argument),'',parsedJsonCode.operator);
}

import $ from 'jquery';
import {parseCode} from './code-analyzer';
import { initiateLineInCode, initiateArray} from './ParserCodes';
import {generateGraph} from './GraphController';
import * as viz from 'viz.js';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#C').val();
        initiateArray();
        initiateLineInCode(1);
        let parsedCode = parseCode(codeToParse);
        let newObject = generateGraph( codeToParse,parsedCode );
        //let str = createCFG(parsedCode, codeToParse);
        let graphHtml=viz('digraph{'+newObject+'}');
        showGraph(graphHtml);
    });

});

function showGraph(graphHtml)
{
    let htmlObject = document.getElementById('newGraph');
    htmlObject.innerHTML=graphHtml;
}



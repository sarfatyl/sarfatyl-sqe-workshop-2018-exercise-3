import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {parseCodeFromJson,initiateLineInCode,getAnsArray,initiateArray} from '../src/js/ParserCodes';
describe('The javascript parser', () => {
    it('this is parse check for number assigment', () => {
        var inputT='let x=7;';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected={'line':0,'type':'variable declaration','name':'x','condition':'','value':7};
        assert.equal(JSON.stringify(returned[0]),JSON.stringify(expected));
    });

    it('this is parse check for function declaration', () => {
        var inputT='function func( x, y){}';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected=[{'line':0,'type':'function declaration','name':'func','condition':'','value':''},
            {'line':0,'type':'variable declaration','name':'x','condition':'','value':''},
            {'line':0,'type':'variable declaration','name':'y','condition':'','value':''}];

        assert.equal(JSON.stringify(returned),JSON.stringify(expected));
    });
    it('this is parse check for if statement', () => {
        var inputT='if(x>y){}';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected={'line':0,'type':'if statment','name':'','condition':'x>y','value':''};
        assert.equal(JSON.stringify(returned[0]),JSON.stringify(expected));
    });
    it('this is parse check for loop', () => {
        var inputT='for(i=0;i<5;i++){}';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected=[{'line':0,'type':'for statement','name':'','condition':'i<5','value':''},
            {'line':0,'type':'assignment expression','name':'i','condition':'','value':0},
            {'line':0,'type':'update expression','name':'i','condition':'','value':'++'}];
        assert.equal(JSON.stringify(returned),JSON.stringify(expected));
    });
    it('this is parse check while loop', () => {
        var inputT='while(x>7){}';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected={'line':0,'type':'while statment','name':'','condition':'x>7','value':''};
        assert.equal(JSON.stringify(returned[0]),JSON.stringify(expected));
    });
    it('this is parse check while loop', () => {
        var inputT='while(x>=7){}';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected={'line':0,'type':'while statment','name':'','condition':'x>=7','value':''};
        assert.equal(JSON.stringify(returned[0]),JSON.stringify(expected));
    });
    it('this is parse check return number statement', () => {
        var inputT='function binarySearch(){return -1;}';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected=[{'line':0,'type':'function declaration','name':'binarySearch','condition':'','value':''},{'line':1,'type':'return statement','name':'','condition':'','value':'-1'}];
        assert.equal(JSON.stringify(returned),JSON.stringify(expected));
    });
    it('this is parse check return literal statement', () => {
        var inputT='function binarySearch(){return true;}';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected=[{'line':0,'type':'function declaration','name':'binarySearch','condition':'','value':''},{'line':1,'type':'return statement','name':'','condition':'','value':true}];
        assert.equal(JSON.stringify(returned),JSON.stringify(expected));
    });
    it('this is parse check return var statement', () => {
        var inputT='function binarySearch(x){return x;}';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected=[{'line':0,'type':'function declaration','name':'binarySearch','condition':'','value':''},
            {'line':0,'type':'variable declaration','name':'x','condition':'','value':''},
            {'line':1,'type':'return statement','name':'','condition':'','value':'x'}];

        assert.equal(JSON.stringify(returned),JSON.stringify(expected));
    });
    it('this is parse check for if else statement', () => {
        var inputT='  if (x < 7) {x = x- 1;} else {x=x+1;}';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected=[{'line':0,'type':'if statment','name':'','condition':'x<7','value':''},
            {'line':1,'type':'assignment expression','name':'x','condition':'','value':'x-1'},
            {'line':2,'type':'else','name':'','condition':'','value':''},
            {'line':3,'type':'assignment expression','name':'x','condition':'','value':'x+1'}];
        assert.equal(JSON.stringify(returned),JSON.stringify(expected));
    });

    it('this is parse check update statement prefix', () => {
        var inputT='let i=7;++i;';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected=[{'line':0,'type':'variable declaration','name':'i','condition':'','value':7},{'line': 1 , 'type':'update expression', 'name': 'i','condition':'','value': '++'}];
        assert.equal(JSON.stringify(returned),JSON.stringify(expected));
    });
    it('this is parse check ass null', () => {
        var inputT='let x';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected=[{'line':0,'type':'variable declaration','name':'x','condition':'','value':null}];
        assert.equal(JSON.stringify(returned),JSON.stringify(expected));
    });
    it('this is parse check ass null', () => {
        var inputT='let low, high, mid;';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected=[{'line':0,'type':'variable declaration','name':'low','condition':'','value':null},
            {'line':0,'type':'variable declaration','name':'high','condition':'','value':null},
            {'line':0,'type':'variable declaration','name':'mid','condition':'','value':null}];
        assert.equal(JSON.stringify(returned),JSON.stringify(expected));
    });
    it('this is parse check ass 2 vars', () => {
        var inputT='let x=7;let y = x - 1;let z=(x+y)/2;';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected=[{'line':0,'type':'variable declaration','name':'x','condition':'','value':7},
            {'line':1,'type':'variable declaration','name':'y','condition':'','value':'x-1'},
            {'line':2,'type':'variable declaration','name':'z','condition':'','value':'x+y/2'}];
        assert.equal(JSON.stringify(returned),JSON.stringify(expected));
    });
    it('this is parse check for if else-if statement', () => {
        var inputT='if (X < V[mid])high = mid - 1;else if (X > V[mid])low = mid + 1;else mid=1;';
        var json=parseCode(inputT);
        initiateLineInCode(0);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected=[{'line':0,'type':'if statment','name':'','condition':'X<V[mid]','value':''},
            {'line':1,'type':'assignment expression','name':'high','condition':'','value':'mid-1'},
            {'line':2,'type':'else if statment','name':'','condition':'X>V[mid]','value':''},
            {'line':3,'type':'assignment expression','name':'low','condition':'','value':'mid+1'},
            {'line':4,'type':'else','name':'','condition':'','value':''},
            {'line':5,'type':'assignment expression','name':'mid','condition':'','value':1}];
        assert.equal(JSON.stringify(returned),JSON.stringify(expected));
    });
    it('this is parse check for null-return', () => {
        var inputT='function parseCodeFromJson(){if (1>2){if (3<2) {}}return null;}';
        var json=parseCode(inputT);
        initiateLineInCode(1);
        initiateArray();
        parseCodeFromJson(json);
        let returned = getAnsArray();
        var expected=[{'line':1,'type':'function declaration','name':'parseCodeFromJson','condition':'','value':''},
            {'line':2,'type':'if statment','name':'','condition':'1>2','value':''},
            {'line':3,'type':'if statment','name':'','condition':'3<2','value':''},
            {'line':4,'type':'return statement','name':'','condition':'','value':null}];
        assert.equal(JSON.stringify(returned),JSON.stringify(expected));
    });

});
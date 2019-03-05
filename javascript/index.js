$(document).on("click",".int",function(){
    if(!$("#"+this.id).hasClass("Full")){
        var num=getNum();
        num=parseInt(num)
        var matrix=this.id.slice(3)
        matrix=parseInt(matrix)
        var row=Math.floor(matrix/10)
        var line=matrix%10
        if(!checkNum(num,row,line)){
            $("#"+this.id).html(num)
            $("#"+this.id).toggleClass("Full playerNum")
            fullCells++;
            board[row][line]=num;
            removeNumFronBank(num,line,row)
            bank[row][line]=0
        }
        else{
            alert("theres another "+num+" that make it illegal")
        }
    }
})
$("#checkEnd").click(function(){
    if(!checkFullBoard()){
        alert("your board is not full")
        return false;
    }
    if(!checkLineFull()){
        alert("you fill the board incorect")
        return false;
    }
    if(!checkRowFull()){
        alert("you fill the board incorect")
        return false;
    }
    if(checkTableFull()){
        alert("you win")
        return true;
    }
    else{
        alert("you fill the board incorect")
        return false
    }
})
$("#reset").click(function(){
    board=createClearBoard()
    bank=createBank()
    clearHtml()
})
function copyArray(array){
    var ans=[]
    for(var x=0;x<array.length;x++){
        ans[x]=array[x]
    }
    return ans
}
function substractArray(array1,array2){
    var deletedNums=0
    var firstTime=true;
    array1=copyArray(array1)
    for(var x=0;x<(array1.length-deletedNums);x++){
        for(var y=0;y<array2.length;y++){
            if(array1[x]==array2[y]){
                array1.splice(x,1);
                y=0;
                if(firstTime){
                    firstTime=false
                }
                else{
                    deletedNums++
                }
            }
        }
    }
    return array1
}
function solve(){
    var stage2=true
    var stage1=true
    while(stage1||stage2){
        stage2=solveStage2()
        while(stage2){
            stage2=solveStage2()
        }
        stage1=solveStage1()
        while(stage1){
            stage1=solveStage1()
        }
        stage2=solveStage2()
    }
}
//naked singels
function solveStage1(){
    var numOFChanges=0
    for(var x=0;x<9;x++){
        for(var y=0;y<9;y++){
            if(bank[x][y].length===1){
                insertNumFromBank(bank[x][y][0],y,x)
                numOFChanges++
            }
        }
    }
    if(numOFChanges===0){
        return false
    }
    return true;
}
function checkTableForSingleNunber(array,num,table){
    var cnt=0 ,index
    for(var x=0;x<package;x++){
        if(checkArrayFromBank(array,num)){
            cnt++
            index=x
        }
    }
    if(cnt===1){
        insertNumFromBank(num,table[1],table[0])
    }
}
function checkArrayFromBank(array,num){
    for(var x=0;x<9;x++){
        if(array[x]===num){
            return true
        }
    }
    return false;
}
function checkRowBankForSingeleNum(row,num){
    var cnt=0, line=0
    for(var x=0;x<9;x++){
        if(checkArrayFromBank(bank[row][x],num)){
            cnt++
            line=x
        }
    }
    if(cnt===1){
        return line
    }
    return 13
}
function checkLineBankForSingeleNum(line,num){
    var cnt=0,row=0
    for(var x=0;x<9;x++){
        if(checkArrayFromBank(bank[x][line],num)){
            cnt++
            row=x
        }
    }
    if(cnt===1){
        return row
    }
    else{
        return 13
    }
}
function checkHiddenSingaleLine(){
    for(var x=0;x<9;x++){
        for(var y=1;y<10;y++){
            var row=checkLineBankForSingeleNum(x,y)
            if(row!==13){
                insertNumFromBank(y,line,x)
            }
        }
    }
}
function checkHiddenSingaleTable(){
    for(var x=0;x<9;x++){
        switch(x){
            case 0:
                var row=0
                var line=0
                break
            case 1:
                var row=0
                var line=3
                break
            case 2:
                var row=0
                var line=6
                break;
            case 3:
                var row=3
                var line=0
                break;
            case 4:
                var row=3
                var line=3
                break;
            case 5:
                var row=3
                var line=6
            case 6:
                var row=6
                var line=0
                break
            case 7:
                var row=6
                var line=3
                break
            case 8:
                var row=6
                var line=6
        }
        var table=getBankTable(row,line)
        var array
        for(var x=0;x<9;x++){
            array[x]=bank[table[0]][table[1]]
        }
        for(var x=1;x<10;x++){
            checkTableForSingleNunber(array,x)
        }
    }
}
function checkHiddenSingaleRow(){
    for(var x=0;x<9;x++){
        for(var y=1;y<10;y++){
            var line=checkRowBankForSingeleNum(x,y)
            if(line!==13){
                insertNumFromBank(y,x,row)
            }
        }
    }
}
//hidden single
function solveHiddenSingels(){
    checkHiddenSingaleLine()
    checkHiddenSingaleRow()
    checkHiddenSingaleTable()
}
function uniqCell(array,row,line){
    var array1
    var cnt=0
    for(var x=row;x<row+3;x++){
        for(var y=line;y<line+3;y++){
            array1=bank[x][y];
            var a=substractArray(array,array1)
            if(a.length===0){
                cnt++
            }
        }
    }
    if(cnt==0){
        return true
    }
    return false
}
function showTableBank(row,line){
    var l=line
    for(var x=0;x<3;x++){
        for(var y=0;y<3;y++){
            for(var z=0;z<bank[row][line].length;z++){
                console.log("row :"+row+" line "+line+" is:"+bank[row][line][z])
            }
            line++
        }
        line=l
        row++
    }
}
function solveStage2(){
    var array
    var numOFChanges=0
    var a1
    for(var row=0;row<9;row++){
        for(var line=0;line<9;line++){
            array=bank[row][line]
            console.log(array)
            if(array===0){
                continue;
            }
            var placeRow=(Math.floor(row/3))*3
            var placeLine=(Math.floor(line/3))*3
            a1=array
            for(var tableRow=0;tableRow<3;tableRow++){
                for(var tableLine=0;tableLine<3;tableLine++){
                    var x=bank[row][line]
                    console.log(bank[placeRow+tableRow][placeLine+tableLine]+" "+array)
                    if(placeLine+tableLine===line&&placeRow+tableRow===row){
                        continue;
                    }
                    if(bank[placeRow+tableRow][placeLine+tableLine]===0){
                        continue;
                    }
                    a1=substractArray(a1,bank[placeRow+tableRow][placeLine+tableLine])
                    }
                }
                if(a1.length===1){
                    if(!checkLine(line,a1[0])){
                        if(!checkRow(row,a1[0])){
                            insertNumFromBank(a1[0],line,row)
                            numOFChanges++
                        }
                    }
                }
            }

        }
        if(numOFChanges===0){
            return false;
        }
        return true;
    }
function compareToSolution(num,row,line){
    if(num===fullBoard[row][line]){
        return true;
    }
    else{
        return false;
    }
}
function getRow(array,row){
    for(x=0;x<array.length;x++){
        if(array[x]!=0){
            $("#int"+row+""+x).html(array[x])
            $("#int"+row+""+x).toggleClass("Full")
            fullCells++;
            board[row][x]=array[x];
            removeNumFronBank(array[x],x,row)
            bank[row][x]=0
        }
    }
}
function insertNumFromBank(num,line,row){
    board[row][line]=num;
    bank[row][line]=0;
    fullCells++
    intoHtml()
    removeNumFronBank(num,line,row)
}
function fillTestBoardEasy(){
    getRow([0,6,1,0,5,7,9,0,8],0)
    getRow([0,8,3,2,6,9,0,7,5],1)
    getRow([5,0,0,0,0,0,0,0,0],2)
    getRow([0,0,0,8,1,0,3,0,0],3)
    getRow([0,3,0,0,0,0,0,1,0],4)
    getRow([0,0,4,0,9,5,0,0,0],5)
    getRow([0,0,0,0,0,0,0,0,3],6)
    getRow([1,4,0,5,7,3,8,9,0],7)
    getRow([3,0,7,9,8,0,5,6,0],8)
    fullBoard=[
        [2,6,1,4,5,7,9,3,8],
        [4,8,3,2,6,9,1,7,5],
        [5,7,9,1,3,8,4,2,6],
        [7,9,2,8,1,6,3,5,4],
        [8,3,5,7,4,2,6,1,9],
        [6,1,4,3,9,5,2,8,7],
        [9,5,8,6,2,1,7,4,3],
        [1,4,6,5,7,3,8,9,2],
        [3,2,7,9,8,4,5,6,1],

    ]
}
function fillTestBoardMidum(){
    getRow([0,0,5,0,0,6,0,8,0],0)
    getRow([0,0,0,0,0,2,0,9,0],1)
    getRow([0,0,1,5,0,4,0,0,2],2)
    getRow([0,6,2,0,0,1,0,0,4],3)
    getRow([0,0,4,0,0,0,8,0,0],4)
    getRow([7,0,0,4,0,0,2,3,0],5)
    getRow([3,0,0,6,0,9,1,0,0],6)
    getRow([0,5,0,2,0,0,0,0,0],7)
    getRow([0,9,0,7,0,0,3,0,0],8)
}
function checkRowFull(){
    var t=false
    for(var x=1;x<=9;x++){
        for(var y=0;y<9;y++){
            if(checkLine(y,x)){
                t=true
                break
            }
        }
        if(t==false){
            return false
        }
        t=false;
    }
    return true
}
function fillRow(int){
    Row=$(".Row"+int)
    for(var x=0;x<9;x++){
        $("#"+Row[x].id).html(x+1)
    }
}
function checkLineFull(){
    var t=false
    for(var x=1;x<=9;x++){
        for(var y=0;y<9;y++){
            if(checkRow(y,x)){
                t=true
                break
            }
        }
        if(t==false){
            return false
        }
        t=false;
    }
    return true
}
function removeNumFronBank(num,line,row){
    RemoveNumFromBankLine(line,num)
    RemoveNumFromBankRow(row,num)
    var table=getBankTable(row,line)
    RemoveNumFromBankTable(table,num)
    return true;
}
function RemoveNumFromBankLine(line,num){
    var index
    for(var x=0;x<9;x++){
        index=getIndex(num,x,line)
        console.log(bank[x][line]);
        if(bank[x][line][index]===num){
            bank[x][line].splice(index,1);
        }
        console.log(bank[x][line]);
    }

}
function getIndex(num,row,line){
    var array=bank[row][line];
    for(var x=0;x<array.length;x++){
        if(array[x]===num){
            return x;
        }
    }
    return null;
}
function RemoveNumFromBankRow(row,num){
    var index
    for(var x=0;x<9;x++){
        index=getIndex(num,row,x)
        console.log(bank[row][x]);
        if(bank[row][x][index]===num){
            bank[row][x].splice(index,1);
        }
        console.log(bank[row][x]);
    }
}
function RemoveNumFromBankTable(table,num){
    var row
    var line
    var index
    for(z=0;z<9;z++){
        index=getIndex(num,table[z][0],table[z][1])
        row=table[z][0];
        line=table[z][1]
        console.log(bank[row][line]);
        if(bank[row][line][index]===num){
            bank[row][line].splice(index,1);
        }
        console.log(bank[row][line]);
    }
    return true;
}
function getBankTable(row,line){
    var table=[
        [],[],[],
        [],[],[],
        [],[],[]
    ]    
    switch(Math.floor(row/3)){
        case 0:
            row=0;
            break;
        case 1:
            row=3;
            break;
        case 2:
            row=6;
            break;
    }
    switch(Math.floor(line/3)){
        case 0:
            line=0;
            break;
        case 1:
            line=3;
            break;
        case 2:
            line=6;
            break;
    }
    var y=line;
    for(var z=0;z<9;z++){
        if(z%3===0){
            line=y;
        }
        if(z%3===0 && z>1){
            row++
        }
        table[z][0]=row;
        table[z][1]=line;
        line++;
    }
    return table
}
function fillLine(int){
    line=$(".Hight"+int)
    for(var x=0;x<9;x++){
        $("#"+line[x].id).html(x+1)
    }
}
function getNum(){
    var num=prompt("enter number","")
    if(num==null){
        return null;
    }
    else{
        return num;
    }
}
function checkNum(num,row,line){
    var table=getTable(row,line);
    var tof=false;
    tof=tof || checkLine(line,num) || checkRow(row,num) || checkTable(table,num)
    console.log(tof)
    return tof
}
function createBank(){
    var bank=[
        [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
        [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
        [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
        [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
        [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
        [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
        [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
        [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
        [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]]
    ]
    return bank;
}
function createClearBoard(){
    return [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ]
}
function createBoard(){
    board=createClearBoard();
    bank=createBank();
    console.log(board);
    for(var x=0; x<9;x++){
        $("#boardTable").append("<tr id=\"outR"+x+"\" class=\"row\"></tr")
        var miniTableRow=x%3;
        for(y=0;y<9;y++){
            var miniTablehight=y%3;
            switch(Math.floor(x/3)){
                case 0:
                    table=Math.floor(y/3)+1;
                    break;
                case 1:
                    table=Math.floor(y/3)+4;
                    break;
                case 2:
                    table=Math.floor(y/3)+7;
                    break;
            }
            $("#outR"+x).append("<td id=\"int"+x+""+y+"\" class=\"int tableHight"+miniTablehight+" tableRow"+miniTableRow+" Row"+x+" Hight"+y+" table"+table+"\"></tr")
        }
    }
}
function fillBoard(int){
    while(checkFullCells()<int){
        var numRow=Math.floor(Math.random()*9);
        var numLine=Math.floor(Math.random()*9);
        var num=Math.floor(Math.random()*8)+1
        console.log("row "+numRow+" line "+numLine+" num "+num);
        if(insertNum(num,numLine,numRow)){
            fullCells++;
        }
    }
}
function getTable(numRow,numLine){
    var table=[]
    var lines;
    var rows;
    switch(Math.floor(numRow/3)){
        case 0:
            rows=[0,1,2]
            break;
        case 1:
            rows=[3,4,5]
            break;
        case 2:
            rows=[6,7,8];
            break;
    }
    switch(Math.floor(numLine/3)){
        case 0:
            lines=[0,1,2];
            break;
        case 1:
            lines=[3,4,5];
            break;
        case 2:
            lines=[6,7,8];
            break;
    }
    table=findTable(rows,lines)
    return table
}
function findTable(rows,lines){
    var table=[[],[],[]];
    console.log("rows "+rows+" lines "+lines)
    for(var x=0;x<3;x++){
        for(var y=0;y<3;y++){
            console.log("row "+rows[x]+" lines "+lines[y])
            table[x][y]=board[rows[x]][lines[y]];
        }
    }
    return table;
}
function checkFullCells(){
    cnt=0
    for(var x=0;x<9;x++){
        for(var y=0;y<9;y++){
            if(board[x][y]!==0){
                cnt++;
                console.log(board[[x][y]])
            }
        }
    }
    return cnt
}
function checkRow(numRow, int){
    for(var x=0;x<board[numRow].length;x++){
        console.log(board[numRow][x])
        if(board[numRow][x]==int){
            return true
        }
    }
    return false;  
}
function checkLine(numLine,int){
    for(var x=0;x<9;x++){
        console.log(board[x][numLine])
        if(board[x][numLine]==int){
            return true
        }
    }
    return false;  
} 
function checkTable(table,int){
    console.log(table)
    for(var x=0;x<3;x++){
        for(var y=0;y<3;y++){
            if(table[x][y]===int){
                return true;
            }
        }
    }
    return false;
}
function checkFullBoard(){
    if(fullCells===81){
        return true;
    }
    return false;
}
function insertNum(num,line,row){
    var table=getTable(row,line);
    if(checkLine(line,num)||checkRow(row,num)||checkTable(table,num)){
        return false;
    }
    else{
        board[row][line]=num;
        return true;
    }
}
function intoHtml(){
    for(var x=0;x<9;x++){
        for(var y=0;y<9;y++){
            if(board[x][y]!==0){
                $("#int"+x+""+y).html(board[x][y])
            }
        }
    }
}
function clearHtml(){
    for(var x=0;x<9;x++){
        for(var y=0;y<9;y++){
                $("#int"+x+""+y).html("")
        }
    }
}
var ans=[]
function insertFixNumbers(){
    for(var x=0;x<25;x++){
        var t=insertNum(nums[x],array[x][0],array[x][1])
        if(t){
            ans.push(t)
        }
    }
}
var fullBoard
var bank
var board
var fullCells=0;
window.onload=function(){
    createBoard();
     //fillBoard(45);
     //intoHtml();
}
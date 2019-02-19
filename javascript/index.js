$(document).on("click",".int",function(){
    if(!$("#"+this.id).hasClass("Full")){
        var num=getNum();
        $("#"+this.id).html(num)
        $("#"+this.id).toggleClass("Full")
        fullCells++;
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
    for(var x=0;x<3;x++){
        for(var y=0;y<3;y++){
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
    for(var x=0;x<board[numLine].length;x++){
        console.log(board[numLine][x])
        if(board[numLine][x]==int){
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
var ans=[]
var array=[[7,5],[5,3],[4,8],[8,4],[1,6],[3,3],[8,6],[4,7],[2,1],[2,0],[2,5],[0,2],[5,2],[1,4],[7,4],[3,5],[4,2],[0,2],[4,3],[5,1],[2,3],[6,4],[6,3],[1,8],[1,6]]
var nums=[5,3,8,4,5,5,2,4,5,8,5,1,5,7,8,4,5,3,5,4,6,4,3,4,1]
function insertFixNumbers(){
    for(var x=0;x<25;x++){
        var t=insertNum(nums[x],array[x][0],array[x][1])
        if(t){
            ans.push(t)
        }
    }
}
var board
var fullCells=0;
// window.onload=function(){
//     createBoard();
//     fillBoard();
// }
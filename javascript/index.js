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
            $("#"+this.id).toggleClass("Full")
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
function solve(){
    for(var x=0;x<9;x++){
        for(var y=0;y<9;y++){
            if(bank[x][y].length===1){
                insertNumFromBank(bank[x][y][0],y,x)
            }
        }
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
function fillTestBoard(){
    getRow([0,6,1,0,5,7,9,0,8],0)
    getRow([0,8,3,2,6,9,0,7,5],1)
    getRow([5,0,0,0,0,0,0,0,0],2)
    getRow([0,0,0,8,1,0,3,0,0],3)
    getRow([0,3,0,0,0,0,0,1,0],4)
    getRow([0,0,4,0,9,5,0,0,0],5)
    getRow([0,0,0,0,0,0,0,0,3],6)
    getRow([1,4,0,5,7,3,8,9,0],7)
    getRow([3,0,7,9,8,0,5,6,0],8)
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
var ans=[]
function insertFixNumbers(){
    for(var x=0;x<25;x++){
        var t=insertNum(nums[x],array[x][0],array[x][1])
        if(t){
            ans.push(t)
        }
    }
}
var bank
var board
var fullCells=0;
window.onload=function(){
    createBoard();
     //fillBoard(45);
     //intoHtml();
}
$(document).on("click",".int",function(){
    if(!$("#"+this.id).hasClass("Full")){
        var num=getNum();
        $("#"+this.id).html(num)
        $("#"+this.id).toggleClass("Full")
        fullCells++;
    }
})
function getNum(){
    var num=prompt("enter number","")
    if(num==!null){
        return num;
    }
    else{
        return null;
    }
}
function createBoard(){
    var table=1;
    for(var x=0; x<9;x++){
        $("#boardTable").append("<tr id=\"outR"+x+"\" class=\"row\"></tr")
        var miniTableRow=x%3
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
    var cnt=0;
    while(cnt<int){
        var random=Math.floor(Math.random()*88);
        var fill=Math.floor(Math.random()*9)+1;
        console.log('fillBoard cnt, random, fill:',cnt, random, fill);
        var id="int"+random;
        if($("#"+id).hasClass("Full")){
            console.log("#"+id+" hasClass-Full --> continue");
            continue;
        }else{
            var numRow=Math.floor(random/10)
            if(checkRow(numRow,fill)){
                console.log("checkRow numRow="+numRow+",fill --> continue");
                continue;
            }else{
                var numLine=Math.floor(random/10)
                if(checkLine(numLine,fill)){
                    console.log("checkLine numLine="+numLine+",fill --> continue");
                    continue;
                }else{
                    var numTable=0;
                    switch(Math.floor(numRow/3)){
                        case 0:
                            numTable=0;
                            break;
                        case 1:
                            numTable=4;
                            break;
                        case 2:
                            numTable=7;
                            break;
                    }
                    numTable=numTable+numLine
                    if(checkTable(numTable,fill)){
                        console.log("checkTable numTable="+numTable+",fill --> continue");
                        continue;
                    }else{
                        $("#"+id).html(fill)
                        $("#"+id).toggleClass("Full")
                        cnt++;
                        fullCells++;
                    }
                }
            }
        }
    }
}
function checkRow(numRow, int){
    var Row=$(".Row"+numRow)
    for(var x=0;x<Row.length;x++){
        var intText=""+int;
        var text=Row[x].innerHTML;
        if(intText==text){
            return true
        }
    }
    return false
}
function checkLine(numLine,int){
    var Line=$(".Hight"+numLine)
    for(var x=0;x<Line.length;x++){
        var intText=""+int;
        var text=Line[x].innerHTML;
        if(intText==text){
            return true
        }
    }
    return false
}
function checkTable(numTable,int){
    var table=$(".table"+numTable)
    for(var x=0;x<table.length;x++){
        var intText=""+int;
        var text=table[x].innerHTML;
        if(intText==text){
            return true
        }
    }
    return false
}
function checkFullBoard(){
    if(fullCells===81){
        return true;
    }
    return false;
}
function insertNum(num,line,row,table){
    if(checkLine(line,num)||checkRow(row,num)||checkTable(table,num)){
        return false;
    }
    else{
        id="int"+row+""+line;
        $("#"+id).html(num)
    }
}
var fullCells=0;
window.onload=function(){
    createBoard();
    //fillBoard();
}
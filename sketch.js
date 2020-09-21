var hypnoticBall;
var database,position;
function setup(){
    //Store the database optained
    database=firebase.database();
    createCanvas(500,500);
     hypnoticBall= createSprite(250,250,10,10);
     hypnoticBall.shapeColor = "red";
     //REF is used to refer to the location inside the database
     var hypnoticBallPosition=database.ref('ball/position')
     //On create a listener,keeps listening to changes in the value of ball position
     //If there is a change in the value,call read position function,if problem reading call show error
     hypnoticBallPosition.on("value",readPosition,showError)
}

function draw(){
    background("white");
    //Draw the ball only when the ball position is defined
    if(position !== undefined){

    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
}
//Write the position of the ball in the database
function writePosition(x,y){
//set puts a new value at the place referred in the database
   database.ref('ball/position').set({
'x':position.x+x,
'y':position.y+y,
   }) 
}
//Read the position of the ball from the database
function readPosition(data){
//val gets the value of the data
position=data.val()
hypnoticBall.x=position.x
hypnoticBall.y=position.y
}
function showError(){
console.log("error in reading from database")
}
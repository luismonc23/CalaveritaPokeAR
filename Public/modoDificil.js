// -----JS CODE-----
//input Component.Text label
//input Component.AudioComponent audio
//var squares = [[-74,54],[-10,54],[-68,30],[-19,30],[-88,0],[0,0]];

//global.moveTarget(print(11));

script.api.onToggleOn = function(){
    print( "Hard" );
    global.level = 1;
}

script.api.onToggleOff = function(){
    print( "Easy" );
    global.level = 0;
}
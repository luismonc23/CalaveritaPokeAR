// -----JS CODE-----
//@input Component.Text label
//@input Component.Text timer
//@input Component.AudioComponent audio
//@input Component.AudioComponent audioGold
//@input Component.AudioComponent audioEnd

//@input Component.ScriptComponent buttonWidget


var maxTime = 0;
var timerType = 'countdown';
var time = 0;
var minutes = 0;
var seconds = 0;
var minutesTens = 0;
var minutesOnes = 0;
var secondsTens = 0;
var secondsOnes = 0;
var t1 = new Date();
var store = global.persistentStorageSystem.store; 

global.timerSeconds = 0;
global.timerActive = false;
global.targetPos = 5;

global.startTimer = function(seconds, type){
    if(!global.timerActive){
    
    if(type === 'stopwatch' || type === 'countdown'){
	timerType = type;
	print(timerType + ' is starting');
            global.timerActive = true;
	updateTime.reset(0);
} else {
	print('type invalid')
}

if(type === 'countdown'){
time = seconds;
global.timerSeconds = time;
} else {
	maxTime = seconds;
	time = 0;
            global.timerSeconds = 0;
}
    } 
    else {
        print('timer already started')
    }
}


global.stopTimer = function(callback){
    if(global.timerActive){
		global.timerActive = false;
    print(timerType + ' finished');
        if(callback){
            callback(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
    }
    else { 
	print('No stopwatch/coundown initialized');
    }
}

var updateTime = script.createEvent("DelayedCallbackEvent");
updateTime.bind(function(eventData, callback, cb)
{  
    minutes = Math.floor(time / 60)
    seconds = time - (minutes * 60)
    
    if(minutes > 9){
     minutesTens = Number(String(minutes).charAt(0));
     minutesOnes = Number(String(minutes).charAt(1));
    }else {
        minutesTens = 0;
        minutesOnes = Number(String(minutes).charAt(0));
    }
    if(seconds > 9){
            secondsTens = Number(String(seconds).charAt(0));
            secondsOnes = Number(String(seconds).charAt(1));
    } else {
        secondsTens = 0;
        secondsOnes = Number(String(seconds).charAt(0));
    }
    //points = parseInt(script.timer.text);
    //points++;
    if(secondsTens.toString() + secondsOnes.toString() == '00') secondsTens = 6;
    script.timer.text = secondsTens.toString() + secondsOnes.toString();

    //if(secondsTens.toString() + secondsOnes.toString() == '01') //script.audioEnd.play( 1 );

    //print('second tens ' + secondsTens.toString()  + secondsOnes.toString());
    //print('second ones ' + secondsOnes.toString());
    //print('minute tens ' + minutesTens.toString());
   // print('minute ones ' + minutesOnes.toString());
    //updateTimerSprites();
    if(global.level == 0){
        if(!global.targetMoved){ // easy level
            global.moveTarget();
            //global.targetMoved = false;
        } else {
            global.targetMoved = false;
        }
    } else {
        global.moveTarget();
    }
    // start change time
	if(global.timerActive){
	if(timerType === 'countdown'){	
		time--;
            global.timerSeconds--;
		if(time >= 0){
			updateTime.reset(1);
		} else {
            //print('ACABO EL JUEGO');

            //Restart all game after finished
            global.stopTimer();
            global.moveTarget(true);
            restoreGoldSkull();
            global.buttonUI.enabled = true;
            //global.buttonToggle.enabled = true;
            global.goldenskull = false;
            global.plus1.enabled = false;

            var pointsObj = script.label;
            var pointsFinal = script.label.text;
            print('ACABO EL JUEGO '+ pointsFinal + ' s: ' + global.mejorScore);
            //Mejor score
            if(pointsFinal > global.mejorScore){
                global.mejorScore = pointsFinal;
                store.putInt("mejorScore", parseInt(global.mejorScore));
                
                print('Cambio score ' + global.mejorScore);
            }
            mejorScore = store.getInt("mejorScore");
            script.label.text = mejorScore.toString();
            
            script.audioEnd.play( 1 );
            global.endAnimation.enabled = true;
            global.timerText.enabled = false;
            global.timerBg.enabled = false;
            global.puntaje1.enabled = false;
            global.puntaje2.enabled = false;
            global.puntaje3.enabled = false;
            global.mejor1.enabled = true;
            global.mejor2.enabled = true;
            global.mejor3.enabled = true;

            global.finalscore.text = pointsFinal + " puntos";
            
            //Animacion de fin de juego
            var delayedEvent = script.createEvent("DelayedCallbackEvent");
            delayedEvent.bind(function(eventData)
            {
                //print("animdelay is over");
                global.finalscore.text = "";
                global.endAnimation.enabled = false;
            });

            // Start with a 5.4 second delay
            delayedEvent.reset(5.4);
            //print("animdelay has started");
		}
		
    } else {
		time++;
            global.timerSeconds++;
		if(time <= maxTime){
			updateTime.reset(1)
		}else {
			global.stopTimer();
		}
	}
	}
});


function updateTimerSprites(){
    //print(script.timerTextures[secondsOnes]);
    //script.columns[0].mainPass.baseTex = script.timerTextures[secondsOnes];
    //script.columns[1].mainPass.baseTex = script.timerTextures[secondsTens];
    //script.columns[2].mainPass.baseTex = script.timerTextures[minutesOnes];
    //script.columns[3].mainPass.baseTex = script.timerTextures[minutesTens];
}


global.moveTarget = function(location){
    var newSquare = Math.floor(Math.random() * 6);
    //print(newSquare);
    //print(global.targetPos);
    if(newSquare == global.targetPos) { // No sé por qué se repite mucho
        print('repetido');
        newSquare = Math.floor(Math.random() * 6);
        if(newSquare == global.targetPos) {
            print('repetido2');
            newSquare = Math.floor(Math.random() * 6);
            if(newSquare == global.targetPos) {
                print('repetido3');
                newSquare = Math.floor(Math.random() * 6);
            }
        }
    }
    //var currentTarget = squares[global.targetPos];
    var currentTarget = squares[5]; // origen
    var nextTarget = location ? squares[6] : squares[newSquare];

    //print(currentTarget);
    //print(nextTarget);
    posx = currentTarget[0] - nextTarget[0];
    posy = currentTarget[1] + nextTarget[1];

    //print(posx);
    //print(posy);
    global.targetPos = newSquare;
    
    //var sceneObj = script.getSceneObject();
    var sceneObj = global.world.getSceneObject();

    var child = sceneObj.getChild(4).getChild(0).getChild(0).getChild(1).getChild(0).getChild(0).getChild(0);
    //print(child.name);
    var loops = 1;
    var offset = 0.0;
    var plane = child.getComponent('MeshVisual').getMaterial(0).getPass(0).baseTex.control.play(loops, offset);
    //print("MESH MATERIAL" + child.getComponent('MeshVisual').getMaterial(0).getPass(0).name);

    var transform = child.getTransform();
    var pos = transform.getLocalPosition();
    //print('posx' + pos.x);
    //print('posy' + pos.y);
    //print('posz' + pos.z);
    pos.x = nextTarget[0];
    pos.y = nextTarget[1];
    pos.z = nextTarget[2];
    //-115.9457015991211
    //7.5558929443359375
    //-40
    
    //pos.x = -45;
    //pos.y = 23.92;
    transform.setLocalPosition(pos);
    //callback();
}

global.activarGoldenSkull = function(){
    print("calavera de oro");
    script.audioGold.play( 1 );
    global.goldenskull = true;
    var sceneObj = global.world.getSceneObject();
    var currentPos = global.goldensquare[0];

    var child = sceneObj.getChild(4).getChild(0).getChild(0).getChild(2).getChild(0).getChild(0).getChild(0).getChild(0);
    //no goldcalaverita, Mesh1

    var transform = child.getTransform();
    var pos = transform.getLocalPosition();
    //print('posx' + pos.x);
    //print('posy' + pos.y);
    //print('posz' + pos.z);
    pos.x = currentPos[0];
    pos.y = currentPos[1];
    pos.z = currentPos[2];
    transform.setLocalPosition(pos);

    var confetti = sceneObj.getChild(4).getChild(0).getChild(0).getChild(2).getChild(0).getChild(2)//.getChild(0).getChild(0);
    //burstConfetti

    var transform = confetti.getTransform();
    pos = transform.getLocalPosition();
    //print('posx' + pos.x);
    //print('posy' + pos.y);
    //print('posz' + pos.z);
    pos.x = 0.0099;
    pos.y = 0.6269;
    pos.z = -0.4271;
    transform.setLocalPosition(pos);

    //global.tweenManager.startTween( global.goldSkullTween, "box_move" );
    global.tweenManager.startTween(global.goldSkullTween, "calaverita_move", moveComplete);
    function moveComplete() 
    {
        restoreGoldSkull();
    }
}

global.hitTarget = function(isGold){
    var points = 0;

    if(!isGold){
        global.targetMoved = true;

        var t2 = new Date();
        var dif = t2.getTime() - t1.getTime();

        var Seconds_from_T1_to_T2 = dif / 1000;
        var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

        print("Difference: " + Seconds_Between_Dates);

        var difference = 0.7; //Prod 0.7
        if(global.level == 1) difference = 0.6;

        if(Seconds_Between_Dates < difference && !global.goldenskull) //Reacción rápida
            global.activarGoldenSkull();

        t1 = new Date();

        global.plus3.enabled = false;
        global.plus1.enabled = true;
        //var plane = 
        //global.plus1.getMaterial(0).getPass(0).baseTex.control.setOnFinish(function(){ global.plus1.enabled = false; });
        global.plus1.getMaterial(0).getPass(0).baseTex.control.play(1, 0.0);
        //var delayedEvent = script.createEvent("DelayedCallbackEvent");
        //delayedEvent.bind(function(eventData){global.plus1.enabled = false;});
        //delayedEvent.reset(0.7);

        //print("HOLA "+ plane);
        points = parseInt(script.label.text);
        points++;
        script.label.text = points.toString();

        //global.targetPos = newSquare;
        
        //var sceneObj = script.getSceneObject();
        var sceneObj = global.world.getSceneObject();
        var currentPos = global.squares[global.targetPos];

        var child = sceneObj.getChild(4).getChild(0).getChild(0).getChild(1).getChild(0).getChild(0).getChild(1);
        //print("S" + child.name);
        child.enabled = true;

        var loops = 1;
        var offset = 0.0;
        //var plane = child.getComponent('MeshVisual').getMaterial(0).getPass(0).baseTex.control.play(loops, offset);
        //print("SCOOORES" + child.getComponent('MeshVisual').getMaterial(0).getPass(0).name);
        var transform = child.getTransform();
        var pos = transform.getLocalPosition();
        //print('posx' + pos.x);
        //print('posy' + pos.y);
        //print('posz' + pos.z);
        pos.x = currentPos[0];
        pos.y = currentPos[1];
        pos.z = currentPos[2];
        //pos.x = -45;
        //pos.y = 23.92;
        transform.setLocalPosition(pos);
        
        //callback();
        //for(var i=0; i<sceneObj.getChildrenCount(); i++)
        //{
        //var child = sceneObj.getChild(0).getChild(1).getChild(0);
        //var sound = sceneObj.getChild(1);
        //print(sound.name);
        //sound.play(1);
        script.audio.play( 1 );
        //var newName = i + "_" + child.name;
        //child.name = newName;
        //child.enabled = false;
        //print(child.name);
        global.moveTarget();
    } else { //isGold calaverita dorada
        if(global.goldenskull){ //sigue vigente
            
            script.audio.play( 1 );
            global.plus1.enabled = false;
            global.plus3.enabled = true;
            //var plane = 
            global.plus3.getMaterial(0).getPass(0).baseTex.control.setOnFinish(function(){ global.plus3.enabled = false; });
            global.plus3.getMaterial(0).getPass(0).baseTex.control.play(1, 0.0);
            
            //print("HOLA "+ plane);
            points = parseInt(script.label.text);
            points = points + 3;
            print("PUNTOS" + points);
            script.label.text = points.toString();
            restoreGoldSkull();

            var delayedEvent = script.createEvent("DelayedCallbackEvent");
            delayedEvent.bind(function(eventData)
            {
                //print("tipdelay is over");
                //global.hintImage.enabled = false;
                //global.hintTap.enabled = false;
            });

            // Start with a 2 second delay
            delayedEvent.reset(3);
            //print("tipdelay has started");
            //pos.x = -45;
            //pos.y = 23.92;
        }
    }
}

function restoreGoldSkull(){
    var sceneObj = global.world.getSceneObject();
    var currentPos = global.goldensquare[1]; //origen de la skull

    global.tweenManager.stopTween(global.goldSkullTween, "calaverita_move");

    var child = sceneObj.getChild(4).getChild(0).getChild(0).getChild(2).getChild(0).getChild(0).getChild(0).getChild(0);
    print(child.name);//Mesh1
    
    var transform = child.getTransform();
    var pos = transform.getLocalPosition();
    //print('posx' + pos.x);
    //print('posy' + pos.y);
    //print('posz' + pos.z);
    pos.x = currentPos[0];
    pos.y = currentPos[1];
    pos.z = currentPos[2];
    transform.setLocalPosition(pos);

    var confetti = sceneObj.getChild(4).getChild(0).getChild(0).getChild(2).getChild(0).getChild(2)//.getChild(0).getChild(0);
    print(confetti.name);//burstConfetti

    transform = confetti.getTransform();
    pos = transform.getLocalPosition();
    //print('posx' + pos.x);
    //print('posy' + pos.y);
    //print('posz' + pos.z);
    //pos.x = currentPos[0];
    pos.y = 100;
    //pos.z = currentPos[2];
    //transform.setLocalPosition(pos);

    global.goldenskull = false;
}

script.api.onPressUp = function(){
    print( "Button Pressed Up!" );
}
script.api.onPressDown = function(){
    print('INICIO EL JUEGO');

    var store = global.persistentStorageSystem.store;
    store.putInt("shownHint", 1);
    //var shownHint = store.getInt("shownHint") == 0 ? false : true;
    //Start whole game!
    global.gameStarted = true;
    //print( "Button Pressed Up!" );
    //print(global.touchSystem.touchBlocking);
    global.touchSystem.touchBlocking = true;
    global.hintImage.enabled = false;
    global.hintTap.enabled = false;
    global.hintText.enabled = false;
    global.endAnimation.enabled = false;
    global.buttonUI.enabled = false;
    //global.buttonToggle.enabled = false;
    global.timerText.enabled = true;
    global.timerBg.enabled = true;
    global.puntaje1.enabled = true;
    global.puntaje2.enabled = true;
    global.puntaje3.enabled = true;
    global.mejor1.enabled = false;
    global.mejor2.enabled = false;
    global.mejor3.enabled = false;

    points = 0;
    script.label.text = points.toString();

    var delayedEvent = script.createEvent("DelayedCallbackEvent");
    delayedEvent.bind(function(eventData)
    {
        //print("tipdelay is over");
        //global.hintImage.enabled = false;
        //global.hintTap.enabled = false;
    });

    // Start with a 2 second delay
    delayedEvent.reset(3);
    //print("tipdelay has started");

    //El tiempo aca abajo define la duracion del juego en total, en segundos
    global.startTimer(15, 'countdown');
    //points = parseInt(script.label.text);
    //points++;
    //script.label.text = points.toString();
    //var delayedEvent = script.createEvent("DelayedCallbackEvent");
    //delayedEvent.bind(function(eventData)
    //{
    //    print("delay is over");
    //});

    // Start with a 2 second delay
    //delayedEvent.reset(60);
    //print("delay has started");
    
}

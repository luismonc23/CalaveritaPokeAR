// -----JS CODE-----
//@input Component.Image endAnimation
//@input Component.Image hintImage
//@input Component.Text hintText
//@input Component.Image hintTap
//@input Component.Image buttonUI
//input Component.Image buttonToggle
//@input Component.ScreenRegionComponent button
//@input Component.ScriptComponent world
//@input Component.Image timerBg
//@input Component.Text timerText
//@input Component.Text puntaje1
//@input Component.Text puntaje2
//@input Component.Text puntaje3
//@input Component.Text mejor1
//@input Component.Text mejor2
//@input Component.Text mejor3
//@input Component.Image plus1
//@input Component.Image plus3
//@input Component.Text puntos
//@input Component.Text finalscore
//@input SceneObject goldSkullTween
//input Component.RenderMeshVisual skull
// @input SceneObject[] faceContent
// @input SceneObject[] worldContent

var store = global.persistentStorageSystem.store;
var shownHint = store.getInt("shownHint") == 0 ? false : true;
global.shownHint = shownHint;
print(global.shownHint);

function onFrontCamEvent(eventData)
{
    for(var i = 0; i < script.faceContent.length; i++)
    {
        var faceObject = script.faceContent[i];
        if(faceObject)
        {
            faceObject.enabled = true;
        }
    }  
    
    for(var i = 0; i < script.worldContent.length; i++)
    {
        var worldObject = script.worldContent[i];
        if(worldObject)
        {
            worldObject.enabled = false;
        }
    } 
}
var cameraFrontEvent = script.createEvent("CameraFrontEvent");
cameraFrontEvent.bind(onFrontCamEvent);
function onBackCamEvent(eventData)
{
    for(var i = 0; i < script.faceContent.length; i++)
    {
        var faceObject = script.faceContent[i];
        if(faceObject)
        {
            faceObject.enabled = false;
        }
    }  

    if(!global.shownHint){
        script.hintTap.enabled = true;
        script.hintText.enabled = true;
        script.hintImage.enabled = true;
    }

    for(var i = 0; i < script.worldContent.length; i++)
    {
        var worldObject = script.worldContent[i];
        if(worldObject)
        {
            worldObject.enabled = true;
        }
    }  
}
var cameraBackEvent = script.createEvent("CameraBackEvent");
cameraBackEvent.bind(onBackCamEvent);

//INICIALIZA TODO
script.endAnimation.enabled = false;
script.timerText.enabled = false;
script.timerBg.enabled = false;
script.hintTap.enabled = false;
script.hintText.enabled = false;
script.hintImage.enabled = false;
script.puntaje1.enabled = false;
script.puntaje2.enabled = false;
script.puntaje3.enabled = false;
script.mejor1.enabled = true;
script.mejor2.enabled = true;
script.mejor3.enabled = true;
script.plus1.enabled = false;
script.plus3.enabled = false;

var t1 = new Date();
var mejorScore = 0;

var store = global.persistentStorageSystem.store; 
mejorScore = store.getInt("mejorScore");
script.puntos.text = mejorScore.toString();

var shownHint = store.getInt("shownHint") == 0 ? false : true;
print("HI: " + shownHint)


var delayedEvent = script.createEvent("DelayedCallbackEvent");
delayedEvent.bind(function(eventData)
{
    //print("game tip delay is over");
    if(!global.gameStarted){
        if(!global.shownHint){
            script.hintImage.enabled = true;
            script.hintText.enabled = true;
            script.hintTap.enabled = true;
        }
    }
    //global.hintImage.enabled = false;
    //global.hintTap.enabled = false;
});

// Start with a 2 second delay
delayedEvent.reset(1.7);
//print("game tip has started");

var delayedEvent2 = script.createEvent("DelayedCallbackEvent");
delayedEvent2.bind(function(eventData)
{
    //print("game tip delay is over2");
    script.hintImage.enabled = false;
    script.hintText.enabled = false;
    script.hintTap.enabled = false;
    //global.hintImage.enabled = false;
    //global.hintTap.enabled = false;

});

// Start with a 2 second delay
delayedEvent2.reset(4.3);
//print("game tip has started2");


//GLOBALES
global.mejorScore = mejorScore;
global.endAnimation = script.endAnimation;
global.hintImage = script.hintImage;
global.hintText = script.hintText;
global.hintTap = script.hintTap;
global.buttonUI = script.buttonUI;
//global.buttonToggle = script.buttonToggle;
global.world = script.world;
global.timerBg = script.timerBg;
global.timerText = script.timerText;
global.puntaje1 = script.puntaje1;
global.puntaje2 = script.puntaje2;
global.puntaje3 = script.puntaje3;
global.mejor1 = script.mejor1;
global.mejor2 = script.mejor2;
global.mejor3 = script.mejor3;
global.plus1 = script.plus1;
global.plus3 = script.plus3;
global.finalscore = script.finalscore;
global.goldSkullTween = script.goldSkullTween;

//variables del juego
global.gameStarted = false;
global.targetMoved = false;
global.goldenskull = false;
global.level = 0; //0 easy, 1 hard
global.squares = [[5.53,  -3.25, 4.79],[-5.39, -3.25, 4.79],[-3.34,-0.81,10.46],[3.75,-0.81,10.46],[5.82,1.94,14.89],[-5.38,1.94,14.89], [400,400,400]];
global.goldensquare = [[-0.0892,  0.4938, -0.3889],[400,400,400]];
//global.skull = script.skull;
// -----JS CODE-----
//var squares = [[-74,54],[-10,54],[-68,30],[-19,30],[-88,0],[0,0]];

//global.moveTarget(print(11));
var sceneObj = script.getSceneObject();

//print("HIT" + sceneObj.name);

if(sceneObj.name == "goldSkull")
    global.hitTarget(true);
else
    global.hitTarget(false);

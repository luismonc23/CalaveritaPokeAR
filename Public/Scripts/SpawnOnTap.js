// SpawnOnTap.js
// Version: 0.0.1
// Event: Select on the script
// Description: Custom made script to send the duration time for burst spawning

//@ui {"widget":"label", "label":""}
//@ui {"widget":"label", "label":"Use the scripts event to select the trigger type"}
//@ui {"widget":"label", "label":""}
// @ui {"widget":"separator"}
// @input Component.VFXComponent vfx
// @input float duration {"label": "Burst Duration"}

if (!script.vfx) {
    print("ERROR: Please set the VFX component to the script.");
    return;
}
if (!script.vfx.asset) {
    print("ERROR: Please make sure VFX component contains VFX asset.");
    return;
}

var burstDur = script.duration + getTime();
script.vfx.asset.properties["burstDuration"] = burstDur;
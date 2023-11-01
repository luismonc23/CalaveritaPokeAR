// ObjectSpawnerExample.js
// Version: 0.0.1
// Event: Initialized
// Description: This script is an example on how to use instanced controller to instantiate objects.
// Pack: Refinement Pack

// @input SceneObject objectToInstance
//@ui {"widget":"label"}
//@ui {"widget":"label", "label":"Please duplicate the material below and -"}
//@ui {"widget":"label", "label":"apply this to your Render Mesh Visual component -"}
//@ui {"widget":"group_start", "label":"or use Auto Apply to assign the material to Mesh Visual."}
// @input Asset.Material material
// @input bool autoApply
//@ui {"widget":"group_end"}
//@ui {"widget":"label"}
//@ui {"widget":"group_start", "label":"Grid Attributes"}
// @input int gridSize = 5
// @input int gridSpace = 10
//@ui {"widget":"group_end"}
//@ui {"widget":"label"}
//@ui {"widget":"group_start", "label":"Instantiated Objects Attributes"}
// @input float objectScale = 1
// @input bool resetPosition = false
//@ui {"widget":"group_end"}


if (script.autoApply && script.material) {
    var meshViz = script.objectToInstance.getComponent("Component.MaterialMeshVisual");
    if (!meshViz) {
        return;
    }
    var materialClone = script.material.clone();
    meshViz.mainMaterial = materialClone;
}

// Set up the controller for the material instanced object
var instancedObjectController = new global.InstancedObjectController(
    script.objectToInstance, // The object to instance
    script.gridSize * script.gridSize + 1, // The maximum number of instances
    script.resetPosition // Whether to reset the default object to 0,0,0
); 

// Example instantiation in a grid
for (var i = 0; i < script.gridSize; i++) {
    for (var j = 0; j < script.gridSize; j++) {
        
        // If instantiated to limit described in controller, we shouldn't instance anymore
        if (instancedObjectController.maxInstanceCountReached()) {
            return;
        }
        
        // Generate the transform of the new instance
        var position = new vec3(
            i * script.gridSpace, 
            0, 
            j * script.gridSpace
        );
        var rotation = quat.quatIdentity();
        var scale = script.objectScale;
        
        // Request to spawn an instance at the transform we generated 
        instancedObjectController.spawnObject(position, rotation, scale);
    }
}

// Once you've finished adding the instances you want, 
// update the material so the result will be shown
instancedObjectController.updateShader();

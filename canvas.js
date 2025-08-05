const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
const createScene = function () {
	// Creates a basic Babylon Scene object
	const scene = new BABYLON.Scene(engine);
	// Creates and positions a free camera
	const camera = new BABYLON.ArcRotateCamera("camera",-Math.PI / 2,
	Math.PI / 2.5, 3, new BABYLON.Vector3(0,0,0), scene);
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.7;

    //Importing models instead search for the specfic meshes in the .glb file then edit code for what is on the console
	
    // Import building 
    BABYLON.SceneLoader.ImportMeshAsync("", "./", "building1.glb", scene)
  .then(result => {
    console.log("Loaded building meshes:");
    result.meshes.forEach(mesh => console.log(mesh.name));
  });
  //Import Lanscapes
    BABYLON.SceneLoader.ImportMeshAsync("", "./", "landscape.glb", scene)
  .then(result => {
    console.log("Loaded landscape meshes:");
    result.meshes.forEach(mesh => console.log(mesh.name));
  });
    return scene;
};
const scene = createScene(); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
	scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
	engine.resize();
});



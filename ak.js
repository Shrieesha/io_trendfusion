// Image Uploader and Preview
const imageUploader = document.getElementById('imageUploader');
const uploadedImage = document.getElementById('uploadedImage');
const scannerLine = document.getElementById('scanner-line');
let uploadedTexture;

imageUploader.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    uploadedImage.src = e.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

// Scan Effect Simulation
function startScan() {
  if (!uploadedImage.src) {
    alert('Please upload an image first.');
    return;
  }

  scannerLine.style.display = 'block';
  scannerLine.style.top = '0';
  
  let scanPosition = 0;
  const scanInterval = setInterval(function() {
    scanPosition += 4;
    scannerLine.style.top = scanPosition + 'px';
    
    if (scanPosition >= 400) {  // Assuming the height of the image area is 400px
      clearInterval(scanInterval);
      scannerLine.style.display = 'none';
      
      // Once scan is complete, create 3D model
      create3DModel();
    }
  }, 50);  // Speed of the scanning effect
}

// Three.js 3D model creation
function create3DModel() {
  const modelContainer = document.getElementById('modelContainer');
  modelContainer.innerHTML = ''; // Clear any previous 3D models

  // Create a new Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(500, 500);
  modelContainer.appendChild(renderer.domElement);

  // Create a plane geometry to simulate the 3D model surface
  const geometry = new THREE.PlaneGeometry(3, 5);

  // Load the image as texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(uploadedImage.src);

  // Create a material with the uploaded image texture
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  // Position the camera
  camera.position.z = 5;

  // Render the scene
  function animate() {
    requestAnimationFrame(animate);
    plane.rotation.y += 0.01; // Rotate the model for a 3D effect
    renderer.render(scene, camera);
  }
  animate();
}

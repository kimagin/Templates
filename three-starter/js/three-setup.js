// Three related imports
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  ShaderMaterial,
  Vector4,
  PlaneGeometry,
  Mesh,
  AmbientLight,
  DirectionalLight,
  SRGBColorSpace,
  DoubleSide,
  LoadingManager,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GUI } from 'dat.gui'

// Importing shaders
import fragment from './shader/fragment.glsl'
import vertex from './shader/vertex.glsl'

export default class Sketch {
  constructor(options) {
    // 🚩 Setup
    this.scene = new Scene()
    this.container = options.dom
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer = new WebGLRenderer()
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //Prevent Aliasing
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0xeeeeee, 1) // Background color
    this.physicallyCorrectLights = true
    this.renderer.outputColorSpace = SRGBColorSpace
    this.time = 0

    // Adding renderer to the DOM
    this.container.appendChild(this.renderer.domElement)

    // 🚩 Camera Properies
    this.FOV = 70
    this.cameraPosition = { x: 0, y: 0, z: 2 }

    this.camera = new PerspectiveCamera(
      this.FOV,
      this.width / this.height,
      0.1,
      100
    )

    // 🚩 Camera Position
    this.camera.position.set(
      this.cameraPosition.x,
      this.cameraPosition.y,
      this.cameraPosition.z
    )

    // 🚩 Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // 🚩 DRACO Loader
    // this.dracoLoader = new DRACOLoader(
    // new LoadingManager()
    // ).setDecoderPath()

    // 🚩 GLTF Loader
    // this.gltf = new GLTFLoader()
    // this.gltf.setDRACOLoader(this.dracoLoader)

    // 🚩 Modules
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.isPlaying = true
    this.settings()
    this.addObjects()
    // this.addLights()
    this.resize()
    this.render()
    this.setupResize()
  }

  // 🚩 Settings for GUI controls
  settings() {
    this.gui = new GUI()
    this.gui.add(this.camera.position, 'x').min(-1).max(1)
    this.gui.add(this.camera.position, 'y').min(-1).max(1)
  }

  // 🚩 Resizing
  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height

    this.camera.updateProjectionMatrix()
  }

  // 🚩 Adding Objects
  addObjects() {
    this.material = new ShaderMaterial({
      extensions: {
        // derivatives: '#extension GL_OES_standard_derivatives:enable',
      },
      side: DoubleSide,

      // Shader uniforms
      uniforms: {
        time: { value: 0 },
        resolution: { value: new Vector4() },
      },
      // wireframe: true,
      // transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    // Adding Geometry
    this.geometry = new PlaneGeometry(1, 1, 1, 1)

    // Creating Mesh from Geometry and Material
    this.plane = new Mesh(this.geometry, this.material)
    this.scene.add(this.plane)
  }

  // 🚩 Adding Lights
  addLights() {
    // Ambient Light
    const light1 = new AmbientLight(0xffffff, 0.5)
    this.scene.add(light1)

    // Directional Light
    const light2 = new DirectionalLight(0xffffff, 0.5)
    light2.position.set(0.5, 0, 0.866)
    this.scene.add(light2)
  }

  // Stop renndering
  stop() {
    this.isPlaying = false
  }

  // Start rendering
  play() {
    if (!this.isPlaying) {
      this.isPlaying = true
      this.render()
    }
  }

  // 🚩 Rendering
  render() {
    if (!this.isPlaying) return
    this.time += 0.05
    this.material.uniforms.time.value = this.time
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

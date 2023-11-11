'use strict'
//ToolBox
import {
  delay, // Asynchronus delay function : delay(time)
  log, // shorthand console.log : log()
  select, //Custom querrySelector : select(element, ?all[true:false])
  event, // Custom event listener : event(element,event,callback)
  classlist, // Class manipulator : classlist(element,action["+"(add),"-"(remove),"x"(toggle)],class(string or [])),
  debounce, // Debounce ( runs the function only after the specified delay ) : debounce(function,delay)
  throttle, // Throttle ( runs the function n times per specified amount time ) : throttle(function,interval)
  random, // Random number generator : random(min,max)
} from './utils'

import * as THREE from 'three'
// import { REVISION } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import fragment from './shader/fragment.glsl'
import vertex from './shader/vertex.glsl'

import GUI from 'lil-gui'
import gsap from 'gsap'

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene()

    this.container = options.dom
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0xeeeeee, 1)
    this.physicallyCorrectLights = true
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.1,
      100
    )

    this.camera.position.set(0, 0, 2)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.time = 0

    // const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`
    this.dracoLoader = new DRACOLoader(
      new THREE.LoadingManager()
    ).setDecoderPath()

    this.gltf = new GLTFLoader()
    this.gltf.setDRACOLoader(this.dracoLoader)

    this.isPlaying = true
    // this.settings()
    // this.setupFBO()
    this.addObjects()
    // this.addLights()
    this.resize()
    this.render()
    this.setupResize()
  }

  settings() {
    let that = this
    this.settings = {
      progress: 0,
    }
    this.gui = new GUI()
    this.gui.add(this.settings, 'progress', 0, 1, 0.01).onChange((val) => {})
  }
  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  // getRenderTarget() {
  //   const renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
  //     minFilter: THREE.NearestFilter,
  //     magFilter: THREE.NearestFilter,
  //     format: THREE.RGBAFormat,
  //     type: THREE.FloatType,
  //     stencilBuffer: false,
  //   })
  //   return renderTarget
  // }

  // setupFBO() {
  //   this.size = 128
  //   this.fbo = this.getRenderTarget()
  //   this.fbo1 = this.getRenderTarget()
  //
  //   this.fboScene = new THREE.Scene()
  //   this.fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)
  //   this.fboCamera.position.set(0, 0, 0.5)
  //   this.fboCamera.lookAt(0, 0, 0)
  //   let geometry = new THREE.PlaneGeometry(2, 2)
  // }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height

    this.imageAspect = 853 / 1280
    let a1
    let a2
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect
      a2 = 1
    } else {
      a1 = 1
      a2 = this.height / this.width / this.imageAspect
    }

    this.material.uniforms.resolution.value.x = this.width
    this.material.uniforms.resolution.value.y = this.height
    this.material.uniforms.resolution.value.z = a1
    this.material.uniforms.resolution.value.w = a2

    this.camera.updateProjectionMatrix()
  }

  addObjects() {
    this.material = new THREE.ShaderMaterial({
      extensions: {
        // derivatives: '#extension GL_OES_standard_derivatives:enable',
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
      },
      // wireframe: true,
      // transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)

    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.plane)
  }

  addLights() {
    const light1 = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(light1)

    const light2 = new THREE.DirectionalLight(0xffffff, 0.5)
    light2.position.set(0.5, 0, 0.866)
    this.scene.add(light2)
  }

  stop() {
    this.isPlaying = false
  }
  play() {
    if (!this.isPlaying) {
      this.isPlaying = true
      this.render()
    }
  }
  render() {
    if (!this.isPlaying) return
    this.time += 0.05
    this.material.uniforms.time.value = this.time
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

// Setup before DOM loads
const initApp = async () => {
  new Sketch({
    dom: document.getElementById('container'),
  })
}
document.addEventListener('DOMContentLoaded', initApp)

// 🚩 Client-side JS Code comes here

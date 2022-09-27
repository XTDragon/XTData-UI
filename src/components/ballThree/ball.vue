<template>

</template>

<script>
import * as THREE from "three/src/Three.js"

export default {
  name: "ball",
  setup() {
    //创建场景
    const scene = new THREE.Scene();
    //创建透视投影相机，视角45度，画幅比例 宽比高，近平面距离0.1，远平面1000
    const  camera = new THREE.OrthographicCamera(-10, 10, 5, -5, 0.1, 1000);
    //定义camera的位置
    camera.position.set(0, 0, 0);
    //创建渲染器
    const renderer = new THREE.WebGLRenderer();
    //渲染器canvas宽高设为与窗口一致
    renderer.setSize(window.innerWidth, window.innerHeight);
    //将渲染器对应的dom元素添加到body中
    document.body.appendChild(renderer.domElement);
    //定义一个几何体
    const geometry = new THREE.SphereGeometry(1, 36,3);
    //定义一种材质，显示为线框
    const material = new THREE.MeshBasicMaterial({color: 0xB3DD, wireframe: true});
    //网孔(Mesh)是用来承载几何模型的一个对象，可以把材料应用到它上面
    const ball = new THREE.Mesh(geometry, material);
    //把几何模型添加到场景中，对象被添加到原点(0,0,0)坐标。
    scene.add(ball);
    //移动相机位置
    camera.position.z = 1;
    function render() {
      //渲染循环，以每秒60次的频率来绘制场景
      requestAnimationFrame(render);
      //设置球体绕y轴旋转
      ball.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    render();

  }
}
</script>

<style scoped>

</style>
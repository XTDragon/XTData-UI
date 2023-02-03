<template>
  <div style="width: 100%;height:  631px; text-align: center;">
    <canvas ref="nes-canvas" id="nes-canvas" width="256" height="240" class="canvas"
            @mousedown="nes_mousedown($event)"
            @mouseup="nes_mouseup()"></canvas>
    <!--    <button onclick="window.location.reload()" style="width: 210px;background: #747bff">-->
    <!--      window.location.reload()-->
    <!--    </button>-->
  </div>
</template>

<script>
import jsnes from "jsnes";

import axios from "axios";

let nes;

export default {
  name: "fc",
  setup() {
    console.log("setup")

    return {
      nes_mousedown(event) {
        console.log(event.clientY, event.clientX)
        nes.zapperMove(event.clientX, event.clientY)
        nes.zapperFireDown()
      },
      nes_mouseup() {
        nes.zapperFireUp()
      }
    }
  },

  mounted() {
    console.log("mounted")
    const SCREEN_WIDTH = 256;
    const SCREEN_HEIGHT = 240;
    const FRAMEBUFFER_SIZE = SCREEN_WIDTH * SCREEN_HEIGHT;

    var canvas_ctx, image;
    var framebuffer_u8, framebuffer_u32;

    var AUDIO_BUFFERING = 1024;
    var SAMPLE_COUNT = 4 * 1024;
    var SAMPLE_MASK = SAMPLE_COUNT - 1;
    var audio_samples_L = new Float32Array(SAMPLE_COUNT);
    var audio_samples_R = new Float32Array(SAMPLE_COUNT);
    var audio_write_cursor = 0, audio_read_cursor = 0;
    const interval = 1e3 / 55.098;
    let lastFrameTime;
    nes = null;
    nes = new jsnes.NES({
      onFrame: function (framebuffer_24) {
        for (var i = 0; i < FRAMEBUFFER_SIZE; i++) {
          framebuffer_u32[i] = 0xff000000 | framebuffer_24[i];
        }
      },
      onAudioSample: function (l, r) {
        audio_samples_L[audio_write_cursor] = l;
        audio_samples_R[audio_write_cursor] = r;
        audio_write_cursor = (audio_write_cursor + 1) & SAMPLE_MASK;
      },
      onStatusUpdate: console.log,
      sampleRate: getSampleRate()
    });

    // function onAnimationFrame() {
    //   image.data.set(framebuffer_u8);
    //   canvas_ctx.putImageData(image, 0, 0);
    //   window.requestAnimationFrame(onAnimationFrame);
    // };
    function fps60() {
      window.requestAnimationFrame(fps60)
      let time = new Date().getTime();
      let excess = time % interval;

      // newFrameTime is the current time aligned to 60fps intervals.
      // i.e. 16.6, 33.3, etc ...
      let newFrameTime = time - excess;

      // first frame, do nothing
      if (!lastFrameTime) {
        lastFrameTime = newFrameTime;
        console.log(lastFrameTime)
        return;
      }

      let numFrames = Math.round(
          (newFrameTime - lastFrameTime) / interval
      );

      // This can happen a lot on a 144Hz display
      if (numFrames === 0) {
        //console.log("WOAH, no frames");
        return;
      }

      nes.frame();
      // update display on first frame only
      image.data.set(framebuffer_u8);
      canvas_ctx.putImageData(image, 0, 0);


      // we generate additional frames evenly before the next
      // onAnimationFrame call.
      // additional frames are generated but not displayed
      // until next frame draw
      let timeToNextFrame = interval - excess;
      for (let i = 1; i < numFrames; i++) {
        setTimeout(() => {
          lastFrameTime += interval;
        }, (i * timeToNextFrame) / numFrames);
      }
      if (numFrames > 1) ;
    };

    function getSampleRate() {
      if (!window.AudioContext) {
        return 44100;
      }
      let myCtx = new window.AudioContext();
      let sampleRate = myCtx.sampleRate;
      myCtx.close();
      return sampleRate;
    }

    function audio_callback(event) {
      var dst = event.outputBuffer;
      var len = dst.length;

      // Attempt to avoid buffer underruns.
      if (audio_remain() < AUDIO_BUFFERING) nes.frame();

      var dst_l = dst.getChannelData(0);
      var dst_r = dst.getChannelData(1);
      for (var i = 0; i < len; i++) {
        var src_idx = (audio_read_cursor + i) & SAMPLE_MASK;
        dst_l[i] = audio_samples_L[src_idx];
        dst_r[i] = audio_samples_R[src_idx];
      }

      audio_read_cursor = (audio_read_cursor + len) & SAMPLE_MASK;
    }

    function audio_remain() {
      return (audio_write_cursor - audio_read_cursor) & SAMPLE_MASK;
    }

    function nes_init(canvas) {
      canvas_ctx = canvas.getContext("2d");
      image = canvas_ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      canvas_ctx.fillStyle = "black";
      canvas_ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

      let parent = canvas.parentNode;
      // @ts-ignore
      let parentWidth = parent.clientWidth;
      // @ts-ignore
      let parentHeight = parent.clientHeight;
      let parentRatio = parentWidth / parentHeight;
      let desiredRatio = SCREEN_WIDTH / SCREEN_HEIGHT;
      if (desiredRatio < parentRatio) {
        canvas.style.width = `${Math.round(parentHeight * desiredRatio)}px`;
        canvas.style.height = `${parentHeight}px`;
      } else {
        canvas.style.width = `${parentWidth}px`;
        canvas.style.height = `${Math.round(parentWidth / desiredRatio)}px`;
      }

      const buffer = new ArrayBuffer(image.data.length);
      framebuffer_u8 = new Uint8ClampedArray(buffer);
      framebuffer_u32 = new Uint32Array(buffer);

      // Setup audio.
      var audio_ctx = new window.AudioContext();
      var script_processor = audio_ctx.createScriptProcessor(AUDIO_BUFFERING, 0, 2);
      script_processor.onaudioprocess = audio_callback;
      script_processor.connect(audio_ctx.destination);
    }

    function nes_boot(rom_data) {
      nes.loadROM(rom_data);
      console.log("nes_boot")
      window.requestAnimationFrame(fps60);
    }

    function nes_load_data(canvas_id, rom_data) {
      nes_init(canvas_id);
      nes_boot(rom_data);
    }

    document.addEventListener('keydown', (event) => {
      keyboard(nes.buttonDown, event)
    });
    document.addEventListener('keyup', (event) => {
      keyboard(nes.buttonUp, event)
    });

    function keyboard(callback, event) {
      var player = 1;
      switch (event.keyCode) {
        case 87: // UP
          callback(player, jsnes.Controller.BUTTON_UP);
          break;
        case 83: // Down
          callback(player, jsnes.Controller.BUTTON_DOWN);
          break;
        case 65: // Left
          callback(player, jsnes.Controller.BUTTON_LEFT);
          break;
        case 68: // Right
          callback(player, jsnes.Controller.BUTTON_RIGHT);
          break;
        case 74: // 'a' - qwerty, dvorak
        case 81: // 'q' - azerty
          callback(player, jsnes.Controller.BUTTON_A);
          break;
        case 75: // 's' - qwerty, azerty
        case 79: // 'o' - dvorak
          callback(player, jsnes.Controller.BUTTON_B);
          break;
        case 9: // Tab
          callback(player, jsnes.Controller.BUTTON_SELECT);
          break;
        case 13: // Return
          callback(player, jsnes.Controller.BUTTON_START);
          break;
        default:
          break;
      }
    }

    function nes_load_url(canvas_id, path) {
      nes_init(canvas_id);
      console.log("nes_load_url")
      axios.get("/api/downloadFile/Double Dragon1.nes",{
        responseType : "blob"
      }).then(response =>{
        // console.log('axios')
        const reader = new FileReader();
        reader.readAsBinaryString(response.data)
        reader.onloadend=function (e) {
          nes_boot(reader.result)
        }
      })
      // var req = new XMLHttpRequest();
      // req.open("GET", "/api/downloadFile/Double Dragon1.nes");
      // req.overrideMimeType("text/plain; charset=x-user-defined");
      // req.onerror = () => console.log(`Error loading ${path}: ${req.statusText}`);
      // req.onload = function () {
      //   if (this.status === 200) {
      //     // nes_boot(req.responseText);
      //   } else if (this.status === 0) {
      //     console.log("sta")
      //     // Aborted, so ignore error
      //   } else {
      //     req.onerror();
      //   }
      // };
      // req.send();
    }

    const canvas = this.$refs["nes-canvas"]
    window.onresize = () => {
      window.screenWidth = document.body.clientWidth;
      let parent = canvas.parentNode;
      // @ts-ignore
      let parentWidth = parent.clientWidth;
      // @ts-ignore
      let parentHeight = parent.clientHeight;
      let parentRatio = parentWidth / parentHeight;
      let desiredRatio = SCREEN_WIDTH / SCREEN_HEIGHT;
      if (desiredRatio < parentRatio) {
        canvas.style.width = `${Math.round(parentHeight * desiredRatio)}px`;
        canvas.style.height = `${parentHeight}px`;
      } else {
        canvas.style.width = `${parentWidth}px`;
        canvas.style.height = `${Math.round(parentWidth / desiredRatio)}px`;
      }
    };
    nes_load_url(canvas, "src/components/games/fc/roms/Double Dragon/Double Dragon2.nes")
    // nes_load_url(canvas, "src/components/games/fc/roms/Contra/Contra1(U)30.nes")
    window.onresize();
    setInterval(() => {
      console.log(nes.getFPS());
    }, 1000);
  },

}
</script>

<style scoped>
.canvas {
  image-rendering: pixelated; /* webkit */
  image-rendering: optimizespeed; /* firefox */
}
</style>
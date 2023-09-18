<template>
  <div>
    <div v-if="!imageCaptured">
      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="startCamera" :disabled="cameraStarted">Start Camera</v-btn>
      <video ref="video" autoplay></video>
    </div>
    <v-btn block class="mb-8" color="red" size="large" variant="tonal" @click="captureImage" :disabled="!cameraStarted || imageCaptured">Capture Image</v-btn>
    
    <!-- Display the captured image when imageCaptured is true -->
    <img v-if="imageCaptured" :src="capturedImageUrl" alt="Captured Image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoStream: null,
      videoElement: null,
      cameraStarted: false,
      imageCaptured: false,
      capturedImageUrl: '', // URL of the captured image
    };
  },
  mounted() {
    this.videoElement = this.$refs.video;
  },
  methods: {
    async startCamera() {
      try {
        this.videoStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.videoElement.srcObject = this.videoStream;
        this.cameraStarted = true;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    },
    captureImage() {
      if (this.videoStream) {
        const canvas = document.createElement('canvas');
        canvas.width = this.videoElement.videoWidth;
        canvas.height = this.videoElement.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);

        // Convert the captured frame to a data URL
        const imageDataURL = canvas.toDataURL('image/png');

        // Save the image to local storage (you can use a better naming strategy)
        localStorage.setItem('capturedImage', imageDataURL);

        // Stop the camera stream
        this.stopCamera();

        // Set the captured image URL and imageCaptured to true
        this.capturedImageUrl = imageDataURL;
        this.imageCaptured = true;
      }
    },
    stopCamera() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop());
        this.cameraStarted = false;
      }
    },
  },
  beforeUnmount() {
    // Ensure the camera stream is stopped when the component is unmounted
    this.stopCamera();
  },
};
</script>

<style>
/* Add your styles here */
</style>

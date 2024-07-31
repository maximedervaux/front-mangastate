
<!--Loader-->

<template>
    <div class="loader"></div> 
</template>

<style scoped>
.loader {
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #FFCF00;
  box-shadow: 0 0 0 0 #FFCF05;
  animation: l1 1s infinite;
}
@keyframes l1 {
    100% {box-shadow: 0 0 0 30px #0000}
}
</style>


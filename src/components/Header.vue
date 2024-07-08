<template>
    <div class="header">
      <img src="../assets/logo.png" class="logo">
      <input type="text"  @input="handleSearch" placeholder="Rechercher un manga" />
    </div>
  </template>
  

  <script setup>

 
  </script>
  
  <style scoped>
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  
  .logo {
    width: 5em;
    height: auto;
  }
  
  input {
    width: 350px;
    margin: 20px auto;
    padding: 10px 45px;
    background: white url("../assets/search-icon.png") no-repeat 15px center;
    background-size: 15px 15px;
    font-size: 16px;
    border: none;
    border-radius: 20px;
    color: black;
  }
  </style>
  
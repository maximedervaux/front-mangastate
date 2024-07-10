<template>
    <div class="header">
      <img src="../assets/logo.png" class="logo">
      <nav class="navbar">
        <router-link  to="/">Home</router-link>
        <router-link  to="/ADD">Add</router-link>
      </nav>
      <input type="text"  @input="handleSearch" placeholder="Rechercher un manga" />
    </div>
  </template>
  

  <script setup>

 
  </script>
  
  <style scoped>
  nav{
    display: flex;
    align-items: center;
    padding: 8px;
  }
  nav a {
    font-weight: 300;
    text-decoration: none;
    color: white;
    padding: 8px;

  }
  nav a .router-link-exact-active{
    font-weight: bold;
  }
  nav a.router-link-active{
    font-weight: bold;
  }
   
  
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
  
<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/cart" class="nav-link">Cart</router-link>
        <router-link to="/checkout" class="nav-link">Checkout</router-link>
      </div>
    </nav>
    <main>
      <router-view></router-view>
      <p v-if="message">{{ message }}</p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: 'Welcome to the E-commerce App!' 
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.navbar {
  background-color: #35495e;
  padding: 10px 0;
}

.container {
  display: flex;
  justify-content: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
}
</style>
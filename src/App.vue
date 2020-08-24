<template> <!--Adicionando branch-->

  <div id="app">   
	<section>
		<b-nav class="top">
    <router-link to="/"><button class="btn btn-secondary">Home</button></router-link>
    <router-link to="/cadastro"><button class="btn btn-secondary">Cadastros</button></router-link>
  </b-nav>
	</section>
  
	<router-view />   
  </div>
</template>
<script>
  export default {
    data() { 
      return {
      }
    }
  };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.top{
  top: 10;
  background-color: #2c3e50;
}


</style>

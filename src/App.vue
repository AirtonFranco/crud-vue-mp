<template> <!--Adicionando branch-->

  <div id="app">   
	<section>
		<b-nav pills class="top">
    		<router-link to="/"><b-nav-item active>Home</b-nav-item></router-link>
    		<router-link to="/cadastro"><b-nav-item>Cadastro</b-nav-item></router-link>
    		<b-nav-item>Another Link</b-nav-item>
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

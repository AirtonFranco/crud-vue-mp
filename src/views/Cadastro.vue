<template>
	<div id="app" class="container">
		<h1>MEDPREV</h1>
        <b-card no-body>
    <b-tabs card>
      <b-tab title="CADASTRO CPF" active>
        <b-card-text><CadastroCpf/></b-card-text>
      </b-tab>
      <b-tab title="CADASTRO CNPJ">
        <b-card-text><CadastroCnpj/></b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
		
	</div>
</template>

<script>
import axios from 'axios'
import {TheMask} from 'vue-the-mask';
import {required} from 'vuelidate/lib/validators';
import CadastroCpf from "@/components/CadastroCpf.vue";
import CadastroCnpj from "@/components/CadastroCnpj.vue";
export default {
    components: {
        TheMask, 
        CadastroCpf,
        CadastroCnpj
    },
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>

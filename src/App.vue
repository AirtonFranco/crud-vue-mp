<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-alert show dismissible v-for="mensagem in mensagens"
		:key="mensagem.texto"
		:variant="mensagem.tipo">{{mensagem.texto}}</b-alert>
		<b-card>
			<b-form-group label="Nome">
				<b-form-input type="text" size='lg'
				v-model="usuario.nome"
				placeholder="Informe seu Nome">

				</b-form-input>
			</b-form-group>
			<b-form-group label="Email">
				<b-form-input type="email" size='lg'
				v-model="usuario.email"
				placeholder="Informe seu Email">

				</b-form-input>
			</b-form-group>
			<hr>
			<b-button @click="salvar"
			size="lg" variant="primary">Salvar</b-button>
			<b-button @click="obterUsuarios"
			size="lg" variant="success" class="ml-2">Obter Usuarios</b-button>
		</b-card>
		<hr>
		<b-list-group>
			<b-list-group-item v-for="(usuario, id) in usuarios" :key="id">
				<strong>Nome: </strong> {{usuario.nome}} <br/>
				<strong>Email: </strong> {{usuario.email}} <br/>
				<strong>ID: </strong> {{id}} <br/>
				<b-button variant="warning" size="lg"
				@click="carregar(id)">Carreagar</b-button>
				<b-button variant="danger" size="lg"
				class="ml-2" @click="excluir(id)">Excluir</b-button>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			mensagens: [],
			usuarios: [],
			id: null,
			usuario: {
				nome: '',
				email: '',
				// sexo: '',
				// nascimento: '',
				// email: '',
				// telefone: '',
				// celular: ''
			}
		}
	},
	methods: {
		limpar() {
			this.usuario.nome = '',
			this.usuario.email = '',
			this.id = null
			this.mensagens = []
		},
		carregar (id) {
			this.id = id
			this.usuario = { ...this.usuarios[id]}
		},
		excluir(id) {
			this.$http.delete(`https://crud-vue-mp.firebaseio.com//usuarios/${id}.json`)
			.then(() => {
				this.limpar()
				this.mensagens.push({
					texto: 'Item excluido!',
					tipo: 'danger'
				})
			})
			//Quando houver erro
			.catch(err => {
				this.mensagens.push({
					texto: 'Problema para excluir!',
					tipo: 'danger'
				})
			})
		},
		//Adicionando usuarios - Metodo POST
		salvar() {
			const metodo = this.id ? 'patch' : 'post'
			const finalUrl = this.id ? `/${this.id}.json` : '.json'
			this.$http[metodo](`https://crud-vue-mp.firebaseio.com//usuarios${finalUrl}`, this.usuario)
			.then(() => {
				this.limpar()
				this.mensagens.push({
					texto: 'Operação Realizada com sucesso',
					tipo: 'success'
				})
			})
		},
		//Editando usuarios - Metodo GET
		//Posso tambem usar no lugar de usuarios.json o /usuarios
		obterUsuarios() {
			this.$http.get('https://crud-vue-mp.firebaseio.com//usuarios.json',).then(res => {
				this.usuarios = res.data
				
			})
		},
		// install(Vue) {
		// 	ue.prototype.$http = axios.create({
        //     baseURL: 'https://crud-vue-mp.firebaseio.com/'
		// })

		// Vue.prototype.$http.interceptors.request.use(config => {
		// 	console.log(config.method)
		// 	return config
		// }),error => Promisse.reject(error)

		// Vue.prototype.$http.interceptors.response.use(res => {
		// 	const array =[]
		// 	for(let chave in res.data) {
		// 		array.push({ id: chave, ...res.data[chave]})
		// 	}

		// 	res.data = array
		// 	return res
		// }, error => Promise.reject(error))
		// }
	},
	// created() {
	// 	//Chamando o metodo post
	// 	this.$http.post('usuarios.json',{
	// 		nome: 'Airton',
	// 		email: 'airton.developer@gmail.com'
	// 	}).then(res => console.log(res))
	// }
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

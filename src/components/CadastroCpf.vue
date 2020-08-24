<template>
	<div id="app" class="container">
		<b-alert show dismissible v-for="mensagem in mensagens"
		:key="mensagem.texto"
		:variant="mensagem.tipo">{{mensagem.texto}}</b-alert>
		<b-card>
			<b-form-group label="Nome*">
                <small v-show="deuErro">Nome é invalido, tente novamente</small>
				<b-form-input type="text" size='lg'
				v-model="usuario.nome"
				placeholder="Informe seu Nome">
                </b-form-input>
			</b-form-group>
            <b-form-group label="CPF*">
				<the-mask :mask="['###.###.###-##']" class="form-control display-7"
                v-model="usuario.cpf"
				placeholder="Informe seu CPF"/>
			</b-form-group>
            <b-form-group label="Sexo*">
                <input v-model="usuario.sexo" type="radio" id="Masculino" name="gender" value="male">
                <label for="male">Masculino</label><br>
                <input v-model="usuario.sexo" type="radio" id="Femenino" name="gender" value="female">
                <label for="female">Femenino</label><br>
            </b-form-group>
            <b-form-group label="Data de Nascimento*">
				<the-mask :mask="['##/##/####']" class="form-control display-7"
                v-model="usuario.nascimento"
				placeholder="Informe sua data de nascimento"/>
			</b-form-group>
			<b-form-group label="Email" 
            id="input-group-1"
            label-for="input-1"
            description="Os campos com * são obrigatorios.">
				<b-form-input type="email" size='lg'
                id="input-1"
				v-model="usuario.email" required="required"
				placeholder="Informe seu Email">

				</b-form-input>
                <b-form-group label="Numero de telefone">
				<the-mask :mask="['(##) ####-####']" class="form-control display-7"
                v-model="usuario.telefone"
				placeholder="Informe seu numero de telefone"/>

			</b-form-group>
            <b-form-group label="Data de Celular">
				<the-mask :mask="['(##) #####-####']" class="form-control display-7"
                v-model="usuario.celular"
				placeholder="Informe seu numero de celular"/>

			</b-form-group>
            <div class="form-group col-12 flex-column d-flex align-items-center">
                <input type="file" class="d-none"
                ref="input"
                accept="image/*"
                @change="handleFile($event)">
                <button type="button" 
                class="btn btn-secondary w-50"
                @click="openFileDialog()"> Adicione sua Foto</button>
                <div v-if="usuario.img" class="mt-2">
                    {{usuario.img.name}}
                </div>
            </div>
			</b-form-group>
			<hr>
			<b-button @click="salvar"
			size="lg" variant="primary">Salvar</b-button>
			<b-button @click="obterUsuarios"
			size="lg" variant="success" class="ml-2">Carregar</b-button>
		</b-card>
		<hr>
		<b-list-group>
			<b-list-group-item v-for="(usuario, id) in usuarios" :key="id">
				<strong>Nome: </strong> {{usuario.nome}} <br/>
                <strong>CPF: </strong> {{usuario.cpf}} <br/>
                <strong>SEXO: </strong> {{usuario.sexo}} <br/>
                <strong>NASCIMENTO: </strong> {{usuario.nascimento}} <br/>
                <strong>EMAIL: </strong> {{usuario.email}} <br/>
				<strong>TELEFONE: </strong> {{usuario.telefone}} <br/>
                <strong>CELULAR: </strong> {{usuario.celular}} <br/>
                <strong>IMAGEM: </strong> {{usuario.img}} <br/>
				<strong>ID: </strong> {{id}} <br/>
				<b-button variant="warning" size="lg"
				@click="carregar(id)">Editar</b-button>
				<b-button variant="danger" size="lg"
				class="ml-2" @click="excluir(id)">Excluir</b-button>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import axios from 'axios'
import {TheMask} from 'vue-the-mask';
import {required} from 'vuelidate/lib/validators';
export default {
    components: {TheMask},
	data() {
		return {
            deuErro: false,
			mensagens: [],
			usuarios: [],
			id: null,
			usuario: {
				nome: '', //Obrigatorio
                cpf: '', //Obrigatorio
                sexo: '', //Obrigatorio
				nascimento: '', //Obrigatorio
				email: '',
				telefone: '',
                celular: '',
                img: ''
            } 
        }
    },
	methods: {
		limpar() {
			this.usuario.nome = '',
            this.usuario.cpf = '',
            this.usuario.sexo = '',
            this.usuario.nascimento = '',
            this.usuario.email = '',
            this.usuario.telefone = '',
            this.usuario.celular = '',
            this.usuario.img = '',
			this.id = null
			this.mensagens = []
        },
        openFileDialog() {
            this.$refs.input.value = null
            this.$refs.input.click()
        },
        handleFile({target}) {
            this.usuario.img = target.files[0]
        },
		carregar (id) {
			this.id = id
			this.usuario = { ...this.usuarios[id]}
		},
		excluir(id) {
			this.$http.delete(`https://crud-vue-mp.firebaseio.com/usuarios/${id}.json`)
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


<template>
 
  <div >
    <h1 class="centralizado"> {{ titulo }} </h1>
    
       <p class="centralizado">{{ menssagem }}</p>
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="filtro">
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" v-bind:key="foto.id">

        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-meu-transform:scale.animate ="1.2"/>
          <router-link :to="{name:'altera', params:{id:foto._id}}">
          <meu-botao tipo="button" rotulo="ALTERAR"/>
          </router-link>
          
          <meu-botao tipo="button" rotulo="REMOVER" @botaoAtivado ='remove(foto)'
          :confirmacao="true" 
          estilo="perigo"/>
        </meu-painel>

        </li>
    </ul>
     
  </div>
</template>

<script>

import Painel from '../shared/painel/Painel.vue';
import imagemResponsiva from '../shared/imagem-responsiva/imagemResponsiva.vue';
import Botao from '../shared/botoes/Botao.vue'
import FotoService from  '../../domain/foto/fotoService.js'
export default {
  components:{
    'meu-painel' : Painel,
    'imagem-responsiva':imagemResponsiva,
    'meu-botao': Botao
  },
  computed:{

    fotosComFiltro(){

      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(),'i');
        return this.fotos.filter(foto=> exp.test(foto.titulo))
      }else{
        return this.fotos
      }
    }
  },
 methods: {

    remove(foto) {
       this.service.apaga(foto._id)
        .then(() => {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1);
            this.mensagem = 'Foto removida com sucesso'
          }, 
          err => {
            this.mensagem = 'Não foi possível remover a foto';
            console.log(err);
          }
        )
    }

  },

 data() {
   return{ 
     titulo:  'Pics',
     fotos:[],
     filtro: '',
     menssagem: '',
   }
 },
 created(){
   this.service = new FotoService(this.$resource)
    this.service
    .lista()
    .then(fotos => this.fotos = fotos, err => console.log(err));

    /*promise.then(res =>{
        res.json().then(fotos =>
        this.fotos = fotos)
    })*/
  }
}
</script>

<style>
  .corpo{
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin:0 auto;
  }
  .centralizado{
    text-align: center;
  }

  .lista-fotos{
    list-style: none;
  }
  .lista-fotos .lista-fotos-item{
    display: inline-block;
  }
    .centralizado {
    text-align: center;
  }



  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }
  .imagem-responsiva{
    width: 100%;
  }
  .filtro {
    display: block;
    width: 100%;
  }

</style>

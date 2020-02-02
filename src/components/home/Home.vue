
<template>
 
  <div >
    <h1 class="centralizado"> {{ titulo }} </h1>
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="filtro">
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" v-bind:key="foto.id">

        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-meu-transform:scale.animate ="1.2"/>
          <meu-botao tipo="button" rotulo="REMOVER" @botaoAtivado ='remove(foto)'
          :confirmacao="true" 
          estilo=""/>
        </meu-painel>

        </li>
    </ul>
     
  </div>
</template>

<script>

import Painel from '../shared/painel/Painel.vue';
import imagemResponsiva from '../shared/imagem-responsiva/imagemResponsiva.vue';
import Botao from '../shared/botoes/Botao.vue'

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
  methods:{

    remove($event, foto){
        // alert($event)
        alert('Removido ' )
    }
  },

 data() {
   return{ 
     titulo:  'Pics',
     fotos:[],
     filtro: ''
   }
 },
 created(){
    let promise =  this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
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

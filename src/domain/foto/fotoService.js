export default class fotoService{
    
    constructor(resource){
        this._resource = resource('v1/fotos{/id}')
    }
    lista(){
        return this._resource
        .query()
        .then(res => res.json(), err => {
            throw new Error('Não foi possivel obter as fotos')
        });
    }
    cadastro(foto){
        if(foto._id) {

            return this._resource
            .update({ id: foto._id }, foto);

        } else {

            return this._resource.save(foto);
        }
    }
    apaga(id){
       return this._resource.delete({ id })
       .then(null,err=>{
           console.log(err)
           throw new Error ('Não foi possivel remover foto')
       })
    }
    busca(id){
        return this._resource
            .get({id})
            .then(res=> res.json())
    }
}
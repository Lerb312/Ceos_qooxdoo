
//PROPUESTA CREAR UNA LISTA DOBLEMENTE ENLAZADA*******Aun no se ha aplicado
qx.Class.define("myejemplo.ManejadorGrafica", {
    extend: qx.core.Object,

    construct() {
      this.base(arguments);
      this.__lista = Array();
      this.__lista[0]=[0];
      this.__contador = 0;
      this.__contadorNotMoved = 0;
      
    },

    members: {
      __lista: null,
      __contador: null,
      __contadorNotMoved: null,
   



      agregarEstado: function(estado){
        if(this.__contador <= this.__contadorNotMoved){
          this.__contador++;
        }

        this.__contadorNotMoved++;
        this.__lista.push(estado);
        

      },

      historial: function(){
        return this.__lista;
      },
      
      obtenerEstadoPrevio: function(){

        if(this.__contador > 0){
          return this.__lista[--this.__contadorNotMoved];

        }else{
          return true;
        }
      },

      obtenerEstadoSiguiente: function(){

        if(this.__contador <= this.__contadorNotMoved){
          return this.__lista[this.__contador++];
        }else{
          return true;
        }
      },

      obtenerContador: function(){ 
        
        return this.__contador; 
      },

      //REVISAR ESTO
      obtenerElementoActual: function(){
        if(this.__contadorNotMoved > 0){
          return this.__lista[this.__contadorNotMoved];
        }
   
        
      },

      obtenerLimiteAgregado: function(){
        return this.__contador <= this.__contadorNotMoved;
      },

      primerElementoDefault: function(){
        return this.__lista[0];
      }
    }
});

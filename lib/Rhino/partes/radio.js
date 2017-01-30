export class Radio {
	constructor(info){
		//nombre,opciones,seleccionado
		this.data = info;
		this.estado = 'porConstriur';
		this.nodo = null;
		this.opciones = [];

		this.construirNodo();
	}
	construirNodo(){
		var nodo = document.createElement('div');
		nodo.setAttribute('formElements','radio');
		if(this.data.eslabon === 'area'){
			nodo.setAttribute('area','');
		}
		this.nodo = nodo;
		this.agregarOpciones();
		if(this.data.valor){
			this.asignarValor(this.data.valor);
		}
	}
	agregarOpcion(opcion){
		var nodoOpcion = document.createElement('label');
		nodoOpcion.classList.toggle('radio');
		var html = '';
		html+='<input type="radio" name="'+this.data.nombre+'" value="'+opcion.valor+'"><span class="outer"><span class="inner"></span></span>'+opcion.nombre;
		nodoOpcion.innerHTML=html;
		this.opciones.push(nodoOpcion);
		this.nodo.appendChild(nodoOpcion);
	}
	agregarOpciones(){
		for(var x=0; x<this.data.opciones.length;x++){
			this.agregarOpcion(this.data.opciones[x]);
		}
	}

	captarValor(){
		var opciones = this.nodo.querySelectorAll('input[type="radio"]');
		for (var i = 0; i < opciones.length; i++) {
			if(opciones[i].checked){
				return opciones[i].value;
			}
		}
		return null;
	}
	captarNombre(){
		return this.nodo.querySelector('input[type="radio"]').name;
	}
	captarRequerido(){
		return this.data.requerido;
	}
	asignarValor(valor){
		this.valor = valor;
		var opciones = this.nodo.querySelectorAll('input[type="radio"]');
		opciones.forEach(function(opc){
			if(opc.value === valor){
				opc.checked = true;
			}else{
				opc.checked = false;
			}
		});
	}
	deshabilitar(){
		this.nodo.classList.add('desahbilitado');
		var opciones = this.nodo.querySelectorAll('input[type="radio"]');
		opciones.forEach(function(each){
			each.disabled = true;
		});
	}
	habilitar(){
		this.nodo.classList.remove('desahbilitado');
		var opciones = this.nodo.querySelectorAll('input[type="radio"]');
		opciones.forEach(function(each){
			each.disabled = false;
		});
	}
	limpiar(){
		var opciones = this.nodo.querySelectorAll('input[type="radio"]');
		opciones.forEach(function(each){
			each.checked = false;
		});
	}
}

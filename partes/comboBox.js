class ComboBox {
	constructor(info){
		//nombre,opciones,seleccionado,eslabon
		this.data = info;
		this.estado = 'porConstriur';
		this.data.eslabon = info.eslabon||'simple';
		this.data.seleccionado = info.seleccionado||'-';
		this.data.sinTitulo = info.sinTitulo || false;
		this.nodo = null;
		this.select = null;

		this.construir();
	}
	construir(){
		var nodo=document.createElement('div');
		nodo.setAttribute(this.data.eslabon,'');
		nodo.setAttribute('formElements','');

		//se crea el article
		var article=document.createElement('article');
		article.setAttribute('capaSelect','');
		if(this.data.deshabilitado !== true ){
			article.onclick=function(){
				construirCapaSelect(this);
			};
		}
		nodo.appendChild(article);

		//se crea el select
		var select=document.createElement('select');
		select.name=this.data.nombre;
		if(this.data.id!==undefined){
			select.id=this.data.id;
		}
		this.select = select;
		nodo.appendChild(select);

		this.nodo=nodo;
		var opcion;
		if(!this.data.peticion){
			if(!this.data.sinTitulo){
				opcion = {
					codigo : '-',
					nombre : 'Elija un '+this.data.titulo
				};
				this.agregarOpcion(opcion);
			}
			arranqueOpciones(this);
		}else{
			opcion = {
				codigo : '-',
				nombre : 'Cargando Opciones ... '
			};
			this.agregarOpcion(opcion);
			this.estado = 'cargando';
			var yo = this;

			if(this.data.valor){
				torque.Operacion(this.data.peticion)
					.then(function(respuesta){
						yo.data.opciones = respuesta.registros;
						return yo;
					})
					.then(arranqueOpciones)
					.then(function(){yo.asignarValor(yo.data.valor);});
				this.data.valor = null;
			}else{
				torque.Operacion(this.data.peticion,function(respuesta){
					yo.data.opciones = respuesta.registros;
					arranqueOpciones(yo);
				});
			}
		}
	};
	function arranqueOpciones(combo){
		if(combo.data.titulo){
			combo.select.options[0].textContent='Elija un '+combo.data.titulo;
		}
		//genero y asigno el resto de las opciones
		combo.agregarOpciones(combo.data.opciones);
		combo.estado='enUso';
	}
	agregarOpciones(opciones){
		for(var x=0;x<opciones.length;x++){
			this.agregarOpcion(opciones[x]);
		}
	};
	agregarOpcion(opcion){
		var select=this.nodo.getElementsByTagName('select')[0];
		var nuevaOp=document.createElement('option');
		nuevaOp.textContent=opcion.nombre;
		nuevaOp.value=opcion.codigo;
		select.appendChild(nuevaOp);
	};
	seleccionarOpcion(opcion){
		var select=this.nodo.getElementsByTagName('select')[0];
		select.value = opcion.codigo;
		var opciones = select.options;
		for (var i = 0; i < opciones.length; i++) {
			if(opciones[i].value === opcion.codigo){
				select.selectedIndex = i;
				return true;
			}
		}
		return false;
	};
	captarValor(){
		var valor = (this.nodo.querySelector('select').value==='-')?null:this.nodo.querySelector('select').value.trim();
		return valor;
	};
	captarNombre(){
		return this.nodo.querySelector('select').name;
	};
	captarRequerido = function(){
		return this.data.requerido;
	};
	asignarValor(valor){
		this.seleccionarOpcion({codigo:valor});
	};
	deshabilitar(){
		this.select.classList.add('deshabilitado');
		var article = this.nodo.querySelector('article');
		article.onclick = function(){};
	};
	habilitar(){
		this.select.classList.remove('deshabilitado');
		var article = this.nodo.querySelector('article');
		article.onclick = function(){
			construirCapaSelect(this);
		};
	};
	limpiar(){
		this.select.selectedIndex = 0;
	};
};
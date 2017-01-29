var CheckBox = function(info){
	//marcado,habilitado,valor,nombre,requerido,usaTitulo,eslabon
	var Campo = function(animacion){
		this.nodo = null;
		this.check =null;
		this.box = null;

		this.construirNodo = function(){
			var nodo = document.createElement('div');
			nodo.setAttribute('checkbox','');
			this.nodo = nodo;

			var check = document.createElement('div');
			check.setAttribute('check','');
			nodo.appendChild(check);

			var box = document.createElement('div');
			box.setAttribute('box','');
			nodo.appendChild(box);

			box.classList.add(animacion);
			check.classList.add(animacion);

			this.check = check;
			this.box = box;
		};
		this.construirNodo();
	};
	var Titulo = function(nombre){
		this.nodo = null;

		this.construirNodo = function(){
			var nodo = document.createElement('div');
			nodo.setAttribute('titulo','');
			this.nodo = nodo;

			nodo.textContent = nombre;
		};
		this.construirNodo();
	};
	//partes
	this.nodo = null;
	this.campo = null;
	this.texto = null;
	// valores
	this.habilitado = 'habilitado';
	this.marcado = false;
	this.valor = info.valor;
	this.nombre = info.nombre;
	this.requerido = info.requerido || false;
	this.animacion = info.animacion || 'girar';
	this.tipo = info.tipo || 'campo';
	this.info = info;
	this.campo = new Campo( this.animacion);
	info.sinTitulo = info.sinTitulo || false;
	if(info.usaTitulo){
		this.titulo = new Titulo(info.nombre);
	}

	this.construirNodo();
};
CheckBox.prototype.construirNodo = function(){
	var nodo = document.createElement('div');
	nodo.setAttribute('o-checkbox','');
	this.nodo = nodo;

	this.nodo.appendChild(this.campo.nodo);

	this.nodo.classList.add(this.tipo);
	if(this.titulo){
		this.nodo.appendChild(this.titulo.nodo);
	}
	if(this.info.eslabon === 'area'){
		this.nodo.setAttribute('area','');
	}
	if(!this.info.habilitado){
		this.deshabilitar();
	}else {
		this.habilitar();
	}
	if(this.info.marcado){
		this.marcar();
	}else{
		this.desmarcar();
	}
};
CheckBox.prototype.cambiarEstado = function(){
	if(this.marcado){
		this.desmarcar();
	}else{
		this.marcar();
	}
};
CheckBox.prototype.marcar = function(){
	this.campo.nodo.classList.add('marcado');
	this.marcado = true;
};
CheckBox.prototype.desmarcar = function(){
	this.campo.nodo.classList.remove('marcado');
	this.marcado = false;
};
CheckBox.prototype.deshabilitar = function(){
	var yo = this;
	this.nodo.onclick = function(){};
	this.estado = 'deshabilitado';
};
CheckBox.prototype.habilitar = function(){
	var yo = this;
	this.nodo.onclick = function(){
		yo.cambiarEstado();
		if(yo.onclick){
			yo.onclick();
		}
	};
	this.estado = 'habilitado';
};
CheckBox.prototype.captarNombre = function(){
	return this.nombre;
};
CheckBox.prototype.captarValor = function(){
	if(this.marcado){
		return this.valor;
	}else{
		return false;
	}
};
CheckBox.prototype.captarRequerido = function(){
	return this.requerido;
};
CheckBox.prototype.limpiar = function(){
	this.desmarcar();
};
CheckBox.prototype.asignarClick = function(clickFunction){
	var yo = this;
	this.onclick = clickFunction;
	if(this.estado === "habilitado"){
		this.deshabilitar();
		this.habilitar();
	}
};
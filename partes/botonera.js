class Boton { 
	constructor(atributos){
		this.atributos = atributos;
		this.tipo = atributos.tipo.toLowerCase();
		this.nodo =  null;
		this.estado = 'porConstruir';
		this.clases= atributos.clases || [];
		this.construirNodo();
	}

	construirNodo(){
		var nodo = document.createElement('button');
		nodo.setAttribute('type','button');
		switch(this.atributos.tipo){
			case 'abrir':
				nodo.setAttribute('btnAbrir','');
				nodo.setAttribute('estado','oculto');
			break;
			case 'nuevo':
				nodo.setAttribute('btnNuevo','');
				nodo.textContent = "insert_drive_file";
				nodo.classList.add('mat-lightblue500');
			break;
			case 'buscar':
				nodo.setAttribute('btnBuscar','');
				nodo.textContent = "search";
				nodo.classList.add('mat-blue500');
			break;
			case 'modificar':
				nodo.setAttribute('btnModificar','');
				nodo.textContent = "mode_edit";
				nodo.classList.add('mat-green500');
			break;
			case 'eliminar':
				nodo.setAttribute('btnEliminar','');
				nodo.textContent = "delete";
				nodo.classList.add('mat-red500');
			break;
			case 'detalle':
				nodo.setAttribute('btnDetalle','');
				nodo.textContent = "list";
				nodo.classList.add('mat-deeporange500');
			break;
			case 'asignar-rol':
				nodo.setAttribute('btnAsignarRol','');
			break;
			case 'seguridad':
				nodo.setAttribute('btnSeguridad','');
				nodo.textContent = "security";
				nodo.classList.add('mat-bluegrey500');
			break;
			case 'cancelar':
				nodo.setAttribute('btnCancelar','');
				nodo.textContent = "clear";
				nodo.classList.add('mat-red500');
			break;
			case 'guardar':
				nodo.setAttribute('btnGuardar','');
				nodo.textContent = "save";
				nodo.classList.add('mat-indigo500');
			break;
			case 'aceptar':
				nodo.setAttribute('btnAceptar','');
				nodo.textContent = "check";
				nodo.classList.add('mat-green500');
			break;
			case 'validado':
				nodo.setAttribute('btnValidado','');
				nodo.textContent = "thumb_up";
				nodo.classList.add('mat-indigo500');
			break;
			case 'apertura':
				nodo.setAttribute('btnApertura','');
				nodo.textContent = "launch";
				nodo.classList.add('mat-lightgreen500');
			break;
		}
		this.nodo = nodo;
		this.estado = 'enUso';
		var yo = this;
		UI.manejoDeClases(this);
		if(this.atributos.click){
			this.nodo.onclick = function(){
				yo.atributos.click(yo);
			};
		}
		if(atributos.contenido){
			this.nodo.textContent = atributos.contenido;
		}
	};
};
class Botonera {
	constructor(atributos){
		this.estructura = atributos.botones;
		this.estado = 'porConstruir';
		this.nodo = null;
		this.botones = [];
		construir();
	
	}
	construir(){
		var contenedor = atributos.contenedor;
		var nodo = document.createElement('div');
		nodo.setAttribute('botonera','');
		contenedor.parentNode.insertBefore(nodo,contenedor.nextSibling);
		this.nodo = nodo;
		this.inicializarBotones();
		//boton nuevo
		if(UI.elementos.maestro!=='noPosee'){
			this.buscarBoton('nuevo').nodo.onclick=function(){
				console.log('presiono Nuevo');
				var data = {
					tipo:'nuevo'
				};
				var maestro = UI.elementos.maestro;
				maestro.agregarFormulario(data);
			};
			//boton buscar
			if(this.buscarBoton('buscar')){
				this.buscarBoton('buscar').nodo.onclick=function(){
					UI.elementos.maestro.ventanaList.abrirCampoBusqueda();
				};
			}
		}
	};
	inicializarBotones = function(){
		var botones = this.estructura;
		for(var x = 0; x < botones.length; x++){
			this.agregarBoton(botones[x]);
		}
		this.agregarEfectos();
	};
	agregarBoton(consBoton){
		var botonera = this.nodo;
		var existe = false;
		if(typeof consBoton == 'string'){
			consBoton = {tipo:consBoton};
		}
		for(var x=0;x<this.botones.length;x++){
			if(this.botones[x].tipo==consBoton.tipo.toLowerCase()){
				existe=true;
				console.log('el boton '+consBoton.tipo+' ya existe');
			}
		}
		if(!existe){

			boton = new Boton(consBoton);
			botonera.appendChild(boton.nodo);
			//esta parte es solo para cuando se agrega un boton en un momento posterior a la inicializacion
			if(this.buscarBoton('abrir')){
				if(this.buscarBoton('abrir').nodo.getAttribute('estado')=='visible'){
					setTimeout(function(){
						var top=(UI.elementos.botonera.botones.length-1)*45;
						boton.nodo.style.top='-'+top+'px';
					},10);
				}
			}
			this.botones.push(boton);
		}
		return boton;
	};
	agregarBotones(botones){
		var tiempo = 20;
		for(var x = 0; x < botones.length; x++){
			espera(x,tiempo,botones,'agregar');
			tiempo+=20;
		}
	};
	function espera(x,tiempo,botones,operacion){
		setTimeout(function(){
			if(operacion === 'quitar'){
				UI.elementos.botonera.quitarBoton(botones[x]);
			}else{
				UI.elementos.botonera.agregarBoton(botones[x]);
			}
		},tiempo);
	}
	quitarBotones(botones){
		var tiempo = 20;
		for(var x = 0; x < botones.length; x++){
			espera(x,tiempo,botones,'quitar');
			tiempo+=20;
		}
	};
	gestionarBotones(botones){
		var tiempo = 20;
		if(botones.quitar[0] === 'todos'){
			botones.quitar = this.botones;
		}
		for(var x = botones.quitar.length -1; x >= 0 ; x--){
			espera(x,tiempo,botones.quitar,'quitar');
			tiempo+=20;
		}
		for(var i = 0; i < botones.agregar.length; i++){
			espera(i,tiempo,botones.agregar,'agregar');
			tiempo+=20;
		}
	};
	agregarEfectos(){
		var botones = this.botones;
		if(botones.length>1){
			if(!this.buscarBoton('abrir')){
				console.log('no se encuentra el boton de apertura');
			}else{
				this.buscarBoton('abrir').nodo.onclick = function(){
					if(this.getAttribute('estado')=='oculto'){
						var top = 0;
						this.classList.toggle('apertura');
						this.setAttribute('estado','visible');
						for(var x = 0; x < botones.length; x++){
							if(botones[x].tipo!='abrir'){
								top+=45;
								botones[x].nodo.style.top = '-'+top+'px';
							}
						}
					}else{
						this.classList.toggle('apertura');
						this.setAttribute('estado','oculto');
						for(var i = 0; i < botones.length; i++){
							if(botones[i].tipo!='abrir'){
								botones[i].nodo.style.top = 0+'px';
							}
						}
					}
				};
			}
		}
	};
	buscarBoton(tipo){
		var botones = this.botones;
		for(var x = 0; x < botones.length; x++){
			if(botones[x].tipo==tipo){
				return botones[x];
			}
		}
		return false;
	};
	listarBotones(){
		var lista = this.botones;
		var resultado = 'estos son los botones agregados:\n';
		for( var x = 0; x < lista.length; x++){
			resultado += '\t'+lista[x].tipo+'\n';
		}
		console.log(resultado);
	};
	getEstado(){
		console.log(this.estado);
	};
	quitarBoton(consBoton){
		if(typeof consBoton == 'string'){
			consBoton = {tipo:consBoton};
		}
		if(consBoton.tipo !== 'abrir'){
			var eliminar = this.buscarBoton(consBoton.tipo);
			if(eliminar){
				eliminar.nodo.style.top='0px';
				setTimeout(function(){
					eliminar.nodo.parentNode.removeChild(eliminar.nodo);
				},510);
				this.botones.splice(this.botones.indexOf(eliminar),1);
			}
		}
	};

};
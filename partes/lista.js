//BUG: no muestra el cuadro de carga al cargar los registros
class Pagina {
	constructor(atributos){
		this.atributos = atributos;
		this.nodo = null;
		this.construirNodo();
	}

	construirNodo(){
		var nodo = document.createElement('article');
		nodo.setAttribute('pagina','');
		nodo.textContent = this.atributos.numero;
		if(this.atributos.clase){
			nodo.classList.add(this.atributos.clase);
		}
		this.nodo = nodo;
	}
}
class BarraPaginacion{
	constructor(atributos){

		this.atributos = atributos;
		this.nodo = null;
		this.paginas = [];
		this.construirNodo();
	}

	construirNodo(){
		var nodo = document.createElement('section');
		nodo.setAttribute('slot','');
		nodo.classList.add('barra-paginacion');
		nodo.innerHTML = "<div cont-pag></div><div busq-pag>"+
										"<input type='text' placeHolder='num'><l>ir</l>"+"</div>";
		this.nodo = nodo;
		this.agregarPaginas();
	}
	agregarPaginas(){
		if(this.paginas.length){
			this.limpiarPaginas();
		}
		var paginacion = this.atributos;
		if(paginacion.paginaActual > 3){
			this.agregarPagina(1,'primera');
		}
		this.agregarPagina(paginacion.paginaActual-2);
		this.agregarPagina(paginacion.paginaActual-1);
		this.agregarPagina(paginacion.paginaActual,'actual');
		this.agregarPagina(paginacion.paginaActual+1);
		this.agregarPagina(paginacion.paginaActual+2);
		if(paginacion.paginaActual < paginacion.paginas-3){
			this.agregarPagina(paginacion.paginas,'ultima');
		}
	}
	agregarPagina(numero,clase){
		if((numero > 0)&&(numero <= this.atributos.paginas)){
			var pagina = new Pagina({'numero':numero,'clase':clase});
			this.nodo.querySelector('div[cont-pag]').appendChild(pagina.nodo);
			this.paginas.push(pagina);
		}
	}
	buscarPagina(numero){
		for (var i = 0; i < this.paginas.length; i++) {
			if(this.paginas[i].atributos.numero === numero){
				return this.paginas[i];
			}
		}
		return false;
	}
	quitarPagina(pag){
		var pagina = this.buscarPagina(pag);
		pagina.nodo.parentNode.removeChild(pagina.nodo);
		this.paginas.splice(this.paginas.indexOf(pagina),1);
	}
	limpiarPaginas(){
		var barra = this;
		var longitud = this.paginas.length;
		for(var x = 0; x < longitud; x++){
			this.quitarPagina(this.paginas[0].atributos.numero);
		}
	}
}
class Celda {
	constructor(atributos){
		this.atributos = atributos;
		this.nodo = null;
		this.capaEdit = null;
		this.clases = ['dos','tres','cuatro','cinco','seis','siete','ocho','adaptable'];
		this.construirNodo();
	}

	captarValor(){
		var valor = this.nodo.querySelector('span[valor]').textContent.trim();
		return valor;
	}
	construirNodo(){
		var nodo = document.createElement('div');
		if(this.atributos.tipo){
			nodo.setAttribute('cabeceraCelda',this.atributos.nombre);
		}else{
			nodo.setAttribute('celda',this.atributos.nombre);
		}
		this.nodo = nodo;
			this.nodo.innerHTML= '<span valor>'+this.atributos.valor+'</span>';
		var indice = this.atributos.columnas - 2;
		if(indice > 6){
			indice = 7;
		}
		nodo.classList.add(this.clases[indice]);

		if(this.atributos.columnas > 8){
			nodo.classList.add('pequena');
		}
		if(!this.atributos.tipo){
			if(this.atributos.editable){
				this.agregarCapaEdit();
			}
		}
	}
	agregarCapaEdit() {
		var capaEdit = document.createElement('div');
		capaEdit.setAttribute('edit','');
		this.nodo.appendChild(capaEdit);
		this.capaEdit = capaEdit;
		var yo = this;
		//campo de texto
		var span = this.nodo.querySelector('span');

		this.capaEdit.onclick = function(){
			clickEdit(capaEdit,yo,span);
		};
	}
}
function clickEdit(capaEdit,yo,span){
	if(!capaEdit.querySelector('input')){
		var input = document.createElement('input');
		input.type='text';
		input.value = span.textContent;
		input.onblur = function(){
			span.textContent = this.value;
			capaEdit.classList.toggle('visible');
			capaEdit.querySelector('input').value = yo.nodo.querySelector('span').textContent;
			capaEdit.removeChild(capaEdit.querySelector('input'));
			this.onclick = function(){
				clickEdit(capaEdit,yo,span);
			};
		};
		capaEdit.appendChild(input);
		capaEdit.onclick = function(){};
	}else{
		capaEdit.querySelector('input').value = yo.nodo.querySelector('span').textContent;
		capaEdit.removeChild(capaEdit.querySelector('input'));
	}
	yo.capaEdit.classList.toggle('visible');
}

class Selector {
	constructor(atributos){
		this.atributos = atributos;
		this.nodo = null;
		this.check = null;
		this.onSelect = null;
		this.onDeselect = null;
		this.construirNodo();
	}

	construirNodo(){
		var nodo = document.createElement('div');
		nodo.setAttribute('selector',this.atributos.codigo);
		this.nodo = nodo;
		this.check = new CheckBox({
				nombre: "selector"+this.atributos.nombre,
				valor: this.atributos.codigo,
				requerido: false,
				habilitado: true,
				animacion: 'girar',
				eslabon: 'area',
				sinTitulo: true,
				marcado: false,
				tipo: 'opciones'
		});
		this.nodo.appendChild(this.check.nodo);
		var yo = this;
		this.nodo.onclick = function(){
			if(yo.check.marcado){
				if(yo.onSelect){
					yo.onSelect(yo.slot);
				}
			}else{
				if(yo.onDeselect){
					yo.onDeselect(yo.slot);
				}
			}
		};
	}
	activar(){
		this.check.nodo.click();
	}
	agregarOnSelect(funcion,slot){
		this.onSelect = funcion;
		this.slot = slot;
	}
	agregarOnDeselect(funcion,slot){
		this.onDeselect = funcion;
		this.slot = slot;
	}
}
class Slot{
	constructor(registro){
	    this.atributos = registro;
	    this.estado = 'sinInicializar';
	    this.nodo = null;
		this.columnas = [];

    	this.construirNodo();
	}
	agregarCelda(dataCelda){
		var newCelda = new Celda(dataCelda);
		this.nodo.appendChild(newCelda.nodo);
		this.columnas.push(newCelda);
		return newCelda;
	}
	agregarSelector(registro){
		this.selector = new Selector(registro);
		this.nodo.appendChild(this.selector.nodo);
	}
	construirNodo(){
	  var nodo = document.createElement('section');
	  nodo.setAttribute('slot','');
	  nodo.id=this.atributos.codigo;
		this.nodo = nodo;
		var html = this.construccion();
		if(html){
				nodo.innerHTML=html;
			  this.funcionamiento();
		}
	}
	funcionamiento(){
	  var nodo = this.nodo;
	  var article =nodo.getElementsByTagName('article')[0];
	  article.onclick=function(e){
	    agregarRippleEvent(this.parentNode,e);
	  };
	}

	reconstruirNodo(){
	  var nodo=this.nodo;
		var slot=this;
		var html = this.construccion();
		setTimeout(function(){
			if(html){
					nodo.innerHTML=html;
			    slot.funcionamiento();
			}
		},310);
	}
	construccion(){
		var html = false;
		this.nodo.innerHTML="";
		if(this.atributos.columnas!=1){
			//la celda con el checkbox como selector del registro o fila
			if(this.atributos.selector){
				if(this.atributos.selector.toLowerCase()!=='apagado'){
						this.agregarSelector(this.atributos);
				}
			}else{
				this.agregarSelector(this.atributos);
			}
			var x = 0;
			for (var variable in this.atributos) {
				if(x < this.atributos.columnas){
					if (this.atributos.hasOwnProperty(variable)) {
						var dataCelda ={
							nombre: variable,
							valor: this.atributos[variable],
							numero: x,
							columnas: this.atributos.columnas,
							tipo: this.atributos.tipo
						};
						if(this.atributos.editable){
							if(this.atributos.editable === true){//si editable es igual a true significa que todas las celdas se pueden editar
								dataCelda.editable = true;
							}else if(this.atributos.editable.celdas){//si posee el arreglo de las celdas editables
								if(this.atributos.editable.celdas.indexOf(x+1)!==-1){//si el numero se encuentra dentro de el arreglo
									dataCelda.editable = true;
								}
							}
						}
						this.agregarCelda(dataCelda);
						x++;
					}
				}else{
					break;
				}
			}
			var yo = this;
			if(this.selector){
				this.selector.check.asignarClick(function(){
					if(yo.selector.check.marcado === true){
						yo.nodo.classList.add("seleccionado");
						yo.estado = "seleccionado";
					}else{
						yo.nodo.classList.remove("seleccionado");
						yo.estado = "sinAsignar";
					}
				});
			}
		}else{
			html ="";
			var titulo;
			var nombreAMostrar;
			if(data.campo_nombre){
				nombreAMostrar = data.campo_nombre;
			}else {
				nombreAMostrar = 'nombre';
			}
			titulo=this.atributos[nombreAMostrar];
			//BUG: al tener mas de una lista en una interfaz muestra undefine en el nombre ejemplo vis_Productor.html usando 3 listas
			html+="<article  title>"+titulo+"</article>";
		}
		return html;
	}
	destruirNod(){
	  var nodo = this.nodo;
	  var slot = this;
	  nodo.classList.add('desaparecer');
	  setTimeout(function(){
	    nodo.classList.add('desaparecerPorCompleto');
	  },510);
	  setTimeout(function(){
	    nodo.parentNode.removeChild(nodo);
	  },1110);
	}
	activar(){
		if(this.atributos.columnas===1){
		  this.nodo.getElementsByTagName('article')[0].click();
		}else{
			this.nodo.click();
		}
	}
	buscarCelda(nombre) {
		for (var i = 0; i < this.columnas.length; i++) {
			if(this.columnas[i].atributos.nombre === nombre){
				return this.columnas[i];
			}
		}
		return false;
	}
}

export class Lista {
	constructor(data){
		this.Slots = [];
		this.atributos = data;
		this.atributos.nombre = data.nombre || data.titulo;
		this.atributos.onclickSlot = this.atributos.onclickSlot || null;
		this.clases = data.clases || [];
		this.columnas = data.columnas || 1;

		//paginacion
		this.paginaActual = 1;
		this.paginas = 1;
		this.valorBusqueda = '';
		this.registrosPorPagina = this.atributos.registrosPorPagina || 12;
		this.tamano = this.atributos.tamano|| 'libre';
		//UI
	  	this.nodo = null;
		this.poseeCabecera = false;
		this.noUsatitulo = data.noUsatitulo || false;

		this.contruir();
	}

	construir(){
	    var contenedor = this.atributos.contenedor || 'noPosee';
	    var nodo = document.createElement('div');
	    nodo.setAttribute('lista','');
	    nodo.setAttribute('mat-window','');

	    //contruir sector busqueda
	    var html='';
			var alto = ((this.tamano==='libre')&&(this.Slots<this.registrosPorPagina))?'auto':parseInt((this.registrosPorPagina*40)+70)+'px';
			var fijo = '';
			if(this.atributos.cabecera){
				if(this.atributos.cabecera.fija){
					fijo = 'fija';
				}
			}
			html+="<section cont-slots style='height:"+alto+"'>";
			if(!this.noUsatitulo){
		    html+="<section busqueda "+fijo+">";
		    html+=	"<div titulo>"+this.atributos.titulo+"</div>";
		    html+=	"<div listBuscar>";
		    html+=		"<input type='text' placeHolder='Buscar...'campBusq>";
		    html+=		"<button type='button' cerrarBusq></button>";
		    html+=	"</div>";
		    html+=	"<button type='button' btnBusq ></button>";
				html+="</section>";
			}
	    html+="</section>";
	    nodo.innerHTML = html;
	    this.nodo = nodo;

	    var botonBusqueda = nodo.querySelector('button[btnBusq]');
	    var botonCerrarBusq = nodo.querySelector('button[cerrarBusq]');
			var lista = this;
			if(botonBusqueda){
		    botonBusqueda.onclick = function(){
					lista.abrirCampoBusqueda();
				};
		    botonCerrarBusq.onclick = function(){
					lista.cerrarCampoBusqueda();
				};
			}

	    //agrego la lista al contenedor
	    if(contenedor !== 'noPosee'){
	      contenedor.appendChild(this.nodo);
	    }

	    //carga de elementos ya sea por busqueda a la BD o que sean suministrados en la
	    //construccion
	    setTimeout(function(){
	      lista.manejarCarga();
	    },10);
	    if(this.atributos.clases){
				UI.manejoDeClases(this);
			}
	}

    manejarPaginacion(){
		if((this.barraPaginacion)||(this.Slots.length === this.registrosPorPagina)){
			if(!this.barraPaginacion){
				this.barraPaginacion = new BarraPaginacion({
					paginas: this.paginas,
					paginaActual: this.paginaActual
				});
				this.nodo.appendChild(this.barraPaginacion.nodo);
			}else{
				this.barraPaginacion.atributos.paginaActual = parseInt(this.paginaActual);
				this.barraPaginacion.atributos.paginas = parseInt(this.paginas);
				this.barraPaginacion.atributos.registrosPorPagina = parseInt(this.registrosPorPagina);
				this.barraPaginacion.agregarPaginas();
			}
			var lista = this;
			this.barraPaginacion.paginas.forEach(function(each){
				each.nodo.onclick = function(e){
					agregarRippleEvent(this,e);
					lista.paginaActual = this.textContent;
					lista.recargar();
				};
			});
			this.barraPaginacion.nodo.querySelector('l').onclick = function(){
				var valor = parseInt(this.previousSibling.value);
				if(!isNaN(valor)){
					if((valor > 0)/*&&(valor <= lista.paginas)*/){
						lista.paginaActual = valor;
						lista.recargar();
					}else {
					  UI.agregarToasts({
					    texto: 'el valor debe ser menor a la cantidad de paginas',
					    tipo: 'web-arriba-derecha-alto'
					  });
					}
				}else{
				  UI.agregarToasts({
				    texto: 'El valor debe ser numerico',
				    tipo: 'web-arriba-derecha-alto'
				  });
				}
			};
		}
	}
	recargar(){
		var yo = this;
		this.limpiarSlots();
		return this.manejarCarga()
			.then(function(){
				yo.removerContenedorCarga();
			});
	}
	manejarCarga(){
	    var carga = this.atributos.carga;
	    //si no posee la info del cuadro de carga toma los valore por defecto
	    if(carga){
	      var contenedor = this.crearContenedorCarga();
	      if(!carga.espera){
	        carga.espera = {
	          contenedor: contenedor,
	          cuadro:{
	            nombre: this.atributos.titulo,
	            mensaje: 'Buscando',
	            clases: ['lista']
	          }
	        };
	      }else{
	        carga.espera.contenedor = contenedor;
	      }
	      if(!carga.peticion){
	        console.log('no se puede realizar una carga de elementos sin una peticion');
	      }else{
	        var lista = this;
					//manejo paginacion
					carga.peticion.pagina = this.paginaActual;
					if(!carga.peticion.valor){
						carga.peticion.valor = this.valorBusqueda;
					}
					carga.peticion.registrosPorPagina = this.registrosPorPagina;

	        return torque.manejarOperacion(carga.peticion,carga.espera)
						.then(function validacionRespuesta(respuesta){
							if(respuesta.success===1){
								return Promise.resolve(respuesta);
							}else{
								return Promise.reject();
							}
						})
						.then(function cargaAutomaticaLista(respuesta){
		          lista.removerContenedorCarga();
							lista.paginas = respuesta.paginas;
							lista.cargarElementos(respuesta.registros)
							 .then(function(){
								 lista.manejarPaginacion();
								 return Promise.resolve();
							 });
						},function(){
							lista.noExistenRegistros();
						})
						.then(function(){
		          if(lista.atributos.carga.respuesta){
		            lista.atributos.carga.respuesta(lista);
		          }
							return Promise.resolve();
		      	});
	    	}
	    }else if(this.atributos.elementos){
	      //si lo elementos de la lista fueron suministrados en la creacion
	      return this.cargarElementos(this.atributos.elementos);
	    }else{
	      console.log('la lista se encuentra vacia');
				return Promise.resolve();
	    }
	}
	limpiarSlots(){
		var longitud =this.Slots.length;
		for (var i = 0; i < longitud; i++) {
			this.quitarSlot(this.Slots[0].atributos);
		}
	}
	crearContenedorCarga(){
	var contenedor = document.createElement('section');
	contenedor.setAttribute('contenedorCarga','');
	this.nodo.querySelector('section[cont-slots]').appendChild(contenedor);
	return contenedor;
	}
	removerContenedorCarga(){
	var nodos = this.nodo.querySelectorAll('section[contenedorCarga]');
		nodos.forEach(function(nodo){
	    nodo.parentNode.removeChild(nodo);
		});
	}
	noExistenRegistros(){
		if(!this.nodo.querySelector('section[cont-slots]').querySelector('section.vacio')){
			var ayuda = document.createElement('section');
			ayuda.classList.add('vacio');
			ayuda.textContent = 'No existen Registros';
			this.nodo.querySelector('section[cont-slots]').appendChild(ayuda);
		}
	}
	abrirCampoBusqueda(){
		var botonBusqueda = this.nodo.querySelector('button[btnbusq]');
		botonBusqueda.parentNode.classList.add('buscar');
			var lista = this;
		setTimeout(function(){
		  botonBusqueda.onclick=function(){
					lista.buscarElementos();
				};
		},10);
	}

	cerrarCampoBusqueda(){
		var botonBusqueda = this.nodo.querySelector('button[btnbusq]');
		this.nodo.querySelector('input[campBusq]').value = "";
	  	botonBusqueda.parentNode.classList.remove('buscar');
		botonBusqueda.click();
		this.controlLista();
		var lista = this;
		setTimeout(function(){
		   botonBusqueda.onclick=function(){lista.abrirCampoBusqueda();};
		},20);
	}

	buscarElementos(){
		this.atributos.carga.peticion.valor = this.nodo.querySelector('input[campBusq]').value.toUpperCase();
		this.recargar();
	}

	listarSlots(){
		console.log('Slots:');
		for(var x=0;x<this.Slots.length;x++){
		  console.log('nombre: '+this.Slots[x].atributos.nombre+'\testado: '+this.Slots[x].estado);
		}
	}
	agregarSlot(data){
		if(data){//informacion que necesito que llegue al slot
			data.columnas = this.columnas;
			data.editable = this.atributos.editable;
		}
		var slot = new Slot(data);
			if( this.nodo.querySelector('section.vacio')){
				var vacio = this.nodo.querySelector('section.vacio');
				vacio.parentNode.removeChild(vacio);
				if((!this.noUsatitulo)&&(!this.poseeCabecera)){
					slot.nodo.classList.add('primero');
				}
			}
		this.Slots.push(slot);
		this.nodo.querySelector('section[cont-slots]').appendChild(slot.nodo);
		var lista = this;
		//callback section
		if(this.atributos.onclickSlot!==null){
		  slot.nodo.onclick = function(){
		    lista.controlLista(slot);
		    lista.atributos.onclickSlot(slot);
		  };
		}
		if(this.atributos.onSelect){
			if(slot.selector){
				slot.selector.agregarOnSelect(this.atributos.onSelect,slot);
			}
		}
		if(this.atributos.onDeselect){
			if(slot.selector){
				slot.selector.agregarOnDeselect(this.atributos.onDeselect,slot);
			}
		}
			this.verificarBoton();
		return slot.nodo;
	}
	quitarSlot(objeto){
		var slot = this.buscarSlot(objeto);
		slot.destruirNodo();
		this.Slots.splice(this.Slots.indexOf(slot),1);
		if(!this.Slots.length){
			this.noExistenRegistros();
		}
		this.verificarBoton();
	}
	verificarBoton(){
		if(!this.noUsatitulo){
			if(this.Slots.length<this.registrosPorPagina){
				this.nodo.querySelector('button[btnBusq]').classList.add('invisible');
			}else{
				this.nodo.querySelector('button[btnBusq]').classList.remove('invisible');
			}
		}
	}
  	cargarElementos(registros){
		if(this.columnas !== 1){
			if(!this.atributos.sinCabecera){
				this.agregarCabecera(registros);
			}
		}
	    for(var x=0; x<registros.length;x++){
				registros[x].selector = this.atributos.selector;
	      this.agregarSlot(registros[x]);
	    }
		if((!this.noUsatitulo)&&(!this.poseeCabecera)){
			if(this.Slots[0]){
					this.Slots[0].nodo.classList.add('primero');
			}
		}
		return Promise.resolve();
	}
	agregarCabecera(registros){
		this.poseeCabecera = true;
		var cabeceras = {};
		var x = 0;
		if(!this.cabecera){
			for (var variable in registros[0]) {
				if(x < this.columnas){
					if (registros[0].hasOwnProperty(variable)){
						cabeceras[variable]=variable;
						x++;
					}
				}else{
					break;
				}
			}
			cabeceras.tipo = 'cabecera';
			cabeceras.selector = this.atributos.selector;
			this.agregarSlot(cabeceras);
			var newSlot = this.Slots[0];
			this.cabecera = newSlot;
			this.cabecera.nodo.setAttribute('cabecera','');
			if(!this.noUsatitulo){
				this.cabecera.nodo.classList.add('primero');
			}
			var lista = this;
			if(newSlot.selector){
				newSlot.selector.check.asignarClick(function(){
					var marcado = newSlot.selector.check.marcado;
					lista.Slots.forEach(function(slot){
						if(slot.selector.check.marcado !== marcado){
							slot.selector.activar();
						}
					});
				});
			}
			this.Slots.splice(this.Slots.indexOf(newSlot),1);
		}
		if(this.atributos.cabecera){
			if(this.atributos.cabecera.fija){
				this.cabecera.nodo.setAttribute('fija','');
			}
		}
	}
  	controlLista(slot){
	    for(var x=0;x<this.Slots.length;x++){
	        this.Slots[x].estado='enUso';
	        this.Slots[x].nodo.classList.remove('seleccionado');
	    }
		if(slot){
		    slot.estado='seleccionado';
		    slot.nodo.classList.add('seleccionado');
		}
	}

	buscarSlot(objeto){
		if(objeto){
			for(x=0;x<this.Slots.length;x++){
				if(this.Slots[x].atributos.codigo==objeto.codigo){
					return this.Slots[x];
				}
			}
		}
		console.log('el slot no existe');
		return false;
	}

	buscarSlotPorNombre(objeto){
		for(x=0;x<this.Slots.length;x++){
		  if(this.Slots[x].atributos.nombre==objeto.nombre){
		    return this.Slots[x];
		  }
		}
		console.log('el slot no existe');
		return false;
	}

	cambiarTextoSlots(cambio){
		if(cambio=='mediaQuery'){
		  for(var x=0;x<this.Slots.length;x++){
		    var nodo=this.Slots[x].nodo;
		    var slot=this.Slots[x];
		    var titulo;
		    titulo=slot.atributos.nombre;
		    var html="<article  title>"+titulo+"</article>]";
		    nodo.innerHTML=html;
		    slot.funcionamiento();
		  }
		}else{
		  for(var i=0;i<this.Slots.length;i++){
		    var contenido = "<article  title>"+this.Slots[i].atributos.nombre+"</article>";
		    this.Slots[i].nodo.innerHTML = contenido;
		    this.Slots[i].funcionamiento();
		  }
		}
	}

	actualizarLista(cambios){
		if(cambios instanceof Array){

		}else{
		  this.actualizarSlot(cambios);
		}
	}

	actualizarSlot(objeto){
		var slot=this.buscarSlot(objeto);
		var yo = this;
		if(slot){
		  slot.atributos=UI.juntarObjetos(objeto,{columnas:this.atributos.columnas,selector:this.atributos.selector});
		  slot.reconstruirNodo();
		  setTimeout(function() {
		    yo.controlLista(slot);
		  }, 510);
		}
	}

	obtenerSeleccionado(){
		var seleccionado = [];
		for(var x=0;x<this.Slots.length;x++){
		  if(this.Slots[x].estado=='seleccionado'){
		    seleccionado.push(this.Slots[x]);
		  }
		}
		if(seleccionado.length == 1){
			return seleccionado[0];
		}else if(seleccionado.length > 1){
			return seleccionado;
		}else{
			return false;
		}

	}
  	destruirNodo(){
		this.nodo.style.height='0px';
		var l = this;
		setTimeout(function(){
			l.nodo.parentNode.removeChild(l.nodo);
		},510);
	}
}

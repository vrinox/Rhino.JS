export class CampoDeTexto {
	constructor(info){
		this.data = info;
		this.estado = 'porConstriur';
		this.data.eslabon = info.eslabon || 'simple';
		this.data.usaToolTip = info.usaToolTip ||  false;
		this.data.usaMinuscula = info.usaMinuscula || false;
		this.nodo = null;

		this.construir();
	}

	construir(){
		var CampoDeTexto = document.createElement('div');
		CampoDeTexto.classList.toggle('group');
		CampoDeTexto.setAttribute(this.data.eslabon,'');
		var html='';
		max=(info.max)?"maxlength="+info.max:'';
		if(this.data.tipo=='simple'){
			html+='<input type="text" name="'+this.data.nombre+'" value="" '+max+' required>';
		}else if(this.data.tipo=='password'){
			html+='<input type="password" name="'+this.data.nombre+'" '+max+' value="" required>';
		}else if(this.data.tipo=='area'){
			html+='<textarea name="'+this.data.nombre+'" required></textarea>';
		}else{
			console.log(this.data.tipo);
		}

		html+='<span class="highlight"></span>'+
		      '<span class="bar"></span>'+
		    	'<label>'+this.data.titulo+'</label>';
		CampoDeTexto.innerHTML=html;
		this.nodo=CampoDeTexto;
		if(this.data.usaToolTip!==false){
			this.nodo.onmouseover=UI.elementos.maestro.abrirtooltipInput;
			this.nodo.onmouseout=UI.elementos.maestro.cerrartooltipInput;
		}
		this.estado='enUso';
		if(this.data.valor){
			this.asignarValor(this.data.valor);
			this.data.valor = null;
		}
	}
	captarValor(){
		var tipo = this.captarTipo();
		var valor;
		if(this.nodo.querySelector(tipo).value===''){
			valor = null;
		}else{
			valor = this.nodo.querySelector(tipo).value;
			if(!this.data.usaMinuscula){
				valor = valor.toUpperCase();
			}
		}
		return valor;
	}
	captarNombre(){
		var tipo = this.captarTipo();
		return this.nodo.querySelector(tipo).name;
	}
	captarTipo(){
		var tipo;
		if(this.data.tipo==='area'){
			tipo = 'textarea';
		}else{
			tipo = 'input';
		}
		return tipo;
	}
	captarRequerido(){
		return this.data.requerido;
	}
	asignarValor(valor) {
		var tipo = this.captarTipo();
		this.nodo.querySelector(tipo).value = valor;
	}
	habilitar(){
		this.nodo.classList.remove('deshabilitado');
		this.nodo.querySelector(this.captarTipo()).disabled = false;
		this.nodo.querySelector(this.captarTipo()).focus();
	}
	deshabilitar(){
		this.nodo.classList.add('deshabilitado');
		this.nodo.querySelector(this.captarTipo()).disabled = true;
	}
	limpiar(){
		this.asignarValor("");
	}
}

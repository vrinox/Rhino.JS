var SaltoDeLinea = function(){
	this.nodo = null;
	this.construirNodo = function(){
		var nodo = document.createElement('div');
		nodo.setAttribute('clear','');
		this.nodo = nodo;
	};
	this.construirNodo();
};
class SaltoDeLinea {
	constructor(){
		this.nodo = null;
	}
	construirNodo(){
		var nodo = document.createElement('div');
		nodo.setAttribute('clear','');
		this.nodo = nodo;
	};
};
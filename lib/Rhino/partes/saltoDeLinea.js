export class SaltoDeLinea {
	constructor(){
		this.nodo = null;

		this.construirNodo();
	}
	construirNodo(){
		var nodo = document.createElement('div');
		nodo.setAttribute('clear','');
		this.nodo = nodo;
	}
}

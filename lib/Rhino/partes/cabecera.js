export class Cabecera {
	constructor(){
		this.estado = 'porConstriur';
		this.nodo = null;
		this.construir();
	}

	construir(){
		var contenedor = obtenerContenedor();
		var elemento = document.createElement('div');
		elemento.setAttribute('cabecera','');
		elemento.innerHTML = "<button type='button' menuBtn id='menuBtn'><i class='material-icons md-36 white'>menu</i></button><div titulo>Rhino</div>";
		contenedor.insertBefore(elemento,contenedor.firstChild);
		this.funcionamientoBoton();
		this.estado='enUso';
		this.nodo = elemento;
	}
	cambiarTexto(texto){
		this.nodo.querySelector('div[titulo]').innerHTML = texto;
	}
	funcionamientoBoton() {
		//funcionamiento boton
		var botonMenu=document.getElementById('menuBtn');
		botonMenu.onclick=function(){
			var menu = document.getElementById('menu');
			if(menu.getAttribute('estado')=='visible'){
				menu.setAttribute('estado','oculto');
			}else if(menu.getAttribute('estado')=='oculto'){
				menu.setAttribute('estado','visible');
			}
		};
	}
}

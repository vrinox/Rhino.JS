class Url {
	constructor(){
		this.estado = 'construido';
	}
	captarParametroPorNombre(nombre) {
	    nombre = nombre.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + nombre + "=([^&#]*)"),
	    results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};
	actual(){
		var actual = this.obtenerArchivodeURl(location.href);
		actual = this.limpiarURL(actual);
		return actual;
	};
	obtenerArchivodeURl(ruta){
		return ruta.split('/')[ruta.split('/').length-1];
	};
	limpiarURL(url){
		var valorGET = (url.indexOf('?') === -1)?url.length:url.indexOf('?');
		url = url.slice(0,valorGET);
		return url;
	};
};
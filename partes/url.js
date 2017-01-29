var Url = function(){
	this.estado = 'construido';
	this.captarParametroPorNombre = function(nombre) {
    nombre = nombre.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + nombre + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};
	this.actual = function(){
		var actual = this.obtenerArchivodeURl(location.href);
		actual = this.limpiarURL(actual);
		return actual;
	};
	this.obtenerArchivodeURl = function(ruta){
		return ruta.split('/')[ruta.split('/').length-1];
	};
	this.limpiarURL = function(url){
		var valorGET = (url.indexOf('?') === -1)?url.length:url.indexOf('?');
		url = url.slice(0,valorGET);
		return url;
	};
};
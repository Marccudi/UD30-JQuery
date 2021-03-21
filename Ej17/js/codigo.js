window.onload = function(){ //Acciones tras cargar la página
    pantalla=$("#textoPantalla");
    document.onkeydown = teclado; //función teclado disponible
    }
    numPantalla="0"; //numero de la pantalla
    numEnPantalla=1; //número en pantalla? 1=si; 0=no;
    coma=0; //coma? 0=no, 1=si;
    numOculto=0; //número oculto o en espera.
    operacion="no"; //operación en curso; "no" =  sin operación.
    
    //mostrar número en pantalla según se va escribiendo:
    function numero(num) { 
             if (numPantalla=="0" || numEnPantalla==1  ) {	 
                pantalla.html(num);//mostrar en pantalla
                
                numPantalla=num; 
                if (num==".") { //si escribimos una coma al principio del número
                   pantalla.html("0.")
                   numPantalla=num; 
                   coma=1; 
                   }
               }
               else { 
                   if (num=="." && coma==0) { //si escribimos una coma decimal pòr primera vez
                        pantalla.append(num);
                       numPantalla+=num;
                       coma=1; 
                   }
                   //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
                   else if (num=="." && coma==1) {} 
                   //Resto de casos: escribir un número del 0 al 9: 	 
                   else {
                        pantalla.append(num);
                       numPantalla+=num
                   }
                }
                numEnPantalla=0 //el número está iniciado y podemos ampliarlo.
             }

    function operar(signo) {
             igualar() //si hay operaciones pendientes se realizan primero
             numOculto=numPantalla //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
             operacion=signo; //guardamos signo de la operación.
             numEnPantalla=1; //inicializar pantalla.
             }	
    function igualar() {
             if (operacion=="no") { //no hay ninguna operación pendiente.
                pantalla.html(numPantalla);//mostramos el mismo número
                }
             else { 
                cadenaOpera=numOculto+operacion+numPantalla; // escribimos la operación en una cadena
                codOperac=eval(cadenaOpera) //convertimos la cadena a código y resolvemos
                pantalla.html(codOperac);
                numPantalla=codOperac; //guardamos la solución
                operacion="no"; 
                numEnPantalla=1; 
                }
            }
    function raizc() {
             numPantalla=Math.sqrt(numPantalla) //resolver raíz cuadrada.
             pantalla.html(numPantalla);
             operacion="no";
             numEnPantalla=1; 
             }
    function porcent() { 
             numPantalla=numPantalla/100; //dividir por 100 el número
             pantalla.html(numPantalla);
             igualar() //resolver y mostrar operaciones pendientes
             numEnPantalla=1 
             }
    function opuest() { 
             num=Number(numPantalla); 
             num=-num; 
             numPantalla=String(num); 
             pantalla.html(numPantalla);
             }
    function inve() {
             num=Number(numPantalla);
             num=(1/num);
             numPantalla=String(num);	
             pantalla.html(numPantalla);
             numEnPantalla=1; 
             }
    
    function retro(){ //Borrar sólo el último número escrito.
             cifras=numPantalla.length; //hayar número de caracteres en pantalla
             ultCarac=numPantalla.substr(cifras-1,cifras) //describir último caracter
             numPantalla=numPantalla.substr(0,cifras-1) //quitar el ultimo caracter
             if (numPantalla=="") {numPantalla="0";} //si ya no quedan caracteres, pondremos el 0
             if (ultCarac==".") {coma=0;} //Si el caracter quitado es la coma, se permite escribirla de nuevo.
             pantalla.html(numPantalla);
             }
    function borradoParcial() {
            pantalla.html(0);
            numPantalla=0;
            coma=0;				
            }
    function borradoTotal() {
            pantalla.html(0);
             numPantalla="0"; 
             coma=0; 
             numOculto=0;
             operacion="no";
             }
    function teclado (elEvento) { 
             evento = elEvento || window.event;
             numCodTec=evento.keyCode;
             //teclas númericas del teclado alfamunérico
             if (numCodTec>47 && numCodTec<58) { 
                p=numCodTec-48; //buscar número a mostrar.
                p=String(p) //convertir a cadena para poder a&ntilde;á;dir en pantalla.
                numero(p); //enviar para mostrar en pantalla
                }	
             //Teclas del teclado númerico. Seguimos el mismo procedimiento que en el anterior.
             if (numCodTec>95 && numCodTec<106) {
                p=numCodTec-96;
                p=String(p);
                numero(p);
                }
             if (numCodTec==110 || numCodTec==190) {numero(".")} //teclas de coma decimal
             if (numCodTec==106) {operar('*')} //tecla multiplicación
             if (numCodTec==107) {operar('+')} //tecla suma
             if (numCodTec==109) {operar('-')} //tecla resta
             if (numCodTec==111) {operar('/')} //tecla división
             if (numCodTec==32 || numCodTec==13) {igualar()} //Tecla igual: intro o barra espaciadora
             if (numCodTec==46) {borradoTotal()} //Tecla borrado total: "supr"
             if (numCodTec==8) {retro()} //Retroceso en escritura : tecla retroceso.
             if (numCodTec==36) {borradoParcial()} //Tecla borrado parcial: tecla de inicio.
             }
    
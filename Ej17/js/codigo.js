window.onload = function(){
    pantalla=$("#textoPantalla");
    document.onkeydown = teclado;
    }
    numPantalla="0";
    numEnPantalla=1;
    coma=0;
    numOculto=0;
    operacion="no"; 
    
   
    function numero(num) { 
             if (numPantalla=="0" || numEnPantalla==1  ) {	 
                pantalla.html(num);
                
                numPantalla=num; 
                if (num==".") { 
                   pantalla.html("0.")
                   numPantalla=num; 
                   coma=1; 
                   }
               }
               else { 
                   if (num=="." && coma==0) { 
                        pantalla.append(num);
                       numPantalla+=num;
                       coma=1; 
                   }
                   
                   else if (num=="." && coma==1) {} 
                    	 
                   else {
                        pantalla.append(num);
                       numPantalla+=num
                   }
                }
                numEnPantalla=0; 
             }

    function operar(signo) {
             igualar() 
             numOculto=numPantalla 
             operacion=signo; 
             numEnPantalla=1;
             }	
    function igualar() {
             if (operacion=="no") {
                pantalla.html(numPantalla);
                }
             else { 
                cadenaOpera=numOculto+operacion+numPantalla;
                codOperac=eval(cadenaOpera);
                pantalla.html(codOperac);
                numPantalla=codOperac; 
                operacion="no"; 
                numEnPantalla=1; 
                }
            }
    function raizc() {
             numPantalla=Math.sqrt(numPantalla)
             pantalla.html(numPantalla);
             operacion="no";
             numEnPantalla=1; 
             }
    function porcent() { 
             numPantalla=numPantalla/100; 
             pantalla.html(numPantalla);
             igualar()
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
    
    function retro(){
             cifras=numPantalla.length;
             ultCarac=numPantalla.substr(cifras-1,cifras) 
             numPantalla=numPantalla.substr(0,cifras-1)
             if (numPantalla=="") {numPantalla="0";} 
             if (ultCarac==".") {coma=0;}
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
             if (numCodTec>47 && numCodTec<58) { 
                p=numCodTec-48;
                p=String(p);
                numero(p);
                }	
             if (numCodTec>95 && numCodTec<106) {
                p=numCodTec-96;
                p=String(p);
                numero(p);
                }
             if (numCodTec==110 || numCodTec==190) {numero(".")} 
             if (numCodTec==106) {operar('*')} 
             if (numCodTec==107) {operar('+')} 
             if (numCodTec==109) {operar('-')}
             if (numCodTec==111) {operar('/')} 
             if (numCodTec==32 || numCodTec==13) {igualar()} 
             if (numCodTec==46) {borradoTotal()} 
             if (numCodTec==8) {retro()}
             if (numCodTec==36) {borradoParcial()}
             }
    
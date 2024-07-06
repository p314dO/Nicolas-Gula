---
title: Analisis de trafico - Parte 2
description: Introduccion al analisis de trafico
excerpt:
  En esta ocasion comenzaremos a utilizar Tcpdump, una herramienta de linea de comandos que puede capturar e interpretar el trafico de un archivo o desde una interfaz de red.
datetime: 2024-05-13T20:35:07.000+00:00
tags:
  - Wireshark
  - Traffic Analysis
  - Tcpdump
featured: true
category: What is ?
author: Nicolas Gula
type: article
coverImage:  https://learn.g2.com/hubfs/G2CM_FI634_Learn_Article_Images_%5BNetwork_traffic_analysis%5D_V1a.png
coverImageAlt: Microsoft AD
coverImageWidth: "2725"
coverImageHeight: "1400"
ogImage: "/assets/blog/hello-world/cover.jpg"
ogImageAlt: something
language: "Spanish"
---

## Tcpdump

Tcpdump es una herramienta de línea de comandos que captura y analiza paquetes de datos desde una interfaz de red o archivo. Es compatible con sistemas Unix y Windows (a través de WinDump) y puede ser utilizado remotamente mediante SSH. Aunque inicialmente puede parecer abrumador debido a su variedad de funciones y filtros, una vez dominadas las funciones esenciales, se vuelve fácil de usar. Utiliza bibliotecas como pcapy y libpcap para capturar paquetes de cualquier dispositivo en la red local, permitiendo una visualización completa del tráfico de red.

Para comenzar a utilizar Tcpdump, es crucial familiarizarse con sus características esenciales. Esto incluye comprender algunas opciones básicas, aprender comandos y cómo capturar tráfico en archivos PCAP y leerlos después.

### Localizar Tcpdump

![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/tcpdump/1.png)

### Instalar Tcpdump
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/tcpdump/2.png)

### Version

![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/tcpdump/3.png)

## Captura de trafico

Estos comandos se pueden combinar para controlar cómo se muestra la salida en STDOUT y qué se guarda en el archivo de captura. Aunque no son todos los disponibles, estos son los más comunes y útiles.

- **-D**: Muestra las interfaces disponibles para capturar.
- **-i**: Selecciona una interfaz para capturar (por ejemplo, -i eth0).
- **-n**: No resuelve nombres de host.
- **-nn**: No resuelve nombres de host ni puertos conocidos.
- **-e**: Captura la cabecera Ethernet junto con los datos de la capa superior.
- **-X**: Muestra el contenido de los paquetes en formato hexadecimal y ASCII.
- **-XX**: Lo mismo que -X, pero especifica también las cabeceras Ethernet.
- **-v, -vv, -vvv**: Aumenta la verbosidad de la salida mostrada y guardada.
- **-c**: Captura un número específico de paquetes y luego finaliza el programa.
- **-s**: Define cuánto del paquete capturar.
- **-S**: Cambia los números de secuencia relativos en la visualización de la captura a números de secuencia absolutos (13248765839 en lugar de 101).
- **-q**: Imprime menos información de protocolo.
- **-r file.pcap**: Lee desde un archivo.
- **-w file.pcap**: Escribe en un archivo.

### Interfaces disponibles

![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/tcpdump/4.png)



### Elegir Interfaz

En esta terminal, usamos tcpdump y seleccionamos la interfaz eth0 para capturar el tráfico. Al emitir el comando, tcpdump comenzará a rastrear el tráfico y mostrará los primeros paquetes en la interfaz. 

![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/tcpdump/5.png)


### Deshabilitar la resolucion de nombres

Al utilizar el interruptor -nn, indicamos a tcpdump que no resuelva direcciones IP ni números de puerto en nombres de host y puertos comunes. En esta representación, el último octeto indica el puerto de origen/destino de la conexión.

![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/tcpdump/6.png)


### Mostrar el encabezado Ethernet

Al usar el interruptor -e, indicamos a tcpdump que incluya los encabezados de Ethernet en la salida de la captura junto con su contenido habitual. Esto se evidencia en el resultado, donde el primer y segundo campo, que generalmente constan de la marca de tiempo y el inicio del encabezado IP, ahora muestran la marca de tiempo y la dirección MAC de origen del host.

![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/tcpdump/7.png)

### Incluye salida ASCII y hexadecimal 

Al usar el interruptor -X, podemos visualizar el paquete de manera más clara. Esto nos proporciona una salida ASCII a la derecha para interpretar el texto claro correspondiente a la salida hexadecimal a la izquierda.

![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/tcpdump/8.png)


## Tcpdump Output

Revisar los resultados de TCPDump puede ser abrumador al principio. Sin embargo, al analizar los interruptores básicos que hemos utilizado, hemos obtenido diferentes vistas del tráfico capturado. Es importante tomarnos un momento para comprender este resultado y explicar lo que estamos viendo. Cada campo en la salida tiene su significado, y cuanto más detallados sean nuestros filtros, más información se mostrará en cada encabezado.

![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/tcpdump/9.png)

- Amarillo: Marca de tiempo.
- Verde: Protocolo. En este caso TCP. Origen y destino. IP.port == 172.64.147.188.443
- Celeste: Flags utilizadas.
- Azul: Numeros de secuencia y de confirmacion utilizados para rastrear el segmento TCP.
- Violeta: Opciones de protocolo. Valores TCP negociados entre el cliente y el servidor.

Con TCPDump, podemos ver el tráfico de red y analizarlo en busca de problemas o interacciones sospechosas. Esto requiere comprender cómo funciona una red y cómo usar los filtros proporcionados por TCPDump. Con esta comprensión, podemos identificar rápidamente anomalías en la red. Por ejemplo, podemos crear un sistema IDS/IPS utilizando TCPDump y un script Bash para analizar paquetes interceptados y tomar medidas según un patrón específico, como prohibir una dirección IP que envíe demasiadas solicitudes de eco ICMP en un período determinado.


## Entrada/salida de archivos con Tcpdump 

Al usar `-w`, guardaremos nuestra captura en un archivo. Es importante considerar que al capturar tráfico de red, podemos ocupar rápidamente el espacio de almacenamiento en el disco. Cuanto más grande sea nuestro segmento de red, más rápido se llenará el almacenamiento. El uso de los conmutadores demostrados anteriormente puede ayudar a ajustar la cantidad de datos almacenados en nuestros archivos PCAP.

## Laboratorio HackTheBox

>Como nuevo administrador de red de la Corporación, me han encargado capturar parte del tráfico de la red para establecer una base y validar la red. Para comenzar, utilizaremos tcpdump para capturar el tráfico de nuestro dominio de transmisión local. Es importante asegurarnos de que todas las herramientas necesarias estén instaladas y probar nuestra capacidad para leer y capturar el tráfico en un archivo.

#### Tarea 1 - Validar que Tcpdump este instalado

```
~> which tcpdump
  /usr/bin/tcpdump
```

#### Tarea 2 - Empezar la captura de trafico

Primero vemos que posibles interfaces tenemos disponibles para escuchar

```
~> sudo tcpdump -D
  1.eth0 [Up, Running, Connected]
  2.br-44048ed20eea [Up, Running, Connected]
  3.veth2789d4f [Up, Running, Connected]
  4.vethfbdd91d [Up, Running, Connected]
  5.any (Pseudo-device that captures on all interfaces) [Up, Running]
  6.lo [Up, Running, Loopback]
  7.br-8b6c301e121f [Up, Disconnected]
  8.docker0 [Up, Disconnected]
```

Luego , iniciamos la captura.
```
~> sudo tcpdump -i eth0
```

#### Tarea 3 - Utilizar filtros basicos de captura

```
~> tcpdump -i eth0 -vX
```

```
~> tcpdump -i eth0 -vnS
```

#### Tarea 4 - Guardar la captura en un archivo .PCAP

```
~> tcpdump -i eth0 -nvw Logs/first.pcap
```

#### Tarea 5 - Leer la captura de un archivo .PCAP

```
~> tcpdump -nnSXr Logs/file.pcap
```

## Filtrado de paquetes

### Opciones de filtrado

El uso de opciones de filtrado avanzadas en tcpdump nos permite reducir la cantidad de tráfico capturado y escrita en el disco. Esto ayuda a ahorrar espacio y a procesar los datos de manera más eficiente. Estos filtros pueden ser tan amplios o específicos como necesitemos, desde capturar paquetes de un host en particular hasta buscar un bit específico en el encabezado TCP. Es importante explorar y experimentar con diferentes combinaciones de filtros para adaptarlos a nuestras necesidades específicas.

- **host**: Filtrará el tráfico visible para mostrar cualquier cosa que involucre al host designado. Bidireccional 
- **src / dst**: Podemos usarlos para designar un host o puerto de origen o destino. 
- **net**: nos mostrará cualquier tráfico procedente o destinado a la red designada. Utiliza notación /. 
- **proto**: Filtrará por un tipo de protocolo específico. (éter, TCP, UDP e ICMP como ejemplos) 
- **port**:  Mostrará cualquier tráfico con el puerto especificado como origen o destino. 
- **portrange**: Nos permite especificar un rango de puertos. (0-1024) 
- **less / greater "<>"**: Se puede utilizar para buscar una opción de paquete o protocolo de un tamaño específico. 
- **and / &&**: Se puede utilizar para concatenar dos filtros diferentes. por ejemplo, src host Y puerto. 
- **or**: Permite una coincidencia en cualquiera de dos condiciones. No es necesario que cumplan ambos. Puede ser complicado. 
- **not**: Es un modificador que dice __cualquier cosa menos x__. Por ejemplo, __no UDP__. 

### Filtro host
Al usar el filtro **host**, cualquier IP que ingresemos se verificará en el campo IP de origen o destino. 

```
~> sudo tcpdump -i eth0 host 192.168.1.20 
```

Este filtro se usa para enfocarnos en un host o servidor específico, permitiéndonos examinar su comunicación y comprender su actividad en la red.

### Filtro src/dst

```
~> sudo tcpdump -i eth0 src host 192.168.1.20 
```

Los filtros de source y dst nos permiten centrarnos en las direcciones de comunicación. Por ejemplo, al especificar el origen del host como 192.168.1.20, solo capturaremos los paquetes enviados desde este host. Esto también se aplica a puertos y rangos de direcciones IP. Por ejemplo, utilizando el filtro "src port #", podemos enfocarnos en paquetes enviados desde un puerto específico.

```
~> sudo tcpdump -i eth0 tcp src 80 
```

### Uso del dst en combinación con el filtro de net 

```
~> sudo tcpdump -i eth0 dst net 192.168.1.0/24
```

Al utilizar "net" de esta manera, capturaremos todo el tráfico destinado a la red especificada. Por ejemplo, en el comando sudo tcpdump -i eth0 dst net 192.168.1.0/24, estamos buscando cualquier tráfico dirigido a la red 192.168.1.0/24.

### Filtro por protocolo

Este filtro puede usar tanto el nombre del protocolo común como el número de protocolo para IP, IPv6 o Ethernet. Por ejemplo, tcp[6], udp[17], o icmp[1]. Ambas formas producen el mismo resultado y son intercambiables en su mayor parte. El uso del nombre común es útil para una lectura más fácil, mientras que el número de protocolo es más útil al analizar partes específicas del encabezado del protocolo.

```
~> sudo tcpdump -i eth0 udp
```

```
~> sudo tcpdump -i eth0 proto 17
```

### Filtro port

El filtro port nos permite especificar qué tráfico queremos capturar basado en los puertos utilizados por los protocolos. Por ejemplo, el tráfico HTTP generalmente utiliza los puertos 80 y 443 con TCP. Filtrar por el puerto 80 mostrará todo el tráfico en ese puerto, pero para capturar específicamente el tráfico HTTP, usamos tcp port 80. Para protocolos que utilizan tanto TCP como UDP, como DNS (puerto 53), podemos filtrar por tcp port 53 o udp port 53, dependiendo del protocolo que queramos monitorear.

```
~> sudo tcpdump -i eth0 port 443
```

#### Filtro por rangos de puertos

El filtro portrange nos permite especificar un rango de puertos para capturar tráfico. Esto es útil para monitorear cualquier tráfico que provenga de puertos que no coincidan con los servicios habituales en nuestros servidores. Por ejemplo, si nuestro servidor web normalmente utiliza los puertos TCP 80 y 443, pero observamos tráfico saliente desde el puerto TCP 10000, esto podría indicar actividad sospechosa. Con portrange, podemos capturar y examinar todo el tráfico dentro de ese rango de puertos para detectar cualquier anomalía.

```
~> sudo tcpdump -i eth0 portrange 0-1024
```

### Filtro > / <

El modificador menor que (<) nos permite filtrar paquetes por tamaño, en este caso buscando aquellos que sean menores de 64 bytes. Esta técnica es útil para identificar ciertos tipos de paquetes, como los SYN, FIN o KeepAlive, que tienden a ser pequeños. Por otro lado, el modificador mayor que (>) se puede utilizar para buscar paquetes de un tamaño específico o más grande. Por ejemplo, si queremos capturar solo el tráfico que incluya transferencias de archivos, podemos usar greater 500 para filtrar paquetes mayores de 500 bytes, descartando así paquetes irrelevantes.

```
~> sudo tcpdump -i eth0 less 64
```

```
~> sudo tcpdump -i eth0 greater 500
```

### Filtro AND

El modificador AND nos permite combinar múltiples criterios de filtrado para capturar solo los paquetes que cumplan con todos los requisitos especificados. Por ejemplo, host 10.12.1.122 and tcp port 80 buscará paquetes que provengan del host especificado y que además contengan tráfico TCP del puerto 80. Ambos criterios deben cumplirse para que el filtro capture el paquete. Esto nos permite refinar nuestra búsqueda y concentrarnos en el tráfico relevante para nuestro análisis.

```
~> sudo tcpdump -i eth0 host 192.168.0.1 and port 23
```

## Filtros de precaptura vs Procesamiento posterior a la captura

Al aplicar filtros directamente a la captura, eliminamos el tráfico que no cumple con los criterios establecidos, lo que reduce la cantidad de datos en las capturas. Sin embargo, esto puede eliminar información útil si no se usa con cuidado. Por otro lado, al aplicar filtros al leer un archivo de captura, el filtro analizará el archivo y eliminará cualquier cosa que no coincida con los criterios establecidos, sin modificar permanentemente el archivo. Esto nos permite investigar mientras conservamos datos valiosos en las capturas. Si queremos cambiar o eliminar el filtro, necesitaremos volver a ejecutar el comando con la nueva sintaxis.

## Consejos

El interruptor -S de tcpdump muestra números de secuencia absolutos, que son largos y difíciles de rastrear, pero útiles en ciertos contextos. Por otro lado, -v, -X y -e aumentan la cantidad de datos capturados, mientras que -c, -n, -s, -S y -q reducen y modifican la cantidad de datos escritos y vistos. Otras opciones, como -A y -l, tienen utilidades específicas, como mostrar solo texto ASCII o alinear el búfer para facilitar el análisis. Estas opciones permiten adaptar la captura a las necesidades específicas de cada situación.


## Interrogando el Tráfico de Red con Filtros de Captura y Visualización

### Lab - Leer la captura de trafico sin filtros

```
~> sudo tcpdump -r TCPDump-lab-2.pcap 
```

### Identificar el tipo de trafico

```
11:33:58.310209 IP 172.16.146.2.54940 > server-13-35-106-128.mia3.r.cloudfront.net.https: Flags [.], ack 2816075430, win 501, options [nop,nop,TS val 3512036734 ecr 1767785373], length 0
11:33:58.339426 IP server-13-35-106-128.mia3.r.cloudfront.net.https > 172.16.146.2.54940: Flags [.], ack 1, win 133, options [nop,nop,TS val 1767795554 ecr 3512016550], length 0
11:33:59.078138 IP 172.16.146.2.36918 > 72.21.91.29.http: Flags [.], ack 1583071423, win 501, options [nop,nop,TS val 668700405 ecr 721845285], length 0
11:33:59.100780 IP 72.21.91.29.http > 172.16.146.2.36918: Flags [.], ack 1, win 131, options [nop,nop,TS val 721855485 ecr 668680205], length 0
11:34:00.727327 IP 172.16.146.2.55877 > 23.106.60.92.1337: UDP, length 682
11:34:01.236420 IP 172.16.146.2.57752 > 172.16.146.1.domain: 41819+ A? apache.org. (28)
11:34:01.236610 IP 172.16.146.2.57752 > 172.16.146.1.domain: 46943+ AAAA? apache.org. (28)
11:34:01.237443 IP 172.16.146.1.domain > 172.16.146.2.57752: 41819 2/0/0 A 95.216.26.30, A 207.244.88.140 (60)
11:34:01.237444 IP 172.16.146.1.domain > 172.16.146.2.57752: 46943 0/1/0 (112)
11:34:01.237834 IP 172.16.146.2.43804 > static.30.26.216.95.clients.your-server.de.http: Flags [S], seq 749874084, win 64240, options [mss 1460,sackOK,TS val 3101551032 ecr 0,nop,wscale 7], length 0
11:34:01.246293 IP 172.16.146.2.43806 > static.30.26.216.95.clients.your-server.de.http: Flags [S], seq 3078186339, win 64240, options [mss 1460,sackOK,TS val 3101551040 ecr 0,nop,wscale 7], length 0
11:34:01.254402 IP 172.16.146.2.52520 > 207.244.88.140.https: Flags [S], seq 75289295, win 64240, options [mss 1460,sackOK,TS val 4062857 ecr 0,nop,wscale 7], length 0
11:34:01.296423 IP 207.244.88.140.https > 172.16.146.2.52520: Flags [S.], seq 2053874896, ack 75289296, win 65160, options [mss 1460,sackOK,TS val 3444223749 ecr 4062857,nop,wscale 7], length 0
11:34:01.296454 IP 172.16.146.2.52520 > 207.244.88.140.https: Flags [R], seq 75289296, win 0, length 0
11:34:01.389479 IP static.30.26.216.95.clients.your-server.de.http > 172.16.146.2.43804: Flags [S.], seq 2667566931, ack 749874085, win 65160, options [mss 1460,sackOK,TS val 1169094229 ecr 3101551032,nop,wscale 7], length 0
11:34:01.389497 IP 172.16.146.2.43804 > static.30.26.216.95.clients.your-server.de.http: Flags [R], seq 749874085, win 0, length 0
11:34:01.401231 IP static.30.26.216.95.clients.your-server.de.http > 172.16.146.2.43806: Flags [S.], seq 4210180338, ack 3078186340, win 65160, options [mss 1460,sackOK,TS val 1169094240 ecr 3101551040,nop,wscale 7], length 0
11:34:01.401270 IP 172.16.146.2.43806 > static.30.26.216.95.clients.your-server.de.http: Flags [.], ack 1, win 502, options [nop,nop,TS val 3101551195 ecr 1169094240], length 0
11:34:02.216846 IP 172.16.146.2.56506 > 172.16.146.1.domain: 42121+ A? fonts.googleapis.com. (38)
11:34:02.216954 IP 172.16.146.2.56506 > 172.16.146.1.domain: 37006+ AAAA? fonts.googleapis.com. (38)
11:34:02.217577 IP 172.16.146.1.domain > 172.16.146.2.56506: 42121 1/0/0 A 172.217.164.74 (54)
11:34:02.217577 IP 172.16.146.1.domain > 172.16.146.2.56506: 37006 1/0/0 AAAA 2607:f8b0:4002:c06::5f (66)
11:34:02.218395 IP 172.16.146.2.36180 > atl26s18-in-f10.1e100.net.https: Flags [S], seq 2010467125, win 64240, options [mss 1460,sackOK,TS val 3047260657 ecr 0,nop,wscale 7], length 0
11:34:02.230276 IP 172.16.146.2.57344 > static.30.26.216.95.clients.your-server.de.https: Flags [S], seq 1335291809, win 64240, options [mss 1460,sackOK,TS val 3101552024 ecr 0,nop,wscale 7], length 0
11:34:02.230400 IP 172.16.146.2.57346 > static.30.26.216.95.clients.your-server.de.https: Flags [S], seq 3703454174, win 64240, options [mss 1460,sackOK,TS val 3101552024 ecr 0,nop,wscale 7], length 0
11:34:02.240528 IP 172.16.146.2.50587 > 172.16.146.1.domain: 18737+ A? cse.google.com. (32)
11:34:02.240583 IP 172.16.146.2.50587 > 172.16.146.1.domain: 48695+ AAAA? cse.google.com. (32)
11:34:02.241342 IP 172.16.146.1.domain > 172.16.146.2.50587: 18737 6/0/0 A 64.233.177.100, A 64.233.177.101, A 64.233.177.138, A 64.233.177.139, A 64.233.177.102, A 64.233.177.113 (128)
11:34:02.241342 IP 172.16.146.1.domain > 172.16.146.2.50587: 48695 4/0/0 AAAA 2607:f8b0:4002:c08::8b, AAAA 2607:f8b0:4002:c08::66, AAAA 2607:f8b0:4002:c08::8a, AAAA 2607:f8b0:4002:c08::65 (144)
11:34:02.241728 IP 172.16.146.2.56282 > yx-in-f100.1e100.net.https: Flags [S], seq 434948348, win 64240, options [mss 1460,sackOK,TS val 267111940 ecr 0,nop,wscale 7], length 0
11:34:02.244338 IP atl26s18-in-f10.1e100.net.https > 172.16.146.2.36180: Flags [S.], seq 4083845773, ack 2010467126, win 65535, options [mss 1430,sackOK,TS val 669403377 ecr 3047260657,nop,wscale 8], length 0
11:34:02.244374 IP 172.16.146.2.36180 > atl26s18-in-f10.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 3047260683 ecr 669403377], length 0
11:34:02.246232 IP 172.16.146.2.36180 > atl26s18-in-f10.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 3047260685 ecr 669403377], length 513
11:34:02.248289 IP 172.16.146.2.37580 > 172.16.146.1.domain: 2236+ A? www.apachecon.com. (35)
11:34:02.248343 IP 172.16.146.2.37580 > 172.16.146.1.domain: 62143+ AAAA? www.apachecon.com. (35)
11:34:02.249114 IP 172.16.146.1.domain > 172.16.146.2.37580: 2236 3/0/0 CNAME apache.org., A 95.216.26.30, A 207.244.88.140 (91)
11:34:02.249114 IP 172.16.146.1.domain > 172.16.146.2.37580: 62143 1/1/0 CNAME apache.org. (140)
11:34:02.249426 IP 172.16.146.2.57350 > static.30.26.216.95.clients.your-server.de.https: Flags [S], seq 2200825601, win 64240, options [mss 1460,sackOK,TS val 3101552043 ecr 0,nop,wscale 7], length 0
11:34:02.251383 IP 172.16.146.2.57352 > static.30.26.216.95.clients.your-server.de.https: Flags [S], seq 1078838518, win 64240, options [mss 1460,sackOK,TS val 3101552045 ecr 0,nop,wscale 7], length 0
11:34:02.253698 IP 172.16.146.2.57354 > static.30.26.216.95.clients.your-server.de.https: Flags [S], seq 4198690374, win 64240, options [mss 1460,sackOK,TS val 3101552048 ecr 0,nop,wscale 7], length 0
11:34:02.271751 IP yx-in-f100.1e100.net.https > 172.16.146.2.56282: Flags [S.], seq 4254014782, ack 434948349, win 65535, options [mss 1430,sackOK,TS val 3975815628 ecr 267111940,nop,wscale 8], length 0
11:34:02.271795 IP 172.16.146.2.56282 > yx-in-f100.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 267111970 ecr 3975815628], length 0
11:34:02.273839 IP 172.16.146.2.56282 > yx-in-f100.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 267111972 ecr 3975815628], length 513
11:34:02.274624 IP 172.16.146.2.57356 > static.30.26.216.95.clients.your-server.de.https: Flags [S], seq 3761531717, win 64240, options [mss 1460,sackOK,TS val 3101552069 ecr 0,nop,wscale 7], length 0
11:34:02.275675 IP atl26s18-in-f10.1e100.net.https > 172.16.146.2.36180: Flags [.], ack 514, win 261, options [nop,nop,TS val 669403408 ecr 3047260685], length 0
11:34:02.275675 IP atl26s18-in-f10.1e100.net.https > 172.16.146.2.36180: Flags [P.], seq 1:3031, ack 514, win 261, options [nop,nop,TS val 669403409 ecr 3047260685], length 3030
11:34:02.275708 IP 172.16.146.2.36180 > atl26s18-in-f10.1e100.net.https: Flags [.], ack 3031, win 489, options [nop,nop,TS val 3047260715 ecr 669403409], length 0
11:34:02.308827 IP yx-in-f100.1e100.net.https > 172.16.146.2.56282: Flags [.], ack 514, win 261, options [nop,nop,TS val 3975815664 ecr 267111972], length 0
11:34:02.308827 IP yx-in-f100.1e100.net.https > 172.16.146.2.56282: Flags [P.], seq 1:3869, ack 514, win 261, options [nop,nop,TS val 3975815665 ecr 267111972], length 3868
11:34:02.308866 IP 172.16.146.2.56282 > yx-in-f100.1e100.net.https: Flags [.], ack 3869, win 489, options [nop,nop,TS val 267112007 ecr 3975815665], length 0
11:34:02.316675 IP 172.16.146.2.36180 > atl26s18-in-f10.1e100.net.https: Flags [F.], seq 514, ack 3031, win 501, options [nop,nop,TS val 3047260756 ecr 669403409], length 0
11:34:02.317850 IP 172.16.146.2.43822 > 172.16.146.1.domain: 36016+ A? ocsp.pki.goog. (31)
11:34:02.317915 IP 172.16.146.2.43822 > 172.16.146.1.domain: 48316+ AAAA? ocsp.pki.goog. (31)
11:34:02.318282 IP 172.16.146.2.52538 > 207.244.88.140.https: Flags [S], seq 2306239454, win 64240, options [mss 1460,sackOK,TS val 4063921 ecr 0,nop,wscale 7], length 0
11:34:02.320269 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [S], seq 1336999769, win 64240, options [mss 1460,sackOK,TS val 4063923 ecr 0,nop,wscale 7], length 0
11:34:02.320789 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [S], seq 3495722268, win 64240, options [mss 1460,sackOK,TS val 4063924 ecr 0,nop,wscale 7], length 0
11:34:02.326420 IP 172.16.146.2.52544 > 207.244.88.140.https: Flags [S], seq 2920559520, win 64240, options [mss 1460,sackOK,TS val 4063929 ecr 0,nop,wscale 7], length 0
11:34:02.326717 IP 172.16.146.2.57366 > static.30.26.216.95.clients.your-server.de.https: Flags [S], seq 583263839, win 64240, options [mss 1460,sackOK,TS val 3101552121 ecr 0,nop,wscale 7], length 0
11:34:02.342568 IP atl26s18-in-f10.1e100.net.https > 172.16.146.2.36180: Flags [F.], seq 3031, ack 515, win 261, options [nop,nop,TS val 669403473 ecr 3047260756], length 0
11:34:02.342592 IP 172.16.146.2.36180 > atl26s18-in-f10.1e100.net.https: Flags [.], ack 3032, win 501, options [nop,nop,TS val 3047260782 ecr 669403473], length 0
11:34:02.362037 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [S.], seq 1217874227, ack 1336999770, win 65160, options [mss 1460,sackOK,TS val 3444224812 ecr 4063923,nop,wscale 7], length 0
11:34:02.362073 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 4063965 ecr 3444224812], length 0
11:34:02.362037 IP 207.244.88.140.https > 172.16.146.2.52538: Flags [S.], seq 3016816678, ack 2306239455, win 65160, options [mss 1460,sackOK,TS val 3444224814 ecr 4063921,nop,wscale 7], length 0
11:34:02.362128 IP 172.16.146.2.52538 > 207.244.88.140.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 4063965 ecr 3444224814], length 0
11:34:02.362037 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [S.], seq 154622264, ack 3495722269, win 65160, options [mss 1460,sackOK,TS val 3444224814 ecr 4063924,nop,wscale 7], length 0
11:34:02.362207 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 4063965 ecr 3444224814], length 0
11:34:02.363946 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 4063967 ecr 3444224812], length 513
11:34:02.365769 IP 172.16.146.2.52538 > 207.244.88.140.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 4063969 ecr 3444224814], length 513
11:34:02.368009 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 4063971 ecr 3444224814], length 513
11:34:02.368321 IP 207.244.88.140.https > 172.16.146.2.52544: Flags [S.], seq 1742556613, ack 2920559521, win 65160, options [mss 1460,sackOK,TS val 3444224819 ecr 4063929,nop,wscale 7], length 0
11:34:02.368355 IP 172.16.146.2.52544 > 207.244.88.140.https: Flags [R], seq 2920559521, win 0, length 0
11:34:02.369445 IP yx-in-f100.1e100.net.https > 172.16.146.2.56282: Flags [P.], seq 2837:3869, ack 514, win 261, options [nop,nop,TS val 3975815727 ecr 267111972], length 1032
11:34:02.369480 IP 172.16.146.2.56282 > yx-in-f100.1e100.net.https: Flags [.], ack 3869, win 501, options [nop,nop,TS val 267112067 ecr 3975815727,nop,nop,sack 1 {2837:3869}], length 0
11:34:02.384025 IP static.30.26.216.95.clients.your-server.de.https > 172.16.146.2.57344: Flags [S.], seq 2707176023, ack 1335291810, win 65160, options [mss 1460,sackOK,TS val 1169095224 ecr 3101552024,nop,wscale 7], length 0
11:34:02.384045 IP 172.16.146.2.57344 > static.30.26.216.95.clients.your-server.de.https: Flags [R], seq 1335291810, win 0, length 0
11:34:02.386235 IP 172.16.146.2.50588 > 172.16.146.1.domain: 64771+ A? safebrowsing.googleapis.com. (45)
11:34:02.386320 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [S], seq 3571930245, win 64240, options [mss 1460,sackOK,TS val 267112084 ecr 0,nop,wscale 7], length 0
11:34:02.386407 IP 172.16.146.2.50588 > 172.16.146.1.domain: 18689+ AAAA? safebrowsing.googleapis.com. (45)
11:34:02.386835 IP 172.16.146.1.domain > 172.16.146.2.50588: 64771 1/0/0 A 108.177.122.95 (61)
11:34:02.390703 IP static.30.26.216.95.clients.your-server.de.https > 172.16.146.2.57346: Flags [S.], seq 1597382639, ack 3703454175, win 65160, options [mss 1460,sackOK,TS val 1169095229 ecr 3101552024,nop,wscale 7], length 0
11:34:02.390723 IP 172.16.146.2.57346 > static.30.26.216.95.clients.your-server.de.https: Flags [R], seq 3703454175, win 0, length 0
11:34:02.406269 IP static.30.26.216.95.clients.your-server.de.https > 172.16.146.2.57352: Flags [S.], seq 226017062, ack 1078838519, win 65160, options [mss 1460,sackOK,TS val 1169095247 ecr 3101552045,nop,wscale 7], length 0
11:34:02.406298 IP 172.16.146.2.57352 > static.30.26.216.95.clients.your-server.de.https: Flags [R], seq 1078838519, win 0, length 0
11:34:02.406269 IP static.30.26.216.95.clients.your-server.de.https > 172.16.146.2.57354: Flags [S.], seq 713229176, ack 4198690375, win 65160, options [mss 1460,sackOK,TS val 1169095247 ecr 3101552048,nop,wscale 7], length 0
11:34:02.406364 IP 172.16.146.2.57354 > static.30.26.216.95.clients.your-server.de.https: Flags [R], seq 4198690375, win 0, length 0
11:34:02.407626 IP static.30.26.216.95.clients.your-server.de.https > 172.16.146.2.57350: Flags [S.], seq 2422854734, ack 2200825602, win 65160, options [mss 1460,sackOK,TS val 1169095247 ecr 3101552043,nop,wscale 7], length 0
11:34:02.407644 IP 172.16.146.2.57350 > static.30.26.216.95.clients.your-server.de.https: Flags [R], seq 2200825602, win 0, length 0
11:34:02.410908 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [S.], seq 510939300, ack 3571930246, win 65535, options [mss 1430,sackOK,TS val 3266376508 ecr 267112084,nop,wscale 8], length 0
11:34:02.410937 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 267112109 ecr 3266376508], length 0
11:34:02.412383 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [.], ack 514, win 506, options [nop,nop,TS val 3444224863 ecr 4063971], length 0
11:34:02.412383 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [P.], seq 2897:4097, ack 514, win 506, options [nop,nop,TS val 3444224864 ecr 4063971], length 1200
11:34:02.412403 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 4064015 ecr 3444224863,nop,nop,sack 1 {2897:4097}], length 0
11:34:02.412383 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [P.], seq 4097:5209, ack 514, win 506, options [nop,nop,TS val 3444224865 ecr 4063971], length 1112
11:34:02.412440 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 4064015 ecr 3444224863,nop,nop,sack 1 {2897:5209}], length 0
11:34:02.414158 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 267112112 ecr 3266376508], length 513
11:34:02.414988 IP 172.16.146.2.34235 > 172.16.146.1.domain: 58131+ A? fonts.gstatic.com. (35)
11:34:02.415123 IP 172.16.146.2.34235 > 172.16.146.1.domain: 55566+ AAAA? fonts.gstatic.com. (35)
11:34:02.416084 IP 172.16.146.1.domain > 172.16.146.2.34235: 55566 2/0/0 CNAME gstaticadssl.l.google.com., AAAA 2607:f8b0:4002:c09::5e (99)
11:34:02.431910 IP static.30.26.216.95.clients.your-server.de.https > 172.16.146.2.57356: Flags [S.], seq 1855516015, ack 3761531718, win 65160, options [mss 1460,sackOK,TS val 1169095274 ecr 3101552069,nop,wscale 7], length 0
11:34:02.431931 IP 172.16.146.2.57356 > static.30.26.216.95.clients.your-server.de.https: Flags [R], seq 3761531718, win 0, length 0
11:34:02.433398 IP 172.16.146.2.36324 > 172.16.146.1.domain: 24523+ A? www.youtube.com. (33)
11:34:02.433460 IP 172.16.146.2.36324 > 172.16.146.1.domain: 47305+ AAAA? www.youtube.com. (33)
11:34:02.434072 IP 172.16.146.1.domain > 172.16.146.2.36324: 24523 17/0/0 CNAME youtube-ui.l.google.com., A 64.233.177.91, A 172.217.3.238, A 172.217.2.46, A 172.217.0.142, A 74.125.21.93, A 74.125.21.190, A 74.125.21.91, A 142.250.105.91, A 172.217.165.46, A 172.253.124.190, A 74.125.136.190, A 74.125.136.91, A 74.125.136.136, A 142.250.9.91, A 142.250.9.136, A 108.177.122.190 (323)
11:34:02.464169 IP 172.16.146.2.52550 > 207.244.88.140.https: Flags [S], seq 2354924292, win 64240, options [mss 1460,sackOK,TS val 4064067 ecr 0,nop,wscale 7], length 0
11:34:02.471362 IP 172.16.146.1.domain > 172.16.146.2.43822: 36016 2/0/0 CNAME pki-goog.l.google.com., A 172.217.0.67 (82)
11:34:02.471363 IP 172.16.146.1.domain > 172.16.146.2.43822: 48316 2/0/0 CNAME pki-goog.l.google.com., AAAA 2607:f8b0:4002:807::2003 (94)
11:34:02.471646 IP 172.16.146.2.46916 > nuq04s19-in-f3.1e100.net.http: Flags [S], seq 1612663377, win 64240, options [mss 1460,sackOK,TS val 917145845 ecr 0,nop,wscale 7], length 0
11:34:02.471722 IP 172.16.146.2.46918 > nuq04s19-in-f3.1e100.net.http: Flags [S], seq 2662761470, win 64240, options [mss 1460,sackOK,TS val 917145845 ecr 0,nop,wscale 7], length 0
11:34:02.474457 IP 172.16.146.1.domain > 172.16.146.2.50588: 18689 1/0/0 AAAA 2607:f8b0:4002:c02::5f (73)
11:34:02.475097 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [S], seq 496203732, win 64240, options [mss 1460,sackOK,TS val 4224325430 ecr 0,nop,wscale 7], length 0
11:34:02.475662 IP 172.16.146.1.domain > 172.16.146.2.34235: 58131 2/0/0 CNAME gstaticadssl.l.google.com., A 173.194.219.94 (87)
11:34:02.476055 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [S], seq 3871246044, win 64240, options [mss 1460,sackOK,TS val 656464430 ecr 0,nop,wscale 7], length 0
11:34:02.480806 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [.], seq 1:1449, ack 514, win 506, options [nop,nop,TS val 3444224933 ecr 4064015], length 1448
11:34:02.480836 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [.], ack 1449, win 491, options [nop,nop,TS val 4064084 ecr 3444224933,nop,nop,sack 1 {2897:5209}], length 0
11:34:02.482017 IP 172.16.146.1.domain > 172.16.146.2.36324: 47305 5/0/0 CNAME youtube-ui.l.google.com., AAAA 2607:f8b0:4002:c00::5d, AAAA 2607:f8b0:4002:c10::88, AAAA 2607:f8b0:4002:c10::5b, AAAA 2607:f8b0:4002:801::200e (179)
11:34:02.482378 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [S], seq 3583271928, win 64240, options [mss 1460,sackOK,TS val 1945790313 ecr 0,nop,wscale 7], length 0
11:34:02.487693 IP static.30.26.216.95.clients.your-server.de.https > 172.16.146.2.57366: Flags [S.], seq 2922412330, ack 583263840, win 65160, options [mss 1460,sackOK,TS val 1169095326 ecr 3101552121,nop,wscale 7], length 0
11:34:02.487714 IP 172.16.146.2.57366 > static.30.26.216.95.clients.your-server.de.https: Flags [R], seq 583263840, win 0, length 0
11:34:02.502060 IP nuq04s19-in-f3.1e100.net.http > 172.16.146.2.46918: Flags [S.], seq 3933632467, ack 2662761471, win 65535, options [mss 1430,sackOK,TS val 3427455153 ecr 917145845,nop,wscale 8], length 0
11:34:02.502126 IP 172.16.146.2.46918 > nuq04s19-in-f3.1e100.net.http: Flags [.], ack 1, win 502, options [nop,nop,TS val 917145875 ecr 3427455153], length 0
11:34:02.502060 IP 207.244.88.140.https > 172.16.146.2.52550: Flags [S.], seq 2415734714, ack 2354924293, win 65160, options [mss 1460,sackOK,TS val 3444224953 ecr 4064067,nop,wscale 7], length 0
11:34:02.502162 IP 172.16.146.2.52550 > 207.244.88.140.https: Flags [R], seq 2354924293, win 0, length 0
11:34:02.503610 IP 172.16.146.2.46918 > nuq04s19-in-f3.1e100.net.http: Flags [P.], seq 1:379, ack 1, win 502, options [nop,nop,TS val 917145877 ecr 3427455153], length 378: HTTP: POST /gts1o1core HTTP/1.1
11:34:02.505424 IP nuq04s19-in-f3.1e100.net.http > 172.16.146.2.46916: Flags [S.], seq 26649514, ack 1612663378, win 65535, options [mss 1430,sackOK,TS val 2420680565 ecr 917145845,nop,wscale 8], length 0
11:34:02.505462 IP 172.16.146.2.46916 > nuq04s19-in-f3.1e100.net.http: Flags [.], ack 1, win 502, options [nop,nop,TS val 917145878 ecr 2420680565], length 0
11:34:02.508792 IP ya-in-f94.1e100.net.https > 172.16.146.2.40000: Flags [S.], seq 4050373334, ack 3871246045, win 65535, options [mss 1430,sackOK,TS val 2337893517 ecr 656464430,nop,wscale 8], length 0
11:34:02.508834 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 656464463 ecr 2337893517], length 0
11:34:02.510188 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [S.], seq 2421195682, ack 496203733, win 65535, options [mss 1430,sackOK,TS val 847695826 ecr 4224325430,nop,wscale 8], length 0
11:34:02.510215 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 4224325465 ecr 847695826], length 0
11:34:02.510409 IP 172.16.146.2.46916 > nuq04s19-in-f3.1e100.net.http: Flags [P.], seq 1:378, ack 1, win 502, options [nop,nop,TS val 917145883 ecr 2420680565], length 377: HTTP: POST /gts1o1core HTTP/1.1
11:34:02.511881 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [S.], seq 3788897867, ack 3583271929, win 65535, options [mss 1430,sackOK,TS val 3321847450 ecr 1945790313,nop,wscale 8], length 0
11:34:02.511906 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 1945790343 ecr 3321847450], length 0
11:34:02.512677 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 656464467 ecr 2337893517], length 513
11:34:02.514819 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 4224325470 ecr 847695826], length 513
11:34:02.516510 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 1945790348 ecr 3321847450], length 513
11:34:02.527974 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [.], seq 1449:2897, ack 514, win 506, options [nop,nop,TS val 3444224979 ecr 4064084], length 1448
11:34:02.528000 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [.], ack 5209, win 488, options [nop,nop,TS val 4064131 ecr 3444224979], length 0
11:34:02.531284 IP 172.16.146.2.44159 > 172.16.146.1.domain: 36040+ A? ocsp.sectigo.com. (34)
11:34:02.531346 IP 172.16.146.2.44159 > 172.16.146.1.domain: 2247+ AAAA? ocsp.sectigo.com. (34)
11:34:02.532076 IP 172.16.146.1.domain > 172.16.146.2.44159: 36040 1/0/0 A 151.139.128.14 (50)
11:34:02.532076 IP 172.16.146.1.domain > 172.16.146.2.44159: 2247 0/1/0 (105)
11:34:02.532433 IP 172.16.146.2.60168 > 151.139.128.14.http: Flags [S], seq 3910339948, win 64240, options [mss 1460,sackOK,TS val 3936019000 ecr 0,nop,wscale 7], length 0
11:34:02.533344 IP nuq04s19-in-f3.1e100.net.http > 172.16.146.2.46918: Flags [.], ack 379, win 261, options [nop,nop,TS val 3427455184 ecr 917145877], length 0
11:34:02.533344 IP nuq04s19-in-f3.1e100.net.http > 172.16.146.2.46918: Flags [P.], seq 1:703, ack 379, win 261, options [nop,nop,TS val 3427455185 ecr 917145877], length 702: HTTP: HTTP/1.1 200 OK
11:34:02.533360 IP 172.16.146.2.46918 > nuq04s19-in-f3.1e100.net.http: Flags [.], ack 703, win 501, options [nop,nop,TS val 917145906 ecr 3427455185], length 0
11:34:02.556374 IP 151.139.128.14.http > 172.16.146.2.60168: Flags [S.], seq 2516002908, ack 3910339949, win 65160, options [mss 1460,sackOK,TS val 3205773943 ecr 3936019000,nop,wscale 7], length 0
11:34:02.556446 IP 172.16.146.2.60168 > 151.139.128.14.http: Flags [.], ack 1, win 502, options [nop,nop,TS val 3936019024 ecr 3205773943], length 0
11:34:02.556947 IP 172.16.146.2.60168 > 151.139.128.14.http: Flags [P.], seq 1:372, ack 1, win 502, options [nop,nop,TS val 3936019025 ecr 3205773943], length 371: HTTP: POST / HTTP/1.1
11:34:02.580821 IP 151.139.128.14.http > 172.16.146.2.60168: Flags [.], ack 372, win 507, options [nop,nop,TS val 3205773967 ecr 3936019025], length 0
11:34:02.581075 IP 151.139.128.14.http > 172.16.146.2.60168: Flags [P.], seq 1:446, ack 372, win 507, options [nop,nop,TS val 3205773970 ecr 3936019025], length 445: HTTP: HTTP/1.1 200 OK
11:34:02.581083 IP 172.16.146.2.60168 > 151.139.128.14.http: Flags [.], ack 446, win 501, options [nop,nop,TS val 3936019049 ecr 3205773970], length 0
11:34:02.581075 IP 151.139.128.14.http > 172.16.146.2.60168: Flags [P.], seq 446:918, ack 372, win 507, options [nop,nop,TS val 3205773970 ecr 3936019025], length 472: HTTP
11:34:02.581122 IP 172.16.146.2.60168 > 151.139.128.14.http: Flags [.], ack 918, win 498, options [nop,nop,TS val 3936019049 ecr 3205773970], length 0
11:34:02.587772 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [P.], seq 514:594, ack 5209, win 501, options [nop,nop,TS val 4064191 ecr 3444224979], length 80
11:34:02.587999 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [P.], seq 594:912, ack 5209, win 501, options [nop,nop,TS val 4064191 ecr 3444224979], length 318
11:34:02.609974 IP 172.16.146.2.52538 > 207.244.88.140.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 4064213 ecr 3444224814], length 513
11:34:02.610030 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 4064213 ecr 3444224812], length 513
11:34:02.640472 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [.], ack 594, win 506, options [nop,nop,TS val 3444225082 ecr 4064191], length 0
11:34:02.640472 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [.], ack 912, win 504, options [nop,nop,TS val 3444225082 ecr 4064191], length 0
11:34:02.640472 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [P.], seq 5209:5512, ack 912, win 504, options [nop,nop,TS val 3444225082 ecr 4064191], length 303
11:34:02.640497 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [.], ack 5512, win 501, options [nop,nop,TS val 4064243 ecr 3444225082], length 0
11:34:02.640472 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [P.], seq 5512:5815, ack 912, win 504, options [nop,nop,TS val 3444225082 ecr 4064191], length 303
11:34:02.640628 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [.], ack 5815, win 499, options [nop,nop,TS val 4064244 ecr 3444225082], length 0
11:34:02.650423 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [.], ack 514, win 506, options [nop,nop,TS val 3444225100 ecr 4063967], length 0
11:34:02.650423 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [.], ack 514, win 506, options [nop,nop,TS val 3444225100 ecr 4064213,nop,nop,sack 1 {1:514}], length 0
11:34:02.650423 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [P.], seq 1:2897, ack 514, win 506, options [nop,nop,TS val 3444225101 ecr 4064213], length 2896
11:34:02.650468 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [.], ack 2897, win 496, options [nop,nop,TS val 4064253 ecr 3444225101], length 0
11:34:02.650423 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [P.], seq 2897:4097, ack 514, win 506, options [nop,nop,TS val 3444225101 ecr 4064213], length 1200
11:34:02.650574 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [.], ack 4097, win 488, options [nop,nop,TS val 4064254 ecr 3444225101], length 0
11:34:02.650423 IP 207.244.88.140.https > 172.16.146.2.52538: Flags [.], ack 514, win 506, options [nop,nop,TS val 3444225101 ecr 4063969], length 0
11:34:02.650423 IP 207.244.88.140.https > 172.16.146.2.52538: Flags [.], ack 514, win 506, options [nop,nop,TS val 3444225101 ecr 4064213,nop,nop,sack 1 {1:514}], length 0
11:34:02.650423 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [P.], seq 4097:5209, ack 514, win 506, options [nop,nop,TS val 3444225103 ecr 4064213], length 1112
11:34:02.650632 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [.], ack 5209, win 480, options [nop,nop,TS val 4064254 ecr 3444225103], length 0
11:34:02.650691 IP 207.244.88.140.https > 172.16.146.2.52538: Flags [P.], seq 1:2897, ack 514, win 506, options [nop,nop,TS val 3444225104 ecr 4064213], length 2896
11:34:02.650705 IP 172.16.146.2.52538 > 207.244.88.140.https: Flags [.], ack 2897, win 496, options [nop,nop,TS val 4064254 ecr 3444225104], length 0
11:34:02.651482 IP 207.244.88.140.https > 172.16.146.2.52538: Flags [P.], seq 2897:4097, ack 514, win 506, options [nop,nop,TS val 3444225104 ecr 4064213], length 1200
11:34:02.651497 IP 172.16.146.2.52538 > 207.244.88.140.https: Flags [.], ack 4097, win 501, options [nop,nop,TS val 4064254 ecr 3444225104], length 0
11:34:02.652760 IP 207.244.88.140.https > 172.16.146.2.52538: Flags [P.], seq 4097:5209, ack 514, win 506, options [nop,nop,TS val 3444225106 ecr 4064213], length 1112
11:34:02.652835 IP 172.16.146.2.52538 > 207.244.88.140.https: Flags [.], ack 5209, win 495, options [nop,nop,TS val 4064256 ecr 3444225106], length 0
11:34:02.653998 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 267112352 ecr 3266376508], length 513
11:34:02.655323 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [P.], seq 514:594, ack 5209, win 501, options [nop,nop,TS val 4064258 ecr 3444225103], length 80
11:34:02.656053 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [P.], seq 594:913, ack 5209, win 501, options [nop,nop,TS val 4064259 ecr 3444225103], length 319
11:34:02.658433 IP 172.16.146.2.52538 > 207.244.88.140.https: Flags [P.], seq 514:594, ack 5209, win 501, options [nop,nop,TS val 4064261 ecr 3444225106], length 80
11:34:02.658829 IP 172.16.146.2.52538 > 207.244.88.140.https: Flags [P.], seq 594:917, ack 5209, win 501, options [nop,nop,TS val 4064262 ecr 3444225106], length 323
11:34:02.684107 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [.], ack 514, win 261, options [nop,nop,TS val 3266376780 ecr 267112112], length 0
11:34:02.684107 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [.], ack 514, win 261, options [nop,nop,TS val 3266376781 ecr 267112352,nop,nop,sack 1 {1:514}], length 0
11:34:02.684107 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 1:3868, ack 514, win 261, options [nop,nop,TS val 3266376782 ecr 267112352], length 3867
11:34:02.684141 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [.], ack 3868, win 489, options [nop,nop,TS val 267112382 ecr 3266376782], length 0
11:34:02.690789 IP 172.16.146.2.46918 > nuq04s19-in-f3.1e100.net.http: Flags [P.], seq 379:756, ack 703, win 501, options [nop,nop,TS val 917146064 ecr 3427455185], length 377: HTTP: POST /gts1o1core HTTP/1.1
11:34:02.695787 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [.], ack 594, win 506, options [nop,nop,TS val 3444225147 ecr 4064258], length 0
11:34:02.695787 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [P.], seq 5209:5512, ack 594, win 506, options [nop,nop,TS val 3444225148 ecr 4064258], length 303
11:34:02.695812 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [.], ack 5512, win 501, options [nop,nop,TS val 4064299 ecr 3444225148], length 0
11:34:02.695787 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [P.], seq 5512:5815, ack 594, win 506, options [nop,nop,TS val 3444225148 ecr 4064258], length 303
11:34:02.695845 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [.], ack 5815, win 499, options [nop,nop,TS val 4064299 ecr 3444225148], length 0
11:34:02.700287 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [.], ack 913, win 504, options [nop,nop,TS val 3444225151 ecr 4064259], length 0
11:34:02.700287 IP 207.244.88.140.https > 172.16.146.2.52538: Flags [.], ack 594, win 506, options [nop,nop,TS val 3444225153 ecr 4064261], length 0
11:34:02.700287 IP 207.244.88.140.https > 172.16.146.2.52538: Flags [.], ack 917, win 504, options [nop,nop,TS val 3444225153 ecr 4064262], length 0
11:34:02.702755 IP 207.244.88.140.https > 172.16.146.2.52538: Flags [P.], seq 5209:5512, ack 917, win 504, options [nop,nop,TS val 3444225154 ecr 4064262], length 303
11:34:02.702777 IP 172.16.146.2.52538 > 207.244.88.140.https: Flags [.], ack 5512, win 501, options [nop,nop,TS val 4064306 ecr 3444225154], length 0
11:34:02.702755 IP 207.244.88.140.https > 172.16.146.2.52538: Flags [P.], seq 5512:5815, ack 917, win 504, options [nop,nop,TS val 3444225154 ecr 4064262], length 303
11:34:02.702827 IP 172.16.146.2.52538 > 207.244.88.140.https: Flags [.], ack 5815, win 499, options [nop,nop,TS val 4064306 ecr 3444225154], length 0
11:34:02.717255 IP nuq04s19-in-f3.1e100.net.http > 172.16.146.2.46918: Flags [P.], seq 703:1404, ack 756, win 265, options [nop,nop,TS val 3427455369 ecr 917146064], length 701: HTTP: HTTP/1.1 200 OK
11:34:02.717313 IP 172.16.146.2.46918 > nuq04s19-in-f3.1e100.net.http: Flags [.], ack 1404, win 501, options [nop,nop,TS val 917146090 ecr 3427455369], length 0
11:34:02.721072 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 514:578, ack 3868, win 501, options [nop,nop,TS val 267112419 ecr 3266376782], length 64
11:34:02.721832 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 578:748, ack 3868, win 501, options [nop,nop,TS val 267112420 ecr 3266376782], length 170
11:34:02.722340 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 748:1111, ack 3868, win 501, options [nop,nop,TS val 267112420 ecr 3266376782], length 363
11:34:02.722816 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 1111:1205, ack 3868, win 501, options [nop,nop,TS val 267112421 ecr 3266376782], length 94
11:34:02.750142 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 1945790581 ecr 3321847450], length 513
11:34:02.750322 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 656464704 ecr 2337893517], length 513
11:34:02.753289 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [.], ack 1111, win 269, options [nop,nop,TS val 3266376850 ecr 267112419], length 0
11:34:02.753289 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 3868:4448, ack 1205, win 269, options [nop,nop,TS val 3266376850 ecr 267112421], length 580
11:34:02.753363 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [.], ack 4448, win 501, options [nop,nop,TS val 267112451 ecr 3266376850], length 0
11:34:02.753289 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 4448:4479, ack 1205, win 269, options [nop,nop,TS val 3266376851 ecr 267112421], length 31
11:34:02.753485 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [.], ack 4479, win 501, options [nop,nop,TS val 267112451 ecr 3266376851], length 0
11:34:02.754298 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 1205:1236, ack 4479, win 501, options [nop,nop,TS val 267112452 ecr 3266376851], length 31
11:34:02.754474 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 4224325709 ecr 847695826], length 513
11:34:02.762195 IP 172.16.146.2.46916 > nuq04s19-in-f3.1e100.net.http: Flags [P.], seq 1:378, ack 1, win 502, options [nop,nop,TS val 917146135 ecr 2420680565], length 377: HTTP: POST /gts1o1core HTTP/1.1
11:34:02.779586 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 514, win 261, options [nop,nop,TS val 3321847713 ecr 1945790348], length 0
11:34:02.779586 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 514, win 261, options [nop,nop,TS val 3321847713 ecr 1945790581,nop,nop,sack 1 {1:514}], length 0
11:34:02.779586 IP ya-in-f94.1e100.net.https > 172.16.146.2.40000: Flags [.], ack 514, win 261, options [nop,nop,TS val 2337893786 ecr 656464467], length 0
11:34:02.779586 IP ya-in-f94.1e100.net.https > 172.16.146.2.40000: Flags [P.], seq 1419:2683, ack 514, win 261, options [nop,nop,TS val 2337893788 ecr 656464704], length 1264
11:34:02.779625 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 656464734 ecr 2337893786,nop,nop,sack 1 {1419:2683}], length 0
11:34:02.779586 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 1:2837, ack 514, win 261, options [nop,nop,TS val 3321847717 ecr 1945790581], length 2836
11:34:02.779670 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 2837, win 496, options [nop,nop,TS val 1945790611 ecr 3321847717], length 0
11:34:02.780662 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 2837:3868, ack 514, win 261, options [nop,nop,TS val 3321847717 ecr 1945790581], length 1031
11:34:02.780680 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 3868, win 501, options [nop,nop,TS val 1945790612 ecr 3321847717], length 0
11:34:02.782894 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [.], ack 514, win 261, options [nop,nop,TS val 847696101 ecr 4224325470], length 0
11:34:02.782894 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [.], seq 1419:2837, ack 514, win 261, options [nop,nop,TS val 847696101 ecr 4224325709], length 1418
11:34:02.782921 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 4224325738 ecr 847696101,nop,nop,sack 1 {1419:2837}], length 0
11:34:02.782894 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [P.], seq 2837:3030, ack 514, win 261, options [nop,nop,TS val 847696102 ecr 4224325709], length 193
11:34:02.782977 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 4224325738 ecr 847696101,nop,nop,sack 1 {1419:3030}], length 0
11:34:02.784589 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 514:578, ack 3868, win 501, options [nop,nop,TS val 1945790616 ecr 3321847717], length 64
11:34:02.784959 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 578:748, ack 3868, win 501, options [nop,nop,TS val 1945790616 ecr 3321847717], length 170
11:34:02.785012 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 748:1049, ack 3868, win 501, options [nop,nop,TS val 1945790616 ecr 3321847717], length 301
11:34:02.788379 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [.], ack 1236, win 269, options [nop,nop,TS val 3266376884 ecr 267112452], length 0
11:34:02.788379 IP nuq04s19-in-f3.1e100.net.http > 172.16.146.2.46916: Flags [.], ack 378, win 261, options [nop,nop,TS val 2420680846 ecr 917145883], length 0
11:34:02.788379 IP nuq04s19-in-f3.1e100.net.http > 172.16.146.2.46916: Flags [.], ack 378, win 261, options [nop,nop,TS val 2420680846 ecr 917146135,nop,nop,sack 1 {1:378}], length 0
11:34:02.788379 IP nuq04s19-in-f3.1e100.net.http > 172.16.146.2.46916: Flags [P.], seq 1:702, ack 378, win 261, options [nop,nop,TS val 2420680848 ecr 917146135], length 701: HTTP: HTTP/1.1 200 OK
11:34:02.788408 IP 172.16.146.2.46916 > nuq04s19-in-f3.1e100.net.http: Flags [.], ack 702, win 501, options [nop,nop,TS val 917146161 ecr 2420680848], length 0
11:34:02.790164 IP 172.16.146.2.56282 > yx-in-f100.1e100.net.https: Flags [P.], seq 514:578, ack 3869, win 501, options [nop,nop,TS val 267112488 ecr 3975815727], length 64
11:34:02.790497 IP 172.16.146.2.56282 > yx-in-f100.1e100.net.https: Flags [P.], seq 578:765, ack 3869, win 501, options [nop,nop,TS val 267112488 ecr 3975815727], length 187
11:34:02.791332 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 4479:4895, ack 1236, win 269, options [nop,nop,TS val 3266376890 ecr 267112452], length 416
11:34:02.791354 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [.], ack 4895, win 501, options [nop,nop,TS val 267112489 ecr 3266376890], length 0
11:34:02.791332 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 4895:6313, ack 1236, win 269, options [nop,nop,TS val 3266376890 ecr 267112452], length 1418
11:34:02.791449 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [.], ack 6313, win 495, options [nop,nop,TS val 267112489 ecr 3266376890], length 0
11:34:02.791618 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 6313:8503, ack 1236, win 269, options [nop,nop,TS val 3266376890 ecr 267112452], length 2190
11:34:02.791625 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [.], ack 8503, win 479, options [nop,nop,TS val 267112490 ecr 3266376890], length 0
11:34:02.791618 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 8503:8542, ack 1236, win 269, options [nop,nop,TS val 3266376890 ecr 267112452], length 39
11:34:02.791662 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [.], ack 8542, win 479, options [nop,nop,TS val 267112490 ecr 3266376890], length 0
11:34:02.792021 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 1236:1275, ack 8542, win 501, options [nop,nop,TS val 267112490 ecr 3266376890], length 39
11:34:02.799117 IP 172.16.146.2.43420 > 172.16.146.1.domain: 48802+ A? www.google.com. (32)
11:34:02.799277 IP 172.16.146.2.43420 > 172.16.146.1.domain: 7591+ AAAA? www.google.com. (32)
11:34:02.799834 IP 172.16.146.1.domain > 172.16.146.2.43420: 48802 6/0/0 A 74.125.138.147, A 74.125.138.105, A 74.125.138.99, A 74.125.138.106, A 74.125.138.103, A 74.125.138.104 (128)
11:34:02.799834 IP 172.16.146.1.domain > 172.16.146.2.43420: 7591 4/0/0 AAAA 2607:f8b0:4002:c09::63, AAAA 2607:f8b0:4002:c09::67, AAAA 2607:f8b0:4002:c09::69, AAAA 2607:f8b0:4002:c09::68 (144)
11:34:02.810621 IP 172.16.146.2.51422 > yi-in-f147.1e100.net.https: Flags [S], seq 3623326795, win 64240, options [mss 1460,sackOK,TS val 2204518507 ecr 0,nop,wscale 7], length 0
11:34:02.814717 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 3868:4448, ack 1049, win 269, options [nop,nop,TS val 3321847752 ecr 1945790616], length 580
11:34:02.814751 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 4448, win 501, options [nop,nop,TS val 1945790646 ecr 3321847752], length 0
11:34:02.814717 IP ya-in-f94.1e100.net.https > 172.16.146.2.40000: Flags [.], seq 1:1419, ack 514, win 261, options [nop,nop,TS val 2337893825 ecr 656464734], length 1418
11:34:02.814801 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [.], ack 2683, win 495, options [nop,nop,TS val 656464769 ecr 2337893825], length 0
11:34:02.815033 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1049:1080, ack 4448, win 501, options [nop,nop,TS val 1945790646 ecr 3321847752], length 31
11:34:02.816804 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 4448:4479, ack 1049, win 269, options [nop,nop,TS val 3321847754 ecr 1945790616], length 31
11:34:02.816817 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 4479, win 501, options [nop,nop,TS val 1945790648 ecr 3321847754], length 0
11:34:02.819997 IP 172.16.146.2.49940 > yi-in-f105.1e100.net.https: Flags [S], seq 3140960208, win 64240, options [mss 1460,sackOK,TS val 1017522904 ecr 0,nop,wscale 7], length 0
11:34:02.820091 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [.], seq 1:1419, ack 514, win 261, options [nop,nop,TS val 847696139 ecr 4224325738], length 1418
11:34:02.820136 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [.], ack 3030, win 488, options [nop,nop,TS val 4224325775 ecr 847696139], length 0
11:34:02.822935 IP yx-in-f100.1e100.net.https > 172.16.146.2.56282: Flags [P.], seq 3869:4449, ack 765, win 265, options [nop,nop,TS val 3975816181 ecr 267112488], length 580
11:34:02.822969 IP 172.16.146.2.56282 > yx-in-f100.1e100.net.https: Flags [.], ack 4449, win 501, options [nop,nop,TS val 267112521 ecr 3975816181], length 0
11:34:02.822935 IP yx-in-f100.1e100.net.https > 172.16.146.2.56282: Flags [P.], seq 4449:4480, ack 765, win 265, options [nop,nop,TS val 3975816181 ecr 267112488], length 31
11:34:02.823019 IP 172.16.146.2.56282 > yx-in-f100.1e100.net.https: Flags [.], ack 4480, win 501, options [nop,nop,TS val 267112521 ecr 3975816181], length 0
11:34:02.822935 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [.], ack 1275, win 269, options [nop,nop,TS val 3266376921 ecr 267112490], length 0
11:34:02.823149 IP 172.16.146.2.56282 > yx-in-f100.1e100.net.https: Flags [P.], seq 765:789, ack 4480, win 501, options [nop,nop,TS val 267112521 ecr 3975816181], length 24
11:34:02.823199 IP 172.16.146.2.56282 > yx-in-f100.1e100.net.https: Flags [F.], seq 789, ack 4480, win 501, options [nop,nop,TS val 267112521 ecr 3975816181], length 0
11:34:02.824778 IP 172.16.146.2.46918 > nuq04s19-in-f3.1e100.net.http: Flags [P.], seq 756:1133, ack 1404, win 501, options [nop,nop,TS val 917146198 ecr 3427455369], length 377: HTTP: POST /gts1o1core HTTP/1.1
11:34:02.830407 IP 172.16.146.2.41306 > 172.16.146.1.domain: 41939+ A? ocsp.pki.goog. (31)
11:34:02.830540 IP 172.16.146.2.41306 > 172.16.146.1.domain: 9182+ AAAA? ocsp.pki.goog. (31)
11:34:02.831347 IP 172.16.146.1.domain > 172.16.146.2.41306: 41939 2/0/0 CNAME pki-goog.l.google.com., A 142.250.9.94 (82)
11:34:02.831347 IP 172.16.146.1.domain > 172.16.146.2.41306: 9182 2/0/0 CNAME pki-goog.l.google.com., AAAA 2607:f8b0:4002:807::2003 (94)
11:34:02.831655 IP 172.16.146.2.42208 > yq-in-f94.1e100.net.http: Flags [S], seq 3289913018, win 64240, options [mss 1460,sackOK,TS val 4103180607 ecr 0,nop,wscale 7], length 0
11:34:02.839570 IP yi-in-f147.1e100.net.https > 172.16.146.2.51422: Flags [S.], seq 2626231180, ack 3623326796, win 65535, options [mss 1430,sackOK,TS val 1710188257 ecr 2204518507,nop,wscale 8], length 0
11:34:02.839599 IP 172.16.146.2.51422 > yi-in-f147.1e100.net.https: Flags [R], seq 3623326796, win 0, length 0
11:34:02.844005 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [P.], seq 5815:6365, ack 912, win 504, options [nop,nop,TS val 3444225297 ecr 4064244], length 550
11:34:02.844024 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [.], ack 6365, win 501, options [nop,nop,TS val 4064447 ecr 3444225297], length 0
11:34:02.847764 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 1080, win 269, options [nop,nop,TS val 3321847785 ecr 1945790646], length 0
11:34:02.848128 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 4479:5065, ack 1080, win 269, options [nop,nop,TS val 3321847787 ecr 1945790648], length 586
11:34:02.848176 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 5065, win 501, options [nop,nop,TS val 1945790679 ecr 3321847787], length 0
11:34:02.848128 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 5065:6483, ack 1080, win 269, options [nop,nop,TS val 3321847787 ecr 1945790648], length 1418
11:34:02.848283 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 6483, win 495, options [nop,nop,TS val 1945790679 ecr 3321847787], length 0
11:34:02.849435 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 6483:12155, ack 1080, win 269, options [nop,nop,TS val 3321847787 ecr 1945790648], length 5672
11:34:02.849535 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 12155, win 481, options [nop,nop,TS val 1945790680 ecr 3321847787], length 0
11:34:02.850891 IP yi-in-f105.1e100.net.https > 172.16.146.2.49940: Flags [S.], seq 2611027560, ack 3140960209, win 65535, options [mss 1430,sackOK,TS val 4032653801 ecr 1017522904,nop,wscale 8], length 0
11:34:02.850909 IP 172.16.146.2.49940 > yi-in-f105.1e100.net.https: Flags [R], seq 3140960209, win 0, length 0
11:34:02.850891 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 12155:13573, ack 1080, win 269, options [nop,nop,TS val 3321847789 ecr 1945790648], length 1418
11:34:02.850983 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 13573, win 501, options [nop,nop,TS val 1945790682 ecr 3321847789], length 0
11:34:02.852382 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 13573:14991, ack 1080, win 269, options [nop,nop,TS val 3321847789 ecr 1945790648], length 1418
11:34:02.852399 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 14991, win 501, options [nop,nop,TS val 1945790683 ecr 3321847789], length 0
11:34:02.855301 IP nuq04s19-in-f3.1e100.net.http > 172.16.146.2.46918: Flags [P.], seq 1404:2105, ack 1133, win 269, options [nop,nop,TS val 3427455505 ecr 917146198], length 701: HTTP: HTTP/1.1 200 OK
11:34:02.855336 IP 172.16.146.2.46918 > nuq04s19-in-f3.1e100.net.http: Flags [.], ack 2105, win 501, options [nop,nop,TS val 917146228 ecr 3427455505], length 0
11:34:02.855301 IP yx-in-f100.1e100.net.https > 172.16.146.2.56282: Flags [F.], seq 4480, ack 790, win 265, options [nop,nop,TS val 3975816211 ecr 267112521], length 0
11:34:02.855382 IP 172.16.146.2.56282 > yx-in-f100.1e100.net.https: Flags [.], ack 4481, win 501, options [nop,nop,TS val 267112553 ecr 3975816211], length 0
11:34:02.855301 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 14991:17827, ack 1080, win 269, options [nop,nop,TS val 3321847791 ecr 1945790648], length 2836
11:34:02.855441 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 17827, win 496, options [nop,nop,TS val 1945790686 ecr 3321847791], length 0
11:34:02.856514 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 17827:20663, ack 1080, win 269, options [nop,nop,TS val 3321847793 ecr 1945790648], length 2836
11:34:02.856532 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 20663, win 496, options [nop,nop,TS val 1945790688 ecr 3321847793], length 0
11:34:02.856514 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 20663:22081, ack 1080, win 269, options [nop,nop,TS val 3321847795 ecr 1945790648], length 1418
11:34:02.856622 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 22081, win 488, options [nop,nop,TS val 1945790688 ecr 3321847795], length 0
11:34:02.857433 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [P.], seq 514:578, ack 2683, win 501, options [nop,nop,TS val 656464811 ecr 2337893825], length 64
11:34:02.857729 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [P.], seq 578:748, ack 2683, win 501, options [nop,nop,TS val 656464812 ecr 2337893825], length 170
11:34:02.858923 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 22081:23499, ack 1080, win 269, options [nop,nop,TS val 3321847795 ecr 1945790648], length 1418
11:34:02.860246 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 23499:24917, ack 1080, win 269, options [nop,nop,TS val 3321847797 ecr 1945790648], length 1418
11:34:02.860261 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 24917, win 501, options [nop,nop,TS val 1945790691 ecr 3321847795], length 0
11:34:02.862968 IP yq-in-f94.1e100.net.http > 172.16.146.2.42208: Flags [S.], seq 3812151296, ack 3289913019, win 65535, options [mss 1430,sackOK,TS val 3580203913 ecr 4103180607,nop,wscale 8], length 0
11:34:02.863014 IP 172.16.146.2.42208 > yq-in-f94.1e100.net.http: Flags [.], ack 1, win 502, options [nop,nop,TS val 4103180638 ecr 3580203913], length 0
11:34:02.863259 IP 172.16.146.2.42208 > yq-in-f94.1e100.net.http: Flags [P.], seq 1:379, ack 1, win 502, options [nop,nop,TS val 4103180638 ecr 3580203913], length 378: HTTP: POST /gts1o1core HTTP/1.1
11:34:02.872716 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 1275:1357, ack 8542, win 501, options [nop,nop,TS val 267112571 ecr 3266376921], length 82
11:34:02.872973 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 1357:1392, ack 8542, win 501, options [nop,nop,TS val 267112571 ecr 3266376921], length 35
11:34:02.876420 IP 172.16.146.2.54666 > yi-in-f99.1e100.net.https: Flags [S], seq 2605308201, win 64240, options [mss 1460,sackOK,TS val 2054356493 ecr 0,nop,wscale 7], length 0
11:34:02.877160 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 24917:26830, ack 1080, win 269, options [nop,nop,TS val 3321847815 ecr 1945790679], length 1913
11:34:02.877622 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 26830, win 501, options [nop,nop,TS val 1945790709 ecr 3321847815], length 0
11:34:02.877852 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1080:1119, ack 26830, win 501, options [nop,nop,TS val 1945790709 ecr 3321847815], length 39
11:34:02.889787 IP ya-in-f94.1e100.net.https > 172.16.146.2.40000: Flags [P.], seq 2683:3263, ack 748, win 265, options [nop,nop,TS val 2337893900 ecr 656464811], length 580
11:34:02.889822 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [.], ack 3263, win 501, options [nop,nop,TS val 656464844 ecr 2337893900], length 0
11:34:02.889787 IP ya-in-f94.1e100.net.https > 172.16.146.2.40000: Flags [P.], seq 3263:3294, ack 748, win 265, options [nop,nop,TS val 2337893900 ecr 656464811], length 31
11:34:02.889856 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [.], ack 3294, win 501, options [nop,nop,TS val 656464844 ecr 2337893900], length 0
11:34:02.890107 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [P.], seq 748:779, ack 3294, win 501, options [nop,nop,TS val 656464844 ecr 2337893900], length 31
11:34:02.893989 IP yq-in-f94.1e100.net.http > 172.16.146.2.42208: Flags [.], ack 379, win 261, options [nop,nop,TS val 3580203943 ecr 4103180638], length 0
11:34:02.895262 IP yq-in-f94.1e100.net.http > 172.16.146.2.42208: Flags [P.], seq 1:703, ack 379, win 261, options [nop,nop,TS val 3580203944 ecr 4103180638], length 702: HTTP: HTTP/1.1 200 OK
11:34:02.895306 IP 172.16.146.2.42208 > yq-in-f94.1e100.net.http: Flags [.], ack 703, win 501, options [nop,nop,TS val 4103180670 ecr 3580203944], length 0
11:34:02.897086 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [P.], seq 5815:6365, ack 913, win 504, options [nop,nop,TS val 3444225349 ecr 4064299], length 550
11:34:02.897105 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [.], ack 6365, win 501, options [nop,nop,TS val 4064500 ecr 3444225349], length 0
11:34:02.897759 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [P.], seq 514:578, ack 3030, win 501, options [nop,nop,TS val 4224325853 ecr 847696139], length 64
11:34:02.898298 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [P.], seq 578:748, ack 3030, win 501, options [nop,nop,TS val 4224325853 ecr 847696139], length 170
11:34:02.898415 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [P.], seq 748:1166, ack 3030, win 501, options [nop,nop,TS val 4224325853 ecr 847696139], length 418
11:34:02.898423 IP 207.244.88.140.https > 172.16.146.2.52538: Flags [P.], seq 5815:6365, ack 917, win 504, options [nop,nop,TS val 3444225351 ecr 4064306], length 550
11:34:02.898449 IP 172.16.146.2.52538 > 207.244.88.140.https: Flags [.], ack 6365, win 501, options [nop,nop,TS val 4064501 ecr 3444225351], length 0
11:34:02.899668 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [.], ack 1357, win 269, options [nop,nop,TS val 3266376997 ecr 267112571], length 0
11:34:02.899668 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [.], ack 1392, win 269, options [nop,nop,TS val 3266376997 ecr 267112571], length 0
11:34:02.902038 IP yi-in-f99.1e100.net.https > 172.16.146.2.54666: Flags [S.], seq 2121048038, ack 2605308202, win 65535, options [mss 1430,sackOK,TS val 1169691504 ecr 2054356493,nop,wscale 8], length 0
11:34:02.902066 IP 172.16.146.2.54666 > yi-in-f99.1e100.net.https: Flags [R], seq 2605308202, win 0, length 0
11:34:02.905000 IP 172.16.146.2.40302 > 172.16.146.1.domain: 4791+ A? clients1.google.com. (37)
11:34:02.905067 IP 172.16.146.2.40302 > 172.16.146.1.domain: 31930+ AAAA? clients1.google.com. (37)
11:34:02.911591 IP 172.16.146.2.58213 > 172.16.146.1.domain: 32346+ A? www.googleapis.com. (36)
11:34:02.911641 IP 172.16.146.2.58213 > 172.16.146.1.domain: 340+ AAAA? www.googleapis.com. (36)
11:34:02.912490 IP 172.16.146.1.domain > 172.16.146.2.58213: 340 4/0/0 AAAA 2607:f8b0:4002:808::200a, AAAA 2607:f8b0:4002:803::200a, AAAA 2607:f8b0:4002:c06::5f, AAAA 2607:f8b0:4002:c1b::5f (148)
11:34:02.914610 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 1119, win 269, options [nop,nop,TS val 3321847852 ecr 1945790709], length 0
11:34:02.926688 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [.], ack 1166, win 269, options [nop,nop,TS val 847696245 ecr 4224325853], length 0
11:34:02.926688 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [P.], seq 3030:3610, ack 1166, win 269, options [nop,nop,TS val 847696245 ecr 4224325853], length 580
11:34:02.926714 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [.], ack 3610, win 501, options [nop,nop,TS val 4224325882 ecr 847696245], length 0
11:34:02.926991 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [P.], seq 1166:1197, ack 3610, win 501, options [nop,nop,TS val 4224325882 ecr 847696245], length 31
11:34:02.927970 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [P.], seq 3610:3641, ack 1166, win 269, options [nop,nop,TS val 847696246 ecr 4224325853], length 31
11:34:02.927981 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [.], ack 3641, win 501, options [nop,nop,TS val 4224325883 ecr 847696246], length 0
11:34:02.927970 IP ya-in-f94.1e100.net.https > 172.16.146.2.40000: Flags [.], ack 779, win 265, options [nop,nop,TS val 2337893936 ecr 656464844], length 0
11:34:02.927970 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [P.], seq 3641:3970, ack 1166, win 269, options [nop,nop,TS val 847696248 ecr 4224325853], length 329
11:34:02.928072 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [.], ack 3970, win 501, options [nop,nop,TS val 4224325883 ecr 847696248], length 0
11:34:02.929354 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [P.], seq 3970:4471, ack 1166, win 269, options [nop,nop,TS val 847696248 ecr 4224325853], length 501
11:34:02.929364 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [.], ack 4471, win 501, options [nop,nop,TS val 4224325884 ecr 847696248], length 0
11:34:02.929354 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [P.], seq 4471:4641, ack 1166, win 269, options [nop,nop,TS val 847696248 ecr 4224325853], length 170
11:34:02.929417 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [.], ack 4641, win 500, options [nop,nop,TS val 4224325884 ecr 847696248], length 0
11:34:02.929354 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [P.], seq 4641:4680, ack 1166, win 269, options [nop,nop,TS val 847696248 ecr 4224325853], length 39
11:34:02.929478 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [.], ack 4680, win 500, options [nop,nop,TS val 4224325884 ecr 847696248], length 0
11:34:02.929667 IP 172.16.146.2.50296 > ym-in-f95.1e100.net.https: Flags [P.], seq 1197:1236, ack 4680, win 501, options [nop,nop,TS val 4224325885 ecr 847696248], length 39
11:34:02.943270 IP 172.16.146.1.domain > 172.16.146.2.40302: 4791 7/0/0 CNAME clients.l.google.com., A 64.233.185.113, A 64.233.185.102, A 64.233.185.101, A 64.233.185.138, A 64.233.185.100, A 64.233.185.139 (157)
11:34:02.947438 IP 172.16.146.1.domain > 172.16.146.2.58213: 32346 12/0/0 A 74.125.138.95, A 108.177.122.95, A 172.217.215.95, A 142.250.9.95, A 74.125.21.95, A 172.217.2.42, A 64.233.177.95, A 172.217.10.202, A 216.58.193.170, A 172.217.0.74, A 216.58.195.138, A 64.233.185.95 (228)
11:34:02.947822 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [S], seq 526186994, win 64240, options [mss 1460,sackOK,TS val 1711310541 ecr 0,nop,wscale 7], length 0
11:34:02.950709 IP 172.16.146.1.domain > 172.16.146.2.40302: 31930 5/0/0 CNAME clients.l.google.com., AAAA 2607:f8b0:4002:c08::65, AAAA 2607:f8b0:4002:c08::71, AAAA 2607:f8b0:4002:c08::8a, AAAA 2607:f8b0:4002:c08::64 (173)
11:34:02.951204 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 1392:1491, ack 8542, win 501, options [nop,nop,TS val 267112649 ecr 3266376997], length 99
11:34:02.951329 IP 172.16.146.2.48726 > yb-in-f113.1e100.net.https: Flags [S], seq 461628602, win 64240, options [mss 1460,sackOK,TS val 2065808766 ecr 0,nop,wscale 7], length 0
11:34:02.962318 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [.], ack 1197, win 269, options [nop,nop,TS val 847696280 ecr 4224325882], length 0
11:34:02.962318 IP ym-in-f95.1e100.net.https > 172.16.146.2.50296: Flags [.], ack 1236, win 269, options [nop,nop,TS val 847696281 ecr 4224325885], length 0
11:34:02.975419 IP yi-in-f95.1e100.net.https > 172.16.146.2.42750: Flags [S.], seq 2395298747, ack 526186995, win 65535, options [mss 1430,sackOK,TS val 1899993288 ecr 1711310541,nop,wscale 8], length 0
11:34:02.975455 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 1711310568 ecr 1899993288], length 0
11:34:02.976468 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [.], ack 1491, win 269, options [nop,nop,TS val 3266377076 ecr 267112649], length 0
11:34:02.976468 IP yb-in-f113.1e100.net.https > 172.16.146.2.48726: Flags [S.], seq 1047752241, ack 461628603, win 65535, options [mss 1430,sackOK,TS val 4185550247 ecr 2065808766,nop,wscale 8], length 0
11:34:02.976491 IP 172.16.146.2.48726 > yb-in-f113.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 2065808791 ecr 4185550247], length 0
11:34:02.977312 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 1711310570 ecr 1899993288], length 513
11:34:02.978812 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 8542:8620, ack 1491, win 269, options [nop,nop,TS val 3266377077 ecr 267112649], length 78
11:34:02.980199 IP 172.16.146.2.48726 > yb-in-f113.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 2065808795 ecr 4185550247], length 513
11:34:02.980501 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 1491:1530, ack 8620, win 501, options [nop,nop,TS val 267112678 ecr 3266377077], length 39
11:34:02.998324 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1119:1283, ack 26830, win 501, options [nop,nop,TS val 1945790829 ecr 3321847852], length 164
11:34:02.998643 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1283:1318, ack 26830, win 501, options [nop,nop,TS val 1945790830 ecr 3321847852], length 35
11:34:02.999089 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1318:1436, ack 26830, win 501, options [nop,nop,TS val 1945790830 ecr 3321847852], length 118
11:34:02.999466 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1436:1471, ack 26830, win 501, options [nop,nop,TS val 1945790830 ecr 3321847852], length 35
11:34:03.010226 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [P.], seq 779:1076, ack 3294, win 501, options [nop,nop,TS val 656464964 ecr 2337893936], length 297
11:34:03.010533 IP 172.16.146.2.40000 > ya-in-f94.1e100.net.https: Flags [P.], seq 1076:1111, ack 3294, win 501, options [nop,nop,TS val 656464965 ecr 2337893936], length 35
11:34:03.011604 IP yi-in-f95.1e100.net.https > 172.16.146.2.42750: Flags [.], ack 514, win 261, options [nop,nop,TS val 1899993324 ecr 1711310570], length 0
11:34:03.011604 IP yi-in-f95.1e100.net.https > 172.16.146.2.42750: Flags [P.], seq 1419:3030, ack 514, win 261, options [nop,nop,TS val 1899993325 ecr 1711310570], length 1611
11:34:03.011624 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 1711310605 ecr 1899993324,nop,nop,sack 1 {1419:3030}], length 0
11:34:03.020292 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [.], ack 1530, win 269, options [nop,nop,TS val 3266377117 ecr 267112678], length 0
11:34:03.026330 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 1283, win 273, options [nop,nop,TS val 3321847963 ecr 1945790829], length 0
11:34:03.026330 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 1471, win 273, options [nop,nop,TS val 3321847963 ecr 1945790830], length 0
11:34:03.037352 IP ya-in-f94.1e100.net.https > 172.16.146.2.40000: Flags [.], ack 1076, win 269, options [nop,nop,TS val 2337894047 ecr 656464964], length 0
11:34:03.037352 IP ya-in-f94.1e100.net.https > 172.16.146.2.40000: Flags [.], ack 1111, win 269, options [nop,nop,TS val 2337894047 ecr 656464965], length 0
11:34:03.089103 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 8620:8706, ack 1530, win 269, options [nop,nop,TS val 3266377185 ecr 267112678], length 86
11:34:03.089103 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 8706:10124, ack 1530, win 269, options [nop,nop,TS val 3266377186 ecr 267112678], length 1418
11:34:03.089103 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 10124:10363, ack 1530, win 269, options [nop,nop,TS val 3266377186 ecr 267112678], length 239
11:34:03.089103 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 10363:10394, ack 1530, win 269, options [nop,nop,TS val 3266377187 ecr 267112678], length 31
11:34:03.089103 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [P.], seq 10394:10433, ack 1530, win 269, options [nop,nop,TS val 3266377187 ecr 267112678], length 39
11:34:03.089286 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [.], ack 10433, win 487, options [nop,nop,TS val 267112787 ecr 3266377185], length 0
11:34:03.089587 IP 172.16.146.2.56302 > yx-in-f100.1e100.net.https: Flags [P.], seq 1530:1569, ack 10433, win 501, options [nop,nop,TS val 267112788 ecr 3266377185], length 39
11:34:03.093061 IP yi-in-f95.1e100.net.https > 172.16.146.2.42750: Flags [P.], seq 2837:3030, ack 514, win 261, options [nop,nop,TS val 1899993406 ecr 1711310570], length 193
11:34:03.093082 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [.], ack 1, win 502, options [nop,nop,TS val 1711310686 ecr 1899993324,nop,nop,sack 2 {2837:3030}{1419:3030}], length 0
11:34:03.116067 IP yx-in-f100.1e100.net.https > 172.16.146.2.56302: Flags [.], ack 1569, win 269, options [nop,nop,TS val 3266377214 ecr 267112788], length 0
11:34:03.132137 IP yq-in-f94.1e100.net.http > 172.16.146.2.42208: Flags [P.], seq 1:703, ack 379, win 261, options [nop,nop,TS val 3580204182 ecr 4103180638], length 702: HTTP: HTTP/1.1 200 OK
11:34:03.132158 IP 172.16.146.2.42208 > yq-in-f94.1e100.net.http: Flags [.], ack 703, win 501, options [nop,nop,TS val 4103180907 ecr 3580204182,nop,nop,sack 1 {1:703}], length 0
11:34:03.132137 IP yi-in-f95.1e100.net.https > 172.16.146.2.42750: Flags [.], seq 1:1419, ack 514, win 261, options [nop,nop,TS val 1899993447 ecr 1711310686], length 1418
11:34:03.132207 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [.], ack 3030, win 488, options [nop,nop,TS val 1711310725 ecr 1899993447], length 0
11:34:03.134757 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [P.], seq 514:578, ack 3030, win 501, options [nop,nop,TS val 1711310728 ecr 1899993447], length 64
11:34:03.135107 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [P.], seq 578:748, ack 3030, win 501, options [nop,nop,TS val 1711310728 ecr 1899993447], length 170
11:34:03.135164 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [P.], seq 748:947, ack 3030, win 501, options [nop,nop,TS val 1711310728 ecr 1899993447], length 199
11:34:03.161005 IP yi-in-f95.1e100.net.https > 172.16.146.2.42750: Flags [P.], seq 3030:3610, ack 578, win 261, options [nop,nop,TS val 1899993475 ecr 1711310728], length 580
11:34:03.161030 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [.], ack 3610, win 501, options [nop,nop,TS val 1711310754 ecr 1899993475], length 0
11:34:03.161374 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [P.], seq 947:978, ack 3610, win 501, options [nop,nop,TS val 1711310754 ecr 1899993475], length 31
11:34:03.166693 IP yi-in-f95.1e100.net.https > 172.16.146.2.42750: Flags [.], ack 947, win 269, options [nop,nop,TS val 1899993481 ecr 1711310728], length 0
11:34:03.166693 IP yi-in-f95.1e100.net.https > 172.16.146.2.42750: Flags [P.], seq 3610:3840, ack 947, win 269, options [nop,nop,TS val 1899993481 ecr 1711310728], length 230
11:34:03.166720 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [.], ack 3840, win 501, options [nop,nop,TS val 1711310760 ecr 1899993481], length 0
11:34:03.167192 IP 172.16.146.2.42750 > yi-in-f95.1e100.net.https: Flags [P.], seq 978:1017, ack 3840, win 501, options [nop,nop,TS val 1711310760 ecr 1899993481], length 39
11:34:03.183857 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [P.], seq 912:1197, ack 6365, win 501, options [nop,nop,TS val 4064787 ecr 3444225297], length 285
11:34:03.184162 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [P.], seq 1197:1221, ack 6365, win 501, options [nop,nop,TS val 4064787 ecr 3444225297], length 24
11:34:03.184222 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [F.], seq 1221, ack 6365, win 501, options [nop,nop,TS val 4064787 ecr 3444225297], length 0
11:34:03.184731 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [P.], seq 913:1196, ack 6365, win 501, options [nop,nop,TS val 4064788 ecr 3444225349], length 283
11:34:03.185086 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [P.], seq 1196:1220, ack 6365, win 501, options [nop,nop,TS val 4064788 ecr 3444225349], length 24
11:34:03.185127 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [F.], seq 1220, ack 6365, win 501, options [nop,nop,TS val 4064788 ecr 3444225349], length 0
11:34:03.196585 IP yi-in-f95.1e100.net.https > 172.16.146.2.42750: Flags [.], ack 1017, win 269, options [nop,nop,TS val 1899993511 ecr 1711310754], length 0
11:34:03.209977 IP 172.16.146.2.48726 > yb-in-f113.1e100.net.https: Flags [P.], seq 1:514, ack 1, win 502, options [nop,nop,TS val 2065809025 ecr 4185550247], length 513
11:34:03.224548 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [.], ack 1197, win 502, options [nop,nop,TS val 3444225675 ecr 4064787], length 0
11:34:03.224548 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [.], ack 1221, win 502, options [nop,nop,TS val 3444225675 ecr 4064787], length 0
11:34:03.224548 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [P.], seq 6365:9261, ack 1221, win 502, options [nop,nop,TS val 3444225676 ecr 4064787], length 2896
11:34:03.224584 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [R], seq 3495723489, win 0, length 0
11:34:03.224548 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [P.], seq 9261:12157, ack 1221, win 502, options [nop,nop,TS val 3444225676 ecr 4064787], length 2896
11:34:03.224621 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [R], seq 3495723489, win 0, length 0
11:34:03.224548 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [P.], seq 12157:15053, ack 1221, win 502, options [nop,nop,TS val 3444225676 ecr 4064787], length 2896
11:34:03.224717 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [R], seq 3495723489, win 0, length 0
11:34:03.224877 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [P.], seq 15053:15241, ack 1221, win 502, options [nop,nop,TS val 3444225676 ecr 4064787], length 188
11:34:03.224897 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [R], seq 3495723489, win 0, length 0
11:34:03.224877 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [FP.], seq 15241:15265, ack 1221, win 502, options [nop,nop,TS val 3444225676 ecr 4064787], length 24
11:34:03.224924 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [R], seq 3495723489, win 0, length 0
11:34:03.229415 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [.], ack 1196, win 502, options [nop,nop,TS val 3444225679 ecr 4064788], length 0
11:34:03.229415 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [.], ack 1220, win 502, options [nop,nop,TS val 3444225680 ecr 4064788], length 0
11:34:03.229415 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [P.], seq 6365:7171, ack 1221, win 502, options [nop,nop,TS val 3444225680 ecr 4064788], length 806
11:34:03.229452 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [R], seq 1337000990, win 0, length 0
11:34:03.229415 IP 207.244.88.140.https > 172.16.146.2.52542: Flags [.], ack 1222, win 502, options [nop,nop,TS val 3444225680 ecr 4064787], length 0
11:34:03.229525 IP 172.16.146.2.52542 > 207.244.88.140.https: Flags [R], seq 3495723490, win 0, length 0
11:34:03.229415 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [P.], seq 7171:7195, ack 1221, win 502, options [nop,nop,TS val 3444225680 ecr 4064788], length 24
11:34:03.229595 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [R], seq 1337000990, win 0, length 0
11:34:03.229415 IP 207.244.88.140.https > 172.16.146.2.52540: Flags [F.], seq 7195, ack 1221, win 502, options [nop,nop,TS val 3444225680 ecr 4064788], length 0
11:34:03.229628 IP 172.16.146.2.52540 > 207.244.88.140.https: Flags [R], seq 1337000990, win 0, length 0
11:34:03.232524 IP 172.16.146.2.36572 > 172.16.146.1.domain: 47776+ A? googleads.g.doubleclick.net. (45)
11:34:03.232634 IP 172.16.146.2.36572 > 172.16.146.1.domain: 59299+ AAAA? googleads.g.doubleclick.net. (45)
11:34:03.235739 IP yb-in-f113.1e100.net.https > 172.16.146.2.48726: Flags [.], ack 514, win 261, options [nop,nop,TS val 4185550505 ecr 2065808795], length 0
11:34:03.235739 IP yb-in-f113.1e100.net.https > 172.16.146.2.48726: Flags [.], ack 514, win 261, options [nop,nop,TS val 4185550505 ecr 2065809025,nop,nop,sack 1 {1:514}], length 0
11:34:03.235739 IP yb-in-f113.1e100.net.https > 172.16.146.2.48726: Flags [P.], seq 1:3869, ack 514, win 261, options [nop,nop,TS val 4185550506 ecr 2065809025], length 3868
11:34:03.235784 IP 172.16.146.2.48726 > yb-in-f113.1e100.net.https: Flags [.], ack 3869, win 489, options [nop,nop,TS val 2065809051 ecr 4185550506], length 0
11:34:03.238515 IP 172.16.146.2.48726 > yb-in-f113.1e100.net.https: Flags [P.], seq 514:578, ack 3869, win 501, options [nop,nop,TS val 2065809054 ecr 4185550506], length 64
11:34:03.238846 IP 172.16.146.2.48726 > yb-in-f113.1e100.net.https: Flags [P.], seq 578:765, ack 3869, win 501, options [nop,nop,TS val 2065809054 ecr 4185550506], length 187
11:34:03.250531 IP 172.16.146.1.domain > 172.16.146.2.36572: 59299* 1/0/0 AAAA :: (73)
11:34:03.254323 IP 172.16.146.1.domain > 172.16.146.2.36572: 47776* 1/0/0 A 0.0.0.0 (61)
11:34:03.266304 IP 172.16.146.2.42666 > 172.16.146.1.domain: 41248+ A? static.doubleclick.net. (40)
11:34:03.266441 IP 172.16.146.2.42666 > 172.16.146.1.domain: 60709+ AAAA? static.doubleclick.net. (40)
11:34:03.268800 IP yb-in-f113.1e100.net.https > 172.16.146.2.48726: Flags [P.], seq 3869:4449, ack 765, win 265, options [nop,nop,TS val 4185550539 ecr 2065809054], length 580
11:34:03.268837 IP 172.16.146.2.48726 > yb-in-f113.1e100.net.https: Flags [.], ack 4449, win 501, options [nop,nop,TS val 2065809084 ecr 4185550539], length 0
11:34:03.268800 IP yb-in-f113.1e100.net.https > 172.16.146.2.48726: Flags [P.], seq 4449:4480, ack 765, win 265, options [nop,nop,TS val 4185550539 ecr 2065809054], length 31
11:34:03.268872 IP 172.16.146.2.48726 > yb-in-f113.1e100.net.https: Flags [.], ack 4480, win 501, options [nop,nop,TS val 2065809084 ecr 4185550539], length 0
11:34:03.269104 IP 172.16.146.2.48726 > yb-in-f113.1e100.net.https: Flags [P.], seq 765:789, ack 4480, win 501, options [nop,nop,TS val 2065809084 ecr 4185550539], length 24
11:34:03.269162 IP 172.16.146.2.48726 > yb-in-f113.1e100.net.https: Flags [F.], seq 789, ack 4480, win 501, options [nop,nop,TS val 2065809084 ecr 4185550539], length 0
11:34:03.276810 IP 172.16.146.1.domain > 172.16.146.2.42666: 41248* 1/0/0 A 0.0.0.0 (56)
11:34:03.279019 IP 172.16.146.1.domain > 172.16.146.2.42666: 60709* 1/0/0 AAAA :: (68)
11:34:03.297682 IP yb-in-f113.1e100.net.https > 172.16.146.2.48726: Flags [F.], seq 4480, ack 789, win 265, options [nop,nop,TS val 4185550567 ecr 2065809084], length 0
11:34:03.297705 IP 172.16.146.2.48726 > yb-in-f113.1e100.net.https: Flags [.], ack 4481, win 501, options [nop,nop,TS val 2065809113 ecr 4185550567], length 0
11:34:03.300975 IP yb-in-f113.1e100.net.https > 172.16.146.2.48726: Flags [.], ack 790, win 265, options [nop,nop,TS val 4185550571 ecr 2065809084], length 0
11:34:03.413270 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1471:1585, ack 26830, win 501, options [nop,nop,TS val 1945791244 ecr 3321847963], length 114
11:34:03.415664 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1585:1620, ack 26830, win 501, options [nop,nop,TS val 1945791247 ecr 3321847963], length 35
11:34:03.421290 IP 172.16.146.2.50168 > yi-in-f106.1e100.net.https: Flags [S], seq 1204323906, win 64240, options [mss 1460,sackOK,TS val 2277483519 ecr 0,nop,wscale 7], length 0
11:34:03.440637 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 1585, win 273, options [nop,nop,TS val 3321848376 ecr 1945791244], length 0
11:34:03.440637 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 26830:27050, ack 1585, win 273, options [nop,nop,TS val 3321848379 ecr 1945791244], length 220
11:34:03.440637 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 27050:28468, ack 1585, win 273, options [nop,nop,TS val 3321848379 ecr 1945791244], length 1418
11:34:03.440704 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 28468, win 546, options [nop,nop,TS val 1945791272 ecr 3321848379], length 0
11:34:03.440637 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 28468:29886, ack 1585, win 273, options [nop,nop,TS val 3321848379 ecr 1945791244], length 1418
11:34:03.444089 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 29886:32722, ack 1585, win 273, options [nop,nop,TS val 3321848380 ecr 1945791244], length 2836
11:34:03.444111 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 32722, win 613, options [nop,nop,TS val 1945791275 ecr 3321848379], length 0
11:34:03.444089 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 32722:35558, ack 1585, win 273, options [nop,nop,TS val 3321848381 ecr 1945791244], length 2836
11:34:03.444199 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 35558, win 657, options [nop,nop,TS val 1945791275 ecr 3321848381], length 0
11:34:03.445162 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 35558:38394, ack 1585, win 273, options [nop,nop,TS val 3321848382 ecr 1945791244], length 2836
11:34:03.445183 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 38394, win 702, options [nop,nop,TS val 1945791276 ecr 3321848382], length 0
11:34:03.445162 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 38394:41230, ack 1620, win 273, options [nop,nop,TS val 3321848384 ecr 1945791247], length 2836
11:34:03.445241 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 41230, win 746, options [nop,nop,TS val 1945791276 ecr 3321848384], length 0
11:34:03.447023 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 41230:44066, ack 1620, win 273, options [nop,nop,TS val 3321848385 ecr 1945791247], length 2836
11:34:03.447044 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 44066, win 790, options [nop,nop,TS val 1945791278 ecr 3321848385], length 0
11:34:03.448064 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 44066:45484, ack 1620, win 273, options [nop,nop,TS val 3321848386 ecr 1945791247], length 1418
11:34:03.449386 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 45484:46902, ack 1620, win 273, options [nop,nop,TS val 3321848386 ecr 1945791247], length 1418
11:34:03.449401 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 46902, win 835, options [nop,nop,TS val 1945791280 ecr 3321848386], length 0
11:34:03.449386 IP yi-in-f106.1e100.net.https > 172.16.146.2.50168: Flags [S.], seq 2346960541, ack 1204323907, win 65535, options [mss 1430,sackOK,TS val 3247353539 ecr 2277483519,nop,wscale 8], length 0
11:34:03.449485 IP 172.16.146.2.50168 > yi-in-f106.1e100.net.https: Flags [R], seq 1204323907, win 0, length 0
11:34:03.449387 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 46902:49738, ack 1620, win 273, options [nop,nop,TS val 3321848387 ecr 1945791247], length 2836
11:34:03.449532 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 49738, win 880, options [nop,nop,TS val 1945791281 ecr 3321848387], length 0
11:34:03.450429 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 49738:51156, ack 1620, win 273, options [nop,nop,TS val 3321848389 ecr 1945791247], length 1418
11:34:03.453320 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 51156:52574, ack 1620, win 273, options [nop,nop,TS val 3321848389 ecr 1945791247], length 1418
11:34:03.453340 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 52574, win 925, options [nop,nop,TS val 1945791284 ecr 3321848389], length 0
11:34:03.453320 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 52574:55410, ack 1620, win 273, options [nop,nop,TS val 3321848390 ecr 1945791247], length 2836
11:34:03.453389 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 55410, win 969, options [nop,nop,TS val 1945791284 ecr 3321848390], length 0
11:34:03.453320 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 55410:56828, ack 1620, win 273, options [nop,nop,TS val 3321848391 ecr 1945791247], length 1418
11:34:03.454644 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], seq 56828:58246, ack 1620, win 273, options [nop,nop,TS val 3321848391 ecr 1945791247], length 1418
11:34:03.454663 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 58246, win 1015, options [nop,nop,TS val 1945791286 ecr 3321848391], length 0
11:34:03.454644 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 58246:60548, ack 1620, win 273, options [nop,nop,TS val 3321848392 ecr 1945791247], length 2302
11:34:03.454719 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 60548, win 1050, options [nop,nop,TS val 1945791286 ecr 3321848392], length 0
11:34:03.454953 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1620:1659, ack 60548, win 1050, options [nop,nop,TS val 1945791286 ecr 3321848392], length 39
11:34:03.488784 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 1659, win 273, options [nop,nop,TS val 3321848425 ecr 1945791286], length 0
11:34:03.510027 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1659:1772, ack 60548, win 1050, options [nop,nop,TS val 1945791341 ecr 3321848425], length 113
11:34:03.512378 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1772:1807, ack 60548, win 1050, options [nop,nop,TS val 1945791343 ecr 3321848425], length 35
11:34:03.515987 IP 172.16.146.2.43907 > 172.16.146.1.domain: 29684+ A? yt3.ggpht.com. (31)
11:34:03.516053 IP 172.16.146.2.43907 > 172.16.146.1.domain: 46577+ AAAA? yt3.ggpht.com. (31)
11:34:03.516772 IP 172.16.146.1.domain > 172.16.146.2.43907: 29684 2/0/0 CNAME photos-ugc.l.googleusercontent.com., A 172.217.11.129 (92)
11:34:03.516773 IP 172.16.146.1.domain > 172.16.146.2.43907: 46577 2/0/0 CNAME photos-ugc.l.googleusercontent.com., AAAA 2607:f8b0:4002:810::2001 (104)
11:34:03.517070 IP 172.16.146.2.58222 > atl26s13-in-f1.1e100.net.https: Flags [S], seq 3818227688, win 64240, options [mss 1460,sackOK,TS val 2561801510 ecr 0,nop,wscale 7], length 0
11:34:03.519390 IP 172.16.146.2.53828 > 172.16.146.1.domain: 38612+ A? i.ytimg.com. (29)
11:34:03.519441 IP 172.16.146.2.53828 > 172.16.146.1.domain: 47577+ AAAA? i.ytimg.com. (29)
11:34:03.541172 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 1772, win 273, options [nop,nop,TS val 3321848477 ecr 1945791341], length 0
11:34:03.541172 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 60548:60651, ack 1772, win 273, options [nop,nop,TS val 3321848478 ecr 1945791341], length 103
11:34:03.541172 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 60651:62069, ack 1772, win 273, options [nop,nop,TS val 3321848478 ecr 1945791341], length 1418
11:34:03.541254 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 62069, win 1073, options [nop,nop,TS val 1945791372 ecr 3321848478], length 0
11:34:03.545187 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 62069:64905, ack 1772, win 273, options [nop,nop,TS val 3321848479 ecr 1945791341], length 2836
11:34:03.545241 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 64905, win 1117, options [nop,nop,TS val 1945791376 ecr 3321848479], length 0
11:34:03.545187 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 64905:67741, ack 1772, win 273, options [nop,nop,TS val 3321848480 ecr 1945791341], length 2836
11:34:03.545317 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [.], ack 67741, win 1162, options [nop,nop,TS val 1945791376 ecr 3321848480], length 0
11:34:03.545187 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 67741:68548, ack 1772, win 273, options [nop,nop,TS val 3321848481 ecr 1945791341], length 807
11:34:03.545550 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1807:1846, ack 68548, win 1184, options [nop,nop,TS val 1945791377 ecr 3321848481], length 39
11:34:03.546516 IP atl26s13-in-f1.1e100.net.https > 172.16.146.2.58222: Flags [S.], seq 2732462132, ack 3818227689, win 65535, options [mss 1430,sackOK,TS val 680767228 ecr 2561801510,nop,wscale 8], length 0
11:34:03.546534 IP 172.16.146.2.58222 > atl26s13-in-f1.1e100.net.https: Flags [R], seq 3818227689, win 0, length 0
11:34:03.547607 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 1807, win 273, options [nop,nop,TS val 3321848485 ecr 1945791343], length 0
11:34:03.562631 IP 172.16.146.1.domain > 172.16.146.2.53828: 38612 9/0/0 A 64.233.185.119, A 74.125.138.119, A 108.177.122.119, A 172.217.215.119, A 142.250.9.119, A 172.217.0.150, A 64.233.177.119, A 172.217.13.22, A 172.217.0.86 (173)
11:34:03.572213 IP 172.16.146.1.domain > 172.16.146.2.53828: 47577 4/0/0 AAAA 2607:f8b0:4002:80b::2016, AAAA 2607:f8b0:4002:c06::77, AAAA 2607:f8b0:4002:807::2016, AAAA 2607:f8b0:4002:808::2016 (141)
11:34:03.574437 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 1846, win 273, options [nop,nop,TS val 3321848511 ecr 1945791377], length 0
11:34:03.704846 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1846:1950, ack 68548, win 1184, options [nop,nop,TS val 1945791536 ecr 3321848511], length 104
11:34:03.734088 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 1950, win 273, options [nop,nop,TS val 3321848670 ecr 1945791536], length 0
11:34:03.734088 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [P.], seq 68548:68626, ack 1950, win 273, options [nop,nop,TS val 3321848670 ecr 1945791536], length 78
11:34:03.736972 IP 172.16.146.2.37106 > yx-in-f91.1e100.net.https: Flags [P.], seq 1950:1989, ack 68626, win 1184, options [nop,nop,TS val 1945791568 ecr 3321848670], length 39
11:34:03.772838 IP yx-in-f91.1e100.net.https > 172.16.146.2.37106: Flags [.], ack 1989, win 273, options [nop,nop,TS val 3321848709 ecr 1945791568], length 0

```

Protocolos Comunes: DNS, HTTP , HTTPS 
Puertos Utilizados: 53, 80, 443.

### Identificar conversaciones

>¿Está notando alguna conexión común entre un servidor y un host? Si es así, ¿quién?

>¿Cuáles son los números de puerto del cliente y del servidor utilizados en el primer protocolo de enlace TCP completo de tres vías?

Esto mostrará todos los paquetes que representan el inicio de un apretón de manos de tres vías en el archivo pcap especificado.

```
~> tcpdump -r TCPDump-lab-2.pcap 'tcp[tcpflags] & (tcp-syn|tcp-ack) == tcp-syn'
```

>¿Quiénes son los servidores de estas conversaciones? ¿Como sabemos?
Los que utilizan los puertos 56,80,443.

>¿Quiénes son los anfitriones receptores? 
Los que utilizan puertos altos.

### Consejos para el analisis

- ¿Qué tipo de tráfico ves? (protocolo, puerto, etc.)
- ¿Hay más de una conversación? (¿cuántos?)
- ¿Cuántos hosts únicos?
- ¿Cuál es la marca de tiempo de la primera conversación en el pcap (tráfico tcp)?
- ¿Qué tráfico puedo filtrar para limpiar mi vista?
- ¿Quiénes son los servidores del PCAP? (respondiendo en puertos conocidos, 53, 80, etc.)
- ¿Qué registros se solicitaron o métodos utilizados? (GET, POST, registros DNS A, etc.) 

## Wireshark

Wireshark es una herramienta de análisis de tráfico de red gratuita y de código abierto con una interfaz gráfica fácil de usar. Puede capturar datos de varias interfaces de red, como WiFi, USB y Bluetooth, y guardar el tráfico en diferentes formatos. Wireshark permite una inspección detallada de los paquetes de red, lo que lo convierte en una herramienta poderosa para analizar el tráfico de red.

### Filtros de visualizacion

- **ip.addr == x.x.x.x** : Captura sólo el tráfico perteneciente a un determinado host.
- **ip.addr == x.x.x.x/24** : Capture el tráfico perteneciente a una red específica.
- **ip.src/dst == x.x.x.x** : Capturar tráfico hacia o desde un host específico.
- **dns / tcp / ftp / arp / ip** : Filtrar el tráfico por un protocolo específico. 
- **tcp.port == x**: Filtrar por un puerto tcp específico. 
- **tcp.port / udp.port != x**:  Capturará todo excepto el puerto especificado. 
- **and / or / not** : Y concatenará, O encontrará cualquiera de las dos opciones, NO excluirá su opción de entrada. 

### Filtros FTP

- **ftp** : Mostrara las comunicaciones por FTP
- **ftp.request.command** : Mostrara cualquier comando enviado por ftp.
- **ftp.data** : Mostrara cualquier informacion transferida.










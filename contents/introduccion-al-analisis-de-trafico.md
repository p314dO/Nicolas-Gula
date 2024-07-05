---
title: Introduccion al analisis de trafico
description: Introduccion al analisis de trafico
excerpt:
  Los equipos de seguridad utilizan el análisis del tráfico de red para monitorear la actividad de la red y buscar anomalías que podrían indicar problemas operativos y de seguridad.
datetime: 2024-04-07T05:35:07.000+00:00
tags:
  - Wireshark
  - Traffic Analysis
  - The OSI Model
  - TCP/IP
  - PDU
featured: false
category: What is ?
author: nGbonzini
type: article
coverImage:  https://pandorafms.com/blog/wp-content/uploads/2019/05/analisis-de-trafico-de-red-featured.jpg
coverImageAlt: Microsoft AD
coverImageWidth: "2725"
coverImageHeight: "1400"
ogImage: "/assets/blog/hello-world/cover.jpg"
ogImageAlt: something
language: "Spanish"
---

## Analisis de trafico

El análisis del tráfico de red es crucial para la seguridad, siendo utilizado por equipos defensores para detectar anomalías y por atacantes para encontrar datos sensibles. Permite recopilar datos históricos y en tiempo real de la red, identificar protocolos y cifrados vulnerables, y detectar actividades sospechosas. Herramientas como Wireshark y tcpdump son fundamentales en este proceso.

## Que es?

Network Traffic Analysis (NTA) implica examinar el tráfico de la red para entender los puertos y protocolos comunes, establecer una línea base, monitorear amenazas y garantizar un conocimiento completo de la red. Ayuda a detectar anomalías y amenazas de seguridad, facilita el cumplimiento normativo y permite una respuesta temprana y efectiva a las amenazas. Los atacantes evolucionan constantemente, aprovechando credenciales legítimas y tácticas nuevas para eludir la detección, lo que desafía a los defensores en la detección y respuesta. El análisis del tráfico de red resulta útil para varios casos de uso diario, como recopilar y analizar tráfico en tiempo real para detectar amenazas emergentes, establecer una base para las comunicaciones diarias, identificar y analizar tráfico sospechoso en puertos no estándar o hosts, así como detectar malware como ransomware y exploits. También es valioso en la investigación de incidentes pasados y la búsqueda de amenazas.

Para detectar y detener amenazas en nuestra red, necesitamos comprender los patrones normales de comunicación. Al utilizar nuestro conocimiento del tráfico típico, podemos identificar comportamientos sospechosos, como portscans, que pueden indicar intentos de infiltración. Este enfoque nos permite intervenir rápidamente para interrumpir comunicaciones adversas y proteger nuestra infraestructura.

## Habilidades requeridas

Es esencial comprender la relación entre la pila TCP/IP y el modelo OSI para entender cómo interactúan el tráfico de red y las aplicaciones host. Además, es crucial tener conocimientos básicos sobre conceptos de red, como conmutación y enrutamiento, y reconocer puertos y protocolos estándar para identificar posibles amenazas. Comprender cómo TCP y UDP comunican datos también es fundamental, ya que TCP garantiza la integridad de los datos mientras que UDP es más rápido pero menos confiable. Finalmente, entender la encapsulación de protocolos de transporte ayuda a interpretar los datos más eficientemente, ya que cada capa encapsula la anterior.

## Equipamiento

El análisis del tráfico de red implica el uso de diversas herramientas y equipos que capturan y analizan datos de tráfico. Ejemplos incluyen Wireshark y tcpdump, aunque hay muchas otras disponibles. Es importante destacar que estas herramientas no están limitadas a administradores y pueden ser utilizadas con propósitos maliciosos.

- tcpdump y Tshark: Utilidades de línea de comandos para capturar y analizar paquetes en vivo o desde archivos.
- Wireshark: Un poderoso analizador gráfico que decodifica y muestra el tráfico de red en detalle.
- NGrep: Herramienta para buscar patrones en paquetes de red, ideal para depurar tráfico HTTP y FTP.
- tcpick: Especializado en rastrear y reensamblar flujos TCP.
- Taps y Span Ports: Dispositivos que capturan y analizan el tráfico de red en tiempo real.
- Elastic Stack y SIEMs: Soluciones avanzadas para la ingesta, visualización y análisis de datos de múltiples fuentes, incluido el tráfico de red.

## Sintaxis BPF

BPF (Berkeley Packet Filter) es una tecnología clave utilizada en muchas herramientas de análisis de tráfico de red. Permite la lectura y escritura desde la capa de enlace de datos, lo que brinda capacidades de filtrado y decodificación. Al comprender la sintaxis de BPF, los usuarios pueden configurar filtros para analizar paquetes de manera efectiva. Es fundamental tener una comprensión básica de esta sintaxis para aprovechar al máximo las herramientas de análisis de tráfico de red.

## Realizar análisis de tráfico de red 

Realizar un análisis de tráfico puede ser simple, como observar el tráfico en vivo en la consola, o complejo, como capturar datos para su análisis en un SIEM. Para escuchar pasivamente, necesitamos estar conectados al segmento de red relevante, especialmente en entornos conmutados donde el tráfico no se reenvía automáticamente. Dispositivos como grifos de red o configuraciones específicas de conmutadores pueden ayudar a capturar todo el tráfico en un enlace específico.

## Flujo de trabajo de la ANT 

El análisis de tráfico no es exacto y puede ser influenciado por lo que buscamos y la visibilidad de nuestra red. Se basa en algunos principios básicos.

- **Ingesta de tráfico:** Capturamos el tráfico y aplicamos filtros si es necesario.

- **Reducción de ruido:** Filtramos el tráfico innecesario para facilitar el análisis.

- **Análisis y exploración:** Recopilamos datos relevantes y hacemos preguntas clave sobre el tráfico. ¿El tráfico está cifrado o es texto sin formato? ¿Podemos ver usuarios intentando acceder a recursos a los que no deberían tener acceso? ¿Hay diferentes anfitriones hablando entre sí que normalmente no lo hacen?


- **Detección del problema:** Identificamos posibles errores o comportamientos maliciosos.

- **Reparación y monitoreo:** Realizamos cambios necesarios y continuamos monitoreando para verificar la solución.

## Rapido Repaso Sobre Redes

Esta sección proporciona un repaso rápido sobre redes y protocolos estándar. Es fundamental entender estos conceptos para capturar y analizar tráfico de manera precisa. Sin esta comprensión, no podemos interpretar correctamente el tráfico capturado.

### Modelos OSI/TCP-IP

![OSI](https://static.platzi.com/media/user_upload/Captura%20de%20Pantalla%202022-01-26%20a%20la%28s%29%207.18.25%20p.m.-c9668c1c-6cea-4114-a78f-a37d97f00bea.jpg)

![OSI & TCP-IP](https://academy.hackthebox.com/storage/modules/81/net_models4.png)

El modelo OSI es más segmentado que el modelo TCP-IP, dividiéndose en capas que controlan desde la transmisión física hasta la presentación de datos al usuario. Mientras tanto, el modelo TCP-IP está más alineado con la funcionalidad real de la red y tiene cuatro capas más combinadas y flexibles. Las PDUs (unidades de datos de protocolo) son paquetes que contienen información y datos encapsulados de cada capa del modelo OSI. Es esencial comprender cómo se relacionan estas capas para analizar el tráfico de manera efectiva.

![PDU](https://academy.hackthebox.com/storage/modules/81/net_models_pdu2.png)

Cuando inspeccionamos una PDU, es esencial entender el concepto de encapsulación. Cada capa de la pila de protocolos envuelve los datos de las capas anteriores en una nueva burbuja, añadiendo información necesaria al encabezado de la PDU. Esta información incluye indicadores operativos, direcciones IP, puertos y protocolos de la capa de aplicación.

### Desgloce de paquetes de PDU

![PDU](https://academy.hackthebox.com/storage/modules/81/pdu-wireshark.png)

En Wireshark, la representación de la PDU está en orden inverso porque muestra cómo fue desencapsulada. La imagen muestra la composición de una PDU junto con un desglose de paquetes en el panel "Detalles de paquetes" de Wireshark.

## Mecanismos de abordaje

Después de revisar los conceptos básicos de redes, ahora nos centraremos en los mecanismos de direccionamiento que aseguran la entrega adecuada de los paquetes. Empezaremos por explorar las direcciones de control de acceso a medios.

### Direccionamiento MAC

Cada interfaz de un host tiene una dirección de control de acceso a medios (MAC) de 48 bits, representada en formato hexadecimal. Esta dirección identifica de manera única cada dispositivo en una red.

![Mac](https://academy.hackthebox.com/storage/modules/81/Addressing.png)

La dirección MAC se usa en la capa dos para la comunicación entre hosts dentro de un dominio de transmisión. Si el tráfico de la capa dos necesita cruzar a la capa tres, se envía a la interfaz de salida de la capa tres y se enruta a la red correcta. El enrutador considera la dirección de la capa tres para determinar la próxima ruta. Luego, reemplaza la información de la capa dos con la siguiente dirección física en la ruta.

### Direccionamiento IP 

El protocolo de Internet (IP) se desarrolló para enrutar datos entre hosts a través de redes. IP se encarga del enrutamiento, encapsulación y fragmentación de datos. Es un protocolo sin conexión y no garantiza la entrega. IPv4 es el estándar actual, mientras que IPv6 es su sucesor. IPv4 utiliza direcciones para enrutar paquetes entre redes.

>**PROTOCOLO SIN CONEXION?** Yes! Cuando se dice que IP es un protocolo "sin conexión", significa que no establece una conexión explícita antes de enviar datos. En otras palabras, no hay un proceso de establecimiento de conexión como el que se encuentra en protocolos como TCP (Transmission Control Protocol), donde se establece una conexión antes de enviar datos y se realizan verificaciones de entrega. Con IP, los paquetes se envían de forma independiente y pueden seguir rutas diferentes hacia su destino. Esto significa que no hay garantías de que los paquetes lleguen a su destino o lo hagan en el orden correcto.

### IPv4
Una dirección IPv4 consta de 32 bits y se representa en formato decimal con cuatro octetos, como 192.168.86.243. Cada octeto puede tener un valor de 0 a 255. Estas direcciones se encuentran en la capa tres del modelo OSI y en la capa dos del modelo TCP-IP. En este módulo, exploraremos el significado y el uso de las direcciones IPv4.

### IPv6

Debido al rápido agotamiento de las direcciones IPv4, se implementaron técnicas como VLSM y CIDR para redefinir la asignación de direcciones IP. Además, se desarrolló IPv6 como sucesor de IPv4. IPv6 ofrece un espacio de direcciones mucho más amplio, con direcciones de 128 bits representadas en formato hexadecimal.

IPv6 ofrece varias mejoras sobre IPv4, incluyendo un espacio de direcciones mucho más grande, mejor soporte para multicasting, direccionamiento global por dispositivo, seguridad integrada mediante IPSec y encabezados de paquetes simplificados que facilitan el procesamiento y la transición entre conexiones sin necesidad de reasignar direcciones.

IPv6 utiliza cuatro tipos principales de direcciones dentro de su esquema: 

Las direcciones IPv6 se dividen en cuatro tipos principales: unicast, anycast, multicast y broadcast. Unicast se refiere a direcciones para una única interfaz, anycast se utiliza para múltiples interfaces donde solo una recibe el paquete, multicast se emplea para múltiples interfaces donde todas reciben el mismo paquete, y no existe broadcast en IPv6, ya que se realiza utilizando direcciones multicast.

## TCP/UDP Mecanismos de transporte

La capa de transporte, como un centro de control, dirige cómo se encapsulan los datos y se envían a través de los protocolos de capa inferior. TCP y UDP son los dos mecanismos principales utilizados en esta capa para garantizar la entrega fluida de datos. TCP proporciona una entrega confiable y ordenada, mientras que UDP ofrece una entrega más rápida pero sin garantías de orden o confiabilidad.

TCP y UDP son dos protocolos de la capa de transporte con diferencias fundamentales:

- **TCP (Transmission Control Protocol)**:
  - Orientado a la conexión: establece una conexión antes de la transmisión.
  - Utiliza un protocolo de enlace de tres vías para establecer una conexión.
  - Proporciona una entrega confiable y ordenada de datos.
  - Utiliza números de secuencia y acuse de recibo para garantizar la integridad de los datos.
  - Tiene más gastos generales y es más lento debido a sus funciones integradas.

- **UDP (User Datagram Protocol)**:
  - Sin conexión: no requiere establecer una conexión antes de la transmisión.
  - No garantiza que el destino esté escuchando.
  - Proporciona una entrega rápida pero no confiable de datos.
  - Opera en un modelo de "disparar y olvidar".
  - Es más rápido pero menos confiable que TCP.

TCP y UDP ofrecen enfoques de transmisión de datos diferentes. TCP es más confiable, con verificación de errores y reconocimiento de datos, mientras que UDP es rápido pero menos confiable, ideal para situaciones donde la velocidad es prioritaria sobre la calidad y la validación.

TCP se utiliza para transferir datos que requieren integridad, como en Secure Shell (SSH), donde se mantienen conexiones estables para enviar comandos. TCP garantiza que la conversación no se interrumpa y evita errores al asegurar que cada paquete sea recibido antes de ensamblar los datos. En contraste, UDP no ofrece esta garantía y puede llevar a pérdida de datos o errores en la transmisión.

UDP es ideal para aplicaciones que priorizan la velocidad sobre la integridad de los datos, como la transmisión de video o las consultas DNS. A diferencia de TCP, UDP no proporciona confirmación de entrega ni retransmisión de paquetes. Esto significa que el tráfico UDP puede ser más rápido, pero también menos confiable.

## TCP Three-way Handshake

TCP utiliza sesiones establecidas mediante un apretón de manos de tres vías para garantizar la entrega de datos del servidor al cliente. Este proceso implica el intercambio de paquetes con indicadores SYN y ACK para establecer la conexión. El cliente envía un paquete SYN al servidor, que responde con un paquete SYN-ACK, y finalmente el cliente envía un paquete ACK para confirmar la conexión. Este protocolo asegura que ambas partes estén listas para comunicarse y acuerden un número de secuencia para el seguimiento de paquetes.

## HTTP
HTTP es un protocolo utilizado para transferir datos entre un cliente y un servidor a través de TCP. Se usa para solicitar recursos como páginas web, imágenes o videos. Es sin estado y opera sobre los puertos 80 u 8000 en TCP, aunque ocasionalmente puede usar puertos alternativos o incluso UDP.

### Metodos

Para realizar operaciones como buscar páginas web, solicitar elementos para descargar se requiere el uso de métodos específicos. Estos métodos definen las acciones tomadas al solicitar un URI. Métodos: 

- **HEAD**: Solicita información del servidor similar a GET, pero sin incluir el cuerpo del mensaje. Útil para obtener detalles sobre el servidor.
- **GET**: El más común, solicita información y contenido al servidor.
- **POST**: Envía información al servidor según los campos de la solicitud, como enviar un mensaje en redes sociales.
- **PUT**: Coloca los datos adjuntos al mensaje bajo el URI solicitado, creando o actualizando un objeto.
- **DELETE**: Elimina el objeto en el URI dado.
- **TRACE**: Permite el diagnóstico remoto del servidor repitiendo la solicitud en su respuesta.
- **OPTIONS**: Recopila información sobre los métodos HTTP admitidos por el servidor.
- **CONNECT**: Reservado para uso con proxies o dispositivos de seguridad, permite la creación de túneles a través de HTTP (túneles SSL).

En HTTP, los métodos GET y HEAD son requeridos y deben estar disponibles en todas las implementaciones estándar. Los métodos TRACE, OPTIONS, DELETE, PUT y POST son opcionales y pueden estar habilitados según las necesidades del servidor. Por ejemplo, en una página web de solo lectura, los métodos de modificación como PUT y DELETE pueden no estar permitidos para los clientes.

## HTTPS

HTTPS es una versión segura del protocolo HTTP que utiliza TLS o SSL para cifrar las comunicaciones entre un cliente y un servidor. Antes de TLS, existían vulnerabilidades como los ataques Man-in-the-middle, que permitían a terceros ver el tráfico web. Con TLS, podemos cifrar toda la conversación web, incluyendo hábitos de navegación, transacciones bancarias y más, protegiendo así la privacidad y seguridad de los usuarios.

### Protocolo de enlace TLS a través de HTTPS 

![Https](https://academy.hackthebox.com/storage/modules/81/https.png)

El cliente establece una sesión con el servidor usando el puerto 443, indicando que desea utilizar HTTPS. Luego, se inicia el protocolo de enlace TLS, donde se acuerdan parámetros como el identificador de sesión y el certificado del par. Una vez establecida la sesión TLS, todos los datos se envían a través de ella. Aunque TLS usa TCP como protocolo de transporte, los datos aparecen como Datos de aplicación TLS.

Durante el establecimiento de la conexión TLS:

1. Se intercambian mensajes para acordar los parámetros de conexión.
2. Se comparten los parámetros criptográficos para establecer un secreto previo a la masterización.
3. Se intercambian certificados x.509 e información criptográfica para la autenticación.
4. Se genera un secreto maestro a partir del secreto premaestro y valores aleatorios.
5. Se emiten parámetros de seguridad negociados para la parte de la capa de registro.
6. Se verifica que ambos extremos hayan calculado los mismos parámetros y que la conexión no haya sido manipulada.

## ftp

FTP es un protocolo de transferencia de archivos utilizado para mover datos entre dispositivos informáticos. Utiliza los puertos 20 y 21 sobre TCP, donde el 21 controla la sesión FTP y el 20 se utiliza para la transferencia de datos. Admite autenticación de usuarios y acceso anónimo. Puede funcionar en dos modos: activo, donde el servidor escucha un comando del cliente para la transferencia de datos, y pasivo, donde el cliente solicita al servidor la información de conexión para la transferencia de datos. Aunque popular en el pasado, su uso ha disminuido debido a preocupaciones de seguridad, y la mayoría de los navegadores web han dejado de admitirlo.

Al observar el tráfico FTP en el puerto 21, los comandos comunes incluyen USER y PASS para la autenticación, PORT para cambiar el puerto de datos en modo activo, PASV para cambiar al modo pasivo, LIST para mostrar archivos, CWD para cambiar el directorio, PWD para mostrar el directorio actual, SIZE para obtener el tamaño de un archivo, RETR para descargar un archivo y QUIT para finalizar la sesión.

## SMB

SMB es un protocolo utilizado en entornos empresariales de Windows para compartir recursos entre hosts a través de redes comunes. Requiere autenticación del usuario para acceder a recursos y utiliza TCP sobre el puerto 445, aunque solía usar NetBIOS sobre los puertos UDP 137 y 138. Proporciona acceso a impresoras, unidades compartidas y servidores de autenticación, pero también puede ser un objetivo para posibles ataques.

#### Fuentes

- [https://www.tcpdump.org/](https://www.tcpdump.org/)  

- [https://www.wireshark.org/docs/man-pages/tshark.html](https://www.wireshark.org/docs/man-pages/tshark.html)  

- [https://github.com/jpr5/ngrep](https://github.com/jpr5/ngrep)  

- [https://sourceforge.net/projects/tcpick/](https://sourceforge.net/projects/tcpick/)  

- [https://www.gigamon.com/](https://www.gigamon.com/)  

- [https://www.niagaranetworks.com/products/network-tap](https://www.niagaranetworks.com/products/network-tap)  

- [https://en.wikipedia.org/wiki/Port_mirroring](https://en.wikipedia.org/wiki/Port_mirroring)  

- [https://www.elastic.co/elastic-stack](https://www.elastic.co/elastic-stack)  

- [https://www.splunk.com/?301=/en_us](https://www.splunk.com/?301=/en_us)  

- [https://en.wikipedia.org/wiki/Berkeley_Packet_Filter](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter)  

- [https://www.ibm.com/docs/en/qsip/7.4?topic=queries-berkeley-packet-filters](https://www.ibm.com/docs/en/qsip/7.4?topic=queries-berkeley-packet-filters)  

- [https://academy.hackthebox.com/module/details/81](https://academy.hackthebox.com/module/details/81)
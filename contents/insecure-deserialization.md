---
title: Insecure Deserialization - Portswigger Labs
description: Information Disclosure - Portswigger Labs
excerpt:
  La serialización es el proceso de convertir datos complejos, como objetos, en un formato más simple que puede ser enviado o almacenado como bytes.
datetime: 2024-05-11T17:33:07.000+00:00
tags:
  - Information Disclosure
  - Portswigger
  - Labs
featured: false
category: Tutorial
author: nGbonzini
type: article
coverImage:  https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/insecure-deserialization.png
coverImageAlt: Microsoft AD
coverImageWidth: "2725"
coverImageHeight: "1400"
ogImage: "/assets/blog/hello-world/cover.jpg"
ogImageAlt: something
language: "Spanish"
---
----

>**Descargo de responsabilidad: La información proporcionada en esta publicación está destinada únicamente con fines educativos. La deserialización insegura es una vulnerabilidad de seguridad grave y cualquier intento de explotarla sin autorización adecuada es ilegal y poco ético. Las técnicas discutidas deben ser utilizadas solo en un entorno controlado y con permiso explícito del propietario del sistema. El autor y la plataforma renuncian a cualquier responsabilidad por cualquier uso indebido o daño resultante de la implementación de las técnicas aquí descritas.**

## ¿Qué es la serialización?

La serialización es el proceso de convertir datos complejos, como objetos, en un formato más simple que puede ser enviado o almacenado como bytes. Esto facilita la transferencia de datos entre diferentes sistemas, como guardar datos en archivos o enviarlos a través de redes. Al serializar un objeto, también se guarda su estado, es decir, sus atributos y valores asociados. Esto permite conservar la información del objeto incluso fuera de la memoria del programa.

## Serealizacion vs Deserializacion

La deserialización es el proceso de convertir datos serializados de vuelta a un objeto funcional, exactamente como era antes de la serialización. Esto permite que la lógica del sitio web interactúe con el objeto deserializado como lo haría con cualquier otro objeto. Muchos lenguajes de programación admiten la serialización de diferentes maneras, ya sea en formatos binarios o de cadena. Es importante tener en cuenta que todos los atributos del objeto original se conservan en el proceso de serialización, incluidos los campos privados, a menos que se marquen explícitamente como "transitorios". En algunos lenguajes, como Ruby o Python, la serialización puede llamarse "marshalling" o "pickling", pero todos estos términos son sinónimos en este contexto.

![Flow](https://hazelcast.com/wp-content/uploads/2021/12/serialization-deserialization-diagram-800x318-1.png)

## Entonces ... Qué es la deserialización insegura? 🤔

La deserialización insegura ocurre cuando un sitio web procesa datos enviados por el usuario de manera descuidada, lo que podría permitir a un atacante manipular objetos serializados y causar daño al código de la aplicación. Esto puede incluso resultar en la creación de instancias de objetos de clases diferentes a las esperadas, lo que se conoce como "inyección de objeto". Aunque esto podría generar una excepción, el daño puede ocurrir antes de que se detecte. Muchos ataques de deserialización suceden durante el proceso de deserialización, lo que significa que el propio proceso de tratamiento de datos puede ser el punto de ataque, incluso si la funcionalidad del sitio web no interactúa directamente con el objeto malicioso. Esto significa que incluso los sitios web basados en lenguajes fuertemente tipados pueden ser vulnerables a estas técnicas.

La deserialización insegura surge cuando los sitios web no comprenden el riesgo de procesar datos controlables por el usuario de esta manera. Aunque algunos implementan verificaciones adicionales, estas son difíciles de realizar de manera efectiva y a menudo llegan demasiado tarde para evitar un ataque. Además, muchos creen erróneamente que los objetos deserializados son seguros, pero en realidad pueden ser manipulados por atacantes. Los sitios web modernos, con sus numerosas dependencias, son especialmente vulnerables, ya que es difícil prever cómo los datos maliciosos pueden fluir a través de tantas clases y métodos. En resumen, deserializar datos no confiables es inherentemente riesgoso y difícil de hacer de manera segura.

## Como explotar vulnerabilidades de deserialización inseguras

### Identificar

Identificar la deserialización insegura es relativamente simple tanto en pruebas de caja blanca como de caja negra. Durante la auditoría, es crucial observar todos los datos que ingresan al sitio web y buscar signos de datos serializados. Esto se puede hacer fácilmente si se conoce el formato utilizado por diferentes lenguajes de programación, como PHP y Java. Una vez identificados, es importante probar si estos datos pueden ser controlados por un atacante.

### Serializacion PHP

```
$user->name = "carlos";
$user->isLoggedIn = true;
```

Al serializarse quedaria asi:
```
O:4:"User":2:{s:4:"name":s:6:"carlos"; s:10:"isLoggedIn":b:1;}
```

- **O:4:"User"**- Un objeto con el nombre de clase de 4 caracteres. "User"
- **2**- el objeto tiene 2 atributos
- **s:4:"name"**- La clave del primer atributo es la cadena de 4 caracteres. "name"
- **s:6:"carlos"**- El valor del primer atributo es la cadena de 6 caracteres. "carlos"
- **s:10:"isLoggedIn"**- La clave del segundo atributo es la cadena de 10 caracteres. "isLoggedIn"
- **b:1**- El valor del segundo atributo es el valor booleano. true

En PHP, los métodos nativos para la serialización son __serialize()__ y __unserialize()__. Si estás revisando el código fuente, busca la función __unserialize()__ para identificar posibles vulnerabilidades de deserialización insegura.

### Serializacion Java

En Java, los datos serializados se presentan en formato binario, lo que dificulta su lectura. Sin embargo, aún puedes identificarlos si conoces ciertos indicadores, como los bytes iniciales (__ac ed__ en hexadecimal y __ro0__ en base64) que son consistentes para objetos serializados en Java. Además, cualquier clase que implemente la interfaz __java.io.Serializable__ puede ser serializada y deserializada. Si estás revisando el código fuente, busca el uso del método __readObject()__, que se emplea para deserializar datos de un InputStream.

## Modificar atributos de objetos 

Cuando un atacante manipula datos y conserva un objeto serializado válido, el proceso de deserialización en el servidor crea un objeto con los atributos modificados por el atacante. Por ejemplo, si un sitio web almacena información de sesión de usuario en un objeto serializado en una cookie, un atacante podría modificar este objeto para obtener acceso no autorizado.

```
O:4:"User":2:{s:8:"username";s:6:"carlos";s:7:"isAdmin";b:0;}
```

Un atacante puede cambiar el valor de un atributo en un objeto serializado, como cambiar isAdmin a true en una cookie.

```
$user = unserialize($_COOKIE);

if ($user->isAdmin === true) {
// allow access to admin interface
}
```

Si el sitio web confía ciegamente en estos datos sin autenticarlos, podría permitir acceso no autorizado. Aunque este escenario es simple, demuestra el potencial para escalada de privilegios mediante deserialización insegura.

## Lab 1 - Modificando objetos serializados

>Esta práctica de laboratorio utiliza un mecanismo de sesión basado en serialización y, como resultado, es vulnerable a la escalada de privilegios. Para resolver la práctica de laboratorio, edite el objeto serializado en la cookie de sesión para explotar esta vulnerabilidad y obtener privilegios administrativos. Luego, elimina el usuario. carlos. 

Ingreso mis credenciales y preocedo a loguearme.
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/insecudese/l1/1.png)

Al capturar la peticion con Burp y leer el valor de la cookie, noto que el valor de admin es 0.
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/insecudese/l1/2.png)
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/insecudese/l1/3.png)

Cambio el valor por un 1, lo que deberia de interpretarse como un True.
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/insecudese/l1/4.png).

Efectivamente, el cambio a 1 me da privilegios de administrador.
![](https://raw.githubusercontent.com/NicolasGula/NicolasGula/master/public/images/photos/insecudese/l1/5.png)

 
## Modificar tipos de datos

La lógica de PHP es vulnerable a manipulaciones debido a su operador de comparación flexible (==), que convierte tipos de datos durante la comparación. Por ejemplo, 5 == "5" se evalúa como verdadero. Esto también ocurre con cadenas alfanuméricas que comienzan con un número, donde PHP convierte la cadena en un valor numérico basado en el número inicial. Por ejemplo, "5 of something" se trata como 5. Además, comparar una cadena con el número entero 0 puede llevar a resultados inesperados.

La flexibilidad del operador de comparación en PHP puede conducir a fallas lógicas peligrosas, especialmente cuando se usa con datos controlables por el usuario. Por ejemplo, si un atacante modifica el atributo de contraseña de un objeto deserializado para contener el número entero 0, la comparación siempre devuelve verdadero si la contraseña no comienza con un número, lo que permite eludir la autenticación. 

```
$login = unserialize($_COOKIE)

if ($login['password'] == $password) {
// log in successfully
}
```

Es crucial actualizar las etiquetas de tipo y los indicadores de longitud al modificar tipos de datos en objetos serializados para evitar daños en la deserialización.

## Lab 2 - Modificacion de tipos de datos serializados

>Esta práctica de laboratorio utiliza un mecanismo de sesión basado en serialización y, como resultado, es vulnerable a la omisión de autenticación. Para resolver la práctica de laboratorio, edite el objeto serializado en la cookie de sesión para acceder a la administratorcuenta. Luego, elimina el usuario. carlos.

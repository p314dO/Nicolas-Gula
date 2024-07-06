---
title: Active Directory, Donde Los Hackers Se Divierten - Parte 2
description: Introduccion a Active Directory
excerpt:
  ¿Alguna vez has sentido que tu red corporativa es como un vecindario desorganizado donde los vecinos entran y salen a su antojo? Ahí es donde entra Active Directory.
datetime: 2024-05-07T05:33:07.000+00:00
featured: true
category: What is ?
author: Nicolas Gula
type: article
coverImage:  https://www.quest.com/images/og/learn-page-what-is-active-directory_163781.jpg
coverImageAlt: Microsoft AD
coverImageWidth: "2725"
coverImageHeight: "1400"
ogImage: "/assets/blog/hello-world/cover.jpg"
ogImageAlt: something
language: "Spanish"
---

---

Continuacion de la primera parte de [Active Directory, Donde Los Hackers Se Divierten](https://www.Nicolas Gula.xyz/blog/posts/active-directory-1)

## Usuarios 👥

Las cuentas de usuario permiten a las personas iniciar sesión en computadoras y acceder a recursos según sus derechos. Cuando un usuario inicia sesión, se crea un token de acceso que describe sus permisos. Estas cuentas también se utilizan para ejecutar programas bajo un contexto de seguridad específico y administrar el acceso a objetos y propiedades. Asignar usuarios a grupos facilita la gestión de privilegios y el control de acceso a los recursos.

Active Directory es fundamental para gestionar cuentas de usuario en una empresa. Cada usuario suele tener al menos una cuenta, pero algunos pueden tener varias según su función. Además de las cuentas estándar, se utilizan cuentas de servicio para ejecutar aplicaciones en segundo plano. Las organizaciones pueden tener más cuentas de usuario activas que empleados, incluyendo cuentas de ex empleados y temporales. Estas cuentas suelen desactivarse pero se conservan para fines de auditoría.

Las cuentas de usuario en Active Directory pueden tener una amplia gama de derechos, desde solo lectura hasta control total sobre el dominio. Esto las convierte en un objetivo atractivo para los atacantes, ya que un usuario mal configurado puede representar una vulnerabilidad importante. Es crucial que las organizaciones implementen políticas y procedimientos sólidos para gestionar y proteger las cuentas de usuario. Aunque los detalles específicos de los ataques están más allá del alcance de este módulo, es importante reconocer el impacto significativo que los usuarios pueden tener en la seguridad de una red de Active Directory.

### Cuentas locales 

Las cuentas locales se almacenan en un servidor o estación de trabajo específica y solo tienen derechos en ese host. No pueden gestionar el acceso en todo el dominio. Son principios de seguridad limitados a un solo host.

- **Administrator**: Cuenta principal con control total sobre el sistema. No se puede eliminar, pero se puede desactivar o cambiar de nombre.
  
- **Guest**: Cuenta desactivada por defecto, destinada para acceso temporal con privilegios limitados. Se recomienda dejarla desactivada por riesgos de seguridad.

- **SYSTEM**: **NT AUTHORITY\SYSTEM** Cuenta utilizada internamente por el sistema operativo para funciones críticas. Tiene permisos elevados sobre todo el sistema y no tiene perfil ni puede ser agregada a grupos.

- **Network Service**: Cuenta utilizada por el Administrador de control de servicios para ejecutar servicios de Windows y presentar credenciales a servicios remotos.

- **Local Service**: Cuenta mínimamente privilegiada usada por el Administrador de control de servicios para ejecutar servicios de Windows y presentar credenciales anónimas a la red.

### Domain Users 

Los usuarios del dominio tienen derechos para acceder a recursos en toda la red del dominio, como servidores de archivos e impresoras, según los permisos asignados a su cuenta o grupo. A diferencia de los usuarios locales, pueden iniciar sesión en cualquier host del dominio. La cuenta KRBTGT es crítica en Active Directory, actuando como una cuenta de servicio para la autenticación y acceso a recursos. Sin embargo, es un objetivo común para los ataques, ya que obtener acceso a ella proporciona control total sobre el dominio, permitiendo escalada de privilegios y persistencia mediante ataques como el Golden Ticket.

### Atributos de nomenclatura de usuarios 

En Active Directory, mejorar la seguridad implica utilizar atributos de nombres de usuarios para identificar objetos de usuario, como el nombre de inicio de sesión o el ID. Algunos atributos clave incluyen:

- **UserPrincipalName (UPN)**: Nombre de inicio de sesión principal del usuario, a menudo basado en su dirección de correo electrónico.
- **ObjectGUID**: Identificador único permanente del usuario, que no cambia incluso si se elimina y se vuelve a crear.
- **SAMAccountName**: Nombre de inicio de sesión compatible con versiones anteriores de Windows.
- **objectSID**: Identificador de seguridad (SID) del usuario, utilizado en interacciones de seguridad con el servidor.
- **sIDHistory**: Contiene SIDs anteriores del usuario, comúnmente utilizado en migraciones de dominio para mantener la integridad de los accesos.

## Máquinas unidas a un dominio frente a máquinas no unidas ⛓️‍💥

### Unidas a un dominio

Los hosts unidos a un dominio simplifican la administración y promueven la colaboración dentro de una empresa al proporcionar un punto centralizado de administración (el Controlador de Dominio) y permitir que los usuarios accedan a recursos desde cualquier host en el dominio. Esto se logra mediante la Política de Grupo del dominio, que garantiza que todos los hosts reciban configuraciones y cambios necesarios de manera uniforme. Es una configuración común en entornos empresariales.

### No unidas a un dominio

Las computadoras que no están unidas a un dominio, como las que están en un grupo de trabajo, no están sujetas a la política de dominio y son administradas de manera independiente. Esto puede complicar el intercambio de recursos fuera de la red local, pero es adecuado para configuraciones domésticas o pequeñas empresas en la misma red local. En un grupo de trabajo, las cuentas de usuario existen solo en el host donde se crean y los perfiles no se migran entre hosts.

Es crucial tener en cuenta que una cuenta de máquina en un entorno de Active Directory tiene derechos similares a los de una cuenta de usuario estándar. Esto es importante porque obtener acceso de nivel SYSTEM a una computadora en un dominio puede pasarse por alto, pero proporciona acceso a gran parte de los datos dentro del dominio y es útil para recopilar información antes de realizar ataques relacionados con Active Directory.

## Grupos de AD 🏘️

Los grupos son objetos importantes en Active Directory que permiten agrupar usuarios similares y asignar derechos y accesos de manera eficiente. Sin embargo, son un objetivo clave para los atacantes, ya que los privilegios que otorgan pueden no ser evidentes y pueden llevar a abusos si no se configuran correctamente. Hay muchos grupos integrados en Active Directory y las organizaciones también pueden crear sus propios grupos para administrar el acceso dentro del dominio. Es crucial comprender el impacto del uso de diferentes tipos de grupos y realizar auditorías periódicas para verificar los privilegios de los grupos y su membresía.

Las unidades organizativas (OU) se utilizan para organizar objetos en Active Directory para facilitar la administración y la aplicación de políticas de grupo, mientras que los grupos se utilizan principalmente para asignar permisos de acceso a recursos. Además, las OU pueden ser utilizadas para delegar tareas administrativas específicas a usuarios sin otorgarles derechos de administrador adicionales que puedan heredar a través de la membresía en un grupo.

## Tipos de Grupos 🧑‍🧑‍🧒‍🧒

Los grupos facilitan la gestión de permisos al agrupar usuarios, computadoras y objetos de contacto en unidades de administración. Esto simplifica la asignación de recursos y la gestión de permisos. En lugar de asignar permisos individualmente a cada usuario, un administrador puede asignar permisos a un grupo y los usuarios heredarán esos permisos. Si es necesario modificar o revocar permisos, basta con ajustar la membresía del grupo.

Los grupos en Active Directory tienen dos características clave: **tipo** y **alcance**. El tipo define el propósito del grupo, mientras que el alcance muestra cómo se puede utilizar el grupo dentro del dominio o bosque. Los tipos principales son _seguridad_ y _distribución_.

### Tipo de grupo y alcance

Los grupos de seguridad se utilizan para asignar permisos y derechos a una colección de usuarios de manera eficiente, simplificando la gestión y reduciendo costos. Los usuarios heredan los permisos del grupo, facilitando la administración de entrada y salida de usuarios.

Los grupos de distribución son utilizados por aplicaciones de correo electrónico para enviar mensajes a múltiples destinatarios. No se pueden utilizar para asignar permisos en el dominio.

## Scope de los grupos

Los grupos en Active Directory tienen diferentes alcances y propósitos:

- Grupo local de dominio: Utilizado para administrar permisos dentro de un dominio específico. Pueden contener usuarios de otros dominios pero no anidarse dentro de grupos globales.
  
- Grupo Global: Utilizado para otorgar acceso a recursos en otro dominio. Solo pueden contener cuentas del dominio donde se crearon y pueden agregarse a otros grupos globales y locales.

- Grupo Universal: Utilizado para administrar recursos en múltiples dominios dentro de un bosque. Pueden contener usuarios de cualquier dominio y se almacenan en el Catálogo global. Los cambios en los grupos universales desencadenan la replicación en todo el bosque, por lo que es recomendable mantener otros grupos (como grupos globales) como miembros en lugar de usuarios individuales para evitar una sobrecarga de la red.

Los grupos pueden cambiar de alcance, pero con restricciones:

- Un Grupo Global puede convertirse en Grupo Universal si no está anidado dentro de otro Grupo Global.
- Un grupo local de dominio puede convertirse en Grupo Universal si no contiene otros grupos locales de dominio como miembros.
- Un grupo universal puede convertirse en grupo local de dominio sin restricciones.
- Un Grupo Universal solo puede convertirse en Grupo Global si no contiene otros Grupos Universales como miembros.

## Grupos integrados versus grupos personalizados 

Cuando se crea un dominio, se generan grupos de seguridad integrados con un alcance de grupo local de dominio. Estos grupos sirven para propósitos administrativos específicos y no permiten el anidamiento de otros grupos. Ejemplos incluyen Domain Admins, que solo puede contener cuentas del mismo dominio. Las organizaciones suelen crear grupos adicionales para sus necesidades específicas, y la instalación de aplicaciones como Microsoft Exchange puede agregar grupos de seguridad adicionales, algunos con privilegios elevados. Si no se administran adecuadamente, estos grupos pueden ser explotados para obtener acceso privilegiado en el dominio.

## Membresía de grupo anidado 

La pertenencia a grupos anidados en Active Directory permite a los usuarios heredar privilegios de grupos de los que son miembros. Esto puede conducir a la concesión de privilegios no deseados y difíciles de detectar sin una evaluación profunda del dominio. Herramientas como BloodHound son útiles para descubrir estos privilegios heredados. Es esencial para los evaluadores de penetración y los administradores de sistemas comprender y gestionar adecuadamente esta dinámica para mantener la seguridad del dominio.

## Atributos importantes del grupo 

Los grupos en Active Directory tienen atributos importantes como el *common name (cn)*, *la lista de miembros (member)*, el tipo y alcance del grupo *(groupType)*, los grupos que los contienen como miembros *(memberOf)* y el identificador de seguridad *(objectSid)*. Comprender estos atributos es crucial para administrar AD y comprender las relaciones entre grupos en un dominio y entre diferentes dominios. Los grupos son esenciales para facilitar la gestión de derechos y acceso en un entorno de red. Entender cómo se pueden utilizar los diferentes tipos de grupos para realizar ataques en un dominio y a través de límites de confianza es conocimiento clave en seguridad informática.
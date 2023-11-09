# almanode

Banckend realizado con:
 - nodejs v18.18.0,
 - typescript
 - mongoDB v7.0.1

Permite:
  - Creación de usuario que utilizarán la app
  - CRUD de clientes

  - Creación de plantillas de Whatsapp
  - Consulta de plantillas de Whatsapp 

  - Envío de mensajes con plantillas personalizadas
  - Envío de mensajes de texto abierto (Sólo funciona cuando el paciente escribe primero o ha respondido a un mensaje de plantilla). Para enviar un mensaje personalizado, no debe enviarse el atributo template o se envirá el mensaje del template enviado.

Pronto:
  - Guardadado de mensaje en base de datos
  - Guardado de plantillas en base de datos
  - Creación de plantillas con bonones de acción

  - Creación de flujos de mensajes

  - Separar template de util/message ya que hace muchas cosas, para darle una única responsabilidad 

  - Recepción de mensajes de whatsapp (Webhook)

En la ruta src\routes\auth.ts una vez se cree el primer usuario, habilitar el middleware checkJwt para que pida token para registrar nuevos usuarios


https://www.linkedin.com/in/alextrellez/

Ejemplo de peticiones en postman
https://documenter.getpostman.com/view/30126873/2s9YJZ5Qup
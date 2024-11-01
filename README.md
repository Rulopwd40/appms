# Sistema de Gestión de Citas (AppMS)

AppMS es una aplicación web diseñada para optimizar la programación y gestión de citas. Con una arquitectura cliente-servidor, ofrece una solución eficiente para manejar citas, notificaciones y la interacción con los usuarios.

## Características

- **Autenticación de usuarios**: Ingreso seguro y gestión de usuarios.
- **Programación de citas**: Configuración y seguimiento sencillo de citas.
- **Notificaciones**: Recordatorios oportunos para citas programadas.

## Tecnologías

- **Frontend**: HTML, CSS, SCSS, TypeScript, JavaScript
- **Backend**: C#

## Instalación y ejecución
  En la terminal dirigirse al directorio appms\appointmentmanagementsystem.client y ejecutar:
 ```
npm install
```
  Luego dirigirse al directorio appms\AppointmentManagementSystem.Server y ejecutar:
  ```
dotnet run
```
  El programa debería ejecutarse y posteriormente ejecutar el front-end en localhost:4200
  En caso de no ejecutarse el front-end dirigirse a appms\appointmentmanagementsystem.client y ejecutar:
   ```
ng serve
```
  Se debe tener en cuenta la creación de las tablas de la base de datos en MySQL las cuales se encuentran en la carpeta Dump20240526

  

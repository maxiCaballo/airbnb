import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client

/*
Este código exporta una instancia de PrismaClient, que es una herramienta de acceso a la base de datos generada por Prisma. Permíteme explicar paso a paso qué hace cada parte del código:

La primera línea importa PrismaClient desde el módulo @prisma/client. Esta importación es necesaria para poder usar la funcionalidad proporcionada por Prisma.

La siguiente sección contiene una declaración global para prisma. Esta declaración permite utilizar prisma en cualquier parte del código sin tener que importarlo explícitamente en cada archivo. declare global es una forma de extender el alcance de las variables y tipos definidos globalmente.

La línea const client = globalThis.prisma || new PrismaClient() crea una instancia de PrismaClient y la asigna a la variable client. globalThis es un objeto global en el entorno de ejecución de JavaScript, y globalThis.prisma es la forma de acceder a la variable prisma definida en la declaración global anterior. Si globalThis.prisma es undefined (no se ha asignado previamente), se crea una nueva instancia de PrismaClient().

La condición if(process.env.NODE_ENV !== 'production') globalThis.prisma = client verifica si el entorno de ejecución no es de producción (por ejemplo, en desarrollo o pruebas). Si es así, asigna la instancia client a globalThis.prisma. Esto es útil para compartir la misma instancia de PrismaClient en diferentes archivos durante el desarrollo y evitar problemas de sobrecarga o conexión a la base de datos.

Finalmente, se exporta la instancia de PrismaClient como valor predeterminado. Esto permite que otros archivos importen la instancia utilizando import client from './nombre-del-archivo'.

En resumen, este código crea y exporta una instancia de PrismaClient que se puede utilizar para interactuar con la base de datos en una aplicación Node.js.
*/
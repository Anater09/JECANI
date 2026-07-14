# Carpeta `ts/`

Este proyecto está construido con **HTML + CSS + JavaScript puro (vanilla)**,
sin ningún framework ni bundler (Webpack, Vite, etc.). Por esa razón,
**TypeScript no es necesario** para que el sitio funcione: los archivos en
`js/` ya cumplen su función correctamente y se ejecutan directamente en el
navegador.

Esta carpeta se deja como espacio reservado por si en el futuro el proyecto
crece (por ejemplo, si se agrega lógica más compleja como validaciones de
formularios avanzadas, consumo de una API propia, o un panel de administración)
y se decide migrar la lógica de `js/` a TypeScript para tener tipado estático.

## Si en algún momento se necesita usar TypeScript

1. Instalar TypeScript como dependencia de desarrollo:
   ```bash
   npm install --save-dev typescript
   ```
2. Crear un archivo de configuración `tsconfig.json` en la raíz del proyecto,
   indicando que la carpeta de salida (`outDir`) sea `js/` y la carpeta de
   entrada (`rootDir`) sea `ts/`.
3. Escribir los archivos `.ts` aquí (por ejemplo `navigation.ts`,
   `animations.ts`, `donations.ts`, `main.ts`), replicando la misma
   separación de responsabilidades que ya tienen los archivos `.js`.
4. Compilar con `npx tsc` para generar automáticamente los `.js`
   correspondientes dentro de `js/`.

Mientras eso no sea necesario, esta carpeta puede permanecer vacía.

# Informe: Componente Button

Documento de referencia sobre el componente `Button` del proyecto: variantes, uso de Radix/shadcn, manejo de iconos y Storybook.

---

## 1. Resumen del componente

El `Button` es un componente de interfaz reutilizable ubicado en `src/components/ui/button.tsx`. Está construido con **React**, **Radix UI** (Slot), **class-variance-authority (CVA)** y utilidades al estilo **shadcn/ui** (composición, `cn`, `forwardRef`). Usa variables CSS del diseño (`--radius-btn`, `--spacing-btn-*`, tokens de color por variante) y Tailwind para los estilos.

---

## 2. Variantes

Las variantes se definen con **CVA** (`class-variance-authority`) en `buttonVariants`. Hay dos dimensiones: **variant** y **size**.

### 2.1 Variant (apariencia)

| Variante   | Uso típico     | Estilo principal                                                                 |
|-----------|-----------------|-----------------------------------------------------------------------------------|
| **primary**   | Acción principal | Fondo `bg-btn-primary`, hover/active/focus y estados deshabilitados con tokens dedicados. Borde transparente. |
| **secondary** | Acción secundaria | Fondo blanco, borde `border-btn-secondary-border`, texto y bordes que cambian en hover/active/focus/disabled. |
| **delete**    | Acciones destructivas | Fondo `bg-btn-delete`, hover/active/focus y disabled con tokens `btn-delete-*`. |

Cada variante contempla:

- **Hover / active / focus** (incl. `focus-visible` con outline)
- **Disabled** (colores específicos y `pointer-events-none`)
- **Estados por data attributes** (`data-[state=hover]`, `data-[state=active]`, `data-[state=focus]`, `data-[state=disabled]`) para compatibilidad con componentes controlados por estado (p. ej. Radix).

Valores por defecto: `variant: 'primary'`, `size: 'default'`.

### 2.2 Size

- **default**: altura mínima 48px (`min-h-[48px]`), altura automática. En el código hay comentarios para futuros tamaños (`size200`, `size100`, `size50`).

---

## 3. Radix y patrones tipo shadcn

### 3.1 Radix UI — Slot

- Se usa **`@radix-ui/react-slot`** para la prop **`asChild`**.
- Cuando `asChild={true}`, el componente no renderiza un `<button>`, sino que pasa sus props (clases, etc.) al **único hijo** mediante `<Slot>`. Así el botón puede “prestar” su apariencia y comportamiento a un `<a>`, `<Link>`, etc., sin cambiar el elemento DOM subyacente.
- Uso típico: enlaces que deben verse y comportarse como botones (ej. “Link as button” en Storybook).

### 3.2 Patrones shadcn

- **CVA**: Todas las clases base y por variante/size se definen en `buttonVariants`; el componente solo combina variante + size + `className` con `buttonVariants({ variant, size, className })`.
- **Utilidad `cn`**: Se usa `cn()` (de `src/lib/utils.ts`) para fusionar `buttonVariants(...)` con clases adicionales (p. ej. `justify-between` cuando hay iconos) sin pisar estilos de forma manual.
- **forwardRef**: El componente está envuelto en `forwardRef` para poder pasar la ref al `<button>` o al hijo cuando se usa `asChild`, alineado con las prácticas de shadcn.
- **Composición**: La API se limita a props claras (`variant`, `size`, `iconLeft`, `iconRight`, `asChild`, `children`, props nativas de `button`) y se evita exponer detalles de implementación.

---

## 4. Manejo de iconos complementarios

### 4.1 API

- **`iconLeft`**: componente (React) que se muestra a la **izquierda** del texto.
- **`iconRight`**: componente a la **derecha** del texto.
- Tipo esperado: `ComponentType<{ className?: string }>` (componente que opcionalmente acepta `className`).
- **Importante**: `iconLeft` e `iconRight` se **ignoran** cuando `asChild` es `true`; en ese caso el contenido lo define el hijo (p. ej. un enlace con su propio contenido).

### 4.2 Comportamiento interno

- Si **no** hay iconos: se renderiza un `<button>` simple con `children` y clases de `buttonVariants` + `cn`.
- Si **hay** iconos:
  - El botón usa `justify-between` para separar texto e icono derecho.
  - El texto va en un contenedor flex a la izquierda: un slot para `iconLeft`, luego el texto en un `<span className="truncate text-left">`.
  - El icono derecho va en otro contenedor al final.
  - Cada icono se envuelve en un `<span>` con la clase **`iconSlotClasses`** y `aria-hidden="true"` (son decorativos, no aportan información adicional para lectores de pantalla).

### 4.3 Clases del slot de icono

```ts
const iconSlotClasses =
  'shrink-0 flex items-center justify-center [&_svg]:size-[22px] [&_svg]:shrink-0 [&_svg]:pointer-events-none';
```

- El contenedor del icono no se encoge y centra el contenido.
- Los SVG internos se fuerzan a **22px**, no se encogen y tienen `pointer-events-none` para que los clics caigan en el botón.
- En la definición base de `buttonVariants` también se aplican `[&_svg]:pointer-events-none`, `[&_svg]:shrink-0` y `[&_svg]:size-[22px]` a nivel de botón, manteniendo coherencia con los slots de icono.

---

## 5. Storybook para depuración

El componente dispone de **Storybook** (stories en `src/stories/button.stories.tsx`) para desarrollo y revisión visual.

### 5.1 Configuración

- **Título**: `UI/Button`.
- **Tags**: `autodocs` para documentación automática.
- **Layout**: `centered`.
- **ArgTypes**:
  - `variant`: select con `primary`, `secondary`, `delete`.
  - `size`: select con `default`.
  - `disabled`: boolean.
  - `children`: texto.
  - `iconLeft` / `iconRight`: ocultos en la tabla de controles (`table: { disable: true }`) porque en las stories se usan componentes concretos.

### 5.2 Stories disponibles

| Story                  | Contenido                                                                 |
|------------------------|----------------------------------------------------------------------------|
| **Primary**            | Botón variante primary.                                                   |
| **Secondary**          | Botón variante secondary.                                                 |
| **Delete**             | Botón variante delete.                                                    |
| **Disabled**           | Primary deshabilitado.                                                    |
| **WithIconLeft**       | Primary con icono a la izquierda.                                         |
| **WithIconRight**      | Primary con icono a la derecha.                                           |
| **WithBothIcons**      | Primary con icono izquierdo (envío) y derecho (flecha).                   |
| **AllVariants**        | Tres botones: primary, secondary, delete.                                 |
| **WithIconsAllVariants**| Las tres variantes con `iconLeft` e `iconRight`.                          |
| **AsChild**            | Uso de `asChild` con un `<a href="#as-child">` como “Link as button”.     |

En las stories se definen iconos de ejemplo (SVG 22×22, `currentColor`/stroke) para probar `iconLeft` e `iconRight` sin depender de una librería externa.

### 5.3 Comandos

- Desarrollo: `npm run storybook` (puerto 6006).
- Build estático: `npm run build-storybook`.

---

## 6. Resumen técnico

| Aspecto            | Detalle                                                                 |
|--------------------|-------------------------------------------------------------------------|
| **Ubicación**      | `src/components/ui/button.tsx`                                         |
| **Variantes**      | `primary`, `secondary`, `delete` (CVA)                                 |
| **Tamaño**         | `default` (min-h 48px)                                                 |
| **Radix**          | `@radix-ui/react-slot` para `asChild`                                  |
| **Utilidades**     | CVA, `cn`, `forwardRef` (patrón shadcn)                                |
| **Iconos**         | `iconLeft` / `iconRight` (componentes), slots con 22px y `aria-hidden`  |
| **Storybook**      | `src/stories/button.stories.tsx`, múltiples stories y autodocs          |

Este documento sirve como borrador de referencia para el componente Button y puede ampliarse con ejemplos de uso en la app o con tokens de diseño concretos si se desea.

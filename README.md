# react-classy-component

A library to make it more convenient to create properly typed React components using [Tailwind CSS](https://tailwindcss.com/).

## Install

### pnpm
```bash
pnpm add react-classy-component
```

### npm
```bash
npm install react-classy-component
```

### yarn
```bash
yarn add react-classy-component
```

## Usage

### Simple example
```tsx
// Button.tsx
import { rcc } from "react-classy-component";

export const Button = rcc.button`bg-blue-500 text-white p-2 rounded`;
```

This will generate a `React.ButtonHTMLAttributes<HTMLButtonElement>` component, giving you all the prop validation and intellisense you are used to.

<img width="704" alt="typed-button" src="https://user-images.githubusercontent.com/261929/131214040-1e1f388c-86f7-4f07-b772-1907efe3cb06.png">

If you use the `className` prop, anything passed in will be merged with the classes you specified in your component. All other props — including event handlers, `aria-*`, and `data-*` attributes — are forwarded to the underlying element.

```tsx
// Somewhere else in your app
import { Button } from "./Button";

const Component = () => (
  <Button className="m-5" type="button">Click me!</Button>
)
```
Will render 👇

```html
<button class="bg-blue-500 text-white p-2 rounded m-5" type="button">
  Click me!
</button>
```
#### Preview
<img width="108" alt="rendered" src="https://user-images.githubusercontent.com/261929/131214272-4b8cb9e1-d6aa-432f-85c0-d8e55fb0dfcf.png">

### Refs

Refs are forwarded to the underlying DOM element. Shortcut components (e.g. `rcc.button`) are typed with the correct element type:

```tsx
const ref = useRef<HTMLButtonElement>(null);

<Button ref={ref}>Click me!</Button>
```

### Default props

Use `.withDefaults()` to pre-fill props on an already-created component. Explicitly supplied props always take precedence over defaults. The method can be chained.

```tsx
export const Button = rcc.button`p-2 rounded`.withDefaults({ type: "button" });

// Overriding a default:
<Button type="submit">Submit</Button>
```

```tsx
export const ExternalLink = rcc.a`underline`
  .withDefaults({ target: "_blank" })
  .withDefaults({ rel: "noreferrer" });
```

### Conditional rendering

You can specify custom props to render variants of your component. Props used as keys in an object expression are automatically stripped from the DOM element — no configuration needed.

```tsx
export const Button = rcc.button<{
  primary?: boolean;
  danger?: boolean;
}>`
text-white p-2 rounded
${{
  primary: "bg-blue-500",
  danger: "bg-red-500",
}}
`;
```

```tsx
<Button primary>Click me!</Button>
<Button danger>I am dangerous!</Button>
```

Now `bg-blue-500` will only be rendered if the `primary` prop is truthy. And, you guessed it, `bg-red-500` will only be rendered if `danger` is truthy.

```html
<button class="text-white p-2 rounded bg-blue-500">Click me!</button>
<button class="text-white p-2 rounded bg-red-500">I am dangerous!</button>
```

### Advanced conditions

For more complex logic you can pass a function instead. The function receives the component's props and must return a string of classes.

When using function expressions, custom props are forwarded to the DOM by default. Use `shouldForwardProp` to prevent this (note: this requires the base `rcc()` form rather than the shortcut):

```tsx
interface Props {
  variant?: "primary" | "secondary";
}

export const Button = rcc<Props, HTMLButtonElement>("button", {
  shouldForwardProp: (prop) => prop !== "variant",
})`
text-white p-2 rounded
${(props: Props): string => {
  if (props.variant === "primary") return "bg-blue-500";
  if (props.variant === "secondary") return "bg-yellow-500";

  return "bg-gray-500";
}}
`;
```

And to use it as a secondary button 👇

```tsx
<Button variant="secondary">A secondary button</Button>
```

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
```ts
// Button.tsx
import { rcc } from "react-classy-component";

export const Button = rcc.button`bg-blue-500 text-white p-2 rounded`;
```

This will generate a `React.ButtonHTMLAttributes<HTMLButtonElement>` component, giving you all the prop validation and intellisense you are used to.

<img width="704" alt="typed-button" src="https://user-images.githubusercontent.com/261929/131214040-1e1f388c-86f7-4f07-b772-1907efe3cb06.png">

If you are using the `className` prop, anything passed in will be merged with the classes you specified in your component. Any other props will be passed on to the underlying component.

```ts
// Somewhere else in your app
import { Button } from "./Button";

const Component = () => (
  <Button className="m-5" type="button">Click me!</Button
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

### Conditional rendering

You can specify custom props to render variants of your component.

```ts
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

```html
<Button primary>Click me!</Button>
<Button danger>I am dangerous!</Button>
```

Now `bg-blue-500` will only be rendered if the `primary` prop is truthy. And, you guessed it, `bg-red-500` will only be rendered if `danger` is truthy.

```html
<button class="text-white p-2 rounded bg-blue-500">Click me!</button>
<button class="text-white p-2 rounded bg-red-500">I am dangerous!</button>
```

### Advanced conditions

If you need more advanced conditions, instead of using a simple object, you can pass in a function that returns the classes you want to apply. The function will be called with the props passed in to your component.

```ts
interface Props {
  variant?: "primary" | "secondary";
}

export const Button = rcc.button<Props>`
text-white p-2 rounded
${(props: Props): string => {
  if (props.variant === "primary") return "bg-blue-500";
  if (props.variant === "secondary") return "bg-yellow-500";

  return "bg-gray-500";
}}
`;
```

And to use it as a secondary button 👇

```ts
<Button variant="secondary">A secondary button</Button>
```

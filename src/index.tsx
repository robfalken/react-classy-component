import React, { FC } from "react";
import { domAttributes } from "./domAttributes";

type FnExpression = (...args: any[]) => string;
type ObjExpression = { [key: string]: string };
type Expression = FnExpression | ObjExpression;

type Args<T> = (
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) => FC<T>;

type HtmlTag = any;

const sanitizeString = (str: string) => str.trim();
const removeEmptyStrings = (str: string) => !!str;

// Remove any props not included in `domAttributes`
// before rendering the HTML element
const cleanProps = (props: any) =>
  Object.keys(props).reduce(
    (acc, val) =>
      domAttributes.includes(val) ||
      val.startsWith("aria-") ||
      val.startsWith("data-")
        ? { ...acc, [val]: props[val] }
        : acc,
    {}
  );

export function rcc<T = React.HTMLProps<{}>>(Tag: HtmlTag): Args<T> {
  return function l2({ raw }, ...expressions: Expression[]) {
    function component({
      children,
      className = "",
      ...props
    }: React.HTMLProps<{}>): JSX.Element {
      // Expressions can be either an object or a function
      const handleExpression = (expression: Expression) => {
        if (typeof expression === "function") {
          return expression(props);
        } else {
          return Object.keys(expression)
            .reduce((acc: any, key: any) => {
              return Boolean((props as any)[key])
                ? [...acc, expression[key]]
                : acc;
            }, [])
            .join(" ");
        }
      };

      const classes = [...raw, ...expressions.map(handleExpression), className]
        .map(sanitizeString)
        .filter(removeEmptyStrings)
        .join(" ");

      return (
        <Tag className={classes} {...cleanProps(props)}>
          {children}
        </Tag>
      );
    }

    return component;
  };
}

// Just some convenient shortcuts below this line

rcc.button = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.ButtonHTMLAttributes<HTMLButtonElement> & T>("button")(
    args,
    ...expressions
  );
};

rcc.input = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.InputHTMLAttributes<HTMLInputElement> & T>("input")(
    args,
    ...expressions
  );
};

rcc.div = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLDivElement> & T>("div")(
    args,
    ...expressions
  );
};

rcc.a = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.AnchorHTMLAttributes<HTMLAnchorElement> & T>("a")(
    args,
    ...expressions
  );
};

rcc.label = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.LabelHTMLAttributes<HTMLLabelElement> & T>("label")(
    args,
    ...expressions
  );
};

rcc.span = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLElement> & T>("span")(
    args,
    ...expressions
  );
};

rcc.hr = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLElement> & T>("hr")(args, ...expressions);
};

rcc.h1 = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHeadingElement> & T>("h1")(
    args,
    ...expressions
  );
};

rcc.h2 = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHeadingElement> & T>("h2")(
    args,
    ...expressions
  );
};

rcc.h3 = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHeadingElement> & T>("h3")(
    args,
    ...expressions
  );
};

rcc.h4 = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHeadingElement> & T>("h4")(
    args,
    ...expressions
  );
};

rcc.h5 = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHeadingElement> & T>("h5")(
    args,
    ...expressions
  );
};

rcc.h6 = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHeadingElement> & T>("h6")(
    args,
    ...expressions
  );
};

rcc.img = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.ImgHTMLAttributes<HTMLImageElement> & T>("img")(
    args,
    ...expressions
  );
};

rcc.select = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.SelectHTMLAttributes<HTMLSelectElement> & T>("select")(
    args,
    ...expressions
  );
};

rcc.section = function<T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLElement> & T>("section")(
    args,
    ...expressions
  );
};

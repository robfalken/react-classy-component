import React, { forwardRef } from "react";
import { domAttributes } from "./domAttributes";

type FnExpression = (...args: any[]) => string;
type ObjExpression = { [key: string]: string };
type Expression = FnExpression | ObjExpression;

type RccComponent<T, Ref extends Element = Element> =
  React.ForwardRefExoticComponent<
    React.PropsWithoutRef<T> & React.RefAttributes<Ref>
  >;

type Args<T, Ref extends Element = Element> = (
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) => RccComponent<T, Ref>;

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

export function rcc<T = React.HTMLProps<{}>, Ref extends Element = Element>(
  Tag: HtmlTag
): Args<T, Ref> {
  return function l2({ raw }, ...expressions: Expression[]) {
    const component = forwardRef<Ref, React.HTMLProps<{}>>(
      ({ children, className = "", ...props }, ref) => {
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
          <Tag ref={ref} className={classes} {...cleanProps(props)}>
            {children}
          </Tag>
        );
      }
    );

    return component as unknown as RccComponent<T, Ref>;
  };
}

// Just some convenient shortcuts below this line

rcc.button = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<
    React.ButtonHTMLAttributes<HTMLButtonElement> & T,
    HTMLButtonElement
  >("button")(args, ...expressions);
};

rcc.input = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<
    React.InputHTMLAttributes<HTMLInputElement> & T,
    HTMLInputElement
  >("input")(args, ...expressions);
};

rcc.div = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLDivElement> & T, HTMLDivElement>("div")(
    args,
    ...expressions
  );
};

rcc.a = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<
    React.AnchorHTMLAttributes<HTMLAnchorElement> & T,
    HTMLAnchorElement
  >("a")(args, ...expressions);
};

rcc.label = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<
    React.LabelHTMLAttributes<HTMLLabelElement> & T,
    HTMLLabelElement
  >("label")(args, ...expressions);
};

rcc.span = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLSpanElement> & T, HTMLSpanElement>(
    "span"
  )(args, ...expressions);
};

rcc.hr = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHRElement> & T, HTMLHRElement>("hr")(
    args,
    ...expressions
  );
};

rcc.h1 = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHeadingElement> & T, HTMLHeadingElement>(
    "h1"
  )(args, ...expressions);
};

rcc.h2 = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHeadingElement> & T, HTMLHeadingElement>(
    "h2"
  )(args, ...expressions);
};

rcc.h3 = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHeadingElement> & T, HTMLHeadingElement>(
    "h3"
  )(args, ...expressions);
};

rcc.h4 = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHeadingElement> & T, HTMLHeadingElement>(
    "h4"
  )(args, ...expressions);
};

rcc.h5 = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHeadingElement> & T, HTMLHeadingElement>(
    "h5"
  )(args, ...expressions);
};

rcc.h6 = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLHeadingElement> & T, HTMLHeadingElement>(
    "h6"
  )(args, ...expressions);
};

rcc.img = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.ImgHTMLAttributes<HTMLImageElement> & T, HTMLImageElement>(
    "img"
  )(args, ...expressions);
};

rcc.select = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<
    React.SelectHTMLAttributes<HTMLSelectElement> & T,
    HTMLSelectElement
  >("select")(args, ...expressions);
};

rcc.section = function <T>(
  args: { raw: readonly string[] },
  ...expressions: Expression[]
) {
  return rcc<React.HTMLAttributes<HTMLElement> & T, HTMLElement>("section")(
    args,
    ...expressions
  );
};

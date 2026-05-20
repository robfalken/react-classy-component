import React, { forwardRef } from "react";

type FnExpression = (...args: any[]) => string;
type ObjExpression = { [key: string]: string };
type Expression = FnExpression | ObjExpression;

export type RccOptions = {
  /**
   * Called for every prop to decide whether it should be forwarded to the
   * underlying DOM element. Return false to prevent forwarding.
   *
   * Props that appear as keys in an object expression are always stripped
   * automatically — you only need this for props introduced via function
   * expressions.
   *
   * @example
   * const Button = rcc<{ variant?: string }>("button", {
   *   shouldForwardProp: (prop) => prop !== "variant",
   * })`${({ variant }) => variant === "primary" ? "bg-blue-500" : ""}`;
   */
  shouldForwardProp?: (prop: string) => boolean;
};

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

// https://developer.mozilla.org/en-US/docs/Glossary/Void_element
const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

export function rcc<T = React.HTMLProps<{}>, Ref extends Element = Element>(
  Tag: HtmlTag,
  options?: RccOptions
): Args<T, Ref> {
  // Computed once per rcc(Tag) call — Tag never changes after creation.
  const isVoid = typeof Tag === "string" && VOID_TAGS.has(Tag.toLowerCase());

  return function l2({ raw }, ...expressions: Expression[]) {
    // Collect object-expression keys once at definition time.
    // These are always stripped — they are variant flags, not HTML attributes.
    const customPropKeys = new Set(
      expressions
        .filter((e): e is ObjExpression => typeof e !== "function")
        .flatMap((e) => Object.keys(e))
    );

    const shouldForward = (key: string): boolean => {
      if (customPropKeys.has(key)) return false;
      if (options?.shouldForwardProp) return options.shouldForwardProp(key);
      return true;
    };

    const component = forwardRef<Ref, React.HTMLProps<{}>>(
      ({ children, className = "", ...props }, ref) => {
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

        const forwardedProps = Object.keys(props).reduce<Record<string, unknown>>(
          (acc, key) =>
            shouldForward(key) ? { ...acc, [key]: (props as any)[key] } : acc,
          {}
        );

        return isVoid ? (
          <Tag ref={ref} className={classes} {...forwardedProps} />
        ) : (
          <Tag ref={ref} className={classes} {...forwardedProps}>
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

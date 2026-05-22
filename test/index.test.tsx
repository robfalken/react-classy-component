import React from "react";
import { render } from "@testing-library/react";
import { rcc } from "../src";
import "@testing-library/jest-dom/extend-expect";

describe("rcc", () => {
  describe("random element", () => {
    it("adds class", () => {
      const Span = rcc("span")`my-class`;
      const { container } = render(<Span />);
      expect(container.firstChild).toHaveClass("my-class");
    });

    it("renders children", () => {
      const Span = rcc("span")``;
      const { container } = render(<Span>Some content</Span>);
      expect(container.firstChild).toHaveTextContent("Some content");
    });

    it("can extend default classes", () => {
      const Span = rcc("span")`my-class`;
      const { container } = render(<Span className="second-class" />);
      expect(container.firstChild).toHaveClass("my-class");
      expect(container.firstChild).toHaveClass("second-class");
    });

    it("adds conditional class from function expression", () => {
      const Span = rcc<{ yes: boolean } & React.HTMLAttributes<HTMLElement>>(
        "span"
      )`${({ yes }) => (yes ? "yes" : "no")}`;
      const { container } = render(<Span yes />);
      expect(container.firstChild).toHaveClass("yes");
      expect(container.firstChild).not.toHaveClass("no");
    });

    it("adds conditional class from object expression", () => {
      const Span = rcc<
        { yes: boolean; oui: boolean; no: boolean } & React.HTMLAttributes<
          HTMLElement
        >
      >("span")`${{ yes: "yes-class", oui: "oui-class", no: "no-class" }}`;
      const { container } = render(<Span yes oui={true} no={false} />);
      expect(container.firstChild).toHaveClass("yes-class");
      expect(container.firstChild).toHaveClass("oui-class");
      expect(container.firstChild).not.toHaveClass("no-class");
    });

    it("applies negated object-expression keys when the prop is falsy", () => {
      const Span = rcc<
        { negative?: boolean } & React.HTMLAttributes<HTMLElement>
      >("span")`${{ "!negative": "not-negative-class" }}`;
      const off = render(<Span />);
      expect(off.container.firstChild).toHaveClass("not-negative-class");
      expect(off.container.firstChild).not.toHaveAttribute("negative");

      const on = render(<Span negative />);
      expect(on.container.firstChild).not.toHaveClass("not-negative-class");
      expect(on.container.firstChild).not.toHaveAttribute("negative");
    });
  });

  describe("generic elements", () => {
    describe("div", () => {
      it("adds class", () => {
        const Div = rcc.div`div-class`;
        const { container } = render(<Div />);
        expect(container.firstChild).toHaveClass("div-class");
      });
    });

    describe("span", () => {
      it("adds class", () => {
        const Span = rcc.span`span-class`;
        const { container } = render(<Span />);
        expect(container.firstChild).toHaveClass("span-class");
      });
    });

    describe("section", () => {
      it("adds class", () => {
        const Section = rcc.section`section-class`;
        const { container } = render(<Section />);
        expect(container.firstChild).toHaveClass("section-class");
      });
    });

    describe("hr", () => {
      it("adds class", () => {
        const Hr = rcc.hr`hr-class`;
        const { container } = render(<Hr />);
        expect(container.firstChild).toHaveClass("hr-class");
      });
    });
  });

  describe("headings", () => {
    describe("h1", () => {
      it("adds class", () => {
        const H1 = rcc.h1`h1-class`;
        const { container } = render(<H1 />);
        expect(container.firstChild).toHaveClass("h1-class");
      });
    });

    describe("h2", () => {
      it("adds class", () => {
        const H2 = rcc.h2`h2-class`;
        const { container } = render(<H2 />);
        expect(container.firstChild).toHaveClass("h2-class");
      });
    });

    describe("h3", () => {
      it("adds class", () => {
        const H3 = rcc.h3`h3-class`;
        const { container } = render(<H3 />);
        expect(container.firstChild).toHaveClass("h3-class");
      });
    });

    describe("h4", () => {
      it("adds class", () => {
        const H4 = rcc.h4`h4-class`;
        const { container } = render(<H4 />);
        expect(container.firstChild).toHaveClass("h4-class");
      });
    });

    describe("h5", () => {
      it("adds class", () => {
        const H5 = rcc.h5`h5-class`;
        const { container } = render(<H5 />);
        expect(container.firstChild).toHaveClass("h5-class");
      });
    });

    describe("h6", () => {
      it("adds class", () => {
        const H6 = rcc.h6`h6-class`;
        const { container } = render(<H6 />);
        expect(container.firstChild).toHaveClass("h6-class");
      });
    });
  });

  describe("withDefaults", () => {
    it("applies default props", () => {
      const Button = rcc.button``.withDefaults({ type: "submit" });
      const { container } = render(<Button />);
      expect(container.firstChild).toHaveAttribute("type", "submit");
    });

    it("explicit props override defaults", () => {
      const Button = rcc.button``.withDefaults({ type: "submit" });
      const { container } = render(<Button type="button" />);
      expect(container.firstChild).toHaveAttribute("type", "button");
    });

    it("can be chained", () => {
      const A = rcc.a``.withDefaults({ target: "_blank" }).withDefaults({ rel: "noreferrer" });
      const { container } = render(<A href="/path" />);
      expect(container.firstChild).toHaveAttribute("target", "_blank");
      expect(container.firstChild).toHaveAttribute("rel", "noreferrer");
    });

    it("forwards ref through withDefaults", () => {
      const Button = rcc.button``.withDefaults({ type: "button" });
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("void elements", () => {
    it("renders img without children", () => {
      const Img = rcc.img`my-class`;
      const { container } = render(<Img src="photo.jpg" alt="A photo" />);
      expect(container.firstChild).toHaveClass("my-class");
      expect(container.firstChild).toHaveAttribute("src", "photo.jpg");
    });

    it("renders input without children", () => {
      const Input = rcc.input`my-class`;
      const { container } = render(<Input type="email" placeholder="Email" />);
      expect(container.firstChild).toHaveClass("my-class");
      expect(container.firstChild).toHaveAttribute("type", "email");
    });

    it("silently ignores children passed to void elements", () => {
      const Input = rcc.input``;
      // Use createElement to bypass TS's JSX void-element child check
      const { container } = render(
        React.createElement(Input, { placeholder: "test" }, "should be ignored")
      );
      expect(container.firstChild).not.toHaveTextContent("should be ignored");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the underlying DOM element", () => {
      const Span = rcc("span")``;
      const ref = React.createRef<Element>();
      render(<Span ref={ref} />);
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe("SPAN");
    });

    it("forwards ref with typed shortcut", () => {
      const Button = rcc.button``;
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("aria and data attributes", () => {
    it("passes through aria-* attributes", () => {
      const Span = rcc("span")``;
      const { container } = render(<Span aria-label="close" aria-hidden={true} />);
      expect(container.firstChild).toHaveAttribute("aria-label", "close");
      expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    });

    it("passes through data-* attributes", () => {
      const Span = rcc("span")``;
      const { container } = render(<Span data-testid="my-span" data-value="42" />);
      expect(container.firstChild).toHaveAttribute("data-testid", "my-span");
      expect(container.firstChild).toHaveAttribute("data-value", "42");
    });

    it("strips object-expression keys from the DOM automatically", () => {
      const Span = rcc<
        { primary?: boolean } & React.HTMLAttributes<HTMLElement>
      >("span")`${{ primary: "primary-class" }}`;
      const { container } = render(<Span primary />);
      expect(container.firstChild).toHaveClass("primary-class");
      expect(container.firstChild).not.toHaveAttribute("primary");
    });

    it("strips props blocked by shouldForwardProp", () => {
      const Span = rcc<
        { variant?: string } & React.HTMLAttributes<HTMLElement>
      >("span", { shouldForwardProp: (prop) => prop !== "variant" })`
        ${({ variant }) => (variant === "primary" ? "primary-class" : "")}
      `;
      const { container } = render(<Span variant="primary" />);
      expect(container.firstChild).toHaveClass("primary-class");
      expect(container.firstChild).not.toHaveAttribute("variant");
    });
  });

  describe("button", () => {
    it("accepts type attribute", () => {
      const Button = rcc.button``;
      const { container } = render(<Button type="button" />);
      expect(container.firstChild).toHaveAttribute("type", "button");
    });
  });

  describe("anchor", () => {
    it("accepts href attribute", () => {
      const A = rcc.a``;
      const { container } = render(<A href="/path" />);
      expect(container.firstChild).toHaveAttribute("href", "/path");
    });
  });

  describe("label", () => {
    it("accepts htmlFor attribute", () => {
      const Label = rcc.label``;
      const { container } = render(<Label htmlFor="some-id" />);
      expect(container.firstChild).toHaveAttribute("for", "some-id");
    });
  });

  describe("img", () => {
    it("accepts src attribute", () => {
      const Img = rcc.img``;
      const { container } = render(<Img src="img.png" />);
      expect(container.firstChild).toHaveAttribute("src", "img.png");
    });
  });

  describe("select", () => {
    it("accepts multiple attribute", () => {
      const Select = rcc.select``;
      const { container } = render(<Select multiple />);
      expect(container.firstChild).toHaveAttribute("multiple");
    });
  });

  describe("className", () => {
    it("returns the base classes when called with no props", () => {
      const generate = rcc.className`base-class other-class`;
      expect(generate()).toBe("base-class other-class");
    });

    it("applies classes from an object expression when the prop is truthy", () => {
      const generate = rcc.className<{ destructive: boolean }>`
        base-class ${{ destructive: "bg-red-500" }}
      `;
      expect(generate({ destructive: true })).toBe("base-class bg-red-500");
      expect(generate({ destructive: false })).toBe("base-class");
    });

    it("supports negated object-expression keys", () => {
      const generate = rcc.className<{ negative?: boolean }>`
        base ${{ "!negative": "not-negative" }}
      `;
      expect(generate()).toBe("base not-negative");
      expect(generate({ negative: true })).toBe("base");
    });

    it("supports function expressions", () => {
      const generate = rcc.className<{ variant?: "primary" | "secondary" }>`
        base ${({ variant }) => (variant === "primary" ? "p" : "s")}
      `;
      expect(generate({ variant: "primary" })).toBe("base p");
      expect(generate({ variant: "secondary" })).toBe("base s");
    });

    it("merges an extra className argument at the end", () => {
      const generate = rcc.className<{ destructive: boolean }>`
        base ${{ destructive: "bg-red-500" }}
      `;
      expect(generate({ destructive: true }, "user-class")).toBe(
        "base bg-red-500 user-class"
      );
    });

    it("works inline in a JSX className prop", () => {
      const generate = rcc.className<{ destructive: boolean }>`
        base ${{ destructive: "bg-red-500" }}
      `;
      const { container } = render(
        <div className={generate({ destructive: true })} />
      );
      expect(container.firstChild).toHaveClass("base");
      expect(container.firstChild).toHaveClass("bg-red-500");
    });
  });

  describe("as", () => {
    const Base = React.forwardRef<
      HTMLButtonElement,
      React.ButtonHTMLAttributes<HTMLButtonElement>
    >(({ className, children, ...props }, ref) => (
      <button ref={ref} className={`base-class ${className ?? ""}`} {...props}>
        {children}
      </button>
    ));

    it("applies classes to the wrapped component", () => {
      const Wrapped = rcc.as(Base)`extra-class`;
      const { container } = render(<Wrapped />);
      expect(container.firstChild).toHaveClass("base-class");
      expect(container.firstChild).toHaveClass("extra-class");
    });

    it("merges user-supplied className", () => {
      const Wrapped = rcc.as(Base)`extra-class`;
      const { container } = render(<Wrapped className="user-class" />);
      expect(container.firstChild).toHaveClass("base-class");
      expect(container.firstChild).toHaveClass("extra-class");
      expect(container.firstChild).toHaveClass("user-class");
    });

    it("forwards props to the wrapped component", () => {
      const Wrapped = rcc.as(Base)`extra-class`;
      const { container } = render(
        <Wrapped type="submit" aria-label="go" data-testid="x" />
      );
      expect(container.firstChild).toHaveAttribute("type", "submit");
      expect(container.firstChild).toHaveAttribute("aria-label", "go");
      expect(container.firstChild).toHaveAttribute("data-testid", "x");
    });

    it("forwards ref through the wrapped component", () => {
      const Wrapped = rcc.as(Base)`extra-class`;
      const ref = React.createRef<HTMLButtonElement>();
      render(<Wrapped ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("supports object expressions and strips their keys", () => {
      const Wrapped = rcc.as<typeof Base, { primary?: boolean }>(
        Base
      )`${{ primary: "primary-class" }}`;
      const { container } = render(<Wrapped primary />);
      expect(container.firstChild).toHaveClass("primary-class");
      expect(container.firstChild).not.toHaveAttribute("primary");
    });

    it("supports function expressions", () => {
      const Wrapped = rcc.as<typeof Base, { variant?: string }>(Base, {
        shouldForwardProp: (prop) => prop !== "variant",
      })`${({ variant }) => (variant === "primary" ? "primary-class" : "")}`;
      const { container } = render(<Wrapped variant="primary" />);
      expect(container.firstChild).toHaveClass("primary-class");
      expect(container.firstChild).not.toHaveAttribute("variant");
    });

    it("works with intrinsic element strings too", () => {
      const Wrapped = rcc.as("section")`section-class`;
      const { container } = render(<Wrapped />);
      expect(container.firstChild?.nodeName).toBe("SECTION");
      expect(container.firstChild).toHaveClass("section-class");
    });
  });
});

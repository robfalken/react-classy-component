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

    it("still strips unknown custom props", () => {
      const Span = rcc<{ primary?: boolean } & React.HTMLAttributes<HTMLElement>>("span")``;
      const { container } = render(<Span primary />);
      expect(container.firstChild).not.toHaveAttribute("primary");
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
});

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { rcc } from "../src";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  yellow: boolean;
}

const Button: React.FC<Props> = rcc<Props>("button")`red-text ${({ blue }) =>
  blue ? "blue-text-important" : ""} dashed-border ${({ yellow }) =>
  yellow ? "yellow-background" : ""}`.withDefaults({ type: "button" });


const ShortcutButton = rcc.button<{ yellow: boolean }>`red-text ${({ blue }) =>
  blue ? "blue-text-important" : ""} dashed-border ${({ yellow }) =>
  yellow ? "yellow-background" : ""}`;

const Input = rcc.input<{}>`dashed-border`;

const Div = rcc.div<{}>`margin`;

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    children: {
      control: { type: "text" },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => (
    <div>
      <Button yellow>
        Button
      </Button>
      <Div>
        <ShortcutButton type="submit" yellow>
          ShortcutButton
        </ShortcutButton>
      </Div>
      <Input placeholder="An input" />
    </div>
  ),
};

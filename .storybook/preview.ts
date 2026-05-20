import type { Preview } from "@storybook/react";
import "./styles.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on.*" },
  },
};

export default preview;

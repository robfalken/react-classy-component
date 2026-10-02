import type { Preview } from "@storybook/react-vite";
import "./styles.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on.*" },
  },
};

export default preview;

import React from "react";
import { storiesOf } from "@storybook/react";
import ImageZoomable2 from "../src/index";

storiesOf("Button", module).add("with text", () => (
  <ImageZoomable2
    uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6aet0wf5IR_eWqnfWt96RfCREgsO4LjjM6qQYnELMVw7uYM9_Ag"
    uriHD="http://www.telegraph.co.uk/content/dam/Travel/Tours/New%20York1-xlarge.jpg"
    debug
    // percBigger={10}
    // fadeInMillis={350}
  />
));

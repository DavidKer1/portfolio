import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Box } from "../elements";

export const MotionBox = motion(
  forwardRef((props, ref) => (<Box ref={ref} {...props} />))
);


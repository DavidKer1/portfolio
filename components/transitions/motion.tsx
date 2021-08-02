import { motion } from "framer-motion";
import { forwardRef } from "@chakra-ui/react";
import { Box } from "../elements";

const Component = forwardRef((props, ref) => <Box ref={ref} {...props} />);

export const MotionBox = motion(Component);

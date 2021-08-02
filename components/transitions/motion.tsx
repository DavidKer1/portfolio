import { forwardRef } from "react";
import { motion, isValidMotionProp } from "framer-motion";
import { Box } from "../elements";

// export const MotionBox = motion(
// 	forwardRef((props, ref) => <Box ref={ref} {...props} />),
// );
type TProps = {
  children: JSX.Element
}
export const MotionBox = ({ children, ...rest }: TProps) => {
	const chakraProps = Object.fromEntries(
		// do not pass framer props to DOM element
		Object.entries(rest).filter(([key]) => !isValidMotionProp(key)),
	);
	const framerProps = Object.fromEntries(
		// do not pass framer props to DOM element
		Object.entries(rest).filter(([key]) => isValidMotionProp(key)),
	);
  
	return (
		<Box {...chakraProps}>
			<motion.div {...framerProps}>{children || null}</motion.div>
		</Box>
	);
};

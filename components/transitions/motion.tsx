import { motion, isValidMotionProp, MotionProps } from "framer-motion";
import { Box } from "../elements";

// export const MotionBox = motion(
// 	forwardRef((props, ref) => <Box ref={ref} {...props} />),
// );
type TProps = {
	children: JSX.Element;
	initial: object;
	animate: object;
	whileHover: object;
	whileTap: object
	mx: string
};
export const MotionBox = ({ children, ...rest }: TProps) => {
	const chakraProps = Object.fromEntries(
		// do not pass framer props to DOM element
		Object.entries(rest).filter(([key]) => !isValidMotionProp(key)),
	);
	const framerProps = Object.fromEntries(
		// do not pass framer props to DOM element
		Object.entries(rest).filter(([key]) => isValidMotionProp(key)),
	);
	console.log(framerProps);

	return (
		<Box {...chakraProps}>
			<motion.div {...framerProps}>{children || null}</motion.div>
		</Box>
	);
};

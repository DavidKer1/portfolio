import React from "react";
import { Title } from "../typography/Title";

type TProps = {
	headerTitle: string;
	children: JSX.Element | string;
	headerPath?: string;
};
export const HomeSection = ({ headerTitle, headerPath, children }: TProps) => {
	return (
		<>
			<Title path={headerPath}>
				{headerTitle}
			</Title>
			<section>{children}</section>
		</>
	);
};

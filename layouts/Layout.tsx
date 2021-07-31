import { AppProps } from "next/app";
import React from "react";
import { TopNav } from '../components/TopNav';

type Props = {
	children?: JSX.Element;
};
export default function Layout({ children }: Props) {
	return (
		<>
			<TopNav></TopNav>
			<section>{children}</section>
		</>
	);
}

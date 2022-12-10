import clsx from "clsx";
import React from "react";
import styles from "./Button.module.css";
export const variant = [
	"blue-1",
	"dark-1",
	"pink-1",
	"yellow-1",
	"orange-1",
	"error-1",
] as const;
export type StyleVariant = typeof variant[number];
export const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
export type SizeVariant = typeof sizes[number];
export type ButtonBaseProps = {
	left?: React.ReactNode;
	right?: React.ReactNode;
	id?: string;
	label?: string;
	size?: SizeVariant;
	variant?: StyleVariant;
	classes?: string;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
	classes = "",
	id,
	label,
	left = <></>,
	right = <></>,
	size = "md",
	variant = "blue-1",
	disabled = false,
	onClick,
}: ButtonBaseProps) => {
	const className = clsx(
		styles.button,
		styles[`variant-${variant}`],
		{
			[styles[`${size}`]]: !!label,
			[styles[`rounded${size}`]]: !label,
			[styles["disabled"]]: disabled,
		},
		classes
	);

	return (
		<button id={id} className={className} onClick={onClick} disabled={disabled}>
			{left}
			{label}
			{right}
		</button>
	);
};

export default Button;

import clsx from "clsx";
import React from "react";
export type InputProps = {
	disabled?: boolean;
	/** Text that appears below the input */
	hint?: string;
	inputRef?: React.Ref<HTMLInputElement> | React.Ref<HTMLTextAreaElement>;
	/** If true, hint text and outline changes to red */
	invalid?: boolean;
	label?: string;
	onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	placeholder?: string;
	/** Type attribute of native input element */
	type?: React.HTMLInputTypeAttribute | "textarea";
	value?: string;
	classes?: string;
	/** Name used to identify form field for validation */
	name?: string;
	/** Pattern used to drive keyboards */
	pattern?: string;
};
const Input = ({
	classes,
	disabled = false,
	hint,
	inputRef,
	invalid = false,
	label,
	name,
	onBlur,
	onChange,
	onFocus,
	pattern,
	placeholder,
	type,
	value,
}: InputProps) => {
	return (
		<div className={clsx("w-full flex gap-3", classes)}>
			<span className='font-semibold text-sm'>{label}</span>
			<div className='max-w-[9.5rem] text-sm flex flex-col gap-2 justify-start items-stretch'>
				{type === "textarea" ? (
					<textarea
						ref={inputRef as React.Ref<HTMLTextAreaElement>}
						name={name}
						rows={4}
						disabled={disabled}
						placeholder={placeholder}
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						onFocus={onFocus}
						className='w-full h-auto max-h-36 bg-gray-6 px-2 active:bg-gray-6 active:border-none rounded-sm resize-none  border-gray-1 grow'
					/>
				) : (
					<input
						type={type}
						ref={inputRef as React.Ref<HTMLInputElement>}
						pattern={pattern}
						name={name}
						disabled={disabled}
						placeholder={placeholder}
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						onFocus={onFocus}
						className='w-full bg-gray-6 px-2 active:bg-gray-6 active:border-none rounded-sm resize-none  border-gray-1 grow'
					/>
				)}
				{invalid && !!hint && (
					<span className='text-xs text-red-600 font-medium'>{hint}</span>
				)}
			</div>
		</div>
	);
};

export default Input;

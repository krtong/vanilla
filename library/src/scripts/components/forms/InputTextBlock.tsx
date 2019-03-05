/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import React from "react";
import classNames from "classnames";
import { getRequiredID } from "@library/componentIDs";
import InputBlock, { IInputBlockProps } from "@library/components/forms/InputBlock";
import { Omit } from "@library/@types/utils";
import { inputBlockClasses } from "@library/styles/inputBlockStyles";

export interface IInputTextProps extends Omit<IInputBlockProps, "children"> {
    inputProps: {
        value: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        inputClassNames?: string;
        type?: string;
        defaultValue?: string;
        placeholder?: string;
        valid?: boolean;
        required?: boolean;
        disabled?: boolean;
    };
}

export default class InputTextBlock extends React.Component<IInputTextProps> {
    public static defaultProps = {
        disabled: false,
        type: "text",
        errors: [],
        legacyMode: false,
    };

    private id: string;
    private inputRef: React.RefObject<HTMLInputElement> = React.createRef();

    public constructor(props) {
        super(props);
        this.id = getRequiredID(props, "inputText");
    }

    public render() {
        const { inputProps, ...blockProps } = this.props;
        const classesInputBlock = inputBlockClasses();
        const inputClasses = classNames("inputBlock-inputText", "inputText", inputProps.inputClassNames, {
            InputBox: this.props.legacyMode,
        });

        return (
            <InputBlock {...blockProps}>
                {blockParams => {
                    const { labelID, errorID, hasErrors } = blockParams;
                    let describedBy;
                    if (hasErrors) {
                        describedBy = errorID;
                    }
                    return (
                        <input
                            id={this.id}
                            className={inputClasses}
                            defaultValue={inputProps.defaultValue}
                            value={inputProps.value}
                            type={inputProps.type}
                            disabled={inputProps.disabled}
                            required={inputProps.required}
                            placeholder={inputProps.placeholder}
                            aria-invalid={hasErrors}
                            aria-describedby={describedBy}
                            aria-labelledby={labelID}
                            onChange={this.onChange}
                            ref={this.inputRef}
                        />
                    );
                }}
            </InputBlock>
        );
    }

    /**
     * Use a native change event instead of React's because of https://github.com/facebook/react/issues/1159
     */
    public componentDidMount() {
        this.inputRef.current!.addEventListener("change", this.onChange);
    }

    /**
     * Use a native change event instead of React's because of https://github.com/facebook/react/issues/1159
     */
    public componentWillUnmount() {
        this.inputRef.current!.removeEventListener("change", this.onChange);
    }

    public get value(): any {
        return this.inputRef.current ? this.inputRef.current.value : "";
    }

    public set value(value) {
        if (this.inputRef.current) {
            this.inputRef.current.value = value;
        } else {
            throw new Error("inputDom does not exist");
        }
    }

    public focus() {
        this.inputRef.current!.focus();
    }

    public select() {
        this.inputRef.current!.select();
    }

    private onChange = event => {
        if (this.props.inputProps.onChange) {
            this.props.inputProps.onChange(event);
        }
    };
}

/**
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license https://opensource.org/licenses/GPL-2.0 GPL-2.0
 */

import React from "react";
import classNames from "classnames";
import ErrorMessages from "./ErrorMessages";
import Paragraph from "./Paragraph";
import { getRequiredID, IOptionalComponentID } from "@dashboard/componentIDs";
import { IFieldError } from "@dashboard/@types/api";

export interface IInputTextProps extends IOptionalComponentID {
    className?: string;
    label: string;
    labelNote?: string;
    inputClassNames?: string;
    type?: string;
    labelID?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    valid?: boolean;
    descriptionID?: string;
    required?: boolean;
    errors?: IFieldError[];
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<any>;
}

interface IState {
    id: string;
}

export default class InputTextBlock extends React.Component<IInputTextProps, IState> {
    public static defaultProps = {
        disabled: false,
        type: "text",
        errors: [],
    };

    private inputDom: HTMLInputElement;

    public constructor(props) {
        super(props);
        this.state = {
            id: getRequiredID(props, "inputText") as string,
        };
    }

    public render() {
        const componentClasses = classNames("inputBlock", this.props.className);

        const inputClasses = classNames("inputBlock-inputText", "InputBox", "inputText", this.props.inputClassNames);

        const hasErrors = !!this.props.errors && this.props.errors.length > 0;

        let describedBy;
        if (hasErrors) {
            describedBy = this.errorID;
        }

        return (
            <label className={componentClasses}>
                <span id={this.labelID} className="inputBlock-labelAndDescription">
                    <span className="inputBlock-labelText">{this.props.label}</span>
                    <Paragraph id={false} className="inputBlock-labelNote" content={this.props.labelNote} />
                </span>

                <span className="inputBlock-inputWrap">
                    <input
                        id={this.state.id}
                        className={inputClasses}
                        defaultValue={this.props.defaultValue}
                        value={this.props.value}
                        type={this.props.type}
                        disabled={this.props.disabled}
                        required={this.props.required}
                        placeholder={this.props.placeholder}
                        aria-invalid={hasErrors}
                        aria-describedby={describedBy}
                        aria-labelledby={this.labelID}
                        onChange={this.props.onChange}
                        ref={inputDom => (this.inputDom = inputDom as HTMLInputElement)}
                    />
                </span>
                <ErrorMessages id={this.errorID} errors={this.props.errors} />
            </label>
        );
    }

    public get value(): any {
        return this.inputDom ? this.inputDom.value : "";
    }

    public set value(value) {
        if (this.inputDom) {
            this.inputDom.value = value;
        } else {
            throw new Error("inputDom does not exist");
        }
    }

    public focus() {
        this.inputDom.focus();
    }

    public select() {
        this.inputDom.select();
    }

    private get labelID(): string {
        return this.state.id + "-label";
    }

    private get errorID(): string {
        return this.state.id + "-errors";
    }
}

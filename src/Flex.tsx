import React from "react";

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    preset?: "normal" | "centered";
}

const normalFlexStyle = {
    display: "flex",
    minHeight: "100%",
    width: "100%"
} as React.CSSProperties;

const centeredFlexStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
    width: "100%"
} as React.CSSProperties;

const Flex = (props: FlexProps) => {
    const {
        style,
        children,
        preset,
        ...others
    } = props;

    let flexStyle = {};
    switch (preset) {
        case "normal":
            flexStyle = normalFlexStyle;
            break;
        case "centered":
            flexStyle = centeredFlexStyle;
            break;
        default:
            break;
    };

    return (
        <div style={{ ...flexStyle, ...style }} {...others}>
            {children}
        </div>
    );
};



export {
    Flex
};
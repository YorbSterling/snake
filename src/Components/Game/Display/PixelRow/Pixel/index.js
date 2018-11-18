import React from "react";
import styles from "./styles";

const Pixel = ({ style, type, size }) => {
    return <div style={{ ...style, ...styles[type], ...styles[size] }} />;
};

export default Pixel;

"use client";

import React, { CSSProperties, Ref } from "react";

type PanelProps = {
  visibleWhen?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  ref?: any;
};

const Panel: React.FC<PanelProps> = ({
  visibleWhen = true,
  children,
  className,
  style,
  ref
}) => {
  return <div ref={ref} style={style} className={`${className}`}>{visibleWhen ? children : null}</div>;
};

export default Panel;

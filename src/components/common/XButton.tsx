import React from 'react';
import Link from "next/link";

interface XButtonProps {
    link?: string;
    theme?: 'default' | 'outlined';
    width?: number;
    children?: React.ReactNode;
    startIcon?: React.ReactNode; // 버튼 앞에 추가할 콘텐츠
    endIcon?: React.ReactNode;   // 버튼 뒤에 추가할 콘텐츠
}

export default function XButton({
                                    link,
                                    theme = 'default',
                                    width = 150,
                                    children = 'XButton Component',
                                    startIcon,
                                    endIcon
                                }: XButtonProps) {
    const defaultStyle = "flex items-center justify-center gap-2 p-2 rounded-lg duration-300 ease-in-out cursor-pointer";

    const themeStyle =
        theme === 'default'
            ? "bg-blue-300 hover:bg-blue-400 text-white"
            : "bg-white border border-black text-black hover:bg-gray-100";

    const style = `${defaultStyle} ${themeStyle}`;

    const size = {
        width: `${width}px`,
        height: `${Math.round(width * 0.3)}px`,
        maxWidth: "200px",
    };

    const content = (
        <div className={style} style={size}>
            {startIcon && <span>{startIcon}</span>}
            {children}
            {endIcon && <span>{endIcon}</span>}
        </div>
    );

    return link ? <Link href={link}>{content}</Link> : content;
}

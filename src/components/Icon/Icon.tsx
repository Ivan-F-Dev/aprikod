import React from 'react';
import {CrossSVG} from "../../shared/icons/CrossSVG";
import {CircleSVG} from "../../shared/icons/CircleSVG";
import {ChevronSVG} from "../../shared/icons/ChevronSVG";
import {SearchSVG} from "../../shared/icons/SearchSVG";
import s from './Icon.module.scss'
import {CheckSVG} from "../../shared/icons/CheckSVG";

type Props = {
    icon: 'cross' | 'chevron'  | 'search' | 'circle' | 'check'
    size?: number
    rotate?: number
    top?: number
    bottom?: number
    left?: number
    right?: number
    cb?: () => void
};
export const Icon = ({icon,size = 20, rotate = 0, top, bottom, left, right, cb}: Props) => {

    const css: React.CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotate}deg)`,
        top: top ? `${top}px` : 'unset',
        bottom: bottom ? `${bottom}px` : 'unset',
        left: left ? `${left}px` : 'unset',
        right: right ? `${right}px` : 'unset',
    }

    const getIcon = () => {
        if (icon === 'cross') return CrossSVG()
        if (icon === 'circle') return CircleSVG()
        if (icon === 'search') return SearchSVG()
        if (icon === 'chevron') return ChevronSVG()
        if (icon === 'check') return CheckSVG()
    }

    return (
        <div onClick={cb} className={s.ArrowIcon__wrapper} style={css}>
            {getIcon()}
        </div>
    );
};
import React from 'react';
import {CrossSVG} from "../../shared/icons/CrossSVG";
import {CircleSVG} from "../../shared/icons/CircleSVG";
import {ChevronSVG} from "../../shared/icons/ChevronSVG";
import {SearchSVG} from "../../shared/icons/SearchSVG";
import {CheckSVG} from "../../shared/icons/CheckSVG";
import {EditSVG} from "../../shared/icons/EditSVG";
import s from './Icon.module.scss'


type Props = {
    icon: 'cross' | 'chevron'  | 'search' | 'circle' | 'check' | 'edit'
    size?: number
    rotate?: number
    top?: number
    bottom?: number
    left?: number
    right?: number
    cb?: (p:any) => void
    id?: string
};
export const Icon = ({icon,size = 20, rotate = 0, top, bottom, left, right, cb, id}: Props) => {

    const css: React.CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotate}deg)`,
        top: Number.isInteger(top) ? `${top}px` : 'unset',
        bottom: Number.isInteger(bottom) ? `${bottom}px` : 'unset',
        left: Number.isInteger(left) ? `${left}px` : 'unset',
        right: Number.isInteger(right) ? `${right}px` : 'unset',
    }

    const getIcon = () => {
        if (icon === 'cross') return CrossSVG()
        if (icon === 'circle') return CircleSVG()
        if (icon === 'search') return SearchSVG()
        if (icon === 'chevron') return ChevronSVG()
        if (icon === 'check') return CheckSVG()
        if (icon === 'edit') return EditSVG()
    }

    return (
        <div onClick={cb} className={s.ArrowIcon__wrapper} style={css} id={id || ''}>
            {getIcon()}
        </div>
    );
};
import React, { useState, memo } from 'react'
import classNames from 'classnames/bind'
import parse from 'html-react-parser'
import styles from './OptionProduct.module.scss'

const cx = classNames.bind(styles)

function Overview({ description }) {
    const [height, setHeight] = useState(false)
    const handleHeight = () => {
        setHeight(!height)
    }

    return (
        <>
            <div className={cx('wrap-box', `${height ? "active" : ""}`)}>
                <>{description && parse(description)}</>
            </div>
            <div className={cx('read-more', `${!height ? "active" : ""}`)} onClick={handleHeight}>Xem thêm</div>
            <div className={cx('read-less', `${height ? "active" : ""}`)} onClick={handleHeight}>Thu gọn</div>
        </>
    )
}
export default memo(Overview)

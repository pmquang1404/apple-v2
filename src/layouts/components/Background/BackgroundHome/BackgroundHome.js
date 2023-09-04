import classNames from "classnames/bind";
import styles from './BackgroundHome.module.scss'
import { useState, useRef, useEffect } from "react";
import { bannerHome } from "src/assets/data/banner";
import { bannerHomeMobile } from "src/assets/data/bannerMobile";
import BackgroundLoading from "src/components/Loading/BackgroundLoading";
import * as categoryApi from "src/services/categoryApi";

const cx = classNames.bind(styles)
function Background() {

    const [index, setIndex] = useState(0);
    const [width, setWidth] = useState(window.innerWidth)
    const [loading, setLoading] = useState(true)

    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    }
    useEffect(() => {
        const fetchApi = async () => {
            const result = await categoryApi.findProductsByCategory("iphone");
            setLoading(false);
            return result
        };

        fetchApi();
    }, [])
    useEffect(() => {
        let bannerIndex = width > '739' ? bannerHome : bannerHomeMobile
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === bannerIndex.length - 1 ? 0 : prevIndex + 1
                ),
            4000
        );
        return () => {
            resetTimeout();
        };
    }, [index, width]);

    useEffect(() => {

        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [width])
    return (
        <>
            {loading && <BackgroundLoading />}
            {!loading && <div className={cx('wrapper')}>

                {width > '739' ?
                    (
                        <div
                            className={cx('slideshowSlider')}
                            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
                        >
                            {bannerHome.map((banner, index) =>
                                <img key={index} className={cx('background')} src={banner.images} alt='background' />
                            )
                            }
                        </div>
                    )
                    :
                    (
                        <div
                            className={cx('slideshowSlider')}
                            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
                        >
                            {bannerHomeMobile.map((banner, index) =>
                                <img key={index} className={cx('background')} src={banner.images} alt='background' />
                            )
                            }
                        </div>
                    )
                }
                <div className={cx('slideshowDots')}>
                    {width > '739' ? (
                        bannerHome.map((_, idx) => (
                            <div
                                key={idx}
                                className={cx('slideshowDot', `${index === idx ? "active" : ""}`)}
                                onClick={() => {
                                    setIndex(idx);
                                }}
                            ></div>
                        )))
                        :
                        (bannerHomeMobile.map((_, idx) => (
                            <div
                                key={idx}
                                className={cx('slideshowDot', `${index === idx ? "active" : ""}`)}
                                onClick={() => {
                                    setIndex(idx);
                                }}
                            ></div>
                        )))
                    }
                </div>
            </div>}
        </>
    );
}

export default Background;
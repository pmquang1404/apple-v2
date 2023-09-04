import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import BackgroundProductPage from "src/layouts/components/Background/BackgroundProduct/BackgroundProductPage";
import config from "src/config";
import styles from "./ItemsProduct.module.scss";
import PageLoading from "src/components/Loading/PageLoading";
import * as categoryApi from "src/services/categoryApi";

const cx = classNames.bind(styles);
function ProductPage() {
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const path = location.pathname;
  const heading = path.split("/")[1];
  let category = "";
  let header = "";
  switch (heading) {
    case "iphones":
      category = "iphone";
      header = "iPhone";
      break;
    case "ipads":
      category = "ipad";
      header = "iPad";
      break;
    case "macs":
      category = "mac";
      header = "Mac";
      break;
    case "watchs":
      category = "watch";
      header = "Apple Watch";
      break;
    case "loudspeakers":
      category = "loudspeakers";
      header = "Âm Thanh";
      break;
    default:
      category = 6;
  }
  // console.log(path, heading, h1)
  useEffect(() => {
    const fetchApi = async () => {
      const result = await categoryApi.findProductsByCategory(category);
      setProduct(result);
      setIsLoading(false);
      setData(true);
    };

    fetchApi();
  }, [category]);
  // console.log(product);

  return (
    <>
      {isLoading && <PageLoading />}
      {data && (
        <>
          <div className={cx("wrapper_heading")}>
            <div className={cx("link_page")}>
              <Link to={config.routes.home}>Trang chủ</Link>
              <p className={cx("link_heading")}>/ {header}</p>
            </div>
            <h1 className={cx("heading")}>{header}</h1>
          </div>
          {product && <BackgroundProductPage />}
          <div className={cx("grid wide")}>
            <div className={cx("row wide")}>
              {product &&
                product.map((product) => (
                  <div className={cx("col wide l-3 m-4 c-6")} key={product.id}>
                    <Link
                      to={`${path}/${product.id}`}
                      className={cx("wrapper")}
                    >
                      <div
                        className={cx("wrap-background")}
                        style={{ padding: "40px 12px 28px" }}
                      >
                        <div
                          className={cx("background-product")}
                          style={{ backgroundImage: `url(${product.image})` }}
                        ></div>
                      </div>
                      <p className={cx("product-name")}>{product.name}</p>
                      <p className={cx("product-price")}>
                        Giá từ {product.price.toLocaleString().concat("đ")}
                      </p>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductPage;

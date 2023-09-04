import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

// import { buyProduct } from "./actions/action";
// import { connect } from "react-redux";
import { useDispatch } from "react-redux";
// import { useSelector } from 'react-redux';
import { addToCart } from "./redux/cartSlice";

import * as singleApi from "src/services/singleApi";
import styles from "./SingleProduct.module.scss";
import { Overview, Specification } from "src/components/OptionProduct";
import NotFound from "../NotFound";
import SingleLoading from "src/components/Loading/SingleLoading";
const cx = classNames.bind(styles);
function SingleProduct() {
  const tabs = [
    {
      id: 1,
      heading: "Mô tả",
      value: <Overview />,
    },
    {
      id: 2,
      heading: "Thông số kỹ thuật",
      value: <Specification />,
    },
  ];
  const colorCodes = {
    "Space Gray": "#b1b3b6",
    "Silver": "#e3e5e3",
    "Gold": "#FCEBD3",
    "Deep Purple": "#61586b",
    "Space Black": "#4c4b49",
    "Blue": "#174c6f",
    "Purple": "#bab4e7",
    "Red": "#da3c3a",
    "Pink": "#ebb9b0",
    "Starlight": "#f4e9d4",
    "White": "#ffffff",
    "Midnight": "#000000",
    "Black": "#000000",
    "Green": "#b0e1c4",
    "Yellow": "#fbd96e",
    "Orange": "#e76741",
    "Graphite": "#5e5e59",
    "Sky Blue": "#6aafdd",
    "Blue / Gray":
      "linear-gradient(-45deg, #9e9699 0%, #9e9699 50%, #2b4176 50%, #2b4176 100%)",
    "Yellow / Beige":
      "linear-gradient(-45deg, #f4f4eb 0%, #f4f4eb 50%, #eeee22 50%, #eeee22 100%)",
    "Black / Gray":
      "linear-gradient(-45deg, #9e9699 0%, #9e9699 50%, #000000 50%, #000000 100%)",
  };
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(1);
  const [product, setProduct] = useState([]);
  const [productDetail, setProductDetail] = useState();

  // Set option product
  const [id, setId] = useState(1);
  const [idProduct, setIdProduct] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(undefined);
  const [colorValue, setColorValue] = useState(undefined);
  const [ramValue, setRamValue] = useState(undefined);
  const [storageValue, setStorageValue] = useState(undefined);
  const [screenSizeValue, setScreenSizeValue] = useState(undefined);

  //error fetch data
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // const cart = useSelector((state) => state.cart);
  // console.log(cart);
  const dispatch = useDispatch();

  // get path
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  // console.log(productId, path);

  //fetch api product
  useEffect(() => {
    const fetchApi = async () => {
      const result = await singleApi.singleApi(`${productId - 1}`); //id product = 1 but id in firebase = 0
      console.log(result)
      if (result.message) {
        console.log(result.message);
        setIsLoading(false);
        setError(result.message);
      } else {
        // console.log(result);
        setData(true);
        setIsLoading(false);
        setError(null);
        setProduct(result);
        setName(result.name);
        setId(result.id);
        setProductDetail(result.product_details);
        var dataFirst = result.product_details[0];
        // console.log(dataFirst)
        var checkRam =
          dataFirst.ram !== undefined ? `${dataFirst.ram}` : undefined;
        var checkStorage =
          dataFirst.storage !== undefined ? `${dataFirst.storage}` : undefined;
        var checkColor =
          dataFirst.color !== undefined ? `${dataFirst.color}` : undefined;
        var checkScreenSize =
          dataFirst["screen-size"] !== undefined
            ? `${dataFirst["screen-size"]}`
            : undefined;
        setRamValue(checkRam);
        setPrice(dataFirst.price);
        setStorageValue(checkStorage);
        setImage(dataFirst.image);
        setColorValue(checkColor);
        setScreenSizeValue(checkScreenSize);
      }
    };

    fetchApi();
  }, [productId]);
  const product_current = {
    id: id,
    idProduct: idProduct,
    name: name,
    image: image,
    price: price,
    color: colorValue,
    ram: ramValue,
    storage: storageValue,
    screenSize: screenSizeValue,
  };
  // console.log(product_current);
  //handle option
  const findColor = (color) => {
    setColorValue(color);
  };
  const findRam = (ram) => {
    setRamValue(ram);
  };
  const findStorage = (storage) => {
    setStorageValue(storage);
  };
  const findScreenSize = (screenSize) => {
    setScreenSizeValue(screenSize);
  };
  // console.log(product)
  // console.log(productDetail[0].options[0])
  // handle render when choose option
  useLayoutEffect(() => {
    var target =
      productDetail &&
      productDetail.find((item) => {
        var ram = ramValue === undefined ? ramValue : `${ramValue}`;
        var color = colorValue === undefined ? colorValue : `${colorValue}`;
        var storage =
          storageValue === undefined ? storageValue : `${storageValue}`;
        var screenSize =
          screenSizeValue === undefined
            ? screenSizeValue
            : `${screenSizeValue}`;
        return (
          item.ram === ram &&
          item.color === color &&
          item.storage === storage &&
          item["screen-size"] === screenSize
        );
      });
    // console.log(target)
    // var changeName = target !== undefined ? target.name : name;
    var changeId = target !== undefined ? target.id : idProduct;
    var changeImage = target !== undefined ? target.image : image;
    var changePrice = target !== undefined ? target.price : price;
    setIdProduct(changeId);
    // setName(changeName);
    setImage(changeImage);
    setPrice(changePrice);
    // console.log(result);
  }, [
    productDetail,
    ramValue,
    colorValue,
    storageValue,
    price,
    image,
    name,
    idProduct,
    screenSizeValue,
  ]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const priceString = getText(price.toLocaleString().concat("đ"));

  // console.log(color, colorValue)
  return (
    <>
      {error && <NotFound />}
      {isLoading && <SingleLoading />}
      {data && (
        <div className={cx("wrap")}>
          <div className="grid wide">
            <div className="wide row">
              <div className="wide l-6 m-6 c-12">
                <img
                  className={cx("img-product")}
                  src={image}
                  alt={product.name}
                />
              </div>
              <div className="wide l-6 m-6 c-12">
                <div className={cx("wrap-heading")}>
                  <div className={cx("heading")}>{name}</div>
                  <div className={cx("separate")}></div>
                  <div className={cx("price")}>{priceString}</div>

                  {/* Check product have storage */}
                  {product.options &&
                    product.options.map((option, idx) => (
                      <div key={idx}>
                        {option.key === "storage" ? (
                          <div className={cx("wrap-storage")}>
                            <div className={cx("storage-heading")}>
                              Chọn {option.key}: {storageValue}
                            </div>
                            <div className={cx("wrap-option")}>
                              <div className={cx("row-storage")}>
                                {option.value.map((value, idx) => (
                                  <div
                                    className={cx(
                                      "option",
                                      `${
                                        value === storageValue ? "active" : ""
                                      }`
                                    )}
                                    key={idx}
                                    value={value}
                                    onClick={() => findStorage(value)}
                                  >
                                    {value}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                  {/* Check product have screen-size */}
                  {product.options &&
                    product.options.map((option, idx) => (
                      <div key={idx}>
                        {option.key === "screen-size" ? (
                          <div className={cx("wrap-storage")}>
                            <div className={cx("storage-heading")}>
                              Chọn kích thước màn hình: {screenSizeValue}
                            </div>
                            <div className={cx("wrap-option")}>
                              {option.value.map((value, idx) => (
                                <div
                                  className={cx(
                                    "option",
                                    `${
                                      value === screenSizeValue ? "active" : ""
                                    }`
                                  )}
                                  key={idx}
                                  value={value}
                                  onClick={() => findScreenSize(value)}
                                >
                                  {value}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}

                  {/* Check product have ram */}
                  {product.options &&
                    product.options.map((option, idx) => (
                      <div key={idx}>
                        {option.key === "ram" ? (
                          <div className={cx("wrap-storage")}>
                            <div className={cx("storage-heading")}>
                              Chọn {option.key}: {ramValue}
                            </div>
                            <div className={cx("wrap-option")}>
                              {option.value.map((value, idx) => (
                                <div
                                  className={cx(
                                    "option",
                                    `${value === ramValue ? "active" : ""}`
                                  )}
                                  key={idx}
                                  value={value}
                                  onClick={() => findRam(value)}
                                >
                                  {value}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}

                  {/* Check product have color */}
                  {product.options &&
                    product.options.map((option, idx) => (
                      <div key={idx}>
                        {option.key === "color" ? (
                          <div className={cx("wrap-color")}>
                            <div className={cx("heading-color")}>
                              Chọn {option.key}: {colorValue}
                            </div>
                            <div className={cx("option-color")}>
                              {option.value.map((value, idx) => (
                                <div
                                  className={cx(
                                    "space",
                                    `${value === colorValue ? "active" : ""}`
                                  )}
                                  key={idx}
                                  value={value}
                                  onClick={() => findColor(value)}
                                >
                                  <div
                                    className={cx("radio-color")}
                                    style={{
                                      backgroundColor: colorCodes[value],
                                      background: colorCodes[value],
                                    }}
                                  ></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}

                  <div className={cx("wrap-buy")}>
                    <div className={cx("box-buy")}>
                      <Link
                        to="/checkout"
                        className={cx("buy-cash")}
                        onClick={() => dispatch(addToCart(product_current))}
                      >
                        MUA NGAY
                      </Link>
                    </div>
                    <div className={cx("box-buy")}>
                      <div
                        className={cx("add-to-list")}
                        onClick={() => dispatch(addToCart(product_current))}
                      >
                        THÊM VÀO GIỎ HÀNG
                      </div>
                    </div>
                  </div>

                  <div className={cx("wrap-option-information")}>
                    {/* {product.services && product.services.map((service, index) =>
                                            (
                                              <div className={cx('wrap-content')} key={index}>
                                                <FontAwesomeIcon icon={faCircleCheck} className={cx('icon-check')} />
                                                <p className={cx('content')}>{service}</p>
                                              </div>
                                            ))} */}
                    <div className={cx("wrap-content")}>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={cx("icon-check")}
                      />
                      <p className={cx("content")}>
                        Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp
                        Lightning - Type C{" "}
                      </p>
                    </div>
                    <div className={cx("wrap-content")}>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={cx("icon-check")}
                      />
                      <p className={cx("content")}>Bảo hành chính hãng 1 năm</p>
                    </div>
                    <div className={cx("wrap-content")}>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={cx("icon-check")}
                      />
                      <p className={cx("content")}>Giao hàng nhanh toàn quốc</p>
                    </div>
                    <div className={cx("wrap-content")}>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={cx("icon-check")}
                      />
                      <p className={cx("content")}>
                        Gọi đặt mua 1900.6626 (7:30 - 22:00)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("wrap-information")}>
              <div className={cx("wrap-heading")}>
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={cx(
                      "heading",
                      `${index === tab.id ? "active" : ""}`
                    )}
                    onClick={() => {
                      setIndex(tab.id);
                    }}
                  >
                    {tab.heading}
                  </div>
                ))}
              </div>
              <div className={cx("wrap-content")}>
                <div className={cx("padding-content")}>
                  <div className={cx("information-center")}>
                    {tabs.map((tab) => (
                      <div
                        key={tab.id}
                        className={cx(
                          "tab",
                          `${index === tab.id ? "active" : ""}`
                        )}
                      >
                        {tab.value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleProduct;

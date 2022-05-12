import React, { useState, useEffect } from "react";
import iranProvinces from "../data/iranProvinces";
import styles from "./IranMap.module.css";

const useMouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handle(e) {
      setMousePosition({
        x: e.pageX,
        y: e.pageY
      });
    }
    const mapEffect = document.querySelector("svg");
    mapEffect.addEventListener("mousemove", handle);
    return () => document.removeEventListener("mousemove", handle);
  }, [setMousePosition]);

  return mousePosition;
};

const IranMap = () => {
  const { x, y } = useMouse();
  const [provinces] = useState(() => iranProvinces);
  const [provinceName, setProvinceName] = useState("");
  const [provinceNameOnClick, setProvinceNameOnClick] = useState("");
  const [mapZoom, setMapZoom] = useState(false);
  const [provinceSelected, setProvinceSelected] = useState(false);
  const [cities, setCities] = useState(["تمام ایران"]);

  return (
    <>
      <span className={styles.show_title}>
        {provinceName}
        <style jsx>{`
          span {
            left: ${x + 5 + "px"};
            top: ${y + 5 + "px"};
            z-index: 999;
          }
        `}</style>
      </span>
      <div className={styles.container}>
        <div className={styles.map}>
          <button
            className={
              mapZoom
                ? styles.zoom_btn + " " + styles.zoom_out
                : styles.zoom_btn + " " + styles.zoom_in
            }
            onClick={() => {
              setMapZoom(!mapZoom);
            }}
          />
          <svg
            className={
              mapZoom ? styles.svg + " " + styles.map_zoom : styles.svg
            }
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="20 0 970 960"
            enableBackground="new 20 0 970 960"
            xmlSpace="preserve"
          >
            <g className={styles.province}>
              {provinces.map((province) => (
                <path
                  key={province.id}
                  className={province.className}
                  d={province.d}
                  onMouseOver={() => setProvinceName(province.name)}
                  onMouseLeave={() => setProvinceName("")}
                  onClick={() => {
                    console.log(province.name);
                    setCities(province.cities);
                    setProvinceSelected(true);
                    setProvinceNameOnClick(province.name);
                  }}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default IranMap;

import React from "react";
import "./system.css";

function MobileSystem({ detailProduct }) {
  return (
    <div className="system">
      <div className="system-wrapper">
        <div className="system-title">
          <span>Screen Size</span>
        </div>
        <div className="system-value"><span>{detailProduct.memory}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Chipset</span>
        </div>
        <div className="system-value"><span>{detailProduct.memory}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>RAM</span>
        </div>
        <div className="system-value"><span>{detailProduct.memory}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Internal memory</span>
        </div>
        <div className="system-value"><span>{detailProduct.memory}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Pin</span>
        </div>
        <div className="system-value"><span>{detailProduct.memory}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Weight</span>
        </div>
        <div className="system-value"><span>{detailProduct.memory}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Charging port</span>
        </div>
        <div className="system-value"><span>{detailProduct.memory}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Rear camera</span>
        </div>
        <div className="system-value"><span>{detailProduct.memory}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Front camera</span>
        </div>
        <div className="system-value"><span>{detailProduct.memory}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Operating system</span>
        </div>
        <div className="system-value"><span>{detailProduct.memory}</span></div>
      </div>
    </div>
  );
}

export default MobileSystem;

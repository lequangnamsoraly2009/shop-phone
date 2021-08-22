import React from "react";
import "./system.css";

function MobileSystem({ detailProduct }) {
  return (
    <div className="system">
      <div className="system-header">
        <span>Display </span>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Screen Technology</span>
        </div>
        <div className="system-value"><span>{detailProduct.display.screenTechnology}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Resolution Screen</span>
        </div>
        <div className="system-value"><span>{detailProduct.display.resolutionScreen}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>FPS</span>
        </div>
        <div className="system-value"><span>{detailProduct.display.FPS}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Maximum Brightness</span>
        </div>
        <div className="system-value"><span>{detailProduct.display.maximumBrightness}</span></div>
      </div>
      <div className="system-header">
        <span>Rear Camera</span>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Resolution Rear</span>
        </div>
        <div className="system-value"><span>{detailProduct.rearCamera.resolutionRear}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Flash</span>
        </div>
        <div className="system-value"><span>{detailProduct.rearCamera.flash}</span></div>
      </div>
      <div className="system-header">
        <span>Front Camera</span>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Resolution Front</span>
        </div>
        <div className="system-value"><span>{detailProduct.frontCamera.resolutionFront}</span></div>
      </div>
      <div className="system-header">
        <span>Central Processing Unit</span>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Operating System</span>
        </div>
        <div className="system-value"><span>{detailProduct.cpu.os}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Chipset</span>
        </div>
        <div className="system-value"><span>{detailProduct.cpu.chip}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>CPU Speed</span>
        </div>
        <div className="system-value"><span>{detailProduct.cpu.cpuSpeed}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Graphics Processing Unit</span>
        </div>
        <div className="system-value"><span>{detailProduct.cpu.gpu}</span></div>
      </div>
      <div className="system-header">
        <span>Memory And Storage</span>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>RAM</span>
        </div>
        <div className="system-value"><span>{detailProduct.memoryAndStorage.ram}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Internal Memory</span>
        </div>
        <div className="system-value"><span>{detailProduct.memoryAndStorage.internalMemory}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Max Memory Stick</span>
        </div>
        <div className="system-value"><span>{detailProduct.memoryAndStorage.memoryStick}</span></div>
      </div>
      <div className="system-header">
        <span>Connecting</span>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Bluetooth</span>
        </div>
        <div className="system-value"><span>{detailProduct.connect.bluetooth}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Charging Interface</span>
        </div>
        <div className="system-value"><span>{detailProduct.connect.chargingInterface}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Headphone Jack</span>
        </div>
        <div className="system-value"><span>{detailProduct.connect.headphoneJack}</span></div>
      </div>
      
      <div className="system-header">
        <span>General Infomation</span>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Weight</span>
        </div>
        <div className="system-value"><span>{detailProduct.general.weight}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Release Time</span>
        </div>
        <div className="system-value"><span>{detailProduct.general.releaseTime}</span></div>
      </div>
      <div className="system-wrapper">
        <div className="system-title">
          <span>Style Design</span>
        </div>
        <div className="system-value"><span>{detailProduct.general.design}</span></div>
      </div>
    </div>
  );
}

export default MobileSystem;

import React, { useState } from "react";
import "./evalution.css";

function Evalution() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="evalution">
      <div
        style={
          showMore ? { height: "auto" } : { height: 300, overflow: "hidden" }
        }
      >
        <div className="evalution-wrapper">
          <h2>Description</h2>
          <span>
            iPhone 12 Pro. 5G to download huge files on the go and stream HDR
            video.¹ Beautifully bright 6.1-inch Super Retina XDR display.²
            Ceramic Shield with 4x better drop performance.³ Incredible
            low-light photography with a new Pro camera system, and 4x optical
            zoom range. Cinema-grade Dolby Vision video recording, editing, and
            playback. Night mode portraits and next-level AR experiences with
            the LiDAR Scanner. Powerful A14 Bionic chip. And new MagSafe
            accessories for easy attach and faster wireless charging.⁴ For
            infinitely spectacular possibilities.
          </span>
        </div>
        <div className="evalution-wrapper">
          <h2>Features</h2>
          <span>
            6.1-inch Super Retina XDR display <br />
            Ceramic Shield, tougher than any smartphone glass <br />
            5G for superfast downloads and high-quality streaming <br />
            A14 Bionic chip, the fastest chip ever in a smartphone
            <br />
            Pro camera system with 12MP Ultra Wide, Wide, and Telephoto cameras;
            4x optical zoom range; Night mode, Deep Fusion, Smart HDR 3, Apple
            ProRAW, 4K Dolby Vision HDR recording
            <br />
            LiDAR Scanner for improved AR experiences, Night mode portraits
            <br />
            12MP TrueDepth front camera with Night mode, 4K Dolby Vision HDR
            recording
            <br />
            Industry-leading IP68 water resistance
            <br />
            Supports MagSafe accessories for easy attach and faster wireless
            charging
            <br />
            iOS 14 with redesigned widgets on the Home screen, all-new App
            Library, App Clips, and more
            <br />
            Data plan required. 5G is available in select markets and through
            select carriers. Speeds vary based on site conditions and carrier.
            For details on 5G support, contact your carrier and see
            apple.com/iphone/cellular.
            <br />
            The display has rounded corners. When measured as a rectangle, the
            screen is 6.06 inches diagonally. Actual viewable area is less.
            <br />
            Claim based on iPhone 12 Pro Ceramic Shield front compared with
            previous-generation iPhone.
            <br />
            Accessories are sold separately
            <br />
            Apple ProRAW coming soon.
            <br />
            iPhone 12 Pro is splash, water, and dust resistant and was tested
            under controlled laboratory conditions with a rating of IP68 under
            IEC standard 60529 (maximum depth of 6 meters up to 30 minutes).
            Splash, water, and dust resistance are not permanent conditions.
            Resistance might decrease as a result of normal wear. Do not attempt
            to charge a wet iPhone; refer to the user guide for cleaning and
            drying instructions. Liquid damage not covered under warranty.
          </span>
        </div>
        <div className="evalution-wrapper">
          <h2>What's Included</h2>
          <span>
            Apple iPhone 12 Pro 5G 128GB <br />
            USB-C to Lightning cablee
            <br />
            Documentation
          </span>
        </div>
      </div>
      <div
        className="btn"
        style={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "rgb(228, 228, 228)",
          cursor: "pointer",
          margin: "20px 0 0 0",
        }}
        onClick={() => setShowMore(!showMore)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {showMore ? "Show Less" : "Show More"}
      </div>
    </div>
  );
}

export default Evalution;

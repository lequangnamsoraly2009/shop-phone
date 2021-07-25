import { Radio } from "antd";
import React from "react";
import "./listitem.css";

function ListItem() {
  return (
    <div>
      <div className="list-item-header">
          <span style={{margin: "0 50px", fontSize: 15, fontWeight: 700}}>Sort By: </span>
          {/* value -> radio.group  onChange={this.handleSizeChange}*/}
        <Radio.Group> 
          <Radio.Button value="">Newest</Radio.Button>
          <Radio.Button value="sort=oldest">Oldest</Radio.Button>
          <Radio.Button value="sort=-soldNumber">Best sales</Radio.Button>
          <Radio.Button value="sort=-price">Price: Hight - Low</Radio.Button>
          <Radio.Button value="sort=price">Price: Low - Hight</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
}

export default ListItem;

import React from "react";
import ViewerItem from "./ViewerItem";
import Tree from "./Tree";


function Viewer(props) {

  const { objectInfo, urn } = props;
  // console.log('objectInfo---->', objectInfo)
  // console.log('urn---->', urn)
  const object1 = {
    // Converts array of objects to objects with this array to allow recursive iteration in Tree.js
    objects: objectInfo
  };
  return (
    <div className="Viewer">
      <div class="container">
        <div class="row">
          <h3> Viewer Component </h3>
            <Tree objectInfo={object1} />
        </div>
        <div class="row">
            <ViewerItem displayViewer={true} id="viewer" urn={urn} />
        </div>
      </div>
    </div>
  );
}

export default Viewer;



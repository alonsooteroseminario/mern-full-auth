import React from "react";
import ViewerItem from "./ViewerItem";
// import Chat from '../../chat/Chat';

function Viewer(props) {

  const { urn } = props;
  // const { objectInfo, urn } = props;

  // const object1 = {
  //   // Converts array of objects to objects with this array to allow recursive iteration in Tree.js
  //   objects: objectInfo
  // };
  return (
    <div class="landing-page">
      <div class="container">
        {/* <div class="row">
          <h3> Chat </h3>
            <Tree objectInfo={object1} />
          <Chat />
        </div> */}
        <div class="row">
            <ViewerItem displayViewer={true} id="viewer" urn={urn} />
        </div>
      </div>
    </div>
  );
}

export default Viewer;



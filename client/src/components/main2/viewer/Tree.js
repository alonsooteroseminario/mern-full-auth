import React from "react";
import { selectItem } from "../../../redux/actions/forgeViewerActions";
import {useSelector, useDispatch} from 'react-redux'
import TreeView from "react-treeview";

import "./Tree.css";

function Tree (props) {
  const dispatch = useDispatch()
  const handleClick = (id) => {
    selectItem(id, dispatch);
  }

  const { objectInfo } = props;
  return (
    <div>
      {objectInfo.objects.map((node, i) => {
        const label = (
          <span
            className="node"
            onClick={handleClick(node.objectid)}
          >
            {node.name}
          </span>
        );
        if (node.objects) {
          return (
            <TreeView
              key={node.objectid}
              nodeLabel={label}
              defaultCollapsed={true}
            >
              <Tree
                key={node.objectid}
                objectInfo={node}
                selectItem={selectItem}
              />
            </TreeView>
          );
        } else {
          return (
            <span
              key={node.objectid}
              className="info"
              onClick={handleClick(node.objectid)}
            >
              {node.name}
            </span>
          );
        }
      })}
    </div>
  );
}
export default Tree;

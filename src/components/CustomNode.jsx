import React from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data }) {
  return (
    <div className="custom-node">
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        style={{ background: '#555' }}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        style={{ background: '#555' }}
      />
    </div>
  );
}

export default CustomNode;

import React, { useState, useCallback, useEffect } from 'react';
import { getLayoutedElements } from './utils/layout';
import { FaPlus, FaSitemap } from 'react-icons/fa';

import ReactFlow, {
  ReactFlowProvider,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';

import StatusBanner from './components/StatusBanner';
import { validateDAG } from './utils/dagValidator';
import CustomNode from './components/CustomNode';
import CustomConnectionLine from './components/CustomConnectionLine';


const nodeTypes = {
  custom: CustomNode,
};

let id = 0;
const getId = () => `node_${id++}`;

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [validation, setValidation] = useState({
    isValid: false,
    reason: "Graph is empty.",
  });

  const isValidConnection = (connection) => {
    const { source, target, sourceHandle, targetHandle } = connection;

    if (source === target) return false;
    if (sourceHandle !== 'source') return false;
    if (targetHandle !== 'target') return false;

    return true;
  };

  const handleAutoLayout = () => {
    const layouted = getLayoutedElements(nodes, edges, 'LR');
    setNodes(layouted.nodes);
    setEdges(layouted.edges);
    setTimeout(() => {
      if (reactFlowInstance) {
        reactFlowInstance.fitView();
      }
    }, 0);
  };

  const handleAddNode = () => {
    const label = prompt('Enter node label:');
    if (label) {
      const newNode = {
        id: getId(),
        type: 'custom',
        data: { label },
        position: {
          x: (nodes.length % 5) * 200 + 100,
          y: Math.floor(nodes.length / 5) * 150 + 100,
        },
      };
      setNodes((nds) => [...nds, newNode]);
    }
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params) => {
    const { source, target, sourceHandle, targetHandle } = params;

    const isValid =
      source !== target &&
      sourceHandle === 'source' &&
      targetHandle === 'target';

    if (!isValid) {
      alert("Invalid connection!");
      return;
    }

    setEdges((eds) => addEdge(params, eds));
  }, []);



  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete') {
        const selectedNodeIds = nodes.filter((n) => n.selected).map((n) => n.id);

        setNodes((nds) =>
          nds.filter((n) => !selectedNodeIds.includes(n.id))
        );

        setEdges((eds) => {
          let updatedEdges = eds.filter(
            (e) =>
              !selectedNodeIds.includes(e.source) &&
              !selectedNodeIds.includes(e.target)
          );

          const selectedEdgeIds = eds.filter((e) => e.selected).map((e) => e.id);
          updatedEdges = updatedEdges.filter(
            (e) => !selectedEdgeIds.includes(e.id)
          );

          return updatedEdges;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes]);

  useEffect(() => {
    const result = validateDAG(nodes, edges);
    setValidation(result);
  }, [nodes, edges]);

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    if (window.confirm(`Delete node "${node.data.label}"?`)) {
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) =>
        eds.filter(
          (e) => e.source !== node.id && e.target !== node.id
        )
      );
    }
  };

  const onEdgeContextMenu = (event, edge) => {
    event.preventDefault();
    if (window.confirm(`Delete edge from "${edge.source}" to "${edge.target}"?`)) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
  };

  return (
    <ReactFlowProvider>
      <div className="bg-container">
        <div className="toolbar">
          <button onClick={handleAddNode} className="addButton" title="Add a new node">
            <FaPlus /> Add Node
          </button>
          <button onClick={handleAutoLayout} className="addButton" title="Automatically arrange nodes">
            <FaSitemap /> Auto Layout
          </button>
          <div>
            <StatusBanner validation={validation} />
          </div>
        </div>
        <div className="canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeContextMenu={onNodeContextMenu}
            onEdgeContextMenu={onEdgeContextMenu}
            nodeTypes={nodeTypes}
            fitView
            onInit={setReactFlowInstance}
            connectionLineComponent={(props) => (
              <CustomConnectionLine {...props} isValidConnection={isValidConnection} />
            )}
            connectionLineType="bezier"
            isValidConnection={() => true}
          >
            <Background />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;

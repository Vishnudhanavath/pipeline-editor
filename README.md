# Pipeline Editor

A visual editor for designing directed acyclic graphs (DAGs) and pipelines, built with [React Flow](https://reactflow.dev/).

🚀 **Live Demo:** [pipelineeditorbyvishnu.netlify.app](https://pipelineeditorbyvishnu.netlify.app/)

---

## Features

✅ **Add custom nodes**  
- Click **“Add Node”** to create a new node in the graph.
- Nodes have custom visuals and ports (source and target handles).

✅ **Connect nodes**  
- Drag a connection from a node’s source handle to another node’s target handle.
- Cycles are disallowed to keep the graph a valid DAG.

✅ **Delete nodes and edges**  
- Right-click on a node or edge to delete it.
- Press `Delete` key to remove selected nodes or edges.

✅ **Auto Layout**  
- Click **“Auto Layout”** to neatly arrange nodes using Dagre layout.

✅ **Live DAG Validation**  
- App automatically checks:
  - No cycles exist in the graph.
  - All nodes are connected to at least one edge.

✅ **Custom connection lines**  
- Connection lines turn green or red depending on whether a connection is valid.

---

## Tech Stack

- **React**  
- **React Flow**
- **Dagre.js** (for automatic layout)
- **Vite** (build tool)
- **Netlify** (deployment)

---

## Local Development

### Install dependencies

```bash
npm install
```




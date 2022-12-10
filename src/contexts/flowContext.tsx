import React, { useContext, useState, useCallback, useEffect } from 'react';
import {
  Node,
  Edge,
  Connection,
  NodeChange,
  addEdge,
  MarkerType,
  useNodesState,
  useEdgesState,
  EdgeChange,
} from 'reactflow';
import { useToast } from './toastContext';

//! Created a Context for centralized FLOW related state management from throughout the application 🌍

type FlowType = {
  nodes: Node[];
  edges: Edge[];
  currentNode?: Node;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onSetCurrent: (_: React.MouseEvent, node: Node) => void;
  onConnect: (connection: Connection) => void;
  onNodeValueChange: (value: string) => void;
  checkValidityOnSave: () => boolean;
  onSave: () => void;
  onReset: () => void;
};
const FlowContext = React.createContext<FlowType>({
  currentNode: undefined,
  edges: [],
  nodes: [],
  onConnect: () => {},
  onEdgesChange: () => {},
  onNodesChange: () => {},
  onSetCurrent: () => {},
  onNodeValueChange: () => {},
  checkValidityOnSave: () => false,
  onSave: () => {},
  onReset: () => {},
});

export const FlowContextProvider = ({ children }: { children: React.ReactNode }) => {
  //? Nodes of the FLOW
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  //? Edges of the FLOW
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  //? currently selected Node of the FLOW
  const [currentNode, setCurrentNode] = useState<Node>();

  //! Reset currently selected node on nodes state change
  useEffect(() => {
    onResetCurrent();
  }, [nodes.length]);

  //! For alert banner
  const { onToast } = useToast();

  //! All the functions below were memoized via useCallback for referential stability (AKA: to minimize unnecessary rerenders)
  //! Checking if state is valid, by seeing if there is more than one free node without any source or target 🎯
  const checkValidityOnSave = useCallback(() => {
    const nodesSet = new Set<string>();
    edges.forEach((edge) => {
      nodesSet.add(edge.source);
      nodesSet.add(edge.target);
    });
    if (nodesSet.size !== nodes.length) {
      return false;
    }
    return true;
  }, [nodes.length, edges]);

  //! function fired when we connect handlers(source ➡ target)
  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((edges) =>
        addEdge(
          {
            ...connection,
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          edges ?? [],
        ),
      ),
    [setEdges],
  );

  //! when a node is clicked
  const onSetCurrent = useCallback((_: React.MouseEvent, node: Node) => {
    if (!node) return;
    setCurrentNode(node);
  }, []);
  const onNodeValueChange = useCallback(
    (value: string) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === currentNode?.id) {
            node.data = {
              ...node.data,
              value,
            };
          }

          return node;
        }),
      );
    },
    [currentNode?.id, setNodes],
  );

  const onResetCurrent = useCallback(() => {
    setCurrentNode(undefined);
  }, []);

  //! Save data to local storage for reloads and stuff (You know just like a cloud.LOL) ⛅
  const onSave = useCallback(() => {
    const flowData = { nodes, edges, time: new Date().getTime() };
    localStorage.setItem('FlowData', JSON.stringify(flowData));
    onToast('Data Saved Successfully', 'blue-1', true);
  }, [nodes, edges]);

  //! this is getting data back from local storage
  const onResetFromLocalStorage = useCallback(() => {
    const getData = async () => {
      const lsData = localStorage.getItem('FlowData');
      if (lsData) {
        const flowData = JSON.parse(lsData);
        if (!flowData) return;
        //? added this time check as well not, accepting data if the data is older than an hour(1 hour)
        if (flowData.time < new Date().getTime() - 60 * 60 * 1000) {
          onToast("Can't load Image too old", 'dark-1', true);
          localStorage.removeItem('FlowData');
          return;
        }
        setNodes(flowData.nodes || []);
        setEdges(flowData.edges || []);
        onToast('Data Restored Successfully', 'yellow-1', true);
      }
    };
    getData();
  }, []);
  return (
    <FlowContext.Provider
      value={{
        nodes,
        edges,
        onConnect,
        onEdgesChange,
        onNodesChange,
        currentNode,
        onSetCurrent,
        onNodeValueChange,
        checkValidityOnSave,
        onSave,
        onReset: onResetFromLocalStorage,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlowContext = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlowContext can only be used inside a FlowContextProvider');
  }
  return context;
};

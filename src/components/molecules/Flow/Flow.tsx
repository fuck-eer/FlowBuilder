import { ReactFlow, Background, BackgroundVariant, MiniMap } from 'reactflow';
import { useFlowContext } from '../../../contexts/flowContext';
import 'reactflow/dist/base.css';
import { useDrop } from 'react-dnd';
import { DraggableNodes } from '../../../types/dnd';
import TextNode from './TextNode';
import Message from '../../atoms/Icon/Message';
import generateRandomString from '../../../utils/randomStrings';

const nodeTypes = { [DraggableNodes['messageNode']]: TextNode };
const Flow = () => {
  const { edges, nodes, onConnect, onEdgesChange, onNodesChange, onSetCurrent } = useFlowContext();
  //! library for drag and drop,
  const [, dropRef] = useDrop(() => ({
    accept: DraggableNodes.messageNode,
    drop: () => {
      const ID = generateRandomString(16);
      onNodesChange([
        {
          type: 'add',
          item: {
            id: ID,
            type: DraggableNodes.messageNode,
            data: {
              header: 'Send Message',
              type: 'Text',
              value: `Node-ID:${ID}`,
              HeaderEmoji: Message,
            },
            position: {
              x: Math.floor(Math.random() * 400),
              y: Math.floor(Math.random() * 200),
            },
          },
        },
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver,
    }),
  }));

  return (
    <div ref={dropRef} className="relative flex w-full h-full overflow-hidden">
      <ReactFlow
        edges={edges}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        fitView
        onNodeClick={onSetCurrent}
      >
        <Background color="#EEEEEE" variant={BackgroundVariant.Cross} />
        {!!nodes.length && (
          <MiniMap
            nodeColor={'#F18805'}
            position="top-left"
            nodeBorderRadius={5}
            nodeStrokeWidth={3}
            maskColor={'#dedede00'}
            maskStrokeColor={'#000000'}
            maskStrokeWidth={3}
            className="shadow-lg  bg-dark-2/50 rounded-lg cursor-move"
            pannable
            zoomable
          />
        )}
      </ReactFlow>
    </div>
  );
};

export default Flow;

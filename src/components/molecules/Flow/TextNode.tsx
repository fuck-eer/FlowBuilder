import React from 'react';
import { Handle, Position, Connection, NodeProps } from 'reactflow';
import { useFlowContext } from '../../../contexts/flowContext';
import clsx from 'clsx';

type TextNodeDataType = {
  data: {
    header: string;
    type?: string;
    value: string;
    HeaderEmoji?: string | typeof React.Component;
  };
};

const TextNode = ({ id, data: { HeaderEmoji, header, value } }: NodeProps & TextNodeDataType) => {
  const { edges, currentNode } = useFlowContext();
  //! Checking if the connection is valid (1 node can not a source of 2 connections)
  const isValidConnection = (connection: Connection) => {
    if (connection.source === connection.target) return false;
    if (!edges.length) return true;
    const connIndex = edges.findIndex((edge) => edge.source === connection.source);
    if (connIndex === -1) return true;
    return false;
  };

  return (
    <>
      <div
        className={clsx(
          'rounded-md min-w-[12rem] max-w-[14rem] min-h-[3rem] flex flex-col border-2 border-orange-1 shadow-lg',
          { 'border-black': id === currentNode?.id },
        )}
      >
        <div
          className={clsx(
            { 'bg-black text-white': id === currentNode?.id },
            { 'bg-orange-1 text-black': id !== currentNode?.id },
            ' w-full flex justify-between py-1 px-2',
          )}
        >
          <h4 className="text-sm font-bebas capitalize">{header}</h4>
          <span className="flex justify-center items-center">
            {typeof HeaderEmoji === 'string' ? (
              HeaderEmoji
            ) : HeaderEmoji ? (
              <HeaderEmoji color={id !== currentNode?.id ? '#000000' : '#ffffff'} height={14} width={14} />
            ) : (
              <></>
            )}
          </span>
        </div>
        <div className="p-2 w-full break-words bg-white  rounded-b-md text-[8px] font-josefin">{value}</div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="translate-y-[-50%] translate-x-[-20%] bg-black w-2 h-2 border-2 border-orange-1 rounded-full"
      />
      <Handle
        type="source"
        position={Position.Right}
        isValidConnection={isValidConnection}
        className="translate-y-[-50%] translate-x-[20%] bg-orange-1 w-2 h-2 border-2 border-black rounded-full"
      />
    </>
  );
};

export default TextNode;

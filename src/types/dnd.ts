//? Will get more node types as per requirement grows
export const DraggableNodes = {
  messageNode: 'messageNode',
} as const;
export type DraggableNodesTypes = keyof typeof DraggableNodes;

import clsx from 'clsx';
import { useDrag } from 'react-dnd';
import { DraggableNodes } from '../../../../types/dnd';
import Message from '../../../atoms/Icon/Message';

type NodeOptionType = {
  iconSlug: string;
  title: string;
  subText?: string;
};
//? for referencing icons from slug, should've done this elegantly!
const iconsMap = {
  messageNode: Message,
};

const NodeOption = ({ iconSlug, title, subText }: NodeOptionType) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: DraggableNodes.messageNode,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const DisplayIcon = iconsMap[iconSlug as keyof typeof iconsMap];
  return (
    <div
      ref={dragRef}
      className={clsx(
        'px-4 py-3 cursor-pointer bg-white rounded-xl border-2 transition duration-200  hover:shadow-card hover:scale-105 border-black max-w-[15rem] min-w-[13rem] flex justify-center items-center gap-1',
        { 'animate-pulse border-dashed': isDragging },
      )}
    >
      <div className="flex justify-center items-center">
        <DisplayIcon height={70} width={70} />
      </div>
      <div className="flex flex-col text-center items-stretch justify-start max-w-[9.25rem]">
        <h2 className="font-bebas text-4xl">{title}</h2>
        <p className="text-xs max-w-[7rem] font-normal text-gray-1">{subText}</p>
      </div>
    </div>
  );
};

export default NodeOption;

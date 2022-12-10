import clsx from 'clsx';
import React from 'react';

type PanelProps = {
  hasDivider?: boolean;
  title?: string;
  panelOptions?: React.ReactNode[] | React.ReactNode;
};
//? Created this component for design simplicity,
const Panel = ({ panelOptions, hasDivider, title }: PanelProps) => {
  return (
    <div
      className={clsx('px-1 py-5  md:px-8 md:py-4 flex flex-col gap-2 text-black', {
        'border-b-2 border-gray-6': hasDivider,
      })}
    >
      <h3 className="capitalize text-2xl font-bebas text-pink-1">{title}</h3>
      <div className="flex flex-row flex-wrap md:flex-col gap-3 md:gap-4 items-stretch">{panelOptions}</div>
    </div>
  );
};

export default Panel;

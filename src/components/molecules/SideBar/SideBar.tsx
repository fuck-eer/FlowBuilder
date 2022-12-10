import { useState } from 'react';
import Button from '../../atoms/Button/Button';
import { IoMdArrowRoundForward } from 'react-icons/io';
import clsx from 'clsx';
import Panel from '../Panel/Panel';
import NodeOption from '../PanelOptions/NodeOption/NodeOption';
import SettingOption from '../PanelOptions/SettingOption/SettingOption';
import { useFlowContext } from '../../../contexts/flowContext';
import nodeOptionsArray from '../../../data/NodeOptions.json';
const SideBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const { currentNode, onNodeValueChange } = useFlowContext();
  //? Getting node options from dummy source
  const nodeOptions = nodeOptionsArray.map((e) => (
    <NodeOption key={e.id} iconSlug={e.iconSlug} title={e.title} subText={e.subText}></NodeOption>
  ));
  return (
    <section
      onClick={() => {
        if (!showSideBar) setShowSideBar((prev) => !prev);
      }}
      className={clsx(
        'fixed z-10 font-josefin flex flex-col px-3 items-stretch top-0 sm:top-auto md:top-auto sm:bottom-0 md:bottom-auto md:right-0 transition-all duration-300 bg-gray-7 border-t-2 md:border-t-0 md:border-l-2 min-h-screen sm:min-h-[50vh] md:min-h-screen border-gray-6 min-w-full md:min-w-[10rem]',
        {
          'translate-y-[95%] md:translate-x-[90%] md:translate-y-0 cursor-pointer': !showSideBar,
        },
      )}
    >
      <Button
        classes="absolute right-[1rem] top-[1rem] sm:left-[1rem] md:right-auto sm:right-auto sm:top-[-1rem] md:left-[-1rem] md:top-[1rem]"
        right={
          <IoMdArrowRoundForward
            className={clsx('transition-all delay-300 duration-300 rotate-90 md:rotate-0', {
              '-rotate-90  md:rotate-180': !showSideBar,
            })}
          />
        }
        variant="dark-1"
        onClick={(e) => {
          // stopped propagation to not hinder in parents click capture!
          e.stopPropagation();
          setShowSideBar((prev) => !prev);
        }}
      />
      {/* Node Panel */}
      <Panel hasDivider title="Nodes Panel" panelOptions={nodeOptions} />
      {/* SETTINGS PANEL */}
      {currentNode && (
        <Panel
          title="Setting Panel"
          panelOptions={
            <SettingOption
              nodeId={currentNode.id}
              nodeName={currentNode.data.header}
              nodeLabel={currentNode.data.type}
              nodeValue={currentNode.data.value}
              nodeType="textarea"
              debouncedSubmit={onNodeValueChange}
            />
          }
        />
      )}
    </section>
  );
};

export default SideBar;

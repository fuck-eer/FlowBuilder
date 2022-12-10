import React, { useState, useEffect } from 'react';
import Input from '../../../atoms/Input/Input';

type SettingOptionType = {
  nodeId: string;
  nodeName: string;
  nodeType: 'textarea' | React.HTMLInputTypeAttribute | undefined;
  nodeLabel: string;
  nodeValue: string;
  debouncedSubmit?: (value: string) => void;
};
const SettingOption = ({ nodeId, nodeName, nodeValue, nodeType, nodeLabel, debouncedSubmit }: SettingOptionType) => {
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    setInputValue(nodeValue);
  }, [nodeId]);

  //? Debounced the value edit in node to prevent too many updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        debouncedSubmit?.(inputValue);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  return (
    <div className="flex bg-white flex-col rounded-xl rounded-tl-none border-2 border-black overflow-hidden shadow-card max-w-[15rem]">
      <div className="bg-black px-3 py-2 text-white font-bebas text-2xl">
        <h3>{nodeName}</h3>
      </div>
      <div className="p-3 ">
        <Input
          label={nodeLabel}
          type={nodeType ?? 'text'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SettingOption;

import React, { ErrorInfo } from 'react';
import Button from './components/atoms/Button/Button';
import Logo from './components/atoms/Icon/Logo';
import { MdUpdate } from 'react-icons/md';
interface Props {
  children?: React.ReactNode;
}

interface State {
  errorMessage: string;
}
//! FOR ERROR HANDLING!
class DummyErrorBoundary extends React.Component<Props, State> {
  state = {
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error): State {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.errorLogger(error.toString(), info.componentStack);
  }

  //! Here will be calling a error logger📜
  errorLogger = console.error;

  render() {
    if (this.state.errorMessage) {
      return (
        <div className="overflow-hidden z-0 relative w-screen h-screen bg-dark-1 flex flex-col justify-center items-center gap-6 before:absolute before:content-['XOX'] before:text-black-1 before:animate-wiggle before:font-bebas before:overflow-hidden before:text-[650px] before:opacity-20 before:duration-[5s] before:z-[-1]">
          <Logo height={170} width={170} />
          <div className="flex flex-col justify-center gap-3 items-stretch max-w-[60%] text-center font-bebas text-6xl">
            <h1 className="text-white">This doesn&apos;t seems to be working!</h1>
            <p className="font-josefin text-xl text-center text-error-1">{this.state.errorMessage}</p>
          </div>
          <Button
            classes="mt-10 gap-2"
            label="Reload"
            variant="yellow-1"
            right={<MdUpdate />}
            onClick={() => {
              window.location.reload();
            }}
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export default DummyErrorBoundary;

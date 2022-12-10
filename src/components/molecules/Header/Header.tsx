import { IoSave } from 'react-icons/io5';
import { useFlowContext } from '../../../contexts/flowContext';
import { useToast } from '../../../contexts/toastContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Button from '../../atoms/Button/Button';
import Logo from '../../atoms/Icon/Logo';

const Header = () => {
  const {
    nodes: { length: nodeLength },
    checkValidityOnSave,
    onSave,
  } = useFlowContext();
  const { onToast } = useToast();
  const greaterThanMobile = useMediaQuery('sm');

  return (
    <section
      id="header"
      className="fixed z-10 py-2 px-6 items-center  flex justify-between top-0 left-0 bg-gray-7 w-screen min-h-[4.25rem] border-b-2 border-gray-6"
    >
      <Logo classes="logoSeeSaw" width={40} height={40} />
      <Button
        variant="orange-1"
        onClick={() => {
          if (!checkValidityOnSave()) {
            onToast('Flow is not in correct state!', 'error-1', true);
            return;
          }
          //* this function just stores the data in localStorage (AKA: KRK of cloud storage )
          onSave();
        }}
        label={!greaterThanMobile ? '' : 'save changes'}
        right={!greaterThanMobile ? <IoSave width={24} height={24} /> : ''}
        size="lg"
        disabled={!nodeLength}
      />
    </section>
  );
};

export default Header;

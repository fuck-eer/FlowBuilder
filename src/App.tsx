import { useEffect } from 'react';
import Flow from './components/molecules/Flow/Flow';
import PageLayout from './components/molecules/PageLayout/PageLayout';
import { useFlowContext } from './contexts/flowContext';

function App() {
  const { onReset } = useFlowContext();
  useEffect(() => {
    //*👇To fetch previously saved data from local storage
    onReset();
  }, []);
  return (
    <PageLayout>
      <Flow />
    </PageLayout>
  );
}

export default App;

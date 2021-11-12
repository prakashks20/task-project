import { Tabs, Modal } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import ComposeTeam from './components/composeTeam';

const { TabPane } = Tabs, { info } = Modal;

function App() {
  const [tabActiveKey, setTabActiveKey] = useState('1'),
    playerList = useSelector((state) => state.composeTeamReducer.playerList),
    onChangeTabKey = (key) => {
      if (playerList?.length >= 5) {
        setTabActiveKey(key)
      } else {
        info({
          content: <div>Need minimum 5 players to add guarter</div>,
          onOk: () => Modal.destroyAll(),
          maskClosable: false,
        });
      }
    };
  return (
    <div className="App">
      <Tabs activeKey={tabActiveKey} onChange={onChangeTabKey}>
        <TabPane tab="Compose Team" key="1">
          <ComposeTeam />
        </TabPane>
        <TabPane tab="First Quarter" key="2">
          First Quarter
        </TabPane>
      </Tabs>
    </div >
  );
}

export default App;

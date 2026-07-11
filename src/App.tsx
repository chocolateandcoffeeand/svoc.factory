import { useState } from 'react';
import TopScreen from './screens/TopScreen';
import LevelListScreen from './screens/LevelListScreen';
import ProblemScreen from './screens/ProblemScreen';

type Screen =
  | { name: 'top' }
  | { name: 'levels'; lineId: string }
  | { name: 'problem'; levelId: string; lineId: string };

function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'top' });

  if (screen.name === 'top') {
    return <TopScreen onSelectLine={(lineId) => setScreen({ name: 'levels', lineId })} />;
  }

  if (screen.name === 'levels') {
    return (
      <LevelListScreen
        lineId={screen.lineId}
        onBack={() => setScreen({ name: 'top' })}
        onSelectLevel={(levelId) => setScreen({ name: 'problem', levelId, lineId: screen.lineId })}
      />
    );
  }

  return (
    <ProblemScreen
      levelId={screen.levelId}
      onExit={() => setScreen({ name: 'levels', lineId: screen.lineId })}
      onLevelCleared={() => setScreen({ name: 'levels', lineId: screen.lineId })}
    />
  );
}

export default App;

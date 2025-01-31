import { useState } from 'react';
import reactLogo from '@view/assets/react.svg';
import viteLogo from '@view/assets/vite.svg';
import './App.css';
import { Layout } from './layout';
import { NavigationFlutter } from './flutter-components/NavigationFlutter';
import { AppContext } from './app-context';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <Layout.Layer className="flex flex-col items-center">
        <h1>💖 Hello World!</h1>
        <p>Welcome to your Electron application.</p>
        <p>{`This app is using Chrome (v${Versions.chrome()}), Node.js (v${Versions.node()}), and Electron (v${Versions.electron()})`}</p>
        <div className="flex w-fit">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button
            onClick={() => {
              AppContext.openNavigation();
            }}
          >
            flutter navigation drawer
          </button>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </Layout.Layer>
      <Layout.Layer pointerNone>
        <NavigationFlutter />
      </Layout.Layer>
    </Layout>
  );
}

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import RootRouting from './routes';



const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <RootRouting />
    </Provider>
  );
};

export default App;

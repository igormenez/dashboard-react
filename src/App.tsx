import React from 'react';
import GlobalStyles from './styles/GLobalStyles'
import {ThemeProvider} from 'styled-components';

import Layout from './components/Layout'
import Dashboard from './page/Dashboard';
import Lista from './page/List';
import dark from './styles/themes/dark'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles/>
      <Layout>
        <Lista/>
      </Layout>
    </ThemeProvider>
  );
}
export default App;
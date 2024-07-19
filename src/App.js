import logo from './logo.svg';
import './App.css';
import TodoList from './Componants/TodoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  typography: {
    fontFamily: ['Alexandria']
  }

});

function App() {

  return (
    <ThemeProvider theme={theme}>

      <div className="App" style={{ margin: "50px 0", direction: 'rtl' /* display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", */ }}>
        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;

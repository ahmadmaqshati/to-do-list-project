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
      <div className="App" style={{ display: 'flex', justifyContent: "center", alignItems: "center", /* background: "#191A1D" */ height: "100vh", direction: 'rtl' }}>
        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;

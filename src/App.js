import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { items } from "./items";
function App() {
  return (
    <div className="container">
      <Header />
      <Main items={items} />
    </div>
  );
}

export default App;

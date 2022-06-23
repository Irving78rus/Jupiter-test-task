import "./App.css";
import Header from "./components/header/Header";
import List from "./components/main/list/List";
import { items } from "./items";
function App() {
  return (
    <div className="container">
      <Header />
      <List items={items} />
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Problem1 from "./components/Problem-1.jsx";
import Menu from "./components/Menu.jsx";
import Problem2 from "./components/Problem-2.jsx";
import Index from "./components/Index.jsx";
import AllContactsModal from "./components/Modals/AllContactsModal.jsx";
import AllUSContacts from "./components/Modals/AllUSContacts.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/" element={<Menu />}>
          <Route path="/problem-2">
            <Route index element={<Problem2 />} />
            <Route path="all" element={<AllContactsModal />} />
            <Route path="us" element={<AllUSContacts />} />
          </Route>
          <Route path="problem-1" element={<Problem1 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

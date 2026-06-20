import Nav from "./components/Nav";
import Billboard from "./components/Billboard";
import Row from "./components/Row";
import Footer from "./components/Footer";
import { hub } from "./content/hub";

export default function App() {
  return (
    <>
      <Nav />
      <Billboard />
      <main className="pb-10">
        <Row row={hub.rows[0]} id="learn" />
        <Row row={hub.rows[1]} id="companies" />
      </main>
      <Footer />
    </>
  );
}

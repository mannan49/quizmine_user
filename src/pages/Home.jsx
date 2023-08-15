import Layout from "../components/Layout";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <Layout>
      <div className="flex overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>
    </Layout>
  );
}

export default Home;

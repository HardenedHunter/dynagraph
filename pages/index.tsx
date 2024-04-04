const Home = () => null;

export const getServerSideProps = () => {
  return { redirect: { destination: "/dashboards", permanent: true } };
};

export default Home;

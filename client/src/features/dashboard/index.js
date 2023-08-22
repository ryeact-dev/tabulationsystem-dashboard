import TitleCard from "../../components/Cards/TitleCard";

export default function Dashboard() {
  return (
    <TitleCard>
      <section className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-primary text-4xl font-bold">Tabulation System</h1>
        <p className="text-xl">
          Powered by <span className="font-semibold">React JS</span> and
          <span className="font-bold"> Daisy Ui</span>
        </p>
      </section>
    </TitleCard>
  );
}

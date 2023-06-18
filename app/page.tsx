import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

export default function Home() {
  return (
    <div className="flex flex-col h-full overflow-y-auto lg:flex-row">
      <LeftSide />
      <RightSide />
    </div>
  );
}
// • R
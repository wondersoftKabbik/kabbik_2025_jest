export default function Spinner({ size = "w-8 h-8", color = "border-blue-500" }) {
  return (
    <div
      className={`rounded-full border-4 border-t-transparent animate-spin ${size} ${color}`}
    />
  );
}

import { twMerge } from "tailwind-merge";

const TEXT = "Não foram encontrados resultados para essa busca...";

export function NoResults({ className }: { className?: string }) {
  return (
    <div
      className={twMerge("grid grid-cols-12 items-center gap-12", className)}
    >
      <div className="col-span-6 col-start-4 flex items-center">
        <span className="text-gray-600 text-center text-h3">{TEXT}</span>
      </div>
      <div className="col-span-12 flex justify-center">
        <img src="/assets/illustrations/no-results.svg" alt={TEXT} />
      </div>
    </div>
  );
}

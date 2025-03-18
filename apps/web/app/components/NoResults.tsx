import { twMerge } from "tailwind-merge";

const TEXT = "No results found for this search";

export function NoResults({ className }: { className?: string }) {
  return (
    <div
      className={twMerge("grid grid-cols-12 items-center gap-y-12", className)}
    >
      <div className="col-span-12 lg:col-span-6 lg:col-start-4 grid">
        <span className="text-gray-600 text-center text-h3">{TEXT}</span>
      </div>
      <div className="col-span-12 grid justify-center">
        <img src="/assets/illustrations/no-results.svg" alt={TEXT} />
      </div>
    </div>
  );
}

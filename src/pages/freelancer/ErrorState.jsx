import { XCircle } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
      <XCircle className="mx-auto h-7 w-7 text-rose-500" />
      <h3 className="mt-3 text-sm font-extrabold text-rose-700">
        Unable to load marketplace data
      </h3>
      <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-rose-600">
        {message || "Something went wrong. Please try again."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-rose-700"
      >
        Try again
      </button>
    </div>
  );
}
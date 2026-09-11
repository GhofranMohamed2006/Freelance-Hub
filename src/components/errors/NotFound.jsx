import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#F8F9FC] px-6">
    <div className="text-center">
      <p className="text-7xl font-bold text-indigo-600">404</p>
      <h1 className="mt-4 font-serif text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-500">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Go Home</Link>
    </div>
  </div>
);

export default NotFound;

export default function Error() {
  return (
    <div className="absolute -z-10 top-0 left-0 h-screen w-screen flex items-center justify-center divide-x divide-gray-200">
      <h2 className="text-3xl font-bold text-lime-500 pr-3">404</h2>
      <div className="flex flex-col justify-center pl-3">
        <h2 className="text-2xl font-bold text-gray-900">Page not found</h2>
        <span className="text-sm text-gray-400">
          Please check the URL in the address bar and try again
        </span>
      </div>
    </div>
  );
}

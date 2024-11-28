export default function LoadingMessage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
        <p className="mt-4 text-gray-700 font-semibold">
          Loading data, please wait...
        </p>
      </div>
    </div>
  );
}

import { IoCalendarOutline } from "react-icons/io5";

export default function HeaderInfo() {
  return (
    <div className="mb-6 flex justify-between w-3/4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-600">
          An easy way to manage sales with care and precision.
        </p>
      </div>

      <div className="mt-4">
        <button className="px-4 py-2 rounded-full border border-gray-400 text-sm flex justify-center items-center">
          <IoCalendarOutline />
          <span className="pl-1"> January 2024 - May 2024</span>
        </button>
      </div>
    </div>
  );
}

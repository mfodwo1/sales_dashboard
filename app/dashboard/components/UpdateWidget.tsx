type UpdateProps = {
  update: {
    percentage_change: string;
    date: string;
    message: string;
  };
};

// Utility function to add ordinal suffix
function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const month = date.toLocaleString("en-US", { month: "short" }); // Get short month name
  const day = date.getDate();
  const year = date.getFullYear();

  // Add ordinal suffix to the day
  const ordinal =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${month} ${day}${ordinal} ${year}`;
}

export default function UpdateWidget({ update }: UpdateProps) {
  return (
    <div className="bg-darkGreen text-white p-6 rounded-2xl border border-gray-700 shadow-md max-w-sm">
      {/* Red dot and "Update" text */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <h2 className="text-sm font-semibold">Update</h2>
      </div>
      {/* Date */}
      <p className="text-gray-400 text-sm mb-2">{formatDate(update.date)}</p>
      {/* Message */}
      <p className="text-lg font-bold leading-tight mb-2">
        {update.percentage_change.startsWith("-")
          ? "Sales revenue decreased"
          : "Sales revenue increased"}
      </p>

      {/* Percentage Change */}
      <p className="text-green-400 text-xl font-semibold">
        {update.percentage_change}{" "}
        <span className="text-white"> in 1 week</span>
      </p>

      {/* Link */}
      <a
        href="#"
        className="text-gray-400 text-sm font-medium mt-4 inline-block hover:underline"
      >
        See Statistics &rarr;
      </a>
    </div>
  );
}

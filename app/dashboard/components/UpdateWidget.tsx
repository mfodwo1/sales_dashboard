type UpdateProps = {
  update: {
    percentage_change: string;
    date: string;
    message: string;
  };
};

export default function UpdateWidget({ update }: UpdateProps) {
  return (
    <div className="bg-green-700 text-white p-4 rounded-md">
      <h2 className="text-lg font-bold">Update</h2>
      <p>{update.date}</p>
      <p>{update.message}</p>
      <p>{update.percentage_change}</p>
    </div>
  );
}

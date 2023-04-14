export const SkeletonLoading = () => {
  return (
    <div>
      <div className="bg-gray-200 animate-pulse rounded-md p-4">
        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
        <div className="bg-gray-300 h-4 rounded w-1/2 mt-2"></div>
        <div className="bg-gray-300 h-4 rounded w-3/4 mt-2"></div>
      </div>
    </div>
  );
};

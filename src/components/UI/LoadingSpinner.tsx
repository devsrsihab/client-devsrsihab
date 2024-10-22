const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-800">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-100" />
    </div>
  );
};

export default LoadingSpinner;

const LoadingModal = () => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
        <div
          className={`bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full opacity-100 scale-100`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="mt-2 mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Loading data...
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;

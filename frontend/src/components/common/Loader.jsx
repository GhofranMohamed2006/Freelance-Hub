const Loader = ({ text = "Loading..." }) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F8F9FC]">
            <div className="text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                <p className="text-sm text-gray-500">
                    Loading dashboard...
                </p>
            </div>
        </div>
    );
};

export default Loader;
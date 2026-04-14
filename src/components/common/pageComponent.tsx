interface PageComponentProps<T> {
    serverData: PageResponseDTO<T>;
    movePage: ({ page }: PageParam) => void;
}

const PageComponent = ({ serverData, movePage }: PageComponentProps<any>) => {
    return (
        <div className="mt-12 mb-6 flex justify-center items-center gap-1">
            {serverData?.prev && (
                <button
                    className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
                    onClick={() => movePage({ page: serverData.prevPage })}
                >
                    Prev
                </button>
            )}

            <div className="flex gap-2">
                {serverData?.pageNumList?.map((pageNum) => (
                    <button
                        key={pageNum}
                        className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition-all shadow-sm ${
                            serverData?.current === pageNum
                                ? "bg-indigo-600 text-white shadow-indigo-200"
                                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                        }`}
                        onClick={() => movePage({ page: pageNum })}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>

            {serverData?.next && (
                <button
                    className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
                    onClick={() => movePage({ page: serverData.nextPage })}
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default PageComponent;

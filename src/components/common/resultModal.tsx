function ResultModal({ title, content, callbackFn }: ResultModal) {
    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => callbackFn && callbackFn()}
        >
            {/* 모달 본체: 좁은 화면에서도 가로 스크롤이 생기지 않도록 max-w 적용 */}
            <div
                className="bg-white rounded-[32px] shadow-2xl w-full max-w-[500px] overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
            >
                {/* 상단 타이틀 영역 */}
                <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">
                        {title}
                    </h2>
                </div>

                {/* 본문 내용 영역 */}
                <div className="px-8 py-10 text-center">
                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <p className="text-2xl font-bold text-slate-700 leading-snug">
                        {content}
                    </p>
                </div>

                {/* 하단 버튼 영역 */}
                <div className="px-8 py-6 bg-slate-50 flex justify-center">
                    <button
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95"
                        onClick={() => callbackFn && callbackFn()}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultModal;

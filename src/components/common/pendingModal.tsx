const PendingModal = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white p-10 rounded-[32px] shadow-2xl flex flex-col items-center gap-6 border border-white/50">
                {/* 로딩 스피너 애니메이션 */}
                <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 border-8 border-orange-100 rounded-full"></div>
                    <div className="absolute w-16 h-16 border-8 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="text-2xl font-black text-slate-800 tracking-tight">
                    Processing
                    <span className="text-orange-500 animate-pulse">...</span>
                </div>
                <p className="text-slate-400 text-sm font-medium">
                    잠시만 기다려 주세요.
                </p>
            </div>
        </div>
    );
};
export default PendingModal;

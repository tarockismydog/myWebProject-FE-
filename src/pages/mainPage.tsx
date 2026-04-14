import { animated, config, useSpring, useTrail } from "@react-spring/web";
import { NavLink } from "react-router";

function MainPage() {
    // 1. 헤더와 메인 이미지를 위한 기본 애니메이션
    const fadeIn = useSpring({
        from: { opacity: 0, transform: "translateY(20px)" },
        to: { opacity: 1, transform: "translateY(0px)" },
        config: config.gentle,
    });

    // 2. 기술 스택 섹션을 위한 트레일 애니메이션 (하나씩 순서대로 나타남)
    const stacks = [
        { name: "React", level: "Expert", desc: "Hooks, Context API" },
        { name: "Zustand", level: "Advanced", desc: "Global State Management" },
        { name: "Tailwind", level: "Expert", desc: "Responsive Design" },
        {
            name: "React Spring",
            level: "Intermediate",
            desc: "Interactive Motion",
        },
        { name: "Node.js", level: "Intermediate", desc: "RESTful API" },
    ];

    const trail = useTrail(stacks.length, {
        from: { opacity: 0, x: -20 },
        to: { opacity: 1, x: 0 },
        config: config.stiff,
        delay: 500,
    });

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
            {/* 상단 네비게이션 */}
            <nav className="max-w-7xl mx-auto px-8 py-10 flex justify-between items-baseline">
                <animated.h1
                    style={fadeIn}
                    className="text-xl font-black tracking-tighter uppercase"
                >
                    Haeun's{" "}
                    <span className="text-indigo-600">React Spring</span>{" "}
                    Project
                </animated.h1>
                <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-slate-400">
                    <NavLink
                        to="/about"
                        className="hover:text-black transition-colors"
                    >
                        About
                    </NavLink>
                    <a href="#" className="hover:text-black transition-colors">
                        Works
                    </a>
                    <a href="#" className="hover:text-black transition-colors">
                        Contact
                    </a>
                </div>
            </nav>

            {/* 메인 비주얼 섹션 (보내주신 이미지 참고) */}
            <main className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                    <animated.div
                        style={fadeIn}
                        className="md:col-span-4 pb-12"
                    >
                        <p className="text-sm font-medium leading-relaxed text-slate-500 max-w-[280px]">
                            디자인과 개발의 경계를 허무는 인터랙티브한 웹 경험을
                            설계합니다. React Spring의 부드러운 움직임을
                            프로젝트에 담았습니다.
                        </p>
                    </animated.div>

                    {/* 중앙 메인 이미지 */}
                    <animated.div style={fadeIn} className="md:col-span-8">
                        <div className="relative group overflow-hidden rounded-[2px] bg-slate-100">
                            <img
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
                                alt="Main workspace"
                                className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                            />
                            <div className="absolute top-8 right-8 text-white font-black text-6xl opacity-20">
                                2026
                            </div>
                        </div>
                    </animated.div>
                </div>
            </main>

            {/* 하단 기술 스택 섹션 (타임라인/카드 스타일) */}
            <section className="max-w-7xl mx-auto px-8 py-24 border-t border-slate-100 mt-20">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-12">
                    Tech Stack & Capability
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {trail.map((style, index) => (
                        <animated.div
                            key={index}
                            style={style}
                            className="group"
                        >
                            <div className="text-xl font-black text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                                {stacks[index].name}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                {stacks[index].level}
                            </div>
                            <div className="w-full h-[1px] bg-slate-100 group-hover:bg-indigo-200 transition-all mb-4"></div>
                            <p className="text-xs text-slate-400 font-medium leading-normal">
                                {stacks[index].desc}
                            </p>
                        </animated.div>
                    ))}
                </div>
            </section>

            {/* 푸터 영역 */}
            <footer className="py-20 text-center">
                <p className="text-[10px] font-bold tracking-[0.5em] text-slate-300 uppercase">
                    © 2026 Haeun. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

export default MainPage;

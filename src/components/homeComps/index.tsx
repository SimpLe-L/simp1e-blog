import Typewriter from "./typewriter"

const HomePage = () => {
  let delay = 0;

  // 每次调用，增加延时
  const getDelay = () => (delay += 200);
  return (
    <div className="flex flex-col gap-[16px] w-full h-full relative">
      <span className="text-[--basic-text] text-2xl md:text-5xl tracking-widest animate-fade-up animate-ease-in-out"
        style={{
          animationDelay: `${getDelay()}ms`,
        }}>
        你好，我是
      </span>
      <strong
        className="text-5xl md:text-8xl tracking-widest text-[#7f5af0] animate-fade-up animate-ease-in-out"
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        Simp1e
      </strong>
      <div className="animate-fade-up animate-ease-in-out" style={{ animationDelay: `${getDelay()}ms` }}>
        <Typewriter />
      </div>

      <span className="text-[--basic-text] text-2xl md:text-5xl tracking-widest animate-fade-up animate-ease-in-out"
        style={{
          animationDelay: `${getDelay()}ms`,
        }}>
        技术栈：<span className="text-[#7f5af0]">React</span>、<span className="text-[#2cb67d]">Vue</span>、<span className="text-[--basic-text]">TypeScript</span>...
      </span>

      <span className="text-[#94a1b2] text-xl md:text-3xl tracking-widest animate-fade-up animate-ease-in-out"
        style={{
          animationDelay: `${getDelay()}ms`,
        }}>
        目前正在努力成为一名Web3.0的全栈开发。
      </span>

      <div className="animate-fade-up animate-ease-in-out flex gap-[8px]" style={{ animationDelay: `${getDelay()}ms` }}>
        <div className="p-[8px] text-[--basic-text] border-[1px] border-[#adadad] rounded-lg cursor-pointer hover:bg-[#94a1b2]">github</div>
        <div className="p-[8px] text-[--basic-text] border-[1px] border-[#adadad] rounded-lg cursor-pointer hover:bg-[#94a1b2]">about</div>
      </div>
    </div>
  )
}

export default HomePage;
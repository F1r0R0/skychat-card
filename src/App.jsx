import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  ExternalLink, 
  MessageSquare, 
  Zap, 
  Globe, 
  Github, 
  Play, 
  Pause, 
  Copy,
  Check,
  Sparkles,
  BadgeCheck,
  Share2,
  Users,
  Activity,
  Infinity
} from 'lucide-react';

const App = () => {
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef(null);

  // Плавное появление при загрузке
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleCopy = () => {
    const el = document.createElement('textarea');
    el.value = '@Skychatdev';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    // В реальности здесь будет копироваться window.location.href
    const el = document.createElement('textarea');
    el.value = 'https://skychat-web.vercel.app/'; 
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030014] text-slate-200 font-sans flex items-center justify-center p-4 selection:bg-fuchsia-500/30 relative overflow-hidden">
      
      {/* Пользовательские стили для сложных анимаций */}
      <style>{`
        .visualizer-bar { animation: bounce 1s ease-in-out infinite; }
        @keyframes bounce {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Яркий анимированный фон (Aurora Effect) */}
      <div className="absolute w-full max-w-lg h-full max-h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="absolute top-0 -left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob" />
        <div className="absolute top-0 -right-10 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-10 left-20 w-72 h-72 bg-violet-600 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-4000" />
      </div>

      {/* Основная карточка */}
      <div 
        className={`relative w-full max-w-md bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] transition-all duration-1000 ease-out z-10
          ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}
        `}
      >
        
        {/* Декоративная неоновая линия сверху */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-80" />

        {/* Кнопка Share и Бейдж Статуса */}
        <div className="absolute top-6 w-full left-0 px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
            </span>
            <span className="text-[9px] font-bold tracking-widest uppercase text-fuchsia-300">Skychat is live</span>
          </div>
          
          <button 
            onClick={handleShare}
            className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all text-slate-400 group relative"
            title="Share profile"
          >
            {shareCopied ? <Check size={14} className="text-cyan-400" /> : <Share2 size={14} className="group-hover:scale-110 transition-transform" />}
          </button>
        </div>

        {/* Секция профиля (Опущена чуть ниже из-за верхнего бара) */}
        <div className="flex flex-col items-center text-center mt-6 mb-8">
          
          {/* Аватарка с переливающимся кольцом */}
          <div className="relative mb-5 group mt-4">
            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-violet-500 opacity-70 animate-spin-slow group-hover:opacity-100 transition-opacity duration-500 blur-sm" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-[-2px] rounded-full bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-violet-500 z-0" />
            <div className="relative w-28 h-28 bg-[#09090b] rounded-full border-[3px] border-[#030014] flex items-center justify-center overflow-hidden z-10">
              <img 
                src="/avatar.png" 
                alt="Skychat Logo" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.style.display = 'none';
                  e.target.parentNode.style.background = 'linear-gradient(135deg, #06b6d4, #d946ef)';
                }}
              />
            </div>
            {/* Иконка-бейдж */}
            <div className="absolute -bottom-1 -right-1 bg-[#030014] p-1.5 rounded-full z-20">
              <div className="bg-gradient-to-br from-fuchsia-500 to-violet-600 p-1.5 rounded-full shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                <Zap size={14} className="text-white fill-white" />
              </div>
            </div>
          </div>

          {/* Имя и статус */}
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 animate-gradient-x">
              Skychat
            </h1>
            <BadgeCheck size={22} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-sm font-semibold px-2 py-0.5 rounded-md hover:bg-white/10"
            >
              @Skychatdev
              {copied ? <Check size={14} className="text-cyan-400" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* Описание */}
        <div className="mb-6 text-center px-2">
          <p className="text-slate-300 leading-relaxed text-sm font-medium">
            Создатель мессенджера <span className="text-white font-bold drop-shadow-md">Skychat</span>.<br/>
            Сотрудничаю с <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400 font-bold">neurovibe</span>. 
            Разрабатываю будущее цифрового общения.
          </p>
        </div>

        {/* Теги/Скиллы (Яркие) */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {[
            { label: 'Messenger Dev', icon: MessageSquare, color: 'text-cyan-300', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
            { label: 'Web Apps', icon: Globe, color: 'text-violet-300', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
            { label: 'AI', icon: Sparkles, color: 'text-fuchsia-300', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20' }
          ].map((tag, idx) => (
            <div key={idx} className={`flex items-center gap-1.5 px-3 py-1.5 ${tag.bg} border ${tag.border} rounded-xl text-xs font-semibold text-white shadow-sm hover:scale-105 transition-transform cursor-default`}>
              <tag.icon size={12} className={tag.color} />
              {tag.label}
            </div>
          ))}
        </div>

        {/* Аудио элемент */}
        <audio 
          ref={audioRef} 
          src="/track.mp3" 
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          loop
        />

        {/* Яркий Виджет Музыки */}
        <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-8 group hover:bg-white/[0.06] transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10 flex items-center gap-4">
            {/* Обложка / Эквалайзер */}
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-[#030014] to-[#1a0b2e] border border-white/10 flex items-center justify-center shadow-inner">
              <div className="flex gap-[3px] items-end h-4">
                <div className={`w-1 bg-cyan-400 rounded-full ${isPlaying ? 'visualizer-bar' : 'h-1'}`} style={{ animationDelay: '0.0s' }} />
                <div className={`w-1 bg-fuchsia-400 rounded-full ${isPlaying ? 'visualizer-bar' : 'h-2'}`} style={{ animationDelay: '0.2s' }} />
                <div className={`w-1 bg-violet-400 rounded-full ${isPlaying ? 'visualizer-bar' : 'h-1.5'}`} style={{ animationDelay: '0.4s' }} />
              </div>
            </div>

            {/* Текст трека */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white truncate">Pixelated Power Up</h4>
              <p className="text-xs text-fuchsia-300/80 truncate font-medium">Skychat's Vibe</p>
            </div>

            {/* Кнопка Play */}
            <button 
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all shadow-lg border border-white/5"
            >
              {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
            </button>
          </div>

          {/* Прогресс бар */}
          <div className="relative mt-4 w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 transition-all duration-300 rounded-full" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="space-y-3">
          
          {/* Главная кнопка TG - Сочный градиент */}
          <a 
            href="https://t.me/Skychatdev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between w-full p-4 rounded-xl overflow-hidden transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-500 animate-gradient-x" />
            
            <div className="relative flex items-center gap-3">
              <div className="p-2 bg-black/20 backdrop-blur-sm rounded-lg">
                <Send size={18} className="text-white" />
              </div>
              <span className="font-bold text-white tracking-wide">Telegram Канал</span>
            </div>
            <ExternalLink size={18} className="relative text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </a>

          <div className="grid grid-cols-2 gap-3">
            <a 
              href="https://skychat-web.vercel.app/"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all text-sm font-semibold text-slate-200 hover:text-cyan-100"
            >
              <Globe size={16} className="text-cyan-400" /> Web App
            </a>
            <button className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-fuchsia-500/30 transition-all text-sm font-semibold text-slate-200 hover:text-fuchsia-100">
              <Github size={16} className="text-fuchsia-400" /> Projects
            </button>
          </div>
        </div>

        {/* Футер */}
        <div className="mt-8 text-center flex flex-col gap-1.5 opacity-90">
          <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
            Creator-Skychat
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
            &copy; 2026 SKYCHAT EST.
          </p>
        </div>

      </div>
    </div>
  );
};

export default App;
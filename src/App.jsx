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
  Sparkles
} from 'lucide-react';

const App = () => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  // Исправленная функция переключения
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    // Состояние isPlaying обновится автоматически через события onPlay/onPause
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

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans flex items-center justify-center p-4 selection:bg-indigo-500/30">
      {/* Фоновые эффекты */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Основная карточка */}
      <div className="relative w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
        
        {/* Декор сверху */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

        {/* Секция профиля */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-4 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-28 h-28 bg-[#16161a] rounded-full border-2 border-white/10 flex items-center justify-center overflow-hidden">
              <img 
                src="/avatar.png" 
                alt="Skychat Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.style.display = 'none';
                  e.target.parentNode.style.background = 'linear-gradient(to bottom right, #6366f1, #a855f7)';
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-indigo-500 p-1.5 rounded-full border-4 border-[#0a0a0c]">
              <Zap size={14} className="text-white fill-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Skychat</h1>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20"
          >
            @Skychatdev
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>

        {/* Описание */}
        <div className="mb-8 text-center px-4">
          <p className="text-slate-400 leading-relaxed text-sm">
            Создатель мессенджера — <span className="text-white font-medium">Skychat</span>. 
            Сотрудничаю с <span className="text-indigo-400">neurovibe</span>. Разрабатываю будущее цифрового общения.
          </p>
        </div>

        {/* Теги/Скиллы */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { label: 'Messenger Dev', icon: MessageSquare },
            { label: 'Web Apps', icon: Globe },
            { label: 'AI Integrations', icon: Sparkles }
          ].map((tag, idx) => (
            <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-xs font-medium text-slate-300">
              <tag.icon size={12} className="text-indigo-400" />
              {tag.label}
            </div>
          ))}
        </div>

        {/* Аудио элемент с твоим треком */}
        <audio 
          ref={audioRef} 
          src="/track.mp3" 
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          loop
        />

        {/* Виджет музыки */}
        <div className="bg-black/40 border border-white/5 rounded-3xl p-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-900 to-black flex items-center justify-center border border-white/10">
              <div className={`flex gap-0.5 items-end h-4 ${isPlaying ? 'animate-bounce' : ''}`}>
                <div className="w-1 bg-white/60 h-2" />
                <div className="w-1 bg-white/60 h-4" />
                <div className="w-1 bg-white/60 h-3" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white truncate">Pixelated Power Up</h4>
              <p className="text-xs text-slate-500 truncate">Skychat's Vibe</p>
            </div>
            <button 
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>
          </div>
          <div className="mt-3 w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] transition-all duration-300" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="space-y-3">
          <a 
            href="https://t.me/Skychatdev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between w-full p-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-600/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Send size={18} className="text-white" />
              </div>
              <span className="font-semibold text-white">Telegram Канал</span>
            </div>
            <ExternalLink size={18} className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <div className="grid grid-cols-2 gap-3">
            <a 
              href="https://skychat-web.vercel.app/"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-sm font-medium"
            >
              <Globe size={16} /> Web App
            </a>
            <button className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-sm font-medium">
              <Github size={16} /> Projects
            </button>
          </div>
        </div>

        {/* Футер */}
        <div className="mt-8 text-center flex flex-col gap-1">
          <p className="text-xs font-medium text-slate-400">Creator-Skychat</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold">
            &copy; 2026 SKYCHAT EST.
          </p>
        </div>

      </div>
    </div>
  );
};

export default App;
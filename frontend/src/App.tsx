import { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

function FloatingBackground() {
  // Using useMemo to prevent the animations from resetting when typing the passcode
  const floatingItems = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
      content: Math.random() > 0.4 ? '❤️' : '✨' // 60% hearts, 40% sparkles
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {floatingItems.map((item) => (
        <div
          key={item.id}
          className="absolute text-pink-300/40 text-2xl md:text-3xl animate-float opacity-80"
          style={{
            left: `${item.left}%`,
            bottom: '-50px',
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

function PasscodePage() {
  const [passcode, setPasscode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleKeyPress = (num: string) => {
    if (passcode.length < 4) {
      setPasscode(passcode + num);
    }
  };

  const handleBackspace = () => {
    setPasscode(passcode.slice(0, -1));
  };

  const playAudio = () => {
    const audio = new Audio('/BIRTHDAY WISHES.mp4');
    audio.play().catch(e => console.error("Audio play failed:", e));
  };

  const handleNext = async () => {
    if (passcode.length === 4) {
      setIsVerifying(true);
      try {
        const response = await fetch('https://birthday-9xkf.onrender.com/api/verify-passcode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ passcode }),
        });

        const data = await response.json();

        if (data.success) {
          playAudio();
          setTimeout(() => navigate('/success'), 300);
        } else {
           // Reset if wrong
           setTimeout(() => setPasscode(''), 500);
        }
      } catch (error) {
        console.error("Failed to verify passcode with the backend", error);   
        // Fallback if backend is down
        if (passcode === '0504') {
          playAudio();
          setTimeout(() => navigate('/success'), 300);
        } else {
          setTimeout(() => setPasscode(''), 500);
        }
      } finally {
        setIsVerifying(false);
      }
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#a40000] flex flex-col items-center justify-start md:justify-center p-4 selection:bg-white text-white font-['Comic_Neue'] relative overflow-x-hidden overflow-y-auto"> 
      <FloatingBackground />

      {/* Background Scattered Polaroids */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        {/* Top Left */}
        <div className="absolute -top-6 md:top-8 -left-10 md:left-12 opacity-0 animate-fadeInUp [animation-delay:100ms] hover:z-50 pointer-events-auto">
          <div className="transform -rotate-12 bg-white p-2 pb-10 shadow-2xl rounded-sm w-[160px] md:w-[200px] transition-transform duration-500 hover:rotate-0 hover:scale-105">
            <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden rounded">
              <img src="/photo3.png" alt="memory 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Top Right */}
        <div className="absolute -top-4 md:top-12 -right-8 md:right-16 opacity-0 animate-fadeInUp [animation-delay:300ms] hover:z-50 pointer-events-auto">
          <div className="transform rotate-6 bg-white p-2 pb-10 shadow-2xl rounded-sm w-[150px] md:w-[220px] transition-transform duration-500 hover:rotate-0 hover:scale-105">
            <div className="w-full aspect-square bg-gray-200 overflow-hidden rounded">
              <img src="/photo4.png" alt="memory 4" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-4 left-2 md:bottom-20 md:left-24 opacity-0 animate-fadeInUp [animation-delay:500ms] hidden sm:block hover:z-50 pointer-events-auto">
          <div className="transform rotate-12 bg-white p-2 pb-10 shadow-2xl rounded-sm w-[140px] md:w-[190px] transition-transform duration-500 hover:rotate-0 hover:scale-105">
            <div className="w-full aspect-square bg-gray-200 overflow-hidden rounded">
              <img src="/photo5.png" alt="memory 5" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Bottom Right */}
        <div className="absolute -bottom-10 md:bottom-12 -right-6 md:right-24 opacity-0 animate-fadeInUp [animation-delay:700ms] hover:z-50 pointer-events-auto">
          <div className="transform -rotate-12 bg-white p-2 pb-10 shadow-2xl rounded-sm w-[170px] md:w-[210px] transition-transform duration-500 hover:rotate-0 hover:scale-105">
            <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden rounded">
              <img src="/photo6.png" alt="memory 6" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl flex gap-12 flex-col md:flex-row items-center justify-center relative z-10 py-10 md:py-0">

        {/* Left Side: Photo */}
        <div className="relative z-10 mx-auto md:mx-0 opacity-0 animate-fadeInUp [animation-delay:900ms] flex flex-col gap-6 md:gap-14 items-center">
          
          {/* Main Original Image */}
          <div className="transform rotate-0 md:-rotate-12 hover:rotate-0 transition-transform duration-300 z-10 hover:z-30 w-full flex justify-center">
            <div className="bg-white p-3 md:p-4 pb-10 md:pb-14 shadow-2xl rounded-sm w-[220px] md:w-[260px] h-[260px] md:h-[300px] relative">
              <div className="absolute -top-6 -right-6 text-blue-300 drop-shadow-lg z-20 animate-wiggle">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#a5d8ff" stroke="#a5d8ff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="md:w-[50px] md:h-[50px]">   
                      <path d="M4 22L12 15L20 22V14C20 14 15 18 12 15C9 18 4 14 4 14V22Z" />
                      <circle cx="12" cy="7" r="5" fill="#a5d8ff" />
                  </svg>
              </div>

              <div className="w-full h-full bg-gray-200 overflow-hidden rounded"> 
                <img src="/photo2.png" alt="memory 2" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="absolute -bottom-8 -left-4 md:-left-8 text-[40px] md:text-[60px] drop-shadow-lg transition z-20 animate-wiggle">
              🧸
            </div>
          </div>

          {/* Additional Image below Teddy */}
          <div className="transform rotate-0 md:rotate-6 hover:rotate-0 transition-transform duration-300 z-10 hover:z-30 w-full flex justify-center mt-4 md:mt-0">
            <div className="bg-white p-3 md:p-4 pb-10 md:pb-14 shadow-2xl rounded-sm w-[220px] md:w-[260px] h-[260px] md:h-[300px] relative">
              <div className="w-full h-full bg-gray-200 overflow-hidden rounded"> 
                {/* Fallback to photo1.png or change the src accordingly */}
                <img src="/photo7.png" alt="memory 1" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Passcode */}
        <div className="flex flex-col items-center flex-1 w-full max-w-[400px] relative opacity-0 animate-fadeInUp [animation-delay:1100ms]">
          <h2 className="text-white text-4xl mb-6 font-bold tracking-wider text-center drop-shadow-md">
            Entre a passcode
          </h2>

          <div className="flex gap-3 md:gap-4 mb-6 md:mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-14 h-14 md:w-16 md:h-16 bg-white border-4 border-white rounded-xl flex items-center justify-center text-4xl md:text-5xl text-[#a40000] font-black shadow-inner overflow-hidden transition-all duration-200 ${passcode[i] ? 'scale-110 shadow-pink-200 shadow-md' : 'scale-100'}`}
              >
                {passcode[i] ? '*' : ''}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-x-4 md:gap-x-6 gap-y-4 max-w-[300px]">      
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', 'Next'].map((item) => (
              <button
                key={item}
                onClick={() => {
                   if (item === '⌫') handleBackspace();
                   else if (item === 'Next') handleNext();
                   else handleKeyPress(item);
                }}
                disabled={isVerifying || (item === 'Next' && passcode.length < 4)}
                className={`w-16 h-16 md:w-20 md:h-20 bg-[#fde9e9] rounded-full text-[#a40000] ${item === 'Next' || item === '⌫' ? 'text-xl md:text-2xl font-bold' : 'text-3xl md:text-4xl font-black'} shadow-lg hover:bg-white active:scale-95 hover:shadow-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 text-2xl drop-shadow-md tracking-wide font-bold opacity-80">
             hint- its are fav code
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-['Comic_Neue']">
      
      {/* Main Birthday Graphic */}
      <div className="z-10 w-full flex justify-center opacity-0 animate-fadeInUp [animation-delay:200ms]">
        <img 
          src="/birthday.gif" 
          alt="Happy Birthday Bears" 
          className="w-full max-w-[500px] h-auto object-contain"
          onError={(e) => { 
            e.currentTarget.style.display='none'; 
            e.currentTarget.parentElement!.innerHTML = '<div class="text-center text-black"><h1 class="text-5xl font-bold mb-4 text-[#87CEEB]">HAPPY<br/><span class="text-[#FF69B4]">BIRTHDAY</span></h1><div class="text-8xl">🐻🎂🐰</div></div>'; 
          }} 
        />
      </div>

      {/* Next Button */}
      <button 
        onClick={() => navigate('/next')}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-16 bg-black text-white px-10 py-3 rounded-full text-2xl font-bold tracking-wider hover:scale-105 active:scale-95 transition-transform shadow-xl z-20 opacity-0 animate-fadeInUp [animation-delay:600ms]"
      >
        NEXT
      </button>

    </div>
  );
}

function GiftPage() {
  const [opened, setOpened] = useState(false);
  const [blown, setBlown] = useState(false);
  const [fadeOutWish, setFadeOutWish] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleBlow = () => {
    setFadeOutWish(true);
    setTimeout(() => {
      setBlown(true);
    }, 500);
  };

  if (opened) {
    return (
      <div className="h-screen bg-[#900000] flex flex-col items-center justify-center p-4 relative overflow-hidden font-['Comic_Neue'] selection:bg-white text-white">
        <FloatingBackground />
        
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto z-10">
          
          <div className="h-24 md:h-32 flex items-center justify-center mb-4 md:mb-8 relative w-full">
            <h1 className={`absolute text-5xl md:text-7xl font-bold tracking-wide drop-shadow-md transition-opacity duration-500 ${fadeOutWish ? 'opacity-0' : 'opacity-100'}`}>
              Make a wish
            </h1>
            
            <h1 className={`absolute text-5xl md:text-7xl font-bold tracking-wide drop-shadow-md text-pink-300 transition-opacity duration-1000 ${blown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              Happy Birthday Nupurrrrr
            </h1>
          </div>

          <div className="relative w-64 md:w-96 h-auto mb-8 animate-fadeInUp [animation-delay:200ms]">
            {imageError ? (
              <div className="text-[150px] md:text-[200px] text-center drop-shadow-2xl">🎂</div>
            ) : (
              <img 
                src="/cake.png" 
                alt="Birthday Cake" 
                className="w-full h-auto"
                onError={() => setImageError(true)}
              />
            )}
            
            {!blown && (
              <div className="absolute top-[18%] left-[20%] w-[60%] h-[20%] flex justify-between px-2 transition-opacity duration-300">
                 {[...Array(0)].map((_, i) => (
                    <div key={i} className="text-3xl md:text-5xl animate-bounce">🔥</div>
                 ))}
              </div>
            )}
          </div>

          {!blown && (
            <button 
              onClick={handleBlow}
              className={`bg-[#700000] border-2 border-white/20 text-white px-12 py-3 rounded-full text-2xl font-bold tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl z-20 ${fadeOutWish ? 'opacity-0 pointer-events-none' : 'opacity-100'} animate-fadeInUp [animation-delay:400ms]`}
            >
              BLOW
            </button>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-['Comic_Neue'] selection:bg-pink-100">
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto opacity-0 animate-fadeInUp">
        
        <h1 className="text-5xl md:text-7xl font-bold text-[#ff729f] tracking-wide mb-8 md:mb-16">
          Gift for you
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 w-full">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300 transform hover:-translate-y-4"
              onClick={() => {
                if (i === 0) {
                  setOpened(true);
                } else {
                  console.log(`Clicked gift ${i + 1}`);
                }
              }}
            >
              {/* Place your 3D pink gift image in the public folder as "gift.png" */}
              <img 
                src="/gift.jpg" 
                alt="pink gift box" 
                className="w-32 md:w-64 h-auto object-contain"
                onError={(e) => { 
                  e.currentTarget.style.display='none'; 
                  e.currentTarget.parentElement!.innerHTML = '<div class="text-[80px] md:text-[140px] drop-shadow-lg">🎁</div>'; 
                }}
              />
            </div>
          ))}
        </div>

        <p className="text-2xl md:text-4xl font-bold text-[#ff729f] tracking-wide mt-8 md:mt-16">
          click any gift to open
        </p>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PasscodePage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/next" element={<GiftPage />} />
    </Routes>
  );
}

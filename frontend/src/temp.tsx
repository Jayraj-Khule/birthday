import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';

function PasscodePage() {
  const [passcode, setPasscode] = useState('');
  const navigate = useNavigate();

  const handleKeyPress = async (num: string) => {
    if (passcode.length < 4) {
      const newPasscode = passcode + num;
      setPasscode(newPasscode);
      
      if (newPasscode.length === 4) {
        try {
          const response = await fetch('https://birthday-9xkf.onrender.com/api/verify-passcode', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ passcode: newPasscode }),
          });
          
          const data = await response.json();
          
          if (data.success) {
            setTimeout(() => navigate('/success'), 300);
          } else {
             // Reset if wrong
             setTimeout(() => setPasscode(''), 500);
          }
        } catch (error) {
          console.error("Failed to verify passcode with the backend", error);
          // Fallback if backend is down
          if (newPasscode === '0504') {
            setTimeout(() => navigate('/success'), 300);
          } else {
            setTimeout(() => setPasscode(''), 500);
          }
        }
      }
    }
  };

  const handleBackspace = () => {
    setPasscode(passcode.slice(0, -1));
  };

  return (
    <div className="min-h-[100dvh] bg-[#a40000] flex flex-col items-center justify-start md:justify-center p-4 selection:bg-white text-white font-['Comic_Neue'] relative overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-5xl flex gap-8 md:gap-12 flex-col md:flex-row items-center justify-center relative py-10 md:py-0">
        
        {/* Left Side: Photo */}
        <div className="relative transform rotate-0 md:-rotate-2 hover:rotate-0 transition duration-300 z-10 w-full flex justify-center mt-4 md:mt-0">
          <div className="bg-white p-3 md:p-4 pb-10 md:pb-16 shadow-2xl rounded-sm w-[240px] md:w-[300px] h-[280px] md:h-[350px] relative">
            <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 text-blue-300 drop-shadow-lg z-20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#a5d8ff" stroke="#a5d8ff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="md:w-[60px] md:h-[60px]">
                    <path d="M4 22L12 15L20 22V14C20 14 15 18 12 15C9 18 4 14 4 14V22Z" />
                    <circle cx="12" cy="7" r="5" fill="#a5d8ff" />
                </svg>
            </div>
            
            {/* The photo should be replaced by the 2nd photo, so user will add the source here */}
            <div className="w-full h-full bg-gray-200 overflow-hidden rounded">
              <img 
                src="/photo2.png" 
                alt="2nd photo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=400&auto=format&fit=crop";
                }}
              />
            </div>
          </div>
          
          <div className="absolute -bottom-8 -left-4 md:-bottom-10 md:-left-10 text-[60px] md:text-[80px] drop-shadow-lg hover:scale-110 transition z-20">
            🧸
          </div>
        </div>

        {/* Right Side: Passcode */}
        <div className="flex flex-col items-center flex-1 w-full max-w-[400px] relative mt-10 md:mt-0">
          <h2 className="text-white text-3xl md:text-4xl mb-6 font-bold tracking-wider text-center drop-shadow-md">
            Entre a passcode
          </h2>

          <div className="flex gap-3 md:gap-4 mb-6 md:mb-8">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className="w-14 h-14 md:w-16 md:h-16 bg-white border-4 border-white rounded-xl flex items-center justify-center text-4xl md:text-5xl text-[#a40000] font-black shadow-inner overflow-hidden"
              >
                {passcode[i] ? '*' : ''}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-x-4 md:gap-x-6 gap-y-4 max-w-[300px]">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((item) => (
              <button
                key={item}
                onClick={() => {
                   if (item === '*' || item === '#') handleBackspace();
                   else handleKeyPress(item);
                }}
                className="w-16 h-16 md:w-20 md:h-20 bg-[#fde9e9] rounded-full text-[#a40000] text-3xl md:text-4xl font-black shadow-lg hover:bg-white active:scale-95 transition-transform flex items-center justify-center"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 text-xl md:text-2xl drop-shadow-md tracking-wide font-bold">
             hint- its are fav code
          </div>
          
          <div className="absolute bottom-4 -right-12 hidden lg:flex flex-col items-center gap-6">
            <div className="group cursor-pointer flex flex-col items-center transition">
               <Heart size={44} strokeWidth={2.5} className="group-hover:fill-current group-hover:text-pink-300" />
               <span className="font-bold mt-1 text-xl drop-shadow">Likes</span>
            </div>
            <div className="cursor-pointer hover:text-blue-200 transition">
               <MessageCircle size={44} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#a40000] flex items-center justify-center p-4 text-white font-['Comic_Neue']">
      <div className="text-center space-y-6 bg-white/10 p-12 rounded-3xl backdrop-blur-md shadow-2xl">
        <h1 className="text-6xl font-bold">You did it! ❤️</h1>
        <p className="text-2xl">Successfully unlocked with 0504 passcode.</p>
        <p className="text-4xl text-pink-300">Happy Birthday! 🎂</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PasscodePage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

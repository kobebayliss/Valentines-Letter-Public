/* eslint-disable @next/next/no-img-element */
"use client"
import * as React from 'react';

export interface Dialogue {
  index: number;
  dialogue: string;
}

export interface Question {
  index: number;
  question: string;
  answer: string;
}

export interface InteractiveLetterProps {
  dialogueObject: Dialogue[];
  questionsObject: Question[];
  header: string;
  partnerFirstName: string;
  partnerLastName: string;
  yourFirstName: string;
  letterContent: string;
}

export default function InteractiveLetter({ dialogueObject, questionsObject, header, partnerFirstName, partnerLastName, yourFirstName, letterContent }: InteractiveLetterProps) {
  const [envelopePressed, setEnvelopePressed] = React.useState(false);
  const [textIndex, setTextIndex] = React.useState(0);
  const [letterOpen, setLetterOpen] = React.useState(false);
  const [fullyOpened, setFullyOpened] = React.useState(false);
  const [showCard, setShowCard] = React.useState(false);
  const [showButton, setShowButton] = React.useState(false);
  const [fullCardShown, setFullCardShown] = React.useState(false);

  const heartProps = 
    [[8, 10, 5, 1.4],[28, 5, -10, 1.2],[44, 18, -15, 0.9], [60, 4, 12, 1,2], [72, 12, -3, 1.6], 
    [86, 6, 2, 1.4], [80, 22, -10, 1.0], [64, 25, -3, 1.3], [16, 23, -10, 0.9], [24, 15, 4, 0.6],
    [8, 72, 10, 1.3], [10, 84, -6, 1.1], [20, 94, 2, 0.8], [24, 78, -1, 1.5], [44, 70, -15, 1.1],
    [40, 88, 12, 1.2], [60, 84, 3, 1.4], [80, 74, 12, 1.1], [76, 92, -8, 1.3], [88, 83, 2, 0.9]]

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleFirstPress = async () => {
    setEnvelopePressed(true);
    for (let i = 1; i < 4; i++) {
      await wait(750);
      setTextIndex(i);
      await wait(5000);
      setTextIndex(0);
    }
    await wait(750);
    setTextIndex(4);
  };

  const handleCorrectAnswer = async () => {
    const nextIndex = textIndex + 1;
    setTextIndex(0);
    await wait(750);
    setTextIndex(nextIndex);
  };

  const openLetter = React.useCallback(async () => {
    setLetterOpen(true);
    await wait(2000);
    setFullyOpened(true);
    await wait(2000);
    setShowCard(true);
    await wait(5000);
    setShowButton(true);
  }, []);

  React.useEffect(() => {
    async function runSequence() {
      if (textIndex === 10) {
        await wait(5000);
        setTextIndex(0);
        await wait(750);
        setTextIndex(11);
      }
      if (textIndex === 13) {
        await wait(750)
        openLetter()
      }
    };
    runSequence();
  }, [textIndex, openLetter]);

  const bottomHeart = (photo: string, degrees: number) => {
    return (
        <div className="relative w-40 h-40 mt-12 " 
        style={{
            transform: `rotate(${degrees}deg)`,
            WebkitMaskImage: 'url(/heart.svg)',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            WebkitMaskPosition: 'center',
            maskImage: 'url(/heart.svg)',
            maskRepeat: 'no-repeat',
            maskSize: 'contain',
            maskPosition: 'center',
            background: '#9c2b2e',
        }}>
            <div
            className="absolute inset-2.5"
            style={{
                backgroundImage: `url(/${photo}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',

                WebkitMaskImage: 'url(/heart.svg)',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                WebkitMaskPosition: 'center',

                maskImage: 'url(/heart.svg)',
                maskRepeat: 'no-repeat',
                maskSize: 'contain',
                maskPosition: 'center',
            }}
            />
        </div>
    )
  }

  function QuestionComp({question, answer, onCorrect}: {question: string, answer: string, onCorrect: () => void}) {
    const [inputValue, setInputValue] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);
    const [error, setError] = React.useState(false);
    const checkAnswer = () => {
      if (inputValue.trim()) {
        if (inputValue.trim().toLowerCase() === answer.toLowerCase()) {
          onCorrect();
        } else {
          setError(true);
        }
      }
    };
    return (
      <>
        <p className="font-medium text-center text-[#5e1a1c]" style={{ marginBottom: '1rem' }}>{question}</p>
        <div className='relative w-96 flex items-center gap-3'>
          <div className='relative flex-1'>
            <input 
              type="text"
              id="answer-input"
              value={inputValue}
              placeholder="Enter your answer..."
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  checkAnswer();
                }
              }}
              className={`w-full bg-white border-2 rounded-2xl outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-lg ${
                isFocused 
                  ? 'border-[#9C2B2E] shadow-[0_0_0_4px_rgba(156,43,46,0.1)] scale-105' 
                  : 'border-[#D4C9B5] hover:border-[#9C2B2E]/50 hover:shadow-xl'
              }`}
              style={{
                fontFamily: 'inherit',
                fontSize: '16px',
                paddingInline: '1.25rem',
                paddingBlock: '0.875rem',
              }}
            />
            <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
              isFocused ? 'opacity-100' : 'opacity-0'
            }`} style={{
              background: 'linear-gradient(135deg, rgba(156,43,46,0.05), rgba(212,201,181,0.05))',
            }} />
          </div>
          
          <button
            onClick={checkAnswer}
            disabled={!inputValue.trim()}
            className={`flex items-center justify-center w-13 h-13 rounded-full transition-all duration-300 shadow-lg ${
              inputValue.trim()
                ? 'bg-[#9C2B2E] hover:bg-[#7d2325] hover:scale-110 hover:shadow-xl active:scale-95 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed opacity-50'
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="white" 
              className={`w-6 h-6 transition-transform duration-300 ${inputValue.trim() ? 'group-hover:scale-110' : ''}`}
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-500" style={{ paddingTop: '0.75rem' }}>Not quite — try again</p>
        )}
      </>
    )
  };

  function Heart({top, left, rotate, scale}: {top: number, left: number, rotate: number, scale: number}) {
    return (
    <div 
      className="absolute h-20 w-20" 
      style={{
        top: `${top}%`,
        left: `${left}%`,
        transform: `rotate(${rotate}deg) scale(${scale})`,
        backgroundImage: `url(/glitter.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        WebkitMaskImage: 'url(/heart.svg)',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskImage: 'url(/heart.svg)',
        maskRepeat: 'no-repeat',
        maskSize: 'contain',
        maskPosition: 'center',
      }}
    />
  )}

  return (
    <div className='relative min-h-screen w-full'>
      {heartProps.map(([top, left, rotate, scale], i) => 
        <Heart key={i} top={top} left={left} rotate={rotate} scale={scale}/>
      )}
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <p className={`text-[120px] text-[#5e1a1c] transition-opacity duration-400 ${letterOpen || fullCardShown ? 'opacity-0' : 'opacity-100'}`} style={{fontFamily: 'Bidena, sans-serif'}}>Love Letter</p>
        <div className='relative h-6 w-120 mb-16' style={{ marginBottom: '80px', marginTop: '50px' }}>
          <p className={`absolute inset-0 text-[#5e1a1c] flex items-center justify-center text-center transition-opacity duration-500 ${envelopePressed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            click the envelope to open
          </p>
          {dialogueObject.map((dialogue) => (
            <p key={dialogue.index} className={`absolute inset-0 flex items-center justify-center text-center text-[#5e1a1c] transition-opacity duration-500 ${textIndex === dialogue.index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {dialogue.dialogue}
            </p>
          ))}
          {questionsObject.map((question) => (
            <div key={question.index} className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${textIndex === question.index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <QuestionComp question={question.question} answer={question.answer} onCorrect={handleCorrectAnswer} />
            </div>
          ))}
        </div>
        <div className={`relative bg-[#9C2B2E] w-125 h-90 overflow-hidden rounded-3xl hover:scale-105 hover:-translate-y-1 transition-[scale_300ms_ease-in-out,transform_300ms_ease-in-out,opacity_800ms_ease-in-out] cursor-pointer ${envelopePressed ? 'pointer-events-none' : ''} ${fullyOpened || fullCardShown ? 'opacity-0' : 'opacity-100'}`} style={{ marginBottom: '4rem' }} onClick={() => handleFirstPress()}>
          <img src="/EnvelopeBottom.svg" width="700" height="252" alt='Envelope' className={`z-20 absolute left-1/2 -translate-x-1/2 -top-28 rotate-180`} style={{filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.6))', maxWidth: 'none'}} />
          <img src="/EnvelopeSide.svg" width="250" height="400" alt='Envelope' className='z-0 absolute -left-10 -top-5' />
          <img src="/EnvelopeSide.svg" width="250" height="400" alt='Envelope' className='z-0 absolute -right-10 -top-5 rotate-180' />
          <img src="/EnvelopeBottom.svg" width="700" height="252" alt='Envelope' className='z-10 absolute -bottom-30 left-1/2 -translate-x-1/2' style={{filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.3))', maxWidth: 'none'}} />
        </div>
        <div className={`w-125 h-154 absolute transition-opacity duration-1400 ease-in-out ${fullyOpened && !fullCardShown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className='relative w-full h-54.5'>
            <img src="/EnvelopeBottom.svg" width="500" height="180" alt='Envelope' className='z-0 absolute left-px' />
            <img src="/EnvelopeBottomWhite.svg" width="448" height="180" alt='Envelope' className='z-10 left-6.5 absolute' style={{ marginTop: '28px' }}/>
            <div className='w-124.5 left-px absolute top-48 h-15 bg-white border-l-[#9C2B2E] border-r-[#9C2B2E] border-l-26 z-20 border-r-27'/>
            <img src="/flowers.png" width="500" alt="Flowers" className='z-20 absolute -top-8' />
            <div className='w-105 h-110 overflow-hidden z-60 top-28 absolute left-9.75' style={{filter: 'drop-shadow(0 0px 25px rgba(0, 0, 0, 0.6))'}}>
              <div className={`w-105 text-center h-72 bg-[#e8dccf] transition-transform duration-2000 ease-in-out ${showCard ? 'translate-y-0' : 'translate-y-full'}`} style={{ maxWidth: 'none' }}>
                <p className='font-medium tracking-tight text-[#5e1a1c] italic' style={{ paddingTop: '15px' }}>{header}</p>
                <p className='text-[40px] text-[#5e1a1c]' style={{ paddingTop: '12px', fontFamily: 'Bidena, sans-serif' }}>{partnerFirstName} {partnerLastName}</p>
                <div style={{ paddingTop: '8px' }}>
                  <img src="/cover_photo.png" alt="Letter front photo" width="220" className='z-65 border-[6px] rounded-full border-[#9c2b2e]' style={{ marginInline: 'auto' }}/>
                </div>
              </div>
            </div>
          </div>
          <div className='relative w-124.5 left-px rounded-b-3xl overflow-hidden h-94 bg-white'>
            <div className='bg-[#9C2B2E] -top-12 w-6 h-30 absolute z-40' />
            <img src="EnvelopeSide.svg" width="250" height="400" alt='Envelope' className='z-70 absolute -left-10' />
            <img src="EnvelopeSide.svg" width="250" height="400" alt='Envelope' className='z-70 absolute -right-9.25 rotate-180' />
            <button className={`hover:scale-110 hover:bg-[#461315] absolute bg-[#5e1a1c] text-white z-90 transition-all duration-400 cursor-pointer left-1/2 -translate-x-1/2 rounded-xl 
            ${!showButton ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} style={{ bottom: '80px', filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))', paddingInline: '1.5rem', paddingBlock: '0.75rem' }}
            onClick={() => setFullCardShown(true)}>
              Open Letter
            </button>
            <img src="/EnvelopeBottom.svg" width="700" height="252" alt='Envelope' className='z-80 absolute -bottom-30 left-1/2 -translate-x-1/2' style={{filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.3))', maxWidth: 'none'}} />
          </div>
        </div>
        <div className={`w-180 min-h-60 absolute bg-[#e8dccf] text-[#5e1a1c] font-medium transition-opacity duration-1000 ease-in-out ${fullCardShown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{filter: 'drop-shadow(0 0px 20px rgba(0, 0, 0, 0.6))', padding: '20px'}}>
          <p className='text-[42px] text-center' style={{fontFamily: 'Bidena, sans-serif', marginTop: '20px'}}>My Dearest {partnerFirstName},</p>
          <div className='italic text-[16px] whitespace-pre-line'>
            <p style={{marginTop: '20px'}}>{letterContent}</p>
            <div className='flex justify-between'>
                {bottomHeart('card_photo1', 5)}
                <div className='flex flex-col font-semibold text-center not-italic' style={{marginBlock: 'auto'}}>
                    <p>With so much love,</p>
                    <p>{yourFirstName}</p>
                </div>
                {bottomHeart('card_photo2', -5)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
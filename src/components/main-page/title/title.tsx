import ParticlesBackground from '../particles/particles';

export default function Title() {
  return (
    <div className='relative w-full h-96'>
      <ParticlesBackground />
      <div className='px-10 py-5 md:px-30 md:py-15 h-full flex flex-col'>
        <div className='flex-grow flex flex-col justify-center '>
          <h2 className='font-bold text-5xl md:text-8xl'>TO-DO LIST</h2>
        </div>
      </div>
    </div>
  );
}

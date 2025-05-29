import Countdown from '@/components/main-page/countdown/countdown';
import Title from '@/components/main-page/title/title';

export default function Home() {
  return (
    <main className='h-screen'>
      <div>
        <Title />
        <Countdown />
      </div>
    </main>
  );
}

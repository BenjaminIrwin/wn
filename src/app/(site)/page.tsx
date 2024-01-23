import Image from 'next/image';

import {
  BuildingLibraryIcon,
  CubeIcon,
  DocumentIcon,
  PaintBrushIcon,
  UserGroupIcon,
  UserIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import Container from '~/core/ui/Container';
import Button from '~/core/ui/Button';
import Divider from '~/core/ui/Divider';
import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';

import PricingTable from '~/components/PricingTable';
import SignUpMethodsContainer from '../auth/components/SignUpMethodsContainer';

export default function Home() {
  return (
    <div className={'flex flex-col space-y-16'}>
      <Container>
        <div
          className={
            'my-12 flex flex-col items-center md:flex-row lg:my-16' +
            ' mx-auto flex-1 justify-center animate-in fade-in ' +
            ' duration-1000 slide-in-from-top-12'
          }
        >
          <div className={'flex w-full flex-1 flex-col items-center space-y-8'}>
            <HeroTitle>
            <div className="flex justify-center -ml-4"><span className="floating text-3xl md:text-4xl">🔬</span><span className="floating2 text-3xl md:text-4xl">🩺</span><span className="floating3 text-3xl md:text-4xl">👨‍💻</span><span className="floating4 text-3xl md:text-4xl">🌍</span><span className="floating5 text-3xl md:text-4xl">📈</span></div>
              <span className={"mt-10"}>Research.ai</span>
            </HeroTitle>

            <SubHeading className={'text-center max-w-3xl'}>
              <span>Here you can write a short description of your SaaS. This subheading is usually laid out on multiple lines.</span>
            </SubHeading>

            <div className={'flex flex-col items-center space-y-4 w-full md:w-2/6'}>
              <SignUpMethodsContainer/>

              <span className={'text-xs text-gray-500 dark:text-gray-400'}>
                Free plan. No credit card required.
              </span>
            </div>
          </div>
        </div>
      </Container>

    </div>
  );
}

function HeroTitle({ children }: React.PropsWithChildren) {
  return (
    <h1
      className={
        'text-center text-4xl text-gray-600 dark:text-white md:text-5xl' +
        ' flex flex-col font-heading font-medium xl:text-7xl 2xl:text-[5.2rem]'
      }
    >
      {children}
    </h1>
  );
}

function FeatureIcon(props: React.PropsWithChildren) {
  return (
    <div className={'flex'}>
      <div
        className={
          'rounded-xl bg-primary/5 p-4 dark:bg-background border' +
          ' border-primary/5 dark:border-dark-800'
        }
      >
        {props.children}
      </div>
    </div>
  );
}

function Pill(props: React.PropsWithChildren) {
  return (
    <h2
      className={
        'inline-flex w-auto items-center space-x-2' +
        ' rounded-full bg-gradient-to-br dark:from-gray-200 dark:via-gray-400' +
        ' dark:to-gray-700 bg-clip-text px-4 py-2 text-center text-sm' +
        ' font-normal text-gray-500 dark:text-transparent shadow' +
        ' dark:shadow-dark-700'
      }
    >
      <span>{props.children}</span>
    </h2>
  );
}

function FeatureShowcaseContainer(props: React.PropsWithChildren) {
  return (
    <div
      className={
        'flex flex-col lg:flex-row items-center justify-between' +
        ' lg:space-x-24'
      }
    >
      {props.children}
    </div>
  );
}

function LeftFeatureContainer(props: React.PropsWithChildren) {
  return (
    <div className={'flex flex-col space-y-8 w-full lg:w-6/12'}>
      {props.children}
    </div>
  );
}

function RightFeatureContainer(props: React.PropsWithChildren) {
  return <div className={'flex w-full lg:w-6/12'}>{props.children}</div>;
}

function MainCallToActionButton() {
  return (
    <Button
      className={
        'bg-transparent bg-gradient-to-r shadow-2xl' +
        ' hover:shadow-primary/60 from-primary' +
        ' to-primary-600 hover:to-indigo-600 text-white'
      }
      variant={'custom'}
      size={'lg'}
      round
      href={'/auth/sign-up'}
    >
      <span className={'flex items-center space-x-2'}>
        <span>Get Started</span>
        <ChevronRightIcon
          className={
            'h-4 animate-in fade-in slide-in-from-left-8' +
            ' delay-1000 fill-mode-both duration-1000 zoom-in'
          }
        />
      </span>
    </Button>
  );
}

declare module 'react-scroll-to-bottom' {
  import { ComponentType, ReactNode } from 'react';

  interface ScrollToBottomProps {
    className?: string;
    followButtonClassName?: string;
    scrollViewClassName?: string;
    children?: ReactNode;
    mode?: 'bottom' | 'top';
    initialScrollBehavior?: 'auto' | 'smooth';
    style?: React.CSSProperties;
    followButtonChildren?: ReactNode;
    debounce?: number;
    atBottom?: boolean;
    checkInterval?: number;
  }

  const ScrollToBottom: ComponentType<ScrollToBottomProps>;
  export default ScrollToBottom;
}
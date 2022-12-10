import { useCallback, useEffect, useState } from 'react';

export type BreakpointType = 'sm' | 'md' | 'lg';
const breakpoints = { sm: '488px', md: '769px', lg: '1281px' };
//!HOOK TO CHECK IF WE ARE GREATER THAN THE BREAKPOINTS
export default function useMediaQuery(breakpoint: BreakpointType | number) {
  const [matchesBreakpoint, setMatchesBreakpoint] = useState<boolean>(true);

  const breakPoint = typeof breakpoint === 'number' ? `${breakpoint}px` : breakpoints[breakpoint];

  useEffect(() => {
    setMatchesBreakpoint(window.matchMedia(`(min-width: ${breakPoint})`).matches);
  }, [breakPoint]);

  const onResize = useCallback(() => {
    if (typeof window !== 'undefined') {
      setMatchesBreakpoint(window.matchMedia(`(min-width: ${breakPoint})`).matches);
    } else {
      setMatchesBreakpoint(true);
    }
  }, [setMatchesBreakpoint, breakPoint]);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  return matchesBreakpoint;
}

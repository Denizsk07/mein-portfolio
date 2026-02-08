declare module 'react-scroll' {
    import * as React from 'react';
  
    export interface LinkProps {
      to: string;
      spy?: boolean;
      smooth?: boolean;
      hashSpy?: boolean;
      offset?: number;
      activeClass?: string;
      className?: string;
      duration?: number;
      delay?: number;
      isDynamic?: boolean;
      onSetActive?: () => void;
      onSetInactive?: () => void;
      ignoreCancelEvents?: boolean;
      spyThrottle?: number;
      containerId?: string;
      container?: string | Element;
      role?: string;
      tabIndex?: string | number;
      children?: React.ReactNode;
    }
  
    export class Link extends React.Component<LinkProps> {}
    
    export class Element extends React.Component<{name: string, id?: string, className?: string}> {}
  }
  
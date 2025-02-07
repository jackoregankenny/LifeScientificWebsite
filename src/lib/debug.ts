export const debugStoryblok = {
    logComponent: (componentName: string, data: any) => {
      if (process.env.NODE_ENV === 'development') {
        console.group(`Storyblok Component: ${componentName}`);
        console.log('Data:', data);
        console.groupEnd();
      }
    },
  
    validateProps: (componentName: string, props: any, requiredProps: string[]) => {
      if (process.env.NODE_ENV === 'development') {
        requiredProps.forEach(prop => {
          if (!props[prop]) {
            console.warn(`${componentName}: Missing required prop "${prop}"`);
          }
        });
      }
    }
  };
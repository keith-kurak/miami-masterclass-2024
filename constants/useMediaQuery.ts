import { useWindowDimensions } from 'react-native';

export function useMediaQuery() {
  // TODO: Use tailwind's actual breakpoints: https://stackoverflow.com/questions/59982018/how-do-i-get-tailwinds-active-breakpoint-in-javascript
  // We didn't change defaults and only need one size in a few places, so this will work for now.
  const { width } = useWindowDimensions();
  return { isLarge: width >= 640 };
}
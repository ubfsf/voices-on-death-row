// Stub gsap module for build
export const gsap = {
  to: (...args: any[]) => {},
  from: (...args: any[]) => {},
  fromTo: (...args: any[]) => {},
  timeline: (...args: any[]) => ({ to: (...a:any[])=>{}, from: (...a:any[])=>{}, fromTo: (...a:any[])=>{} }),
  registerPlugin: (...args: any[]) => {},
  context: (...args: any[]) => ({ revert: () => {} }),
  utils: { toArray: (...args:any[]) => [] }
};
export const ScrollTrigger = {};
export default gsap;

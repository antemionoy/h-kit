export default function detectWidthBreakpoint(width) {
  const template = {
    isDesktop: false,
    isTablet: false,
    isMobile: false,
  }
  if (width >= 1280) {
    template.isDesktop = true
    return template
  }
  if (width >= 769 && width < 1280) {
    template.isTablet = true
    return template
  }
  template.isMobile = true
  return template
}

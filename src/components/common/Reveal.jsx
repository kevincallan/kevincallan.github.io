import { useInView } from "../../hooks/useInView";

/**
 * Wraps children in a scroll-reveal container. `as` lets callers pick the tag,
 * `delay` staggers grouped items.
 */
export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, inView] = useInView();
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

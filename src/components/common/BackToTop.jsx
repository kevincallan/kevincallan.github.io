/** A small right-aligned "return to top" control for the end of a section. */
export function BackToTop() {
  return (
    <div className="back-to-top">
      <a href="#hero" className="back-to-top__link">
        <span aria-hidden="true">↑</span> Back to top
      </a>
    </div>
  );
}

import Subtitle from "../Typography/Subtitle";

function TitleCard({
  title,
  children,
  topMargin,
  TopSideButtons,
  componentToPrintRef,
}) {
  return (
    <div
      ref={componentToPrintRef}
      className={
        "card w-full bg-base-100 p-6 shadow-xl " + (topMargin || "mt-6")
      }
    >
      {/* Title for Card */}
      <Subtitle
        styleClass={
          TopSideButtons
            ? "inline-block text-primary tracking-wide"
            : title
            ? "text-primary tracking-wide"
            : ""
        }
      >
        {title}

        {/* Top side button, show only if present */}
        {TopSideButtons && (
          <div className="float-right inline-block">{TopSideButtons}</div>
        )}
      </Subtitle>

      <div className="divider mt-2"></div>

      {/** Card Body */}
      <div className="h-full w-full bg-base-100">{children}</div>
    </div>
  );
}

export default TitleCard;

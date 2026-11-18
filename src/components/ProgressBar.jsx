export default function ProgressBar({ pct, complete, label = "Progress" }) {
  return (
    <div className={"progress" + (complete ? " is-complete" : "")} role="progressbar"
         aria-valuemin="0" aria-valuemax="100" aria-valuenow={pct} aria-label={label}>
      <div className="progress-fill" style={{ width: pct + "%" }} />
    </div>
  );
}

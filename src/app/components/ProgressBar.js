const ProgressBar = ({ language, percentage, level }) => {
  return (
    <div className="mb-4 w-full">
      {/* Lenguaje + Nivel */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h1 className="pt-2 text-base">{language}</h1>
        <h1 className="pt-1 sm:pt-2 font-extralight text-sm">{level}</h1>
      </div>

      {/* Barra de progreso */}
      <div className="mt-2 h-4 relative w-full rounded-full overflow-hidden bg-lightSky">
        <div
          className="h-full bg-skyCustom absolute left-0 top-0 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

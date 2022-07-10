type NonIdealStateProps = {
  title: string;
  subtitle: string;
  description: string;
};

const NonIdealState: React.FC<NonIdealStateProps> = ({
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="absolute -z-10 top-0 left-0 h-screen w-screen flex items-center justify-center divide-x divide-gray-200">
      <h2 className="text-3xl font-bold text-lime-500 pr-3">{title}</h2>
      <div className="flex flex-col justify-center pl-3">
        <h2 className="text-2xl font-bold text-gray-900">{subtitle}</h2>
        <span className="text-sm text-gray-400">{description}</span>
      </div>
    </div>
  );
};

export default NonIdealState;

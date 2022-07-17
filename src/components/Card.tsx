type CardProps = {
  header: string | React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ header, footer, children }) => {
  return (
    <div className="bg-white shadow shadow-gray-400 rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:px-6">
        {typeof header === "string" ? (
          <h2 className="font-bold text-gray-800">{header}</h2>
        ) : (
          header
        )}
      </div>
      <div className="px-4 py-5 sm:p-6">{children}</div>
      {typeof footer === "undefined" ? null : (
        <div className="px-4 py-4 sm:px-6">{footer}</div>
      )}
    </div>
  );
};

export default Card;

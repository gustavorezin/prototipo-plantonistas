interface CardUserProps {
  name: string;
  address?: string;
  phone: string;
  crm?: string;
  specialties?: string[];
  onClick?: () => void;
}

export const CardUser = ({
  name,
  address = "",
  phone,
  crm = "",
  specialties = [],
  onClick,
}: CardUserProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-between bg-white rounded-2xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">{name}</h1>
            <div className="line-clamp-1 -mx-2">
              {specialties.map((spec, i) => (
                <span
                  key={i}
                  className="text-xs text-sky-900 bg-sky-100 px-2 rounded-full mr-1"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
        {crm && (
          <p className="text-sm text-gray-500">
            <strong>CRM:</strong> {crm}
          </p>
        )}
        <p className="text-sm text-gray-500">
          <strong>Telefone:</strong> {phone}
        </p>

        {address && (
          <p className="text-sm text-gray-500">
            <strong>Endereço:</strong> {address}
          </p>
        )}
      </div>
    </div>
  );
};

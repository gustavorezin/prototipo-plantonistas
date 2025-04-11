interface CardUserProps {
  name: string;
  address?: string;
  phone: string;
  available: boolean;
  crm?: string;
  specialty?: string;
}

export const CardUser = ({
  name,
  address = "",
  phone,
  available,
  crm = "",
  specialty = "",
}: CardUserProps) => {
  console.log("CardUser", { name, address, phone, available, crm, specialty });
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">{name}</h1>
            {specialty && <p className="text-sm text-primary">{specialty}</p>}
          </div>
          {available && (
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
              "Disponível"
            </span>
          )}
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

      {/* <button className="mt-4 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition text-sm cursor-pointer">
        Solicitar
      </button> */}
    </div>
  );
};

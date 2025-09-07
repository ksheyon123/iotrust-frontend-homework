import { useLanguage } from "@/contexts/LanguageContext";

const ListItem = (item: DAppItem) => {
  const { currentLanguage } = useLanguage();

  // 현재 언어에 맞는 DApp 데이터 선택
  const localizedDApp = item[currentLanguage];

  return (
    <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
      <img
        src={localizedDApp.image_url}
        alt={localizedDApp.name}
        className="w-12 h-12 rounded-lg mr-4"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{localizedDApp.name}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {localizedDApp.description}
        </p>
        {localizedDApp.networks.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {localizedDApp.networks.map((network, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
              >
                {network}
              </span>
            ))}
          </div>
        )}
      </div>
      {localizedDApp.service_url && (
        <a
          href={localizedDApp.service_url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Go to DApp
        </a>
      )}
    </div>
  );
};

export default ListItem;

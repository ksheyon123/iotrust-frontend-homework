interface FavoriteItemProps {
  item: FavoriteItem;
  onClick?: () => void;
  onFavoriteToggle?: () => void;
  isFavorited?: boolean;
}

const FavoriteItem = ({
  item,
  onClick,
  isFavorited = true,
}: FavoriteItemProps) => {
  return (
    <div
      className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={item.image_url}
        alt={item.title}
        className="w-12 h-12 rounded-lg mr-4"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.title}</h3>
        <div>{item.service_url}</div>
      </div>
      <button
        onClick={() => {}}
        className="ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
        title={isFavorited ? "즐겨찾기에서 제거" : "즐겨찾기에 추가"}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={isFavorited ? "#FCD34D" : "none"}
          stroke={isFavorited ? "#FCD34D" : "#9CA3AF"}
          strokeWidth="2"
          className="transition-colors"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      </button>
    </div>
  );
};

export default FavoriteItem;

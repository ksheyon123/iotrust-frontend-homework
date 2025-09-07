import List from "./List";

// 1. 기본적인 사용법
const ListExample: React.FC = () => {
  const users = [
    { id: 1, name: "김철수", email: "kim@example.com" },
    { id: 2, name: "이영희", email: "lee@example.com" },
    { id: 3, name: "박민수", email: "park@example.com" },
  ];

  return (
    <div className="p-4">
      <List data={users} className="space-y-2">
        {(user, index) => (
          <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <span className="text-sm text-gray-400">#{index + 1}</span>
          </div>
        )}
      </List>
    </div>
  );
};

export default ListExample;

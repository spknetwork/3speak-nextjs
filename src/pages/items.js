import { useQuery } from '@apollo/client';
import { GET_COMMUNITIES } from '../graphql/queries';

const ItemsPage = () => {
  const { loading, error, data } = useQuery(GET_COMMUNITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default ItemsPage;

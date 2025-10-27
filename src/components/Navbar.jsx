import { useQuery} from "@tanstack/react-query";

const Navbar = () => {
 

  const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  };

  const { data} = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  console.log(data);

  return (
    <div>
      {data?.map((prod) => (
        <div key={prod.id}>
          <h1>{prod.title}</h1>  
        </div>
      ))}
    </div>
  );
};

export default Navbar;

import {
  FaHeart,
  FaSearch,
  FaShoppingBasket,
  FaShoppingCart,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      {/* Top bar */}
      <div className="bg-black">
        <div className="container mx-auto  text-white flex text-[18px] py-3 gap-[400px] justify-end">
          <p className=" text-[18px]">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
            <strong className="underline cursor-pointer ml-2">ShopNow</strong>
          </p>
          <p className="">English</p>
        </div>
      </div>
      {/* Nav bar */}
      <div className="border border-b-gray-200">
        <nav className="container mx-auto pt-10 pb-4 flex items-center justify-between">
          <div className="flex gap-[290px] items-center">
            <strong className="text-[24px] font-bold ">Exclusive</strong>
            <div className="">
              <ul className="flex gap-12">
                <li className="text-[16px] underline">Home</li>
                <li className="text-[16px]">Contact</li>
                <li className="text-[16px]">About</li>
                <li className="text-[16px]">Sign Up</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-[30px]">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="what are you looking for?"
                className="py-2.5 px-10 placeholder-gray-400 w-full rounded-xl bg-gray-100"
              />
              <FaSearch className=" absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
            <FaHeart className="w-5 h-5" />
            <FaShoppingCart className="w-5 h-5" />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

import Image from "next/image";
export default function Widget() {
  return (
    <Image
      src="/images/widgeticon.png"
      width={80}
      height={40}
      alt="widget"
      className="fixed bottom-[50px]  right-[20px] w-[45px] h-[45px] sm:right-[90px] sm:w-[60px] sm:h-[60px] z-50 cursor-pointer"
    />
  );
}
